import React from "react";

type ActivityItem = {
  id: string;
  avatarUrl?: string;
  color?: string; // fallback avatar bg
  actor: string; // e.g., Ms. Johnson
  action: string; // e.g., assigned new
  subject?: string; // e.g., English Literature
  context?: string; // e.g., homework / in History / Science Museum Field Trip
  timeAgo: string; // e.g., 20 minutes ago
};

type Props = {
  title?: string;
  sectionLabel?: string; // e.g., Today
  items: ActivityItem[];
  onViewAll?: () => void;
};

export default function RecentActivity({ title = "Recent Activity", sectionLabel = "Today", items, onViewAll }: Props) {
  return (
    <div className="rounded-2xl bg-white p-4" style={{ background: "var(--color-surface)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>{title}</h3>
        <button onClick={onViewAll} className="text-sm" style={{ color: "var(--color-muted-text)" }}>View All</button>
      </div>

      <div className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>{sectionLabel}</div>

      <div className="relative">
        {/* Timeline column */}
        <div className="absolute left-5 top-0 bottom-0 border-l border-dashed" style={{ borderColor: "var(--color-border)" }} />

        <ul className="space-y-5">
          {items.map((it, idx) => (
            <li key={it.id} className="relative pl-12">
              {/* Avatar */}
              {it.avatarUrl ? (
                <img src={it.avatarUrl} alt={it.actor} className="absolute left-0 top-0 h-9 w-9 rounded-full object-cover" />
              ) : (
                <div className="absolute left-0 top-0 h-9 w-9 rounded-full" style={{ background: it.color || "var(--agenda-blue-bg)" }} />
              )}

              {/* Connector segment hides for last item by overlaying surface color */}
              {idx === items.length - 1 && (
                <div className="absolute left-5 -bottom-5 h-6 w-2" style={{ background: "var(--color-surface)" }} />
              )}

              {/* Primary line */}
              <div className="text-sm leading-snug">
                <span className="font-semibold" style={{ color: "var(--color-text-primary)" }}>{it.actor}</span>
                {" "}
                <span style={{ color: "var(--color-text-primary)" }}>{it.action}</span>
                {it.subject && (
                  <>
                    {" "}
                    <span className="font-semibold" style={{ color: "var(--color-text-primary)" }}>{it.subject}</span>
                  </>
                )}
                {it.context && (
                  <>
                    {" "}
                    <span style={{ color: "var(--color-muted-text)" }}>{it.context}</span>
                  </>
                )}
              </div>

              {/* Time ago */}
              <div className="text-xs mt-2" style={{ color: "var(--color-muted-text)" }}>{it.timeAgo}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


