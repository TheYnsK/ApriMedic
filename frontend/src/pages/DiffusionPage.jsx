import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Wind, BookOpen, History as HistoryIcon, Cpu, GitBranch, Sliders, Calculator, Clock, Compass, TrendingUp } from 'lucide-react';
import ImageModal from '../components/ImageModal';

const DiffusionPage = () => {
  useEffect(() => {
    document.title = "Diffusion Modeli | ApriMedic";
  }, []);

  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto py-12 space-y-24 px-6 md:px-12"
    >
      {/* 1. HERO */}
      <motion.div variants={variants} className="text-center space-y-10 border-b border-white/10 pb-20 pt-8">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-sm tracking-wider shadow-[0_0_20px_rgba(249,115,22,0.15)]">
          <Wind size={18} />
          <span className="font-semibold">Iterative Denoising</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-orange-500 to-red-500 drop-shadow-sm">
          Diffusion Models
        </h1>
        <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-2xl text-slate-300 leading-loose font-light">
                DALL-E ve Midjourney'in gücü. Bir görüntüyü yavaşça yok edip, anılarından tekrar hayata döndürme sanatı.
                <br/><br/>
                GAN'lar gibi "Tek Atışta" değil, gürültüyü binlerce küçük adımda temizleyerek üretim yapan (DDPM) son teknoloji mimaridir.
            </p>
        </div>
      </motion.div>

      {/* 2. ŞEMA */}
      <motion.div variants={variants} className="glass-panel p-12 rounded-[2.5rem] border border-white/10 bg-[#0c0a09]">
        <h2 className="text-3xl font-bold mb-10 text-white text-center">İşleyiş: Yıkım ve Yaratım Süreci</h2>
        <div className="rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-orange-500/10 bg-black/50">
            <ImageModal
                src="/images/diffusion-diagram.png"
                alt="Diffusion Forward and Reverse Process Diagram"
            />
        </div>
        <p className="text-center text-slate-400 text-sm mt-6 font-mono tracking-wide">
        </p>
      </motion.div>

      {/* 3. LİTERATÜR */}
      <motion.div variants={variants} className="glass-panel p-10 rounded-[2.5rem] border-l-4 border-orange-500">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 border-b border-white/10 pb-6">
                <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                        <BookOpen size={32} className="text-orange-500"/>
                        Literatür: Diffusion
                    </h3>
                    <div className="text-orange-400 font-mono text-lg">Termodinamik ve Denoising</div>
                </div>
                <div className="text-right bg-white/5 px-6 py-3 rounded-xl border border-white/10">
                    <div className="text-sm text-slate-400 uppercase tracking-widest">Köken</div>
                    <div className="text-xl font-bold text-white">2015 (Teori) - 2020 (Pratik)</div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div>
                        <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            <HistoryIcon size={20} className="text-slate-400"/> Tarihçe ve Önem
                        </h4>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            Fizikteki gazların yayılma prensibinden esinlenmiştir. 2020'de Jonathan Ho'nun DDPM çalışmasıyla GAN'ların görüntü kalitesini yakalamıştır.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            <Cpu size={20} className="text-slate-400"/> İşleyiş Mantığı
                        </h4>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            İki aşamalıdır: İleri süreçte veriye adım adım gürültü eklenir. Geri süreçte model, bu gürültüyü adım adım temizleyerek veriyi geri getirir.
                        </p>
                    </div>
                </div>

                <div className="space-y-8">
                    <div>
                        <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            <GitBranch size={20} className="text-slate-400"/> Kritik Varyasyonlar
                        </h4>
                        <ul className="space-y-4 text-slate-300 text-lg">
                            <li className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <strong className="text-orange-400 block mb-1">DDPM:</strong> Temel piksel tabanlı difüzyon modeli.
                            </li>
                            <li className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <strong className="text-orange-400 block mb-1">Latent Diffusion (LDM):</strong> Stable Diffusion'ın temeli, sıkıştırılmış uzayda çalışır.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
      </motion.div>

      {/* 4. PARAMETRE ANALİZİ (HEPSİ TEK IZGARADA) */}
      <motion.div variants={variants} className="space-y-8">
            <h3 className="text-3xl font-bold text-white flex items-center gap-3 border-l-4 border-orange-500 pl-6">
                <Sliders className="text-orange-500" size={32}/> Parametre ve Değişken Analizi
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {/* --- DİYAGRAM DEĞİŞKENLERİ --- */}

                {/* x0 */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 font-mono text-xl">x₀</div>
                        <h4 className="font-bold text-white">Input (Orijinal)</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Sürecin başındaki temiz, gürültüsüz görüntü. Modelin ulaşmaya çalıştığı nihai hedef.
                    </p>
                </div>

                {/* xT */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-red-500/20 p-2 rounded-lg text-red-400 font-mono text-xl">xₜ</div>
                        <h4 className="font-bold text-white">Pure Noise</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Sürecin sonundaki (veya tersine sürecin başındaki) saf Gaussian gürültüsü. Hiçbir bilgi içermez.
                    </p>
                </div>

                {/* Epsilon */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-400 font-mono text-xl">ε</div>
                        <h4 className="font-bold text-white">Noise (Gürültü)</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Her adımda eklenen veya çıkarılan rastgele bozulma. Modelin tahmin etmeye çalıştığı şey budur.
                    </p>
                </div>

                {/* Model */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-green-500/20 p-2 rounded-lg text-green-400 font-mono text-xl">εθ</div>
                        <h4 className="font-bold text-white">U-Net (Model)</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Sinir ağı. Gürültülü bir resme bakıp, "Buradaki gürültü nedir?" sorusunu yanıtlayan yapıdır.
                    </p>
                </div>

                {/* --- HİPERPARAMETRELER (KART OLARAK EKLENDİ) --- */}

                {/* Timesteps */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-orange-500/20 p-2 rounded-lg text-orange-400"><Clock size={24}/></div>
                        <h4 className="font-bold text-white">Timesteps (T)</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Gürültü ekleme/çıkarma adım sayısı (Örn: 1000). Adım arttıkça kalite artar ama üretim süresi uzar.
                    </p>
                </div>

                {/* Guidance Scale */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-orange-500/20 p-2 rounded-lg text-orange-400"><Compass size={24}/></div>
                        <h4 className="font-bold text-white">Guidance Scale</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Modelin verilen etikete (örn: "Pnömoni") bağlılığı. Çok yüksekse yaratıcılık azalır, resimler tekdüze olur.
                    </p>
                </div>

                {/* Noise Schedule */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-orange-500/20 p-2 rounded-lg text-orange-400"><TrendingUp size={24}/></div>
                        <h4 className="font-bold text-white">Noise Schedule</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Gürültünün eklenme hızı (Linear veya Cosine). Cosine seçimi daha doğal renk geçişleri sağlar.
                    </p>
                </div>

            </div>
      </motion.div>
    </motion.div>
  );
};

export default DiffusionPage;