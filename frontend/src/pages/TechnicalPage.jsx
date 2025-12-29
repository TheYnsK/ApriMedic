import { motion } from 'framer-motion';
import { useEffect } from 'react';
import {
  BarChart3, TrendingUp, Activity, ShieldCheck, Database,
  Cpu, Code, Palette, Search, FileDigit, Sliders, Zap, Scale,
  Maximize, Layers, Clock, MousePointer2
} from 'lucide-react';
import ImageModal from '../components/ImageModal';

const TechnicalPage = () => {
  useEffect(() => {
    document.title = "Teknik Analiz | ApriMedic";
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
      className="max-w-7xl mx-auto py-12 space-y-24 px-4 md:px-8"
    >
      {/* --- HEADER --- */}
      <motion.div variants={itemVariants} className="text-center space-y-6 border-b border-white/10 pb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-sm">
          <BarChart3 size={16} />
          <span>Mühendislik Raporu</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-blue-400 to-indigo-500">
          Teknik Analiz
        </h1>
        <p className="text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
          ApriMedic SNGAN modelinin eğitim performans metrikleri, kod mimarisi ve kullanılan parametrelerin detaylı teknik analizi.
        </p>
      </motion.div>

      {/* ==================== BÖLÜM 1: GRAFİKLER ==================== */}

      <div className="space-y-16">
        <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Activity className="text-medic-primary" /> Model Performans Analizi
            </h2>
            <p className="text-slate-400 mb-8">
                Aşağıdaki grafikler, ApriMedic motorunu güçlendiren SNGAN modelinin eğitim sürecindeki kararlılığını kanıtlamaktadır.
            </p>
        </motion.div>

        {/* GRAFİK 1: LOSS CURVE */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-10 items-center glass-panel p-8 rounded-3xl">
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg bg-white/5">
                <ImageModal src="/images/graph_loss_curve.png" alt="Training Loss Curve" />
            </div>
            <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="text-medic-primary" size={28} />
                    <h3 className="text-2xl font-bold text-white">Eğitim Kararlılığı (Loss Stability)</h3>
                </div>
                <p className="text-slate-300 leading-relaxed text-lg">
                    Grafikte Mavi Çizgi (Generator) yüksek bir hata oranından başlayıp düzenli bir düşüşle ideal seviyeye oturmuştur.
                    Kırmızı Çizgi (Discriminator) ise 0.9'dan başlayıp <b>0.5 seviyesinde stabilize olmuştur.</b>
                </p>
                <div className="bg-medic-primary/10 p-4 rounded-xl border border-medic-primary/20">
                    <h4 className="font-bold text-medic-primary mb-2">Teknik Çıkarım:</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        Discriminator loss değerinin 0.5 civarında dengelenmesi, modelin <b>Nash Dengesi</b> noktasına ulaştığını kanıtlar. Bu noktada Discriminator, gelen görüntünün gerçek mi yoksa sahte mi olduğunu ayırt edemez hale gelmiş (yazı-tura atma olasılığı) ve Generator, gerçeğe en yakın dağılımı yakalamıştır.
                    </p>
                </div>
            </div>
        </motion.div>

        {/* GRAFİK 2: CONFIDENCE DISTRIBUTION */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-10 items-center glass-panel p-8 rounded-3xl">
            <div className="space-y-6 order-2 md:order-1">
                <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck className="text-purple-400" size={28} />
                    <h3 className="text-2xl font-bold text-white">Gerçeklik Dağılımı (Confidence)</h3>
                </div>
                <p className="text-slate-300 leading-relaxed text-lg">
                    Yeşil alan (Gerçek Veri) ile Mor alan (Sentetik Veri) dağılım yoğunlukları incelendiğinde, sentetik verilerin güven skorlarının (0.75 - 0.80 bandı) gerçek verilere oldukça yaklaştığı ve iç içe geçtiği görülmektedir.
                </p>
                <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20">
                    <h4 className="font-bold text-purple-400 mb-2">Teknik Çıkarım:</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        Üretilen verilerin dağılımı (Distribution Matching), gerçek veri dağılımıyla büyük oranda örtüşmektedir. Bu durum, sentetik verilerin istatistiksel olarak gerçekçi olduğunu ve modelin "sahte" verileri başarılı bir şekilde "gerçek" sınıfına yaklaştırdığını gösterir.
                    </p>
                </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg order-1 md:order-2 bg-white/5">
                <ImageModal src="/images/graph_confidence.png" alt="Discriminator Confidence" />
            </div>
        </motion.div>

        {/* GRAFİK 3: MATRIX */}
        <motion.div variants={itemVariants} className="glass-panel p-8 rounded-3xl">
             <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Kalitatif Analiz Matrisi</h3>
             </div>
             <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-8 bg-black">
                <ImageModal src="/images/model_performance_matrix.png" alt="Generated Samples Matrix" />
             </div>
             <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <h4 className="font-bold text-white mb-2">Anatomik Bütünlük</h4>
                    <p className="text-sm text-slate-400">SNGAN mimarisi sayesinde Kaburgalar, köprücük kemikleri ve omurga çizgisi netliğini korumuş, bulanıklık engellenmiştir.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <h4 className="font-bold text-white mb-2">Varyasyon Çeşitliliği</h4>
                    <p className="text-sm text-slate-400">Matristeki her bir görüntünün birbirinden farklı olması, modelin veriyi ezberlemediğini (Overfitting yok) gösterir.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <h4 className="font-bold text-white mb-2">Patolojik Bulgular</h4>
                    <p className="text-sm text-slate-400">Alt satırlardaki (Pnömoni) örneklerdeki karakteristik "Opasite" (sisli/beyazımsı doku), sağlıklı örneklerden net bir şekilde ayrılmaktadır.</p>
                </div>
             </div>
        </motion.div>

        {/* GRAFİK 4: DATASET PIE */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8 items-center glass-panel p-8 rounded-3xl">
            <div className="md:col-span-1 rounded-xl bg-white/5 p-4">
                 <ImageModal src="/images/graph_dataset_pie.png" alt="Dataset Distribution" />
            </div>
            <div className="md:col-span-2 space-y-4">
                 <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Database className="text-orange-400"/> Veri Hijyeni ve Denge
                 </h3>
                 <p className="text-slate-300 leading-relaxed text-lg">
                    Eğitim setinde %52 Pnömoni ve %48 Normal vaka kullanılarak veri dengesizliği (Class Imbalance) problemi minimize edilmiştir. Bu, modelin her iki sınıfı da eşit ağırlıkta öğrenmesini ve "Bias" (Yanlılık) oluşumunun engellenmesini sağlamıştır.
                 </p>
            </div>
        </motion.div>
      </div>

      {/* ==================== BÖLÜM 2: MODEL KOD VE PARAMETRE ANALİZİ ==================== */}

      <div className="pt-20 border-t border-white/10">
        <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Code className="text-medic-secondary" size={36} /> Kod ve Mimari Analizi
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg">
                Python kaynak kodunda (train.py) kullanılan temel sınıflar ve eğitim parametrelerinin teknik detayları.
            </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-12">

            {/* 1. GRUP: TEMEL SINIFLAR (ORTALANDI) */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                    <Cpu className="text-purple-500"/> Temel Sınıflar (Classes)
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* CondGenerator */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all hover:bg-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-purple-500/20 rounded-lg"><Palette className="text-purple-400"/></div>
                            <div>
                                <h4 className="text-lg font-bold text-white">CondGenerator</h4>
                                <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded">Kalpazan</span>
                            </div>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>• <b>Görevi:</b> Gürültüden ve etiketten sıfırdan görüntü üretmek.</li>
                            <li>• <b>Teknik:</b> Upsampling (Boyut Büyütme).</li>
                            <li>• <b>Özellik:</b> Conditional (Koşullu). "Bana Pnömoni çiz" emrini alır.</li>
                        </ul>
                    </div>

                    {/* ProjCondDiscriminator */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-red-500/50 transition-all hover:bg-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-red-500/20 rounded-lg"><Search className="text-red-400"/></div>
                            <div>
                                <h4 className="text-lg font-bold text-white">Discriminator</h4>
                                <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2 py-1 rounded">Dedektif</span>
                            </div>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>• <b>Görevi:</b> Gerçek/Sahte ayrımı yapmak.</li>
                            <li>• <b>Teknik:</b> Spectral Normalization (Eğitimi dengeler).</li>
                            <li>• <b>Özellik:</b> Projection Discriminator (Etiket uyumunu kontrol eder).</li>
                        </ul>
                    </div>

                    {/* XRayDataset */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all hover:bg-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-blue-500/20 rounded-lg"><FileDigit className="text-blue-400"/></div>
                            <div>
                                <h4 className="text-lg font-bold text-white">XRayDataset</h4>
                                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Veri Sağlayıcı</span>
                            </div>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>• <b>Görevi:</b> Ham resimleri işlemek.</li>
                            <li>• <b>İşlem:</b> Gri tona çevirme, boyutlandırma.</li>
                            <li>• <b>Çıktı:</b> PyTorch Tensor formatı (-1, 1 aralığı).</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 2. GRUP: PARAMETRE ANALİZİ (ORTALANDI VE İSİM DEĞİŞTİ) */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                    <Sliders className="text-yellow-500"/> Parametre Analizi
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* IMAGE_SIZE */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-yellow-500/50 transition-all hover:bg-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400"><Maximize size={24}/></div>
                            <h4 className="font-bold text-white text-lg">IMAGE_SIZE (256)</h4>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Çıktı görüntüsünün piksel çözünürlüğüdür. <br/>
                            <span className="text-yellow-400">Etki:</span> 256px, tıbbi detay (kemik/leke) ile eğitim hızı arasındaki en verimli denge noktasıdır.
                        </p>
                    </div>

                    {/* BATCH_SIZE */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-yellow-500/50 transition-all hover:bg-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400"><Layers size={24}/></div>
                            <h4 className="font-bold text-white text-lg">BATCH_SIZE (32)</h4>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Modelin bir iterasyonda gördüğü resim sayısı.<br/>
                            <span className="text-yellow-400">Etki:</span> Yüksek değerler eğitimi kararlı (stabil) kılar ancak VRAM (Ekran kartı hafızası) tüketimini artırır.
                        </p>
                    </div>

                    {/* Z_DIM */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-yellow-500/50 transition-all hover:bg-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400"><Zap size={24}/></div>
                            <h4 className="font-bold text-white text-lg">Z_DIM (128)</h4>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Modelin "hayal gücü" vektörünün boyutu.<br/>
                            <span className="text-yellow-400">Etki:</span> Düşük olması durumunda "Mode Collapse" (hep aynı resmi üretme) riski artar.
                        </p>
                    </div>

                    {/* EPOCHS */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-yellow-500/50 transition-all hover:bg-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400"><Clock size={24}/></div>
                            <h4 className="font-bold text-white text-lg">EPOCHS (250)</h4>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Eğitim tur sayısı.<br/>
                            <span className="text-yellow-400">Etki:</span> 250 Epoch, modelin "Overfitting" (ezberleme) yapmadan en iyi anatomik detayları öğrendiği noktadır.
                        </p>
                    </div>

                    {/* LR_G / LR_D */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-yellow-500/50 transition-all hover:bg-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400"><MousePointer2 size={24}/></div>
                            <h4 className="font-bold text-white text-lg">Learning Rate (TTUR)</h4>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Discriminator (4e-4), Generator'den (1e-4) 4 kat hızlı öğrenir.<br/>
                            <span className="text-yellow-400">Etki:</span> Bu dengesizlik, Discriminator'ın daha zeki olmasını sağlayarak Generator'ı daha iyi eğitmesini sağlar.
                        </p>
                    </div>

                    {/* EMA_DECAY */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-yellow-500/50 transition-all hover:bg-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400"><Scale size={24}/></div>
                            <h4 className="font-bold text-white text-lg">EMA_DECAY (0.995)</h4>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Ağırlıkların hareketli ortalaması (Exponential Moving Average).<br/>
                            <span className="text-yellow-400">Etki:</span> Sonuç resimlerinin daha pürüzsüz olmasını sağlar ve anlık dalgalanmaları (noise) engeller.
                        </p>
                    </div>

                </div>
            </div>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default TechnicalPage;