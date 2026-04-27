import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp } from "lucide-react";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function RevenueChart({ requests }) {
  // Build monthly revenue data for current year
  const year = new Date().getFullYear();
  const monthlyData = MONTH_NAMES.map((name, i) => {
    const monthRequests = requests.filter(r => {
      const d = new Date(r.created_date || r.move_date);
      return d.getFullYear() === year && d.getMonth() === i && r.status !== "cancelled";
    });
    const revenue = monthRequests.reduce((sum, r) => sum + (r.estimated_price || 0), 0);
    const count = monthRequests.length;
    return { name, revenue, count };
  });

  const totalRevenue = monthlyData.reduce((s, d) => s + d.revenue, 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-lg border border-white/10 px-3 py-2 text-xs font-mono"
        style={{ background: "rgba(10,15,30,0.95)" }}>
        <p className="text-white/60 mb-1">{label}</p>
        <p className="text-orange-400 font-bold">${payload[0]?.value?.toLocaleString()} CAD</p>
        <p className="text-white/40">{payload[1]?.value} requests</p>
      </div>
    );
  };

  return (
    <div className="rounded-2xl border border-white/10 p-5 mb-6"
      style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(10px)" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-orange-400" />
          <span className="font-mono text-xs tracking-[0.2em] text-white/70 uppercase">Revenue {year}</span>
        </div>
        <span className="font-mono text-sm font-bold text-orange-400">${totalRevenue.toLocaleString()} CAD</span>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={monthlyData} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="revenue" fill="#FF4F00" radius={[4, 4, 0, 0]} maxBarSize={32} />
          <Bar dataKey="count" fill="rgba(255,79,0,0.2)" radius={[4, 4, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}