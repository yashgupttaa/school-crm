import React, { useMemo, useState } from "react";

type Point = { month: string; income: number; expense: number };

type Props = {
  data: Point[]; // expected 12 months but flexible
  title?: string;
};

const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
];

function toPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const cx = (p0.x + p1.x) / 2; // simple cubic smoothing
    d += ` C ${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`;
  }
  return d;
}

export default function EarningsGraph({ data, title = "Earnings" }: Props) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const months = data.map(d => d.month);
  const maxY = Math.max(1, ...data.flatMap(d => [d.income, d.expense]));

  // layout
  const width = 800; // internal drawing width (scaled via CSS)
  const height = 280;
  const leftPad = 0;
  const topPad = 10;
  const bottomPad = 28;
  const drawW = width - leftPad;
  const drawH = height - topPad - bottomPad;

  const pointsIncome = useMemo(() => {
    return data.map((d, i) => ({
      x: leftPad + (i * drawW) / Math.max(1, data.length - 1),
      y: topPad + (1 - d.income / maxY) * drawH,
    }));
  }, [data, maxY]);

  const pointsExpense = useMemo(() => {
    return data.map((d, i) => ({
      x: leftPad + (i * drawW) / Math.max(1, data.length - 1),
      y: topPad + (1 - d.expense / maxY) * drawH,
    }));
  }, [data, maxY]);

  const incomeColor = "var(--color-text-quaternary)"; // sky
  const expenseColor = "var(--color-text-secondary)"; // purple
  const gridColor = "var(--color-text-gray)";

  const yTicks = [1, 0.75, 0.5, 0.25, 0];

  return (
    <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-sm" style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>{title}</h3>
        <div className="flex items-center gap-6 text-sm" style={{ color: "var(--color-text-primary)" }}>
          <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: incomeColor }} /> Income</div>
          <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: expenseColor }} /> Expense</div>
        </div>
      </div>

      <div className="relative pl-16">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-72 flex flex-col justify-between text-xs select-none" style={{ color: "var(--color-muted-text)" }}>
          {yTicks.map((p, idx) => (
            <div key={idx}>{Math.round(p * maxY)}K</div>
          ))}
        </div>
        {/* Grid */}
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-72">
          {/* y grid dashed */}
          {[0.25, 0.5, 0.75, 1].map((p, i) => (
            <line key={i} x1={0} x2={width} y1={topPad + (1 - p) * drawH} y2={topPad + (1 - p) * drawH} stroke={gridColor} strokeDasharray="4 4" />
          ))}

          {/* selection highlight */}
          {hoverIndex !== null && (
            <rect x={leftPad + (hoverIndex * drawW) / Math.max(1, data.length - 1) - drawW / Math.max(1, data.length - 1) / 2}
                  y={topPad}
                  width={drawW / Math.max(1, data.length - 1)}
                  height={drawH}
                  fill={expenseColor}
                  opacity={0.12} />
          )}

          {/* lines */}
          <path d={toPath(pointsIncome)} fill="none" stroke={incomeColor} strokeWidth={4} strokeLinejoin="round" />
          <path d={toPath(pointsExpense)} fill="none" stroke={expenseColor} strokeWidth={4} strokeLinejoin="round" />

          {/* hover marker */}
          {hoverIndex !== null && (
            <circle cx={pointsExpense[hoverIndex].x} cy={pointsExpense[hoverIndex].y} r={8} fill="#fff" stroke={expenseColor} strokeWidth={3} />
          )}
        </svg>

        {/* Hover overlay */}
        <div className="absolute inset-0" onMouseLeave={() => setHoverIndex(null)}>
          <div className="grid grid-cols-12 h-full">
            {data.map((_, i) => (
              <div key={i} onMouseEnter={() => setHoverIndex(i)} />
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {hoverIndex !== null && (
          <div className="absolute" style={{ left: `${(hoverIndex / Math.max(1, data.length - 1)) * 100}%`, top: "20%", transform: "translateX(-50%)" }}>
            <div className="rounded-xl bg-white shadow-lg px-4 py-3 border" style={{ borderColor: "var(--color-border)" }}>
              <div className="text-xs mb-1" style={{ color: "var(--color-muted-text)" }}>{months[hoverIndex] ?? MONTHS[hoverIndex]}</div>
              <div className="flex items-center gap-3 text-sm" style={{ color: "var(--color-text-primary)" }}>
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: incomeColor }} />₹{data[hoverIndex].income.toLocaleString()}</div>
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: expenseColor }} />₹{data[hoverIndex].expense.toLocaleString()}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* X labels */}
      <div className="mt-1 grid grid-cols-12 text-xs" style={{ color: "var(--color-muted-text)" }}>
        {MONTHS.map((m) => (
          <div key={m} className="text-center py-2">{m}</div>
        ))}
      </div>
    </div>
  );
}


