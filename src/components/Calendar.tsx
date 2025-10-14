import React, { useMemo, useState } from "react";

type CalendarView = "month" | "week";

type CalendarEvent = {
  id: string;
  date: string; // ISO date (yyyy-mm-dd)
  time: string; // e.g., "08:00 am"
  title: string;
  subtitle?: string; // e.g., grade or tag
  color?: string; // visual style key
};

type Props = {
  view?: CalendarView; // default 'month'
  initialDate?: Date; // default today
  onDateChange?: (date: Date) => void;
  events?: CalendarEvent[]; // optional agenda items
};

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0..6 (Sun..Sat)
  const diff = day; // week starts Sunday
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfMonth(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar({ view = "month", initialDate = new Date(), onDateChange, events = [] }: Props) {
  const [cursor, setCursor] = useState<Date>(initialDate);
  const today = useMemo(() => new Date(), []);

  const monthStart = startOfMonth(cursor);
  const monthTitle = monthStart.toLocaleString(undefined, { month: "long", year: "numeric" });

  // Build grid dates
  const monthGrid = useMemo(() => {
    const start = startOfWeek(new Date(monthStart));
    const cells: { date: Date; inMonth: boolean }[] = [];
    for (let i = 0; i < 42; i++) {
      const d = addDays(start, i);
      cells.push({ date: d, inMonth: d.getMonth() === monthStart.getMonth() });
    }
    return cells;
  }, [monthStart]);

  const weekGrid = useMemo(() => {
    const start = startOfWeek(cursor);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [cursor]);

  const goPrev = () => {
    const next = view === "month"
      ? new Date(cursor.getFullYear(), cursor.getMonth() - 1, cursor.getDate())
      : addDays(cursor, -7);
    setCursor(next);
    onDateChange?.(next);
  };

  const goNext = () => {
    const next = view === "month"
      ? new Date(cursor.getFullYear(), cursor.getMonth() + 1, cursor.getDate())
      : addDays(cursor, 7);
    setCursor(next);
    onDateChange?.(next);
  };

  return (
    <div className="rounded-2xl bg-white p-4" style={{ background: "var(--color-surface)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goPrev}
          className="h-8 w-8 rounded-full border flex items-center justify-center text-2xl"
          style={{ borderColor: "var(--color-border)", color: "var(--color-muted-text)" }}
          aria-label="Previous"
        >
          ‹
        </button>
        <div className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>{monthTitle}</div>
        <button
          onClick={goNext}
          className="h-8 w-8 rounded-full border flex items-center justify-center text-2xl"
          style={{ borderColor: "var(--color-border)", color: "var(--color-muted-text)" }}
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* Weekday row */}
      <div className="grid grid-cols-7 text-xs mb-2" style={{ color: "var(--color-muted-text)" }}>
        {WEEKDAY_SHORT.map((d) => (
          <div key={d} className="text-center py-1 text-sm">{d}</div>
        ))}
      </div>

      {view === "month" ? (
        // Month grid 6x7
        <div className="grid grid-cols-7 gap-2">
          {monthGrid.map(({ date, inMonth }) => {
            const isToday = isSameDay(date, today);
            const isSelected = isSameDay(date, cursor);
            return (
              <button
                key={date.toISOString()}
                onClick={() => setCursor(date)}
                className="rounded-xl p-3 text-sm text-left border"
                style={{
                  borderColor: isSelected ? "var(--color-accent)" : "var(--color-border)",
                  background: isSelected ? "var(--color-accent-weak)" : "var(--color-surface)",
                  color: inMonth ? "var(--color-text-primary)" : "var(--color-muted-text)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{date.getDate()}</span>
                  {isToday && (
                    <span className="h-2 w-2 rounded-full" style={{ background: "var(--color-accent)" }} />
                  )}
                </div>
                {/* placeholder for tags/agenda chips could go here */}
              </button>
            );
          })}
        </div>
      ) : (
        // Week view
        <div className="grid grid-cols-7 gap-2">
          {weekGrid.map((date) => {
            const isToday = isSameDay(date, today);
            const isSelected = isSameDay(date, cursor);
            return (
              <button
                key={date.toISOString()}
                onClick={() => setCursor(date)}
                className="rounded-xl p-4 text-sm text-left border"
                style={{
                  border: isSelected ? "var(--color-accent)" : "none",
                  background: isSelected ? "var(--color-accent-weak)" : "none",
                  color: "var(--color-text-primary)",
                }}
              >
                <div className="flex items-center gap-2 justify-end ">
                  {/* <div className="text-xs" style={{ color: "var(--color-muted-text)" }}>
                    {WEEKDAY_SHORT[date.getDay()]}
                  </div> */}
                  <div className="font-semibold text-lg">{date.getDate()}</div>
                  {isToday && <span className="h-2 w-2 rounded-full" style={{ background: "var(--color-accent)" }} />}
                </div>
                {/* room for agenda lines */}
              </button>
            );
          })}
        </div>
      )}

      {/* Agenda Section */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>Agenda</h3>
          <button className="text-sm" style={{ color: "var(--color-muted-text)" }}>•••</button>
        </div>
        <div className="space-y-3">
          {events
            .filter(e => {
              const d = new Date(e.date);
              return isSameDay(d, cursor);
            })
            .map((e) => {
              const palette = e.color === "purple"
                ? { bg: "var(--agenda-purple-bg)", accent: "var(--agenda-purple-accent)" }
                : e.color === "yellow"
                ? { bg: "var(--agenda-yellow-bg)", accent: "var(--agenda-yellow-accent)" }
                : { bg: "var(--agenda-blue-bg)", accent: "var(--agenda-blue-accent)" };
              return (
                <div key={e.id} className="rounded-xl px-4 py-4 flex items-start gap-4" style={{ background: palette.bg }}>
                  <div className="w-20 text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{e.time}</div>
                  <div className="w-px h-6 rounded" style={{ background: palette.accent }} />
                  <div className="flex-1">
                    {e.subtitle && (
                      <div className="text-xs mb-1" style={{ color: "var(--color-muted-text)" }}>{e.title}</div>
                    )}
                    <div className="font-semibold" style={{ color: "var(--color-text-primary)" }}>{e.subtitle}</div>
                  </div>
                </div>
              );
            })}

          {/* Empty state */}
          {events.filter(ev => isSameDay(new Date(ev.date), cursor)).length === 0 && (
            <div className="rounded-xl border px-4 py-6 text-center" style={{ borderColor: "var(--color-border)", color: "var(--color-muted-text)" }}>
              No events for this day
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


