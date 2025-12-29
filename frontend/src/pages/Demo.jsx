import axios from 'axios';
import { createPortal } from 'react-dom'; // PORTAL EKLENDİ
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, RefreshCw, Zap, Activity, Brain, X, Maximize2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Demo = () => {

  useEffect(() => {
    document.title = "Canlı Demo | ApriMedic";
  }, []);

  const [label, setLabel] = useState('NORMAL');
  const [count, setCount] = useState(4);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Modal açıldığında arkadaki scroll'u kilitle
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImage]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setImages([]);

    try {
      // --- DEĞİŞİKLİK BURADA ---
      // Vercel'e yükleyince 'VITE_API_URL' ortam değişkenini kullanacak.
      // Eğer o yoksa (lokaldeysen) localhost'u kullanacak.

      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5003";
      // Backend URL'in sonunda / olmamasına dikkat et, biz ekliyoruz.
      const backendUrl = `${apiBase}/generate`;

      console.log("İstek atılıyor:", backendUrl); // Konsoldan kontrol etmek için

      const res = await axios.post(backendUrl, {
        label: label,
        count: parseInt(count)
      });
      setImages(res.data.images);
    } catch (err) {
      console.error(err);
      // Hata mesajını da dinamik yapalım
      const apiBase = import.meta.env.VITE_API_URL || "Localhost";
      setError(`Bağlantı hatası! Hedef: ${apiBase}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-6xl mx-auto relative"
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-medic-primary">
            Sentetik Veri Üretim Laboratuvarı
          </h1>
          <p className="text-slate-400 text-lg">
            Eğitilmiş SNGAN modelini kullanarak saniyeler içinde yeni göğüs röntgenleri üretin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* KONTROL PANELİ */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-6 rounded-2xl sticky top-24">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Zap className="text-yellow-400" /> Parametreler
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Veri Sınıfı</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setLabel('NORMAL')}
                      className={`p-3 rounded-xl border transition-all ${label === 'NORMAL' ? 'bg-medic-accent/20 border-medic-accent text-medic-accent' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}
                    >
                      NORMAL
                    </button>
                    <button
                      onClick={() => setLabel('PNEUMONIA')}
                      className={`p-3 rounded-xl border transition-all ${label === 'PNEUMONIA' ? 'bg-medic-danger/20 border-medic-danger text-medic-danger' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}
                    >
                      PNÖMONİ
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Üretim Adedi: {count}</label>
                  <input
                    type="range" min="1" max="8" step="1"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-medic-primary"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1</span>
                    <span>8</span>
                  </div>
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full py-4 mt-4 bg-gradient-to-r from-medic-primary to-medic-secondary rounded-xl font-bold text-white shadow-lg shadow-medic-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <RefreshCw />}
                  {loading ? 'Model Çalışıyor...' : 'SENTETİK ÜRET'}
                </button>
              </div>
            </div>
          </div>

          {/* SONUÇ EKRANI */}
          <div className="lg:col-span-3">
            <div className="glass-panel p-8 rounded-2xl min-h-[500px]">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-4">
                  {error}
                </div>
              )}
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-medic-primary gap-4 min-h-[400px]">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-medic-primary/30 border-t-medic-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Brain size={24} className="animate-pulse" />
                    </div>
                  </div>
                  <p className="animate-pulse font-mono">GAN Latent Uzayından Örnekleniyor...</p>
                </div>
              ) : images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {images.map((imgBase64, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => setSelectedImage(imgBase64)}
                      className="group relative aspect-square bg-black rounded-xl overflow-hidden border border-slate-700 hover:border-medic-primary transition-all cursor-pointer hover:shadow-lg hover:shadow-medic-primary/20"
                    >
                      <img
                        src={`data:image/png;base64,${imgBase64}`}
                        alt="Generated X-Ray"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <Maximize2 className="text-white drop-shadow-md" size={32} />
                      </div>
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end justify-center">
                        <span className="text-xs font-mono text-medic-primary bg-medic-primary/10 px-2 py-1 rounded border border-medic-primary/30">
                          BÜYÜT
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 min-h-[400px] border-2 border-dashed border-slate-700 rounded-xl">
                  <Activity size={48} className="mb-4 opacity-50" />
                  <p className="text-lg">Henüz bir üretim yapılmadı.</p>
                  <p className="text-sm opacity-50">Parametreleri seçin ve üretim butonuna basın.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- LIGHTBOX (Portal ile En Dışa Taşındı) --- */}
      {/* Bu sayede Navbar'ın üzerinde kalır ve buton çalışır */}
      {selectedImage && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Arka plana tıklayınca kapat
            onClick={() => setSelectedImage(null)}
            // Z-INDEX 9999 YAPILDI (Navbar'ın üstü)
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
          >
            {/* KAPAT BUTONU */}
            {/* Z-Index'i arttırıldı ve tıklama olayını durdurma (stopPropagation) eklendi */}
            <button
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[10000] hover:rotate-90"
              onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
              }}
            >
              <X size={36} />
            </button>

            {/* BÜYÜK RESİM */}
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={`data:image/png;base64,${selectedImage}`}
              alt="Full Screen X-Ray"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl shadow-medic-primary/20 select-none"
              onClick={(e) => e.stopPropagation()} // Resme tıklayınca kapanmasın
            />
          </motion.div>
        </AnimatePresence>,
        document.body // Portal Hedefi: Body
      )}
    </>
  );
};

export default Demo;