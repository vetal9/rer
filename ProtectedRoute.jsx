import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, MapPin, Phone, Mail, Globe } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function FooterSection() {
  const { t } = useLanguage();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const footerLinks = [
    { label: t.footer.services, href: "#services" },
    { label: t.footer.process, href: "#process" },
    { label: t.footer.about, href: "#about" },
    { label: t.footer.testimonials, href: "#testimonials" },
  ];

  return (
    <footer className="relative bg-ultramarine-dark border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange rounded flex items-center justify-center">
                <span className="text-white font-inter font-black text-2xl">K</span>
              </div>
              <div>
                <p className="font-inter font-bold text-foreground text-lg tracking-wider uppercase">Kostas</p>
                <p className="font-mono text-xs text-orange tracking-widest uppercase">Déménagement Moving</p>
              </div>
            </div>
            <p className="font-inter text-sm text-foreground/50 leading-relaxed">{t.footer.tagline}</p>
          </div>

          {/* Manifest Contact */}
          <div className="lg:text-right">
            <span className="font-mono text-[10px] tracking-[0.3em] text-orange uppercase block mb-4">
              {t.footer.manifestLabel}
            </span>
            <div className="space-y-3">
              {t.footer.addr && (
              <div className="flex items-center gap-3 lg:flex-row-reverse">
                <MapPin className="w-4 h-4 text-orange flex-shrink-0" />
                <span className="font-mono text-xs text-foreground/60">{t.footer.addr}</span>
              </div>
              )}
              <div className="flex items-center gap-3 lg:flex-row-reverse">
                <Phone className="w-4 h-4 text-orange flex-shrink-0" />
                <span className="font-mono text-xs text-foreground/60">{t.footer.phone}</span>
              </div>
              <div className="flex items-center gap-3 lg:flex-row-reverse">
                <Mail className="w-4 h-4 text-orange flex-shrink-0" />
                <span className="font-mono text-xs text-foreground/60">{t.footer.email}</span>
              </div>
              <div className="flex items-center gap-3 lg:flex-row-reverse">
                <Globe className="w-4 h-4 text-orange flex-shrink-0" />
                <a href="https://kostasmoving.ca" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-foreground/60 hover:text-orange transition-colors">{t.footer.websiteVal}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-12 pt-8 border-t border-border/50">
          {footerLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                const el = document.querySelector(link.href);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-mono text-xs tracking-widest text-foreground/40 hover:text-orange transition-colors uppercase text-left"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-border/50 gap-4">
          <p className="font-mono text-[10px] tracking-wider text-foreground/30">
            © {new Date().getFullYear()} KOSTAS DÉMÉNAGEMENT MOVING — {t.footer.rights}
          </p>
          <p className="font-mono text-[10px] tracking-wider text-foreground/30">{t.footer.permit}</p>
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-orange hover:bg-orange-dark rounded flex items-center justify-center shadow-lg shadow-orange/20 z-50 transition-colors"
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </motion.button>
    </footer>
  );
}