import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageContext";

const navHrefs = ["#services", "#process", "#about", "#testimonials", "#contact"];

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLabels = [
    t.nav.services,
    t.nav.process,
    t.nav.about,
    t.nav.testimonials,
    t.nav.contact,
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ultramarine-dark/95 backdrop-blur-md border-b border-orange/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange rounded flex items-center justify-center">
                <span className="text-white font-inter font-black text-xl">K</span>
              </div>
              <div className="hidden sm:block">
                <p className="font-inter font-bold text-foreground text-sm tracking-wider uppercase">
                  Kostas
                </p>
                <p className="font-mono text-[10px] text-orange tracking-widest uppercase">
                  Déménagement
                </p>
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLabels.map((label, i) => (
                <button
                  key={label}
                  onClick={() => scrollTo(navHrefs[i])}
                  className="font-mono text-xs tracking-widest text-foreground/70 hover:text-orange transition-colors duration-300"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Right: Lang toggle + CTA + Mobile */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <div className="flex items-center border border-border rounded overflow-hidden">
                <button
                  onClick={() => setLang("fr")}
                  className={`font-mono text-[10px] tracking-wider px-3 py-1.5 transition-colors ${
                    lang === "fr"
                      ? "bg-orange text-white"
                      : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`font-mono text-[10px] tracking-wider px-3 py-1.5 transition-colors ${
                    lang === "en"
                      ? "bg-orange text-white"
                      : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  EN
                </button>
              </div>

              <a href="tel:5148850785" className="hidden md:flex items-center gap-2 text-orange font-mono text-xs">
                <Phone className="w-3.5 h-3.5" />
                <span>514-885-0785</span>
              </a>
              <Button
                onClick={() => scrollTo("#contact")}
                className="hidden sm:flex bg-orange hover:bg-orange-dark text-white font-inter font-semibold text-xs tracking-wider uppercase h-11 px-5 rounded"
              >
                {t.nav.getQuote}
              </Button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-foreground"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-ultramarine-dark/98 backdrop-blur-xl pt-24"
          >
            <div className="flex flex-col items-center gap-8 p-8">
              {/* Mobile Lang Toggle */}
              <div className="flex items-center border border-border rounded overflow-hidden">
                <button
                  onClick={() => setLang("fr")}
                  className={`font-mono text-sm tracking-wider px-6 py-2 transition-colors ${
                    lang === "fr" ? "bg-orange text-white" : "text-foreground/50"
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`font-mono text-sm tracking-wider px-6 py-2 transition-colors ${
                    lang === "en" ? "bg-orange text-white" : "text-foreground/50"
                  }`}
                >
                  EN
                </button>
              </div>

              {navLabels.map((label, i) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollTo(navHrefs[i])}
                  className="font-inter font-bold text-2xl text-foreground/90 hover:text-orange transition-colors"
                >
                  {label}
                </motion.button>
              ))}
              <Button
                onClick={() => scrollTo("#contact")}
                className="bg-orange hover:bg-orange-dark text-white font-inter font-bold text-lg h-14 px-10 rounded mt-4"
              >
                {t.nav.getQuote}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}