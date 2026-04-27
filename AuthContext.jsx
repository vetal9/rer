import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckSquare, Square, Phone, Mail, Calendar, FileText, DollarSign, Trash2, User, Send, MessageCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



const CHECKLIST_KEYS = ["quote_sent", "deposit_received", "crew_assigned", "truck_booked", "client_confirmed"];
const TELEGRAM_BOT_TOKEN = ""; // Set your Telegram bot token here
const TELEGRAM_CHAT_ID = "";   // Set your Telegram chat ID here

export default function RequestDetailModal({
  request, onClose, onStatusChange, onChecklistUpdate, onNotesUpdate, onPriceUpdate, onDelete, t
}) {
  const [notes, setNotes] = useState(request.notes || "");
  const [price, setPrice] = useState(request.estimated_price || "");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [sendingTg, setSendingTg] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [tgSent, setTgSent] = useState(false);
  const checklist = request.checklist || {};

  useEffect(() => {
    setNotes(request.notes || "");
    setPrice(request.estimated_price || "");
    setEmailSent(false);
    setTgSent(false);
  }, [request.id]);

  const handleCheckToggle = (key) => {
    const updated = { ...checklist, [key]: !checklist[key] };
    onChecklistUpdate(request.id, updated);
  };

  const handleNotesSave = () => onNotesUpdate(request.id, notes);

  const handlePriceSave = () => {
    const val = parseFloat(price);
    if (!isNaN(val)) onPriceUpdate(request.id, val);
  };

  const buildSummary = () => {
    const lines = [
      `👤 Client: ${request.name}`,
      request.phone ? `📞 Phone: ${request.phone}` : null,
      request.email ? `📧 Email: ${request.email}` : null,
      request.move_type ? `📦 Type: ${t.types[request.move_type] || request.move_type}` : null,
      request.move_date ? `📅 Date: ${request.move_date}` : null,
      request.estimated_price ? `💰 Price: $${request.estimated_price.toLocaleString()} CAD` : null,
      request.origin ? `📍 From: ${request.origin}` : null,
      request.destination ? `📍 To: ${request.destination}` : null,
      request.details ? `📝 Details: ${request.details}` : null,
      `🏷 Status: ${t.statuses[request.status] || request.status}`,
      notes ? `🗒 Notes: ${notes}` : null,
    ].filter(Boolean).join("\n");
    return lines;
  };

  const handleSendEmail = async () => {
    if (!request.email) {
      alert("No client email address found for this request.");
      return;
    }
    setSendingEmail(true);
    try {
      const res = await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: request.name,
          email: request.email,
          phone: request.phone,
          move_type: request.move_type,
          move_date: request.move_date,
          details: request.details,
          origin: request.origin,
          destination: request.destination,
          estimated_price: request.estimated_price,
          status: request.status,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send email");
      }
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 4000);
    } catch (err) {
      alert("Failed to send email: " + err.message);
    }
    setSendingEmail(false);
  };

  const handleSendTelegram = async () => {
    setSendingTg(true);
    const text = `🚚 *Kostas Moving — Request*\n\n${buildSummary()}`;
    // Use LLM integration to format and send; or simply open Telegram with pre-filled message
    // Since backend functions require Builder+, we open Telegram web with encoded message
    const encoded = encodeURIComponent(text.replace(/[*_`[\]()~>#+=|{}.!-]/g, "\\$&"));
    window.open(`https://t.me/share/url?url=&text=${encodeURIComponent(text)}`, "_blank");
    setSendingTg(false);
    setTgSent(true);
    setTimeout(() => setTgSent(false), 3000);
  };

  const doneCount = CHECKLIST_KEYS.filter(k => checklist[k]).length;

  const STATUSES = [
    { id: "new", label: t.statuses.new, color: "#60a5fa" },
    { id: "confirmed", label: t.statuses.confirmed, color: "#34d399" },
    { id: "in_progress", label: t.statuses.in_progress, color: "#fb923c" },
    { id: "completed", label: t.statuses.completed, color: "#c084fc" },
    { id: "cancelled", label: t.statuses.cancelled, color: "#f87171" },
  ];

  const currentStatus = STATUSES.find(s => s.id === request.status);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl"
        style={{ background: "linear-gradient(145deg, rgba(15,20,40,0.98) 0%, rgba(8,12,25,0.98) 100%)", boxShadow: "0 0 80px rgba(255,79,0,0.1), 0 40px 80px rgba(0,0,0,0.6)" }}
      >
        {/* Ambient top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${currentStatus?.color}20, transparent 70%)` }} />

        {/* Header */}
        <div className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between border-b border-white/5 rounded-t-3xl"
          style={{ background: "rgba(8,12,25,0.95)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(255,79,0,0.12)", border: "1px solid rgba(255,79,0,0.2)" }}>
              <User className="w-5 h-5 text-orange-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2"
                style={{ background: currentStatus?.color, borderColor: "rgba(8,12,25,1)" }} />
            </div>
            <div>
              <h2 className="font-inter font-black text-lg text-white leading-none">{request.name}</h2>
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
                {t.request} #{request.id?.slice(-6).toUpperCase()}
              </span>
            </div>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <X className="w-4 h-4 text-white/50" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Status */}
          <div>
            <label className="font-mono text-[9px] tracking-[0.3em] uppercase block mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>{t.status}</label>
            <Select value={request.status} onValueChange={v => onStatusChange(request.id, v)}>
              <SelectTrigger className="h-11 border-white/10 text-white" style={{ background: "rgba(255,255,255,0.05)" }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ background: "rgba(15,20,40,0.98)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {STATUSES.map(s => (
                  <SelectItem key={s.id} value={s.id}>
                    <span style={{ color: s.color }}>{s.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Client info */}
          <div className="rounded-2xl p-4 border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-3.5 h-3.5 text-orange-400" />
              <span className="font-mono text-[9px] tracking-[0.3em] text-orange-400 uppercase">{t.clientData}</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: Phone, label: t.phone, value: request.phone, color: "#60a5fa" },
                { icon: Mail, label: t.email, value: request.email, color: "#34d399" },
                { icon: Calendar, label: t.moveDate, value: request.move_date, color: "#fb923c" },
                { icon: FileText, label: t.moveType, value: t.types?.[request.move_type] || request.move_type, color: "#c084fc" },
              ].map(item => item.value ? (
                <div key={item.label} className="flex items-start gap-2.5 p-2.5 rounded-xl border border-white/5"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}18` }}>
                    <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>{item.label}</p>
                    <p className="font-inter text-sm text-white/80 mt-0.5">{item.value}</p>
                  </div>
                </div>
              ) : null)}
            </div>
            {request.details && (
              <div className="mt-3 pt-3 border-t border-white/5">
                <p className="font-mono text-[9px] tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>{t.details}</p>
                <p className="font-inter text-sm text-white/60 leading-relaxed">{request.details}</p>
              </div>
            )}
          </div>

          {/* Send buttons */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSendEmail}
              disabled={sendingEmail}
              className="flex items-center justify-center gap-2 h-12 rounded-2xl font-mono text-xs tracking-widest uppercase transition-all"
              style={{
                background: emailSent ? "rgba(52,211,153,0.15)" : "rgba(96,165,250,0.12)",
                border: emailSent ? "1px solid rgba(52,211,153,0.4)" : "1px solid rgba(96,165,250,0.25)",
                color: emailSent ? "#34d399" : "#60a5fa",
                boxShadow: emailSent ? "0 0 20px rgba(52,211,153,0.2)" : "none",
              }}
            >
              {sendingEmail ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Mail className="w-4 h-4" />
              )}
              {emailSent ? "✓ Sent!" : "Send Email"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSendTelegram}
              disabled={sendingTg}
              className="flex items-center justify-center gap-2 h-12 rounded-2xl font-mono text-xs tracking-widest uppercase transition-all"
              style={{
                background: tgSent ? "rgba(52,211,153,0.15)" : "rgba(38,176,235,0.12)",
                border: tgSent ? "1px solid rgba(52,211,153,0.4)" : "1px solid rgba(38,176,235,0.25)",
                color: tgSent ? "#34d399" : "#26b0eb",
                boxShadow: tgSent ? "0 0 20px rgba(52,211,153,0.2)" : "0 0 20px rgba(38,176,235,0.1)",
              }}
            >
              {sendingTg ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <MessageCircle className="w-4 h-4" />
              )}
              {tgSent ? "✓ Sent!" : "Telegram"}
            </motion.button>
          </div>

          {/* Checklist */}
          <div className="rounded-2xl p-4 border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>{t.checklist}</span>
              <span className="font-mono text-[9px]" style={{ color: doneCount === CHECKLIST_KEYS.length ? "#34d399" : "#fb923c" }}>
                {doneCount}/{CHECKLIST_KEYS.length} {t.done}
              </span>
            </div>
            {/* Progress */}
            <div className="h-1.5 rounded-full mb-4 overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(doneCount / CHECKLIST_KEYS.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ background: doneCount === CHECKLIST_KEYS.length
                  ? "linear-gradient(90deg, #34d399, #10b981)"
                  : "linear-gradient(90deg, #FF4F00, #fb923c)" }}
              />
            </div>
            <div className="space-y-2">
              {CHECKLIST_KEYS.map(key => (
                <motion.button key={key} onClick={() => handleCheckToggle(key)} whileHover={{ x: 2 }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200"
                  style={{
                    background: checklist[key] ? "rgba(52,211,153,0.08)" : "rgba(255,255,255,0.02)",
                    borderColor: checklist[key] ? "rgba(52,211,153,0.25)" : "rgba(255,255,255,0.05)",
                  }}>
                  {checklist[key]
                    ? <CheckSquare className="w-4 h-4 flex-shrink-0" style={{ color: "#34d399" }} />
                    : <Square className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(255,255,255,0.2)" }} />}
                  <span className="font-inter text-sm" style={{ color: checklist[key] ? "rgba(52,211,153,0.7)" : "rgba(255,255,255,0.7)", textDecoration: checklist[key] ? "line-through" : "none" }}>
                    {t.checklistItems[key]}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="font-mono text-[9px] tracking-[0.3em] uppercase block mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>{t.price}</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#FF4F00" }} />
                <Input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="0"
                  className="pl-9 h-11 font-mono border-white/10 text-white"
                  style={{ background: "rgba(255,255,255,0.04)" }} />
              </div>
              <Button onClick={handlePriceSave}
                className="h-11 px-5 font-mono text-xs tracking-widest uppercase"
                style={{ background: "rgba(255,79,0,0.15)", border: "1px solid rgba(255,79,0,0.3)", color: "#FF4F00" }}>
                {t.save}
              </Button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="font-mono text-[9px] tracking-[0.3em] uppercase block mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>{t.notes}</label>
            <Textarea value={notes} onChange={e => setNotes(e.target.value)} onBlur={handleNotesSave}
              placeholder={t.notesPlaceholder}
              className="border-white/10 text-white/70 font-inter text-sm resize-none min-h-[90px]"
              style={{ background: "rgba(255,255,255,0.03)" }} />
          </div>

          {/* Delete */}
          <div className="pt-2 border-t border-white/5">
            <AnimatePresence mode="wait">
              {confirmDelete ? (
                <motion.div key="confirm" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                  className="flex gap-2">
                  <Button variant="destructive" onClick={() => onDelete(request.id)} className="flex-1 h-10 text-sm font-mono tracking-widest uppercase">
                    {t.confirmDelete}
                  </Button>
                  <Button onClick={() => setConfirmDelete(false)} className="h-10 px-4 font-mono text-xs"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
                    {t.cancel}
                  </Button>
                </motion.div>
              ) : (
                <motion.button key="delete" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={() => setConfirmDelete(true)}
                  className="flex items-center gap-2 h-10 px-4 rounded-lg font-mono text-xs tracking-widest uppercase transition-all hover:opacity-80"
                  style={{ color: "rgba(248,113,113,0.5)", border: "1px solid transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(248,113,113,0.08)"; e.currentTarget.style.borderColor = "rgba(248,113,113,0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}>
                  <Trash2 className="w-3.5 h-3.5" />
                  {t.delete}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}