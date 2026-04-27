import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageContext";

export default function HeroSection({ heroImage }) {
  const { t } = useLanguage();

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Professional moving truck at loading bay with cinematic blue and orange lighting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ultramarine-dark/95 via-ultramarine/85 to-ultramarine-dark/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ultramarine-dark via-transparent to-transparent" />
      </div>

      {/* Velocity Line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 h-px bg-gradient-to-r from-transparent via-orange to-transparent opacity-40"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="max-w-4xl">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-orange animate-pulse" />
            <span className="font-mono text-xs tracking-[0.3em] text-orange uppercase">
              {t.hero.status}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-inter font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] text-foreground uppercase leading-[0.9] tracking-tight"
          >
            {t.hero.headline1}
            <br />
            <span className="text-orange">{t.hero.headline2}</span>
            <br />
            {t.hero.headline3}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-inter text-lg md:text-xl text-foreground/70 mt-8 max-w-xl leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <Button
              onClick={() => scrollTo("#contact")}
              className="bg-orange hover:bg-orange-dark text-white font-inter font-bold text-sm tracking-wider uppercase h-14 px-8 rounded group"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollTo("#services")}
              variant="outline"
              className="border-foreground/20 text-foreground hover:bg-foreground/5 font-inter font-semibold text-sm tracking-wider uppercase h-14 px-8 rounded"
            >
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="grid grid-cols-3 gap-6 mt-16 max-w-lg"
          >
            {[
              { icon: MapPin, label: t.hero.stat1, value: "2,500+" },
              { icon: Clock, label: t.hero.stat2, value: "8+" },
              { icon: Shield, label: t.hero.stat3, value: "$50M+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <stat.icon className="w-4 h-4 text-orange mb-2 mx-auto sm:mx-0" />
                <p className="font-inter font-black text-2xl text-foreground">{stat.value}</p>
                <p className="font-mono text-[10px] tracking-wider text-foreground/50 uppercase mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-widest text-foreground/30 uppercase">{t.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-orange/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}