import React from "react";

type Props = {
  icon?: React.ReactNode;
  value: string | number;
  label: string;
  deltaPercent: number; // positive -> green, negative -> red
  accent?: string; // optional icon bg
};

export default function StatsMiniCard({ icon, value, label, deltaPercent, accent }: Props) {
  const isUp = deltaPercent >= 0;
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm" style={{ background: "var(--color-surface)" }}>
      {icon ? (
        <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-4" style={{ background: accent || "var(--agenda-blue-bg)" }}>{icon}</div>
      ) : null}
      <div className="text-3xl font-semibold mb-1" style={{ color: "var(--color-text-primary)" }}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      <div className="text-sm mb-4" style={{ color: "var(--color-muted-text)" }}>{label}</div>
      <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium" style={{
        background: isUp ? "var(--color-success-bg)" : "var(--color-danger-bg)",
        color: isUp ? "var(--color-success)" : "var(--color-danger)",
      }}>
        <span>{isUp ? "▲" : "▼"}</span>
        <span>{Math.abs(deltaPercent)}%</span>
      </div>
    </div>
  );
}


