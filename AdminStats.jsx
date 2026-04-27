import React from "react";
import { motion } from "framer-motion";
import { Award, Users, TrendingUp, Star } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function AboutSection({ aboutImage }) {
  const { t } = useLanguage();

  const stats = [
    { icon: Award, value: "8+", label: t.about.stat1 },
    { icon: Users, value: "50+", label: t.about.stat2 },
    { icon: TrendingUp, value: "2,500+", label: t.about.stat3 },
    { icon: Star, value: "4.9", label: t.about.stat4 },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded overflow-hidden aspect-[16/10]">
              <img
                src={aboutImage}
                alt="Moving truck light trails at night creating orange streaks against deep blue sky"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ultramarine-dark/50 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-4 md:right-8 bg-orange rounded p-5 shadow-xl">
              <p className="font-inter font-black text-3xl text-white">8+</p>
              <p className="font-mono text-[10px] tracking-wider text-white/80 uppercase">
                {t.about.badge}
              </p>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-mono text-xs tracking-[0.3em] text-orange uppercase">
              {t.about.phase}
            </span>
            <h2 className="font-inter font-black text-4xl sm:text-5xl text-foreground uppercase mt-4 tracking-tight leading-[0.95]">
              {t.about.heading1}<br />
              <span className="text-orange">{t.about.heading2}</span>
            </h2>
            <div className="w-16 h-1 bg-orange mt-6 mb-8" />
            <p className="font-inter text-base text-foreground/70 leading-relaxed">{t.about.p1}</p>
            <p className="font-inter text-base text-foreground/70 leading-relaxed mt-4">{t.about.p2}</p>

            <div className="grid grid-cols-2 gap-6 mt-10">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-orange/10 flex items-center justify-center flex-shrink-0">
                    <stat.icon className="w-4 h-4 text-orange" />
                  </div>
                  <div>
                    <p className="font-inter font-black text-xl text-foreground">{stat.value}</p>
                    <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}