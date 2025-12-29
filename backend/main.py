import os
import sys
import time
import random
import torch
import base64
from io import BytesIO
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from torchvision import transforms

# --- ÖNEMLİ: models.py artık main.py ile aynı klasörde ---
# Bu yüzden sys.path eklemeye gerek yok, direkt import ediyoruz.
from models import CondGenerator


# --- LIFESPAN (BAŞLATMA/KAPATMA) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("--- ApriMedic Backend Başlatılıyor ---")
    yield
    print("--- Backend Kapatılıyor ---")


# --- APP TANIMLAMASI ---
app = FastAPI(
    title="ApriMedic API",
    version="1.0.0",
    lifespan=lifespan,
    docs_url=None,  # Prodüksiyonda docs kapatılabilir veya açık kalabilir
    redoc_url=None
)

# --- CORS AYARLARI ---
# Frontend Vercel'den geleceği için tüm kaynaklara izin veriyoruz.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODEL AYARLARI (RENDER İÇİN CPU) ---
# Render ücretsiz planda GPU yoktur, bu yüzden CPU'ya zorluyoruz.
device = torch.device("cpu")
device_name = "CPU (Render Cloud)"

Z_DIM = 128
CLASSES = ["NORMAL", "PNEUMONIA"]
IMAGE_SIZE = 256

# Model dosyası artık main.py ile aynı klasörde
MODEL_PATH = "best_generator.pt"
model = None

# --- MODELİ YÜKLE ---
try:
    if os.path.exists(MODEL_PATH):
        print(f"[BAŞLATILIYOR] Model yükleniyor... ({device_name})")

        # Modeli oluştur
        model = CondGenerator(Z_DIM, len(CLASSES), IMAGE_SIZE).to(device)

        # Ağırlıkları yükle (map_location='cpu' ÇOK KRİTİK)
        state_dict = torch.load(MODEL_PATH, map_location=device)
        model.load_state_dict(state_dict)

        model.eval()
        print("✅ [BAŞARILI] SNGAN Modeli Hazır!")
    else:
        print(f"❌ [HATA] '{MODEL_PATH}' dosyası bulunamadı! Lütfen backend klasörüne ekleyin.")
except Exception as e:
    print(f"❌ [KRİTİK HATA] Model yüklenirken sorun oluştu: {e}")


# --- İSTEK ŞEMASI ---
class GenerateRequest(BaseModel):
    label: str
    count: int = 1


# --- ENDPOINTLER ---

@app.get("/", response_class=HTMLResponse)
def read_root():
    # Şık Tasarımlı Durum Sayfası
    status_text = "SİSTEM AKTİF" if model else "MODEL YÜKLENEMEDİ"
    status_color = "#06b6d4" if model else "#ef4444"

    return f"""
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ApriMedic API Status</title>
        <style>
            :root {{
                --primary: {status_color};
                --bg: #0f172a;
                --card-bg: #1e293b;
                --text: #e2e8f0;
            }}
            body {{
                background-color: var(--bg);
                color: var(--text);
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
            }}
            .container {{
                text-align: center;
                background: var(--card-bg);
                padding: 3rem;
                border-radius: 2rem;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
                max-width: 90%;
                width: 400px;
            }}
            h1 {{
                font-size: 2.5rem;
                margin: 0;
                background: linear-gradient(to right, #06b6d4, #3b82f6);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-weight: 800;
            }}
            p {{ font-size: 1.1rem; color: #94a3b8; margin-top: 0.5rem; }}
            .status-badge {{
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: rgba(255, 255, 255, 0.05);
                color: var(--primary);
                padding: 0.5rem 1rem;
                border-radius: 9999px;
                font-weight: 600;
                margin-top: 2rem;
                border: 1px solid var(--primary);
            }}
            .dot {{
                width: 8px;
                height: 8px;
                background-color: var(--primary);
                border-radius: 50%;
                box-shadow: 0 0 10px var(--primary);
                animation: pulse 2s infinite;
            }}
            .info {{
                margin-top: 1.5rem;
                font-size: 0.85rem;
                color: #64748b;
                font-family: monospace;
            }}
            @keyframes pulse {{
                0% {{ opacity: 1; }}
                50% {{ opacity: 0.5; }}
                100% {{ opacity: 1; }}
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>ApriMedic</h1>
            <p>Sentetik Veri Motoru</p>

            <div class="status-badge">
                <div class="dot"></div>
                {status_text}
            </div>

            <div class="info">
                Donanım: <span style="color:#fff">{device_name}</span><br>
                Model: SNGAN (Conditional)
            </div>
        </div>
    </body>
    </html>
    """


@app.post("/generate")
def generate_image(req: GenerateRequest):
    # Model yüklü değilse hata dön
    if model is None:
        raise HTTPException(status_code=503, detail="Yapay zeka modeli sunucuda bulunamadı veya yüklenemedi.")

    if req.label not in CLASSES:
        raise HTTPException(status_code=400, detail=f"Geçersiz sınıf. Beklenen: {CLASSES}")

    # Sınıf indeksini bul
    idx = CLASSES.index(req.label)

    # --- RASTGELELİK (SEED) ---
    # Render gibi sunucularda Python process'i uzun süre açık kalır.
    # Her istekte farklı sonuç almak için seed'i zamana veya OS random'a göre değiştiriyoruz.
    seed = int(time.time() * 1000) % 2 ** 32
    torch.manual_seed(seed)

    try:
        with torch.no_grad():
            # 1. Latent Vector (Gürültü) Üret
            z = torch.randn(req.count, Z_DIM, device=device)

            # 2. Etiket Vektörü Hazırla
            y = torch.tensor([idx] * req.count, device=device)

            # 3. Modelden Geçir (Inference)
            gen_imgs = model(z, y)

            # 4. Normalizasyonu Geri Al (-1, 1 -> 0, 1)
            gen_imgs = (gen_imgs + 1) / 2.0
            gen_imgs = torch.clamp(gen_imgs, 0, 1)

        # 5. Base64 Dönüştürme
        results = []
        for i in range(req.count):
            img_tensor = gen_imgs[i]
            pil_img = transforms.ToPILImage()(img_tensor)

            buffered = BytesIO()
            pil_img.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
            results.append(img_str)

        return {
            "images": results,
            "label": req.label,
            "backend": "Render/CPU",
            "seed": seed
        }

    except Exception as e:
        print(f"Üretim Hatası: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# Yerel test için (Render bunu kullanmaz, start command'i kullanır)
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=5003)