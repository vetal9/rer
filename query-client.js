import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Calendar, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const STATUS_CONFIG = {
  new: { label: "New", color: "#60a5fa", bg: "rgba(96,165,250,0.12)", border: "rgba(96,165,250,0.3)", dot: "bg-blue-400" },
  confirmed: { label: "Confirmed", color: "#34d399", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.3)", dot: "bg-emerald-400" },
  in_progress: { label: "In Progress", color: "#fb923c", bg: "rgba(251,146,60,0.12)", border: "rgba(251,146,60,0.3)", dot: "bg-orange-400" },
  completed: { label: "Completed", color: "#c084fc", bg: "rgba(192,132,252,0.12)", border: "rgba(192,132,252,0.3)", dot: "bg-purple-400" },
  cancelled: { label: "Cancelled", color: "#f87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.3)", dot: "bg-red-400" },
};

const TYPE_LABELS = {
  residential: "Residential",
  commercial: "Commercial",
  long_distance: "Long Dist.",
  storage: "Storage",
};

const FILTERS = ["all", "new", "confirmed", "in_progress", "completed", "cancelled"];

export default function MobileView({ requests, onSelectRequest, t }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = requests.filter(r => {
    const matchStatus = filter === "all" || r.status === filter;
    const matchSearch = !search ||
      r.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.phone?.includes(search) ||
      r.email?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, phone, email..."
            className="pl-10 h-11 text-sm border-white/10 text-white placeholder:text-white/25"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
        </div>
      </div>

      {/* Status filter pills */}
      <div className="px-4 pb-4 flex gap-2 overflow-x-auto scrollbar-none">
        {FILTERS.map(f => {
          const cfg = STATUS_CONFIG[f];
          const isActive = filter === f;
          const count = f === "all" ? requests.length : requests.filter(r => r.status === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all"
              style={{
                background: isActive ? (cfg?.bg || "rgba(255,79,0,0.15)") : "rgba(255,255,255,0.04)",
                border: `1px solid ${isActive ? (cfg?.border || "rgba(255,79,0,0.4)") : "rgba(255,255,255,0.08)"}`,
                color: isActive ? (cfg?.color || "#FF4F00") : "rgba(255,255,255,0.35)",
              }}
            >
              {f === "all" ? "All" : cfg?.label}
              <span className="font-bold">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Request list */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-6">
        <AnimatePresence>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-mono text-[10px] tracking-widest text-white/20 uppercase">No requests</p>
            </div>
          )}
          {filtered.map((req, i) => {
            const cfg = STATUS_CONFIG[req.status] || STATUS_CONFIG.new;
            return (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => onSelectRequest(req)}
                className="rounded-2xl border p-4 cursor-pointer transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-inter font-black text-sm"
                      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                      {req.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0">
                      <p className="font-inter font-semibold text-white text-sm leading-tight truncate">{req.name}</p>
                      {req.move_type && (
                        <p className="font-mono text-[9px] tracking-wider text-white/30 uppercase mt-0.5">
                          {TYPE_LABELS[req.move_type] || req.move_type}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {req.estimated_price && (
                      <span className="font-mono text-xs font-black" style={{ color: "#FF4F00" }}>
                        ${req.estimated_price.toLocaleString()}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-white/20" />
                  </div>
                </div>

                {/* Info row */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                  {req.phone && (
                    <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                      <Phone className="w-3 h-3" />
                      <span className="font-mono">{req.phone}</span>
                    </div>
                  )}
                  {req.move_date && (
                    <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                      <Calendar className="w-3 h-3" />
                      <span className="font-mono">{req.move_date}</span>
                    </div>
                  )}
                  {req.email && (
                    <div className="flex items-center gap-1.5 text-[11px] text-white/40 truncate max-w-full">
                      <Mail className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{req.email}</span>
                    </div>
                  )}
                </div>

                {/* Status badge + checklist */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full"
                    style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                    {cfg.label}
                  </span>
                  {req.checklist && (
                    <div className="flex items-center gap-1">
                      {["quote_sent", "deposit_received", "crew_assigned", "truck_booked", "client_confirmed"].map(k => (
                        <div key={k} className="w-4 h-1.5 rounded-full"
                          style={{ background: req.checklist[k] ? "#34d399" : "rgba(255,255,255,0.08)" }} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}