import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, CheckCircle2, Truck, Star, DollarSign } from "lucide-react";

export default function AdminStats({ requests, t }) {
  const total = requests.length;
  const confirmed = requests.filter(r => r.status === "confirmed").length;
  const inProgress = requests.filter(r => r.status === "in_progress").length;
  const completed = requests.filter(r => r.status === "completed").length;
  const totalRevenue = requests
    .filter(r => r.estimated_price && r.status !== "cancelled")
    .reduce((acc, r) => acc + (r.estimated_price || 0), 0);

  const stats = [
    { label: t.total, value: total, icon: ClipboardList, color: "#60a5fa", glow: "rgba(96,165,250,0.15)" },
    { label: t.confirmed, value: confirmed, icon: CheckCircle2, color: "#34d399", glow: "rgba(52,211,153,0.15)" },
    { label: t.inProgress, value: inProgress, icon: Truck, color: "#fb923c", glow: "rgba(251,146,60,0.15)" },
    { label: t.completed, value: completed, icon: Star, color: "#c084fc", glow: "rgba(192,132,252,0.15)" },
    { label: t.revenue, value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "#FF4F00", glow: "rgba(255,79,0,0.15)" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-2">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.08, type: "spring", damping: 20 }}
          className="relative rounded-2xl border border-white/5 overflow-hidden p-4 flex items-center gap-3 group hover:scale-[1.03] transition-transform duration-200"
          style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}
        >
          {/* glow bg */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `radial-gradient(ellipse at 30% 50%, ${s.glow}, transparent 70%)` }} />

          <div className="relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: s.glow, boxShadow: `0 0 20px ${s.glow}` }}>
            <s.icon className="w-5 h-5" style={{ color: s.color }} />
          </div>
          <div className="relative min-w-0">
            <p className="font-mono text-[9px] tracking-widest text-white/40 uppercase leading-none mb-1 truncate">{s.label}</p>
            <p className="font-inter font-black text-xl leading-none" style={{ color: s.color }}>{s.value}</p>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px opacity-50"
            style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
        </motion.div>
      ))}
    </div>
  );
}