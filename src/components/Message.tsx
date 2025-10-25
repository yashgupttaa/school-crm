import React from "react";
import type { MessageItem } from "../config/Messages.config";

type Props = {
  items: MessageItem[];
};

export default function Message({ items }: Props) {
  return (
    <div className="rounded-2xl bg-white p-4" style={{ background: "var(--color-surface)" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>Messages</h3>
        <button className="text-sm" style={{ color: "var(--color-muted-text)" }}>View All</button>
      </div>
      <div className="space-y-5">
        {items.length > 0 ? (
          items.map((m) => (
            <div key={m.id} className="flex items-start gap-3">
              {/* Avatar: image if present, otherwise initials */}
              {m.avatarUrl ? (
                <img src={m.avatarUrl} alt={m.name} className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <div className="h-12 w-12 rounded-full flex items-center justify-center overflow-hidden" style={{ background: m.color || "var(--color-text-gray)" }}>
                  <span className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{m.name.split(" ").map(s=>s[0]).slice(0,2).join("")}</span>
                </div>
              )}
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="font-semibold truncate" style={{ color: "var(--color-text-primary)" }}>{m.name}</div>
                  <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>{m.time}</div>
                </div>
                <div className="mt-1 flex items-start gap-2">
                  <p
                    className="text-sm"
                    style={{
                      color: "var(--color-text-primary)",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {m.body}
                  </p>
                  {typeof m.unreadCount === "number" && m.unreadCount > 0 && (
                    <span className="h-6 min-w-6 px-2 rounded-full text-[11px] font-semibold flex items-center justify-center shrink-0" style={{ background: "var(--agenda-purple-bg)", color: "var(--color-text-primary)" }}>
                      {m.unreadCount}
                    </span>
                  )}
                </div>
              </div>
              {/* trailing badge removed; count shown next to message */}
            </div>
          ))
        ) : (
          <div className="rounded-xl border px-4 py-6 text-center" style={{ borderColor: "var(--color-border)", color: "var(--color-muted-text)" }}>
            No messages for this day
          </div>
        )}
      </div>
    </div>
  );
}


