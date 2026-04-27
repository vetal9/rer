import React from "react";
import { motion } from "framer-motion";
import { Calendar, Phone, Mail, GripVertical, CheckSquare, Square, MapPin } from "lucide-react";

const TYPE_COLORS = {
  residential: { bg: "rgba(96,165,250,0.1)", text: "#60a5fa", border: "rgba(96,165,250,0.3)" },
  commercial: { bg: "rgba(52,211,153,0.1)", text: "#34d399", border: "rgba(52,211,153,0.3)" },
  long_distance: { bg: "rgba(251,146,60,0.1)", text: "#fb923c", border: "rgba(251,146,60,0.3)" },
  storage: { bg: "rgba(192,132,252,0.1)", text: "#c084fc", border: "rgba(192,132,252,0.3)" },
};

const TYPE_LABELS = {
  residential: "Residential",
  commercial: "Commercial",
  long_distance: "Long Dist.",
  storage: "Storage",
};

const CHECKLIST_KEYS = ["quote_sent", "deposit_received", "crew_assigned", "truck_booked", "client_confirmed"];

export default function RequestCard({ request, isDragging, onDragStart, onDragEnd, onClick, onChecklistUpdate, t }) {
  const checklist = request.checklist || {};
  const doneCount = CHECKLIST_KEYS.filter(k => checklist[k]).length;
  const total = CHECKLIST_KEYS.length;
  const progress = (doneCount / total) * 100;

  const typeStyle = TYPE_COLORS[request.move_type] || { bg: "rgba(255,255,255,0.05)", text: "#fff", border: "rgba(255,255,255,0.1)" };

  const checklistLabels = t?.modal?.checklistItems || {};

  const handleCheck = (e, key) => {
    e.stopPropagation();
    const updated = { ...checklist, [key]: !checklist[key] };
    onChecklistUpdate(request.id, updated);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: isDragging ? 0.3 : 1, y: 0, scale: isDragging ? 0.97 : 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      draggable
      onDragStart={e => onDragStart(e, request.id)}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className="relative rounded-xl border border-white/8 cursor-pointer group select-none overflow-hidden transition-all duration-200 hover:border-orange-500/40"
      style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)" }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(255,79,0,0.15)" }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,79,0,0.08), transparent 70%)" }} />

      {/* Top accent line */}
      {request.estimated_price && (
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,79,0,0.6), transparent)" }} />
      )}

      <div className="p-3 relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <GripVertical className="w-3.5 h-3.5 text-white/20 flex-shrink-0 group-hover:text-orange-400/50 transition-colors" />
            <span className="font-inter font-semibold text-sm text-white truncate">{request.name}</span>
          </div>
          {request.move_type && (
            <span className="text-[9px] font-mono tracking-wider flex-shrink-0 px-2 py-0.5 rounded-full border"
              style={{ background: typeStyle.bg, color: typeStyle.text, borderColor: typeStyle.border }}>
              {TYPE_LABELS[request.move_type] || request.move_type}
            </span>
          )}
        </div>

        {/* Contact */}
        <div className="space-y-1 mb-3">
          {request.phone && (
            <div className="flex items-center gap-1.5 text-[11px] text-white/40">
              <Phone className="w-3 h-3 flex-shrink-0" />
              <span className="font-mono">{request.phone}</span>
            </div>
          )}
          {request.email && (
            <div className="flex items-center gap-1.5 text-[11px] text-white/40 truncate">
              <Mail className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{request.email}</span>
            </div>
          )}
          {request.move_date && (
            <div className="flex items-center gap-1.5 text-[11px] text-white/40">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              <span className="font-mono">{request.move_date}</span>
            </div>
          )}
        </div>

        {/* Checklist mini */}
        <div className="border-t border-white/5 pt-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[9px] tracking-widest text-white/25 uppercase">{t?.card?.checklist || "Checklist"}</span>
            <span className="font-mono text-[9px]" style={{ color: doneCount === total ? "#34d399" : "#FB923C" }}>{doneCount}/{total}</span>
          </div>
          <div className="flex gap-1 mb-2">
            {CHECKLIST_KEYS.map(key => (
              <button key={key} onClick={e => handleCheck(e, key)} title={checklistLabels[key]}
                className="flex-1 h-1.5 rounded-full transition-all duration-300"
                style={{ background: checklist[key] ? "#34d399" : "rgba(255,255,255,0.08)" }}
              />
            ))}
          </div>
        </div>

        {request.estimated_price && (
          <div className="mt-2 text-right">
            <span className="font-mono text-xs font-black" style={{ color: "#FF4F00" }}>
              ${request.estimated_price.toLocaleString()} CAD
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}