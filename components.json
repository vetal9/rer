import React, { useState, useEffect } from "react";
import { MoveRequest } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import RequestCard from "@/components/admin/RequestCard";
import RequestDetailModal from "@/components/admin/RequestDetailModal";
import AdminStats from "@/components/admin/AdminStats";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw, Zap, Lock, Eye, EyeOff, Monitor, Smartphone, Download, BarChart2, Calendar } from "lucide-react";
import { adminT } from "@/components/admin/adminTranslations";
import MobileView from "@/components/admin/MobileView";
import RevenueChart from "@/components/admin/RevenueChart";

const ADMIN_PASSWORD = "Kostas2024!";

function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "1");
      onLogin();
    } else {
      setError(true);
      setPw("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "radial-gradient(ellipse at 20% 0%, #0d1a3a 0%, #050a14 60%, #000 100%)" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/8 rounded-full blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", damping: 22 }}
        className="relative w-full max-w-sm mx-4"
      >
        <div className="rounded-3xl border border-white/10 p-8"
          style={{ background: "rgba(15,20,40,0.95)", boxShadow: "0 0 80px rgba(255,79,0,0.08), 0 40px 80px rgba(0,0,0,0.5)" }}>
          {/* Icon */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-500/30 mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <p className="font-mono text-xs tracking-[0.3em] text-white/80 uppercase font-bold">Kostas Admin</p>
            <p className="font-mono text-[10px] text-white/30 tracking-widest mt-1">MovePlanner Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase block mb-2">
                <Lock className="inline w-3 h-3 mr-1 -mt-0.5" />Password
              </label>
              <div className="relative">
                <Input
                  type={show ? "text" : "password"}
                  value={pw}
                  onChange={e => setPw(e.target.value)}
                  placeholder="Enter admin password"
                  className="h-12 font-mono text-sm border-white/10 text-white pr-10"
                  style={{ background: error ? "rgba(248,113,113,0.08)" : "rgba(255,255,255,0.05)", borderColor: error ? "rgba(248,113,113,0.4)" : undefined, transition: "all 0.2s" }}
                  autoFocus
                />
                <button type="button" onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <AnimatePresence>
                {error && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="font-mono text-[10px] text-red-400 mt-1.5 tracking-wider">
                    ✗ Incorrect password
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <Button type="submit"
              className="w-full h-12 font-mono text-xs tracking-widest uppercase"
              style={{ background: "linear-gradient(135deg, #FF4F00, #CC3F00)", border: "none", boxShadow: "0 0 30px rgba(255,79,0,0.3)" }}>
              Access Dashboard →
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="font-mono text-[10px] tracking-widest text-white/20 hover:text-orange-400 transition-colors uppercase">
              ← Back to site
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_auth") === "1");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const [lang, setLang] = useState("en");
  const [viewMode, setViewMode] = useState("desktop"); // "desktop" | "mobile" | "analytics"
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);

  const t = adminT[lang];

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Move Type", "Move Date", "Origin", "Destination", "Status", "Estimated Price", "Notes", "Created Date"];
    const rows = requests.map(r => [
      r.name || "", r.email || "", r.phone || "", r.move_type || "",
      r.move_date || "", r.origin || "", r.destination || "",
      r.status || "", r.estimated_price || "", r.notes || "",
      r.created_date ? new Date(r.created_date).toLocaleDateString() : ""
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `kostas-requests-${new Date().toISOString().slice(0,10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await MoveRequest.list("-created_date", 200);
      setRequests(data);
    } catch (err) {
      console.error("Supabase error:", err);
      alert("Ошибка загрузки данных: " + (err.message || JSON.stringify(err)));
    }
    setLoading(false);
  };

  useEffect(() => { fetchRequests(); }, []);

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const COLUMNS = [
    { id: "new", label: t.columns.new, color: "text-blue-400", glow: "shadow-blue-500/20", border: "border-blue-500/30", bg: "bg-blue-500/5", headerBg: "bg-gradient-to-r from-blue-500/20 to-blue-500/5", dot: "bg-blue-400" },
    { id: "confirmed", label: t.columns.confirmed, color: "text-emerald-400", glow: "shadow-emerald-500/20", border: "border-emerald-500/30", bg: "bg-emerald-500/5", headerBg: "bg-gradient-to-r from-emerald-500/20 to-emerald-500/5", dot: "bg-emerald-400" },
    { id: "in_progress", label: t.columns.in_progress, color: "text-orange-400", glow: "shadow-orange-500/20", border: "border-orange-500/30", bg: "bg-orange-500/5", headerBg: "bg-gradient-to-r from-orange-500/20 to-orange-500/5", dot: "bg-orange-400" },
    { id: "completed", label: t.columns.completed, color: "text-purple-400", glow: "shadow-purple-500/20", border: "border-purple-500/30", bg: "bg-purple-500/5", headerBg: "bg-gradient-to-r from-purple-500/20 to-purple-500/5", dot: "bg-purple-400" },
    { id: "cancelled", label: t.columns.cancelled, color: "text-red-400", glow: "shadow-red-500/20", border: "border-red-500/30", bg: "bg-red-500/5", headerBg: "bg-gradient-to-r from-red-500/20 to-red-500/5", dot: "bg-red-400" },
  ];

  const handleDragStart = (e, id) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOver(colId);
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    setDragOver(null);
    setDraggingId(null);
    if (!id) return;
    const req = requests.find(r => r.id === id);
    if (!req || req.status === newStatus) return;
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    await MoveRequest.update(id, { status: newStatus });
  };

  const handleStatusChange = async (id, newStatus) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    await MoveRequest.update(id, { status: newStatus });
    if (selectedRequest?.id === id) setSelectedRequest(prev => ({ ...prev, status: newStatus }));
  };

  const handleChecklistUpdate = async (id, checklist) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, checklist } : r));
    await MoveRequest.update(id, { checklist });
    if (selectedRequest?.id === id) setSelectedRequest(prev => ({ ...prev, checklist }));
  };

  const handleNotesUpdate = async (id, notes) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, notes } : r));
    await MoveRequest.update(id, { notes });
  };

  const handlePriceUpdate = async (id, estimated_price) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, estimated_price } : r));
    await MoveRequest.update(id, { estimated_price });
  };

  const handleDelete = async (id) => {
    await MoveRequest.delete(id);
    setRequests(prev => prev.filter(r => r.id !== id));
    setSelectedRequest(null);
  };

  const filtered = requests.filter(r => {
    const matchSearch = !search ||
      r.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.email?.toLowerCase().includes(search.toLowerCase()) ||
      r.phone?.includes(search);
    const d = r.created_date ? new Date(r.created_date) : null;
    const matchFrom = !dateFrom || (d && d >= new Date(dateFrom));
    const matchTo = !dateTo || (d && d <= new Date(dateTo + "T23:59:59"));
    return matchSearch && matchFrom && matchTo;
  });

  const grouped = COLUMNS.reduce((acc, col) => {
    acc[col.id] = filtered.filter(r => r.status === col.id);
    return acc;
  }, {});

  return (
    <div className="min-h-screen text-foreground" style={{ background: "radial-gradient(ellipse at 20% 0%, #0d1a3a 0%, #050a14 60%, #000 100%)" }}>

      {/* Ambient glow orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-orange-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/8 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-white/5" style={{ background: "rgba(5,10,20,0.85)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-[1800px] mx-auto px-3 sm:px-6 py-3 flex items-center gap-2 sm:gap-4">
          {/* Logo area */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-background animate-pulse" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-white/90 uppercase font-bold leading-none">{t.panel}</p>
              <p className="font-mono text-[9px] text-white/30 tracking-widest mt-0.5 hidden sm:block">{t.subtitle}</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative flex-1 sm:w-72 sm:flex-none max-w-[180px] sm:max-w-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder={t.search}
              className="pl-9 h-9 text-sm font-inter border-white/10 text-white placeholder:text-white/25"
              style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>

          {/* Lang switcher */}
          <div className="flex items-center rounded-lg overflow-hidden border border-white/10 bg-white/5 flex-shrink-0">
            {["en", "fr"].map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`px-2 sm:px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-all
                  ${lang === l ? "bg-orange-500 text-white shadow-inner" : "text-white/40 hover:text-white/70"}`}>
                {l}
              </button>
            ))}
          </div>

          {/* Date filter */}
          <div className="relative flex-shrink-0">
            <button onClick={() => setShowDateFilter(s => !s)}
              className={`p-2 rounded-lg border transition-all ${(dateFrom || dateTo) ? "border-orange-500 text-orange-400 bg-orange-500/10" : "border-white/10 text-white/40 hover:text-white/70 bg-white/5"}`}
              title="Filter by date">
              <Calendar className="w-3.5 h-3.5" />
            </button>
            {showDateFilter && (
              <div className="absolute right-0 top-11 z-50 rounded-xl border border-white/10 p-4 flex flex-col gap-2 min-w-[220px]"
                style={{ background: "rgba(10,15,30,0.98)" }}>
                <p className="font-mono text-[9px] tracking-widest text-white/40 uppercase mb-1">Date Range</p>
                <div className="flex flex-col gap-2">
                  <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
                    className="h-8 px-2 rounded-md bg-white/5 border border-white/10 text-white text-xs font-mono" />
                  <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
                    className="h-8 px-2 rounded-md bg-white/5 border border-white/10 text-white text-xs font-mono" />
                </div>
                {(dateFrom || dateTo) && (
                  <button onClick={() => { setDateFrom(""); setDateTo(""); }}
                    className="font-mono text-[9px] tracking-widest text-orange-400 hover:text-orange-300 uppercase mt-1">
                    Clear filter ×
                  </button>
                )}
              </div>
            )}
          </div>

          {/* CSV Export */}
          <button onClick={exportCSV}
            className="p-2 rounded-lg border border-white/10 bg-white/5 text-white/40 hover:text-emerald-400 hover:border-emerald-500/40 transition-all flex-shrink-0"
            title="Export CSV">
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* View mode toggle */}
          <div className="flex items-center rounded-lg overflow-hidden border border-white/10 bg-white/5 flex-shrink-0">
            <button onClick={() => setViewMode("desktop")}
              className={`p-2 transition-all ${viewMode === "desktop" ? "bg-orange-500 text-white" : "text-white/40 hover:text-white/70"}`}
              title="Desktop view">
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setViewMode("mobile")}
              className={`p-2 transition-all ${viewMode === "mobile" ? "bg-orange-500 text-white" : "text-white/40 hover:text-white/70"}`}
              title="Mobile view">
              <Smartphone className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setViewMode("analytics")}
              className={`p-2 transition-all ${viewMode === "analytics" ? "bg-orange-500 text-white" : "text-white/40 hover:text-white/70"}`}
              title="Analytics">
              <BarChart2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <Button variant="ghost" size="icon" onClick={fetchRequests}
            className="h-9 w-9 text-white/50 hover:text-white hover:bg-white/10 border border-white/10 flex-shrink-0">
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>

          <button
            onClick={() => { sessionStorage.removeItem("admin_auth"); setAuthed(false); }}
            className="font-mono text-[10px] tracking-widest text-white/20 hover:text-red-400 transition-colors uppercase whitespace-nowrap flex items-center gap-1 flex-shrink-0">
            <Lock className="w-3 h-3" />
            <span className="hidden sm:inline">Lock</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-orange-500/20 animate-ping" />
            <div className="w-12 h-12 border-2 border-white/10 border-t-orange-500 rounded-full animate-spin" />
          </div>
          <p className="font-mono text-[10px] tracking-widest text-white/30 uppercase animate-pulse">Loading...</p>
        </div>
      ) : viewMode === "analytics" ? (
        <div className="max-w-[1800px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
          <AdminStats requests={requests} t={t.stats} />
          <RevenueChart requests={requests} />
          {/* Top clients table */}
          <div className="rounded-2xl border border-white/10 p-5"
            style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(10px)" }}>
            <p className="font-mono text-xs tracking-[0.2em] text-white/70 uppercase mb-4">All Requests ({filtered.length})</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Name","Email","Phone","Type","Date","Status","Price"].map(h => (
                      <th key={h} className="text-left py-2 px-3 text-white/30 font-normal tracking-widest uppercase text-[10px]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(r => (
                    <tr key={r.id} className="border-b border-white/5 hover:bg-white/3 transition-colors cursor-pointer"
                      onClick={() => setSelectedRequest(r)}>
                      <td className="py-2 px-3 text-white/80">{r.name}</td>
                      <td className="py-2 px-3 text-white/50">{r.email}</td>
                      <td className="py-2 px-3 text-white/50">{r.phone}</td>
                      <td className="py-2 px-3 text-white/50">{r.move_type}</td>
                      <td className="py-2 px-3 text-white/50">{r.move_date}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          r.status === "completed" ? "bg-purple-500/20 text-purple-400" :
                          r.status === "confirmed" ? "bg-emerald-500/20 text-emerald-400" :
                          r.status === "in_progress" ? "bg-orange-500/20 text-orange-400" :
                          r.status === "cancelled" ? "bg-red-500/20 text-red-400" :
                          "bg-blue-500/20 text-blue-400"
                        }`}>{r.status}</span>
                      </td>
                      <td className="py-2 px-3 text-orange-400">{r.estimated_price ? `$${r.estimated_price}` : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : viewMode === "mobile" ? (
        <div className="flex flex-col" style={{ height: "calc(100vh - 57px)" }}>
          <div className="max-w-[1800px] mx-auto w-full px-3 sm:px-6 pt-4">
            <AdminStats requests={requests} t={t.stats} />
          </div>
          <div className="flex-1 overflow-hidden mt-4">
            <MobileView
              requests={filtered}
              onSelectRequest={setSelectedRequest}
              t={t}
            />
          </div>
        </div>
      ) : (
        <div className="max-w-[1800px] mx-auto px-3 sm:px-6 py-4 sm:py-6 relative">
          <AdminStats requests={requests} t={t.stats} />
          <RevenueChart requests={requests} />
          <div className="mt-0 overflow-x-auto pb-4 -mx-3 sm:mx-0 px-3 sm:px-0">
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4" style={{ minWidth: "max-content" }}>
              {COLUMNS.map((col, ci) => (
                <motion.div
                  key={col.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ci * 0.07 }}
                  onDragOver={e => handleDragOver(e, col.id)}
                  onDragLeave={() => setDragOver(null)}
                  onDrop={e => handleDrop(e, col.id)}
                  className={`rounded-2xl border transition-all duration-300 flex-shrink-0 w-[280px] sm:w-auto ${col.border}
                    ${dragOver === col.id ? `ring-2 ring-current ${col.color} scale-[1.02] shadow-2xl ${col.glow}` : ""}
                  `}
                  style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(10px)" }}
                >
                  <div className={`px-4 py-3 rounded-t-2xl ${col.headerBg} border-b ${col.border}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${col.dot} animate-pulse`} />
                        <span className={`font-mono text-[10px] tracking-[0.25em] uppercase font-bold ${col.color}`}>
                          {col.label}
                        </span>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${col.color}`}
                        style={{ background: "rgba(255,255,255,0.07)" }}>
                        {grouped[col.id]?.length || 0}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 space-y-2.5 min-h-[140px]">
                    <AnimatePresence>
                      {grouped[col.id]?.map(req => (
                        <RequestCard key={req.id} request={req}
                          isDragging={draggingId === req.id}
                          onDragStart={handleDragStart}
                          onDragEnd={() => setDraggingId(null)}
                          onClick={() => setSelectedRequest(req)}
                          onChecklistUpdate={handleChecklistUpdate}
                          t={t}
                        />
                      ))}
                    </AnimatePresence>
                    {grouped[col.id]?.length === 0 && (
                      <div className="text-center py-10">
                        <div className="w-8 h-8 rounded-full border border-dashed border-white/10 mx-auto mb-2 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                        </div>
                        <span className="font-mono text-[9px] tracking-widest text-white/20 uppercase">{t.empty}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {selectedRequest && (
          <RequestDetailModal
            request={selectedRequest}
            onClose={() => setSelectedRequest(null)}
            onStatusChange={handleStatusChange}
            onChecklistUpdate={handleChecklistUpdate}
            onNotesUpdate={handleNotesUpdate}
            onPriceUpdate={handlePriceUpdate}
            onDelete={handleDelete}
            t={t.modal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}