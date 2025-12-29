import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Brain, Zap, History as HistoryIcon, GitBranch, Scale, BookOpen, Cpu } from 'lucide-react';
import ImageModal from '../components/ImageModal';

const GANPage = () => {
  useEffect(() => {
    document.title = "GAN Modeli | ApriMedic";
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto py-12 space-y-24 px-6 md:px-12"
    >
      {/* 1. HERO */}
      <motion.div variants={itemVariants} className="text-center space-y-10 border-b border-white/10 pb-20 pt-8">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-medic-secondary/10 border border-medic-secondary/30 text-medic-secondary font-mono text-sm tracking-wider shadow-[0_0_20px_rgba(139,92,246,0.15)]">
          <Brain size={18} />
          <span className="font-semibold">ApriMedic Core Engine</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-medic-primary to-medic-secondary filter drop-shadow-2xl">
          Generative Adversarial Networks
        </h1>
        <div className="max-w-5xl mx-auto">
            <p className="text-lg md:text-2xl text-slate-300 leading-loose font-light">
                İki yapay zekanın sonsuz savaşı: Biri üretir, diğeri yakalar.<br/>
                <span className="text-white font-medium">Sonuç: Gerçeğinden ayırt edilemeyen sentetik veriler.</span>
                <br/><br/>
                Veri dağılımını doğrudan öğrenmeye çalışan, Oyun Teorisi tabanlı bir mimaridir.
                Klasik "Loss minimize etme" mantığının ötesinde, iki sinir ağının <b className="text-medic-primary">Nash Dengesi (Nash Equilibrium)</b>'ne ulaşması hedeflenir.
            </p>
        </div>
      </motion.div>

      {/* 2. ŞEMA */}
      <motion.div variants={itemVariants} className="glass-panel p-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-900/50">
        <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3 text-white">
          <GitBranch className="text-medic-primary" /> Algoritmik İşleyiş
        </h2>
        <div className="shadow-2xl shadow-medic-primary/10 bg-black/50 rounded-3xl overflow-hidden border-2 border-white/10">
            <ImageModal
                src="/images/gan-diagram.png"
                alt="GAN Architecture Diagram"
            />
        </div>
        <p className="text-center text-slate-400 text-sm mt-6 font-mono tracking-wide">
        </p>
      </motion.div>

      {/* 3. LİTERATÜR */}
      <motion.div variants={itemVariants} className="glass-panel p-10 rounded-[2.5rem] border-l-4 border-medic-secondary">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 border-b border-white/10 pb-6">
                <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                        <BookOpen size={32} className="text-medic-secondary"/>
                        Literatür: GAN
                    </h3>
                    <div className="text-medic-secondary font-mono text-lg">Oyun Teorisi ve Minimax Dengesi</div>
                </div>
                <div className="text-right bg-white/5 px-6 py-3 rounded-xl border border-white/10">
                    <div className="text-sm text-slate-400 uppercase tracking-widest">Köken</div>
                    <div className="text-xl font-bold text-white">2014, Ian Goodfellow</div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div>
                        <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            <HistoryIcon size={20} className="text-slate-400"/> Tarihçe ve Önem
                        </h4>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            2014 yılında Ian Goodfellow tarafından ortaya atılan GAN, "Loss fonksiyonu yazmadan dağılım öğrenme" (Implicit Density Modeling) fikriyle devrim yaratmıştır.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            <Cpu size={20} className="text-slate-400"/> İşleyiş Mantığı
                        </h4>
                        <div className="bg-[#0f172a] p-5 rounded-xl border border-white/10 shadow-inner mb-4">
                            <code className="text-green-400 font-mono text-sm block leading-loose">
                                min_G max_D V(D, G) = <br/>
                                E[log D(x)] + E[log(1 - D(G(z)))]
                            </code>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            Sistem, bir optimizasyon probleminden ziyade, iki oyunculu bir oyun (Zero-Sum Game) olarak tasarlanmıştır. Generator (Kalpazan) Dedektifi kandırmaya çalışırken, Discriminator (Dedektif) sahteyi yakalamaya çalışır.
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
                                <strong className="text-medic-secondary block mb-1">Vanilla GAN:</strong> Stabil değil.
                            </li>
                            <li className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <strong className="text-medic-secondary block mb-1">DCGAN:</strong> Convolution tabanlı ilk kararlı mimari.
                            </li>
                            <li className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <strong className="text-medic-secondary block mb-1">WGAN-GP:</strong> Wasserstein mesafesi ile kararlı eğitim.
                            </li>
                            <li className="bg-medic-secondary/10 p-4 rounded-xl border border-medic-secondary/30">
                                <strong className="text-medic-secondary block mb-1">SNGAN (Bizim Tercihimiz):</strong> Spectral Normalization ile Lipschitz sınırını koruyarak en stabil eğitimi sağlar.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
      </motion.div>

      {/* 4. SONUÇ */}
      <motion.div variants={itemVariants} className="glass-panel p-10 rounded-[2rem] border-t-4 border-green-500 bg-green-500/5">
           <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
             <Scale className="text-green-500" size={28}/> Neden SNGAN Seçildi?
           </h2>
           <p className="text-lg text-slate-300 mb-6 leading-loose">
             ApriMedic projesinde, tıbbi teşhis için gereken <b className="text-white">keskin detaylar</b> (Kemik yapısı, opasite vb.) kritik öneme sahiptir. VAE modelleri bu keskinliği sağlayamamaktadır. Diffusion modelleri ise çok yavaş çalışmaktadır.
             <br/><br/>
             Bu bağlamda; dengeleyici bir çözüm olarak, hem yüksek stabilite hem de milisaniyeler içinde keskin görüntüler üretebilen <b className="text-green-400">Spectral Normalization GAN (SNGAN)</b> mimarisi projemiz için en uygun mühendislik çözümü olarak belirlenmiştir.
           </p>
      </motion.div>
    </motion.div>
  );
};

export default GANPage;