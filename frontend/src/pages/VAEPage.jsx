import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Layers, BookOpen, FunctionSquare, GitBranch, History as HistoryIcon, Cpu, Sliders, Minimize2, Scale, Target } from 'lucide-react';
import ImageModal from '../components/ImageModal';

const VAEPage = () => {
  useEffect(() => {
    document.title = "VAE Modeli | ApriMedic";
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto py-12 space-y-24 px-6 md:px-12"
    >
      {/* 1. HERO */}
      <motion.div variants={variants} className="text-center space-y-10 border-b border-white/10 pb-20 pt-8">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 font-mono text-sm tracking-wider shadow-[0_0_20px_rgba(34,197,94,0.15)]">
          <Layers size={18} />
          <span className="font-semibold">Probabilistic Autoencoder</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-green-500 to-emerald-600 drop-shadow-lg">
          Variational Autoencoders
        </h1>
        <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-2xl text-slate-300 leading-loose font-light">
                Veriyi doğrudan ezberlemek yerine, onun matematiksel dağılımını <br/>(Ortalama ve Varyans) öğrenen akıllı sıkıştırma teknolojisi.
                <br/><br/>
                Klasik Autoencoder'dan farkı: Veriyi sıkıştırırken tek bir noktaya değil, bir <b>Olasılık Dağılımına (Gaussian)</b> dönüştürür.
            </p>
        </div>
      </motion.div>

      {/* 2. ŞEMA */}
      <motion.div variants={variants} className="glass-panel p-12 rounded-[2.5rem] border border-white/10 relative bg-[#0a0f18]">
        <h2 className="text-center text-3xl font-bold mb-12 text-green-400 flex items-center justify-center gap-3">
            <FunctionSquare size={32} /> Çalışma Prensibi: Reparameterization Trick
        </h2>
        <div className="rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-green-500/10 bg-black/50">
            <ImageModal
                src="/images/vae-diagram.png"
                alt="VAE Reparameterization Trick Diagram"
            />
        </div>
        <p className="text-center text-slate-400 text-sm mt-6 font-mono tracking-wide">
        </p>
      </motion.div>

      {/* 3. LİTERATÜR */}
      <motion.div variants={variants} className="glass-panel p-10 rounded-[2.5rem] border-l-4 border-green-500">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 border-b border-white/10 pb-6">
                <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                        <BookOpen size={32} className="text-green-500"/>
                        Literatür: VAE
                    </h3>
                    <div className="text-green-400 font-mono text-lg">Olasılıksal Dağılım Mühendisliği</div>
                </div>
                <div className="text-right bg-white/5 px-6 py-3 rounded-xl border border-white/10">
                    <div className="text-sm text-slate-400 uppercase tracking-widest">Köken</div>
                    <div className="text-xl font-bold text-white">2013, Kingma & Welling</div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div>
                        <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            <HistoryIcon size={20} className="text-slate-400"/> Tarihçe ve Önem
                        </h4>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            Klasik Autoencoder'ların "ezberleme" sorununu çözmek için geliştirilmiştir. Veriyi doğrudan bir noktaya sıkıştırmak yerine, bir olasılık dağılımına (Ortalama ve Varyans) dönüştürür.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            <Cpu size={20} className="text-slate-400"/> İşleyiş Mantığı
                        </h4>
                        <p className="text-slate-300 leading-relaxed text-lg">
                             En kritik mühendislik hamlesi <b>"Reparameterization Trick"</b>tir. Rastgelelik, türev alınabilir zincirin dışına taşınır. Böylece model hem rastgelelik barındırır hem de Backpropagation ile eğitilebilir hale gelir.
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
                                <strong className="text-green-400 block mb-1">Beta-VAE:</strong> Disentanglement (Özellik ayrıştırma) odaklıdır.
                            </li>
                            <li className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <strong className="text-green-400 block mb-1">VQ-VAE:</strong> Kesikli (Discrete) kodlar kullanır, DALL-E 1'in temelidir.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
      </motion.div>

      {/* 4. PARAMETRE ANALİZİ (HEPSİ TEK IZGARADA) */}
      <motion.div variants={variants} className="space-y-8">
            <h3 className="text-3xl font-bold text-white flex items-center gap-3 border-l-4 border-green-500 pl-6">
                <Sliders className="text-green-500" size={32}/> Parametre ve Değişken Analizi
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {/* --- İÇ DEĞİŞKENLER --- */}

                {/* Mean */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-green-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 font-mono text-xl">μ</div>
                        <h4 className="font-bold text-white">Mean (Ortalama)</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Görüntünün latent uzaydaki merkez noktasıdır. Resmin ana karakteristiğini (örn: kemik yapısı) temsil eder.
                    </p>
                </div>

                {/* Variance */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-green-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400 font-mono text-xl">σ</div>
                        <h4 className="font-bold text-white">Variance (Varyans)</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Merkezden ne kadar sapılabileceğini gösteren belirsizlik alanıdır. Çeşitliliği sağlar.
                    </p>
                </div>

                {/* Noise */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-green-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-400 font-mono text-xl">ε</div>
                        <h4 className="font-bold text-white">Noise (Gürültü)</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Standart Normal Dağılımdan gelen rastgeleliktir. "Reparameterization Trick" burada devreye girer.
                    </p>
                </div>

                {/* Latent Vector */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-green-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-green-500/20 p-2 rounded-lg text-green-400 font-mono text-xl">z</div>
                        <h4 className="font-bold text-white">Latent Vector</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Decoder'a giren son kod. <code className="text-green-400 bg-black/50 px-1 rounded">z = μ + σ * ε</code> formülü ile oluşturulur.
                    </p>
                </div>

                {/* --- HİPERPARAMETRELER (KART OLARAK EKLENDİ) --- */}

                {/* Latent Dim */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-green-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-green-500/20 p-2 rounded-lg text-green-400"><Minimize2 size={24}/></div>
                        <h4 className="font-bold text-white">Latent Dim (z)</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Sıkıştırma boyutu (Darboğaz). Yüksek boyut kaliteyi artırır, düşük boyut sıkıştırmayı güçlendirir ama detay kaybı olur.
                    </p>
                </div>

                {/* KL Weight */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-green-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-green-500/20 p-2 rounded-lg text-green-400"><Scale size={24}/></div>
                        <h4 className="font-bold text-white">KL Weight (Beta)</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Latent uzayın düzenini dengeler. Çok artarsa resimler bulanıklaşır, çok azalırsa rastgele üretim yeteneği bozulur.
                    </p>
                </div>

                {/* Reconstruction Loss */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-green-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-green-500/20 p-2 rounded-lg text-green-400"><Target size={24}/></div>
                        <h4 className="font-bold text-white">Reconstruction Loss</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Girdi ve çıktı arasındaki piksel farkıdır. Model bu hatayı düşürmeye çalışır, ancak aşırı düşerse ezberleme başlar.
                    </p>
                </div>

            </div>
      </motion.div>
    </motion.div>
  );
};

export default VAEPage;