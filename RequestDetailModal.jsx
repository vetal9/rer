import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, ChevronRight, Phone } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoveRequest } from "@/lib/supabaseClient";
import { useLanguage } from "@/components/LanguageContext";

export default function FloatingQuoteWidget() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", move_type: "", move_date: "", details: "" });

  const label = lang === "fr" ? "Devis rapide" : "Quick Quote";
  const submitLabel = lang === "fr" ? "Envoyer" : "Send";
  const successTitle = lang === "fr" ? "Demande envoyée !" : "Request sent!";
  const successSub = lang === "fr" ? "Nous vous contacterons bientôt." : "We'll contact you shortly.";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await MoveRequest.create({ ...form, status: "new" });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
      {/* Tab button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 bg-orange text-white font-mono text-[11px] tracking-widest uppercase 
          px-4 py-6 rounded-r-2xl shadow-lg hover:bg-orange-dark transition-colors writing-mode-vertical
          ${open ? "rounded-r-none" : ""}`}
        style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        <Phone className="w-4 h-4 mb-2" style={{ transform: "rotate(90deg)" }} />
        {label}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="bg-card border border-border border-l-0 rounded-r-2xl shadow-2xl w-96 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-orange px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest text-white uppercase">{label}</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              {submitted ? (
                <div className="py-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                    <Send className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="font-inter font-bold text-sm text-foreground">{successTitle}</p>
                  <p className="font-inter text-xs text-muted-foreground mt-1">{successSub}</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", move_type: "", move_date: "", details: "" }); }}
                    className="mt-4 font-mono text-[10px] tracking-widest text-orange uppercase hover:underline"
                  >
                    {lang === "fr" ? "Nouvelle demande" : "New request"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="font-mono text-[9px] tracking-wider text-muted-foreground uppercase block mb-1">
                      {t.contact.labelName}
                    </label>
                    <Input
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder={t.contact.placeName}
                      className="bg-muted/30 border-border h-9 text-sm font-inter"
                    />
                  </div>
                  <div>
                     <label className="font-mono text-[9px] tracking-wider text-muted-foreground uppercase block mb-1">
                       {t.contact.labelEmail}
                     </label>
                     <Input
                       required
                       type="email"
                       value={form.email}
                       onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                       placeholder={t.contact.placeEmail}
                       className="bg-muted/30 border-border h-9 text-sm font-inter"
                     />
                   </div>
                   <div>
                     <label className="font-mono text-[9px] tracking-wider text-muted-foreground uppercase block mb-1">
                       {t.contact.labelPhone}
                     </label>
                    <Input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder={t.contact.placePhone}
                      className="bg-muted/30 border-border h-9 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] tracking-wider text-muted-foreground uppercase block mb-1">
                      {t.contact.labelType}
                    </label>
                    <Select value={form.move_type} onValueChange={v => setForm(f => ({ ...f, move_type: v }))}>
                      <SelectTrigger className="bg-muted/30 border-border h-9 text-sm">
                        <SelectValue placeholder={t.contact.placeType} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">{t.contact.typeRes}</SelectItem>
                        <SelectItem value="commercial">{t.contact.typeCom}</SelectItem>
                        <SelectItem value="long_distance">{t.contact.typeLong}</SelectItem>
                        <SelectItem value="storage">{t.contact.typeStore}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="font-mono text-[9px] tracking-wider text-muted-foreground uppercase block mb-1">
                      {t.contact.labelDate}
                    </label>
                    <Input
                      type="date"
                      value={form.move_date}
                      onChange={e => setForm(f => ({ ...f, move_date: e.target.value }))}
                      className="bg-muted/30 border-border h-9 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] tracking-wider text-muted-foreground uppercase block mb-1">
                      {lang === "fr" ? "Détails" : "Details"}
                    </label>
                    <Textarea
                      value={form.details}
                      onChange={e => setForm(f => ({ ...f, details: e.target.value }))}
                      placeholder={lang === "fr" ? "Origine, destination, articles spéciaux..." : "Origin, destination, special items..."}
                      className="bg-muted/30 border-border text-sm font-inter min-h-[70px] resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange hover:bg-orange-dark text-white font-inter font-bold text-xs tracking-wider uppercase h-10 gap-2"
                  >
                    {loading ? "..." : submitLabel}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <p className="font-mono text-[9px] text-muted-foreground text-center tracking-wider">
                    {t.contact.disclaimer}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}