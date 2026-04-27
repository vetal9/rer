import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Globe, Clock, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoveRequest } from "@/lib/supabaseClient";
import { useLanguage } from "@/components/LanguageContext";

export default function ContactSection() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", move_type: "", move_date: "", details: "", origin: "", destination: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // 1. Save to Supabase
      await MoveRequest.create({ ...form, status: "new" });

      // 2. Send emails via Vercel API route
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send email");
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, label: t.contact.addr, value: t.contact.addrVal },
    { icon: Phone, label: t.contact.phone, value: t.contact.phoneVal, href: "tel:5148850785" },
    { icon: Mail, label: t.contact.email, value: t.contact.emailVal, href: `mailto:${t.contact.emailVal}` },
    { icon: Globe, label: t.contact.website, value: t.contact.websiteVal, href: `https://${t.contact.websiteVal}` },
    { icon: Clock, label: t.contact.hours, value: t.contact.hoursVal },
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-[10px] tracking-[4px] text-orange uppercase mb-4">{t.contact.phase}</p>
          <h2 className="font-inter font-black text-5xl md:text-6xl text-foreground leading-none">
            {t.contact.heading1}<br />
            <span className="text-gradient-orange">{t.contact.heading2}</span>
          </h2>
          <p className="text-muted-foreground font-inter text-base mt-6 max-w-xl">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                <div className="w-8 h-8 rounded bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-orange" />
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="font-inter text-sm text-foreground hover:text-orange transition-colors">{value}</a>
                  ) : (
                    <p className="font-inter text-sm text-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-card border border-border rounded-xl p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">{t.contact.formStatus}</span>
            </div>

            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="font-inter font-bold text-xl text-foreground mb-2">{t.contact.successTitle}</h3>
                <p className="font-inter text-muted-foreground text-sm mb-2">{t.contact.successText}</p>
                <p className="font-mono text-[10px] tracking-widest text-orange uppercase">{t.contact.successStatus}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase block mb-1.5">{t.contact.labelName}</label>
                    <Input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder={t.contact.placeName} className="bg-muted/30 border-border font-inter" />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase block mb-1.5">{t.contact.labelEmail}</label>
                    <Input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder={t.contact.placeEmail} className="bg-muted/30 border-border font-inter" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase block mb-1.5">{t.contact.labelPhone}</label>
                    <Input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder={t.contact.placePhone} className="bg-muted/30 border-border font-mono" />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase block mb-1.5">{t.contact.labelType}</label>
                    <Select value={form.move_type} onValueChange={v => setForm(f => ({ ...f, move_type: v }))}>
                      <SelectTrigger className="bg-muted/30 border-border"><SelectValue placeholder={t.contact.placeType} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">{t.contact.typeRes}</SelectItem>
                        <SelectItem value="commercial">{t.contact.typeCom}</SelectItem>
                        <SelectItem value="long_distance">{t.contact.typeLong}</SelectItem>
                        <SelectItem value="storage">{t.contact.typeStore}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase block mb-1.5">{t.contact.labelFrom || "From"}</label>
                    <Input value={form.origin} onChange={e => setForm(f => ({ ...f, origin: e.target.value }))} placeholder={t.contact.placeFrom || "Moving from..."} className="bg-muted/30 border-border font-inter" />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase block mb-1.5">{t.contact.labelTo || "To"}</label>
                    <Input value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))} placeholder={t.contact.placeTo || "Moving to..."} className="bg-muted/30 border-border font-inter" />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase block mb-1.5">{t.contact.labelDate}</label>
                  <Input type="date" value={form.move_date} onChange={e => setForm(f => ({ ...f, move_date: e.target.value }))} className="bg-muted/30 border-border font-mono" />
                </div>
                <div>
                  <label className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase block mb-1.5">{t.contact.labelDetails}</label>
                  <Textarea value={form.details} onChange={e => setForm(f => ({ ...f, details: e.target.value }))} placeholder={t.contact.placeDetails} className="bg-muted/30 border-border font-inter min-h-[100px] resize-none" />
                </div>
                {error && <p className="font-mono text-[10px] text-red-400 tracking-widest text-center">{error}</p>}
                <Button type="submit" disabled={loading} className="w-full bg-orange hover:bg-orange-dark text-white font-inter font-bold tracking-wider uppercase h-12 gap-2">
                  {loading ? "..." : t.contact.submit}
                  <Send className="w-4 h-4" />
                </Button>
                <p className="font-mono text-[9px] text-muted-foreground text-center tracking-widest">{t.contact.disclaimer}</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
