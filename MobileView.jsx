import React from "react";
import { motion } from "framer-motion";
import { Home, Building2, Package, Truck, Shield, Clock } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function ServicesSection({ images }) {
  const { t, lang } = useLanguage();

  const services = [
    { icon: Home, phase: "01", title: t.services.s1title, desc: t.services.s1desc },
    { icon: Building2, phase: "02", title: t.services.s2title, desc: t.services.s2desc },
    { icon: Package, phase: "03", title: t.services.s3title, desc: t.services.s3desc },
    { icon: Truck, phase: "04", title: t.services.s4title, desc: t.services.s4desc },
    { icon: Shield, phase: "05", title: t.services.s5title, desc: t.services.s5desc },
    { icon: Clock, phase: "06", title: t.services.s6title, desc: t.services.s6desc },
  ];

  const moveItems = [
    { src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80", label: lang === "fr" ? "Sofas & Canapés" : "Sofas & Couches" },
    { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", label: lang === "fr" ? "Mobilier de Salon" : "Living Room Furniture" },
    { src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", label: lang === "fr" ? "Cuisine & Électros" : "Kitchen & Appliances" },
    { src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80", label: lang === "fr" ? "Chambres à Coucher" : "Bedrooms" },
    { src: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=800&q=80", label: lang === "fr" ? "Réfrigérateurs" : "Refrigerators" },
    { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", label: lang === "fr" ? "Électroménagers" : "Appliances" },
  ];

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-orange uppercase">
            {t.services.phase}
          </span>
          <h2 className="font-inter font-black text-4xl sm:text-5xl md:text-6xl text-foreground uppercase mt-4 tracking-tight">
            {t.services.heading1}<br />
            <span className="text-orange">{t.services.heading2}</span>
          </h2>
          <div className="w-16 h-1 bg-orange mt-6" />
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
          {moveItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group overflow-hidden rounded aspect-[4/3]"
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ultramarine/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="font-mono text-xs tracking-widest text-orange uppercase text-center px-2">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Quote Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-20"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-orange hover:bg-orange/90 text-white font-inter font-bold text-sm tracking-widest uppercase px-10 py-5 rounded transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,100,0,0.3)] group"
          >
            {lang === "fr" ? "Demander un devis gratuit" : "Получить бесплатную смету"}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.phase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-muted/50 border border-border hover:border-orange/30 rounded p-8 transition-all duration-500 hover:bg-muted"
            >
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                SVC_{service.phase}
              </span>
              <div className="mt-4 mb-5">
                <div className="w-12 h-12 rounded bg-orange/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors">
                  <service.icon className="w-5 h-5 text-orange" />
                </div>
              </div>
              <h3 className="font-inter font-bold text-lg text-foreground uppercase tracking-wide">
                {service.title}
              </h3>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed mt-3">
                {service.desc}
              </p>
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-orange transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}