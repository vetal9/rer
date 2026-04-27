import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

const PHOTOS = [
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/fcfea7507_ad_1671064351461.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/9509d6776_reklama123.png",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/2c2f58d6b_IMG-20250612-WA0002.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/10d41caa9_20250512_124644.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/38b8e2a8e_20250401_124009.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/3d8ee9d3c_20241115_123622.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/096dd9b83_20240718_152502.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/f57ad3b47_20240704_112105.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/ddca64d65_20240531_161310.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/82d1ec73a_20240426_114328.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/ccb1b7133_20240412_083555.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/7b8c9102d_20240206_133108.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/d42c37e95_20240206_134207.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/c0072525e_20240116_145154.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/67d57a539_20240116_132603.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/60d1ebea2_20230901_094507.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/2ade50c8d_20230713_101052.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/8d0c2481a_20230618_101929.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/5a5904fdf_20230618_091326.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/426dd5e5a_20230617_222205.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/d2fdab582_Screenshot_20230528_111830_Gallery.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/af4296892_ad_1671064351461.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/8c1c72a2e_ad_1671064348939.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af2c018c33adb85e92fb22/50007481e_ad_1671064338548.jpg",
];

export default function GallerySection() {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState(null);

  const heading = lang === "fr" ? "Notre Galerie" : "Our Gallery";
  const phase = lang === "fr" ? "Phase_06: Galerie Photos" : "Phase_06: Photo Gallery";
  const sub = lang === "fr"
    ? "Des déménagements réels, des résultats réels. Découvrez notre travail en images."
    : "Real moves, real results. See our work in action.";

  const prev = () => setSelected((s) => (s > 0 ? s - 1 : PHOTOS.length - 1));
  const next = () => setSelected((s) => (s < PHOTOS.length - 1 ? s + 1 : 0));

  const handleKey = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") setSelected(null);
  };

  return (
    <section id="gallery" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-orange uppercase">{phase}</span>
          <h2 className="font-inter font-black text-4xl sm:text-5xl md:text-6xl text-foreground uppercase mt-4 tracking-tight">
            {heading}
          </h2>
          <div className="w-16 h-1 bg-orange mx-auto mt-6 mb-6" />
          <p className="font-inter text-base text-foreground/60 max-w-xl mx-auto">{sub}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {PHOTOS.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="relative aspect-square overflow-hidden rounded cursor-pointer group border border-border hover:border-orange/40 transition-colors"
              onClick={() => setSelected(i)}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 font-mono text-[10px] tracking-widest text-white uppercase transition-opacity">
                  {lang === "fr" ? "Voir" : "View"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
            onKeyDown={handleKey}
            tabIndex={0}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded bg-white/10 hover:bg-orange/80 flex items-center justify-center transition-colors z-10"
              onClick={() => setSelected(null)}
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 w-10 h-10 rounded bg-white/10 hover:bg-orange/80 flex items-center justify-center transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Image */}
            <motion.img
              key={selected}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              src={PHOTOS[selected]}
              alt={`Gallery ${selected + 1}`}
              className="max-h-[85vh] max-w-[85vw] object-contain rounded"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              className="absolute right-4 w-10 h-10 rounded bg-white/10 hover:bg-orange/80 flex items-center justify-center transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 font-mono text-xs tracking-widest text-white/50">
              {selected + 1} / {PHOTOS.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}