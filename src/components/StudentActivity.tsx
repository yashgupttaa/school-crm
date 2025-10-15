import React from "react";

type Activity = {
  id: string;
  title: string;
  subtitle: string;
  timeAgo: string; // e.g., "2 days ago"
  color?: "blue" | "purple" | "yellow"; // controls left icon bg
  icon?: React.ReactNode; // optional custom icon node
};

type Props = {
  items: Activity[];
  title?: string;
  onViewAll?: () => void;
  maxHeight?: number; // px, default 320
};

export default function StudentActivity({ items, title = "Student Activity", onViewAll, maxHeight = 320 }: Props) {
  const colorToBg: Record<string, string> = {
    blue: "var(--agenda-blue-bg)",
    purple: "var(--agenda-purple-bg)",
    yellow: "var(--agenda-yellow-bg)",
  };

  return (
    <div className="rounded-2xl bg-white p-4" style={{ background: "var(--color-surface)" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>{title}</h3>
        <button onClick={onViewAll} className="text-sm" style={{ color: "var(--color-muted-text)" }}>View All</button>
      </div>

      <div className="relative">
        <div className="overflow-y-auto pr-2" style={{ maxHeight }}>
          <ul className="space-y-5">
            {items.map((a) => {
              const bg = a.color ? colorToBg[a.color] : "var(--agenda-blue-bg)";
              return (
                <li key={a.id} className="flex items-start gap-3">
                  {/* Icon bubble */}
                  <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ background: bg }}>
                    {a.icon ? (
                      <span className="text-base" style={{ color: "var(--color-text-primary)" }}>{a.icon}</span>
                    ) : (
                      <span className="text-lg" style={{ color: "var(--color-text-primary)" }}>•</span>
                    )}
                  </div>

                  {/* Text block */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold mb-1" style={{ color: "var(--color-text-primary)" }}>{a.title}</div>
                    <div className="text-sm" style={{ color: "var(--color-muted-text)" }}>{a.subtitle}</div>
                    <div className="mt-2 inline-flex px-3 py-1 rounded-full text-xs" style={{ background: "var(--color-text-gray)", color: "var(--color-text-primary)" }}>
                      {a.timeAgo}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Thin scrollbar track mimic on right side */}
        <div className="absolute top-0 right-0 h-full w-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.05)" }} />
      </div>
    </div>
  );
}


