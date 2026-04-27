import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function TestimonialsSection() {
  const { t } = useLanguage();

  const testimonials = [
    { name: t.testimonials.t1name, location: t.testimonials.t1loc, rating: 5, text: t.testimonials.t1text, date: "2025-12", type: t.testimonials.t1type },
    { name: t.testimonials.t2name, location: t.testimonials.t2loc, rating: 5, text: t.testimonials.t2text, date: "2025-11", type: t.testimonials.t2type },
    { name: t.testimonials.t3name, location: t.testimonials.t3loc, rating: 5, text: t.testimonials.t3text, date: "2026-01", type: t.testimonials.t3type },
  ];

  return (
    <section id="testimonials" className="relative py-32 bg-ultramarine-dark/50">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-orange uppercase">
            {t.testimonials.phase}
          </span>
          <h2 className="font-inter font-black text-4xl sm:text-5xl md:text-6xl text-foreground uppercase mt-4 tracking-tight">
            {t.testimonials.heading1}<br />
            <span className="text-orange">{t.testimonials.heading2}</span>
          </h2>
          <div className="w-16 h-1 bg-orange mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-muted/50 border border-border rounded p-8 group hover:border-orange/30 transition-all duration-500"
            >
              <Quote className="w-8 h-8 text-orange/20 mb-4" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={idx} className="w-3.5 h-3.5 fill-orange text-orange" />
                ))}
              </div>
              <p className="font-inter text-sm text-foreground/80 leading-relaxed mb-6">
                "{item.text}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-inter font-bold text-sm text-foreground">{item.name}</p>
                <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase mt-1">
                  {item.location}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-mono text-[10px] tracking-wider text-orange">{item.type}</span>
                  <span className="font-mono text-[10px] tracking-wider text-muted-foreground">{item.date}</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-orange transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}