import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

const ImageModal = ({ src, alt, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Modal açıldığında scroll'u kilitle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      {/* KÜÇÜK RESİM (Sayfadaki Hali) */}
      <div
        className={`relative group cursor-zoom-in overflow-hidden rounded-xl ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover Efekti */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" size={32} />
        </div>
      </div>

      {/* BÜYÜK RESİM (Portal ile en dışa taşınır) */}
      {/* createPortal sayesinde bu kısım root div'in dışına, body'ye render edilir. Z-index sorunu yaşanmaz. */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              // ARKA PLANA TIKLAYINCA KAPAT
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 md:p-10"
            >
              {/* KAPATMA BUTONU */}
              <button
                className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-50 hover:rotate-90"
                onClick={(e) => {
                    e.stopPropagation(); // Butona basınca arka plana tıklamayı engelle
                    setIsOpen(false);
                }}
              >
                <X size={36} />
              </button>

              {/* RESİM */}
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={src}
                alt={alt}
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl shadow-medic-primary/10 select-none"
                // Resme tıklayınca kapanmasın
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body // Portal Hedefi
      )}
    </>
  );
};

export default ImageModal;