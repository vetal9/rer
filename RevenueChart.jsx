import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, PackageCheck, Truck, PartyPopper } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function ProcessSection() {
  const { t } = useLanguage();

  const steps = [
    { icon: ClipboardList, phase: "01", title: t.process.step1title, sub: t.process.step1sub, desc: t.process.step1desc },
    { icon: PackageCheck, phase: "02", title: t.process.step2title, sub: t.process.step2sub, desc: t.process.step2desc },
    { icon: Truck, phase: "03", title: t.process.step3title, sub: t.process.step3sub, desc: t.process.step3desc },
    { icon: PartyPopper, phase: "04", title: t.process.step4title, sub: t.process.step4sub, desc: t.process.step4desc },
  ];

  return (
    <section id="process" className="relative py-32 bg-ultramarine-dark/50">
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
            {t.process.phase}
          </span>
          <h2 className="font-inter font-black text-4xl sm:text-5xl md:text-6xl text-foreground uppercase mt-4 tracking-tight">
            {t.process.heading1}<br />
            <span className="text-orange">{t.process.heading2}</span>
          </h2>
          <div className="w-16 h-1 bg-orange mt-6" />
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-border" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                <div className="relative z-10 mb-8">
                  <div className="w-16 h-16 rounded-full border-2 border-orange/30 bg-background flex items-center justify-center mx-auto lg:mx-0">
                    <step.icon className="w-6 h-6 text-orange" />
                  </div>
                  <div className="absolute -top-2 -right-2 lg:right-auto lg:-left-2 w-7 h-7 rounded-full bg-orange flex items-center justify-center">
                    <span className="font-mono text-[10px] font-bold text-white">{step.phase}</span>
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                    {step.sub}
                  </span>
                  <h3 className="font-inter font-bold text-xl text-foreground uppercase mt-2 tracking-wide">
                    {step.title}
                  </h3>
                  <p className="font-inter text-sm text-muted-foreground leading-relaxed mt-3">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}