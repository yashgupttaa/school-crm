import { FiMoreHorizontal, FiTrendingUp, FiTrendingDown } from "react-icons/fi";

type Props = {
  title: string;
  value: number | string;
  deltaPercent?: number; // positive => up (green), negative => down (red)
  className?: string;
};

export default function StatsCard({ title, value, deltaPercent, className }: Props) {
  const isPositive = (deltaPercent ?? 0) >= 0;
  const formatted = typeof value === "number" ? value.toLocaleString() : value;

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 shadow-sm ${className ?? ""}`}
    >
      <div className="flex items-start justify-between">
        {/* Delta pill */}
        {typeof deltaPercent === "number" && (
          <span
            className={`inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-medium ${
              isPositive ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {isPositive ? (
              <FiTrendingUp className="h-3.5 w-3.5" />
            ) : (
              <FiTrendingDown className="h-3.5 w-3.5" />
            )}
            {Math.abs(deltaPercent)}%
          </span>
        )}

        {/* Menu dots */}
        <button
          aria-label="More options"
          className="text-white/80 hover:text-white/95 transition-colors"
        >
          <FiMoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6">
        <div className="text-3xl sm:text-4xl font-semibold text-gray-900">{formatted}</div>
        <div className="mt-1 text-sm text-gray-800">{title}</div>
      </div>
    </div>
  );
}


