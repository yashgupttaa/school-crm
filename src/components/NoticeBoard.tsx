import React from "react";
import { FiEye, FiSliders } from "react-icons/fi";

type NoticeItem = {
  id: string;
  imageUrl: string;
  title: string; // may be multi-line
  dateLabel: string; // e.g., 04/18/2030
  authorName: string; // e.g., By Ms. Jackson
  authorRole?: string; // e.g., (Math Teacher)
  views: number | string; // can be 1.2K
};

type Props = {
  title?: string;
  items: NoticeItem[];
  onSettingsClick?: () => void;
};

export default function NoticeBoard({ title = "Notice Board", items, onSettingsClick }: Props) {
  return (
    <div className="rounded-2xl bg-white p-4" style={{ background: "var(--color-surface)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>{title}</h3>
        <button onClick={onSettingsClick} className="h-8 w-8 rounded-full flex items-center justify-center" style={{ color: "var(--color-muted-text)" }}>
          <FiSliders className="h-5 w-5" />
        </button>
      </div>

      {/* List */}
      <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
        {items.map((n) => (
          <li key={n.id} className="py-3 border-none">
            <div className="grid grid-cols-12 items-center gap-3">
              {/* Thumb */}
              <div className="col-span-1">
                <img src={n.imageUrl} alt={n.title} className="h-12 w-12 rounded-xl object-cover" />
              </div>

              {/* Title */}
              <div className="col-span-4 min-w-0">
                <div className="text-sm font-semibold leading-snug" style={{ color: "var(--color-text-primary)" }}>
                  <span className="line-clamp-2" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{n.title}</span>
                </div>
              </div>

              {/* Date pill */}
              <div className="col-span-3">
                <span className="inline-flex px-3 py-1 rounded-full text-xs" style={{ background: "var(--agenda-blue-bg)", color: "var(--color-text-primary)" }}>
                  {n.dateLabel}
                </span>
              </div>

              {/* Author */}
              <div className="col-span-3 min-w-0">
                <div className="text-sm" style={{ color: "var(--color-text-primary)" }}>{n.authorName}</div>
                {n.authorRole && (
                  <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>({n.authorRole})</div>
                )}
              </div>

              {/* Views */}
              <div className="col-span-1 flex items-center justify-end gap-2" style={{ color: "var(--color-muted-text)" }}>
                <FiEye className="h-4 w-4" />
                <span className="text-sm" style={{ color: "var(--color-text-primary)" }}>{typeof n.views === "number" ? n.views.toLocaleString() : n.views}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


