import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Layers, Wind } from 'lucide-react';
import { useEffect } from 'react';

const ModelCard = ({ title, desc, path, icon: Icon, color }) => (
  <Link to={path} className="block group">
    <div className="glass-panel p-8 rounded-3xl h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:border-medic-primary/50 relative overflow-hidden">
      <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
        <Icon size={120} />
      </div>
      <div className={`w-14 h-14 rounded-2xl ${color} bg-opacity-20 flex items-center justify-center mb-6 text-white`}>
        <Icon size={32} />
      </div>
      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-medic-primary transition-colors">{title}</h3>
      <p className="text-slate-400 leading-relaxed mb-6">{desc}</p>
      <div className="flex items-center gap-2 text-sm font-bold text-white opacity-50 group-hover:opacity-100 transition-opacity">
        İNCELE <ArrowRight size={16} />
      </div>
    </div>
  </Link>
);

const Home = () => {

    useEffect(() => {
    document.title = "ApriMedic";
  }, []);


  return (
    <div className="space-y-24 py-12">

      {/* HERO SECTION */}
      <section className="text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-block px-4 py-2 rounded-full border border-medic-primary/30 bg-medic-primary/10 text-medic-primary font-mono text-sm mb-6 animate-pulse">
            BİYOMEDİKAL MÜHENDİSLİĞİ PROJESİ v1.0
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
            Tıbbi Verinin <br/>
            <span className="gradient-text">Geleceğini Üretin</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            GAN, VAE ve Diffusion modelleri ile KVKK uyumlu, yüksek kaliteli sentetik biyomedikal görüntüler oluşturun. Veri azlığına son verin.
          </p>

          <div className="flex justify-center gap-4">
            <Link to="/demo" className="px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-slate-200 transition-colors shadow-xl shadow-white/10 flex items-center gap-2">
              <Brain size={20} />
              Modeli Dene
            </Link>
            <Link to="/gan" className="px-8 py-4 glass-panel rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
              Nasıl Çalışır?
            </Link>
          </div>
        </motion.div>
      </section>

      {/* MODELLER */}
      <section className="grid md:grid-cols-3 gap-8">
        <ModelCard
          title="GAN Modeli"
          desc="Üretici ve Ayırt Edici ağların rekabetiyle keskin ve yüksek doğruluklu fotoğraflar üretin. Projemizin ana motoru."
          path="/gan"
          icon={Brain}
          color="bg-medic-secondary"
        />
        <ModelCard
          title="VAE Modeli"
          desc="Olasılıksal dağılımları öğrenerek veriyi sıkıştırın ve yeniden üretin. Latent uzay analizi için ideal."
          path="/vae"
          icon={Layers}
          color="bg-green-500"
        />
        <ModelCard
          title="Diffusion"
          desc="Gürültüden anlamlı veriye. Modern yapay zekanın en güçlü görüntü üretim teknolojisi."
          path="/diffusion"
          icon={Wind}
          color="bg-orange-500"
        />
      </section>

    </div>
  );
};

export default Home;