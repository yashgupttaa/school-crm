import { FiUser } from "react-icons/fi";

type Props = {
  boys: number;
  girls: number;
  size?: number; 
};

export default function StudentsGraph({ boys, girls, size = 220 }: Props) {
  const total = Math.max(boys + girls, 1);
  const boysPct = Math.round((boys / total) * 100);
  const girlsPct = 100 - boysPct;

  // Palette close to screenshot
  const sky = "var(--color-text-quaternary)";
  const yellow = "var(--color-text-tertiary)";
  const ringBg = "var(--color-text-gray)"; 
  const innerDisc = "#F7FAFC"; // center disc tint

  // Rings geometry
  const outerR = size * 0.38;
  const innerR = size * 0.28;
  const outerStroke = 18;
  const innerStroke = 18;
  const c = 2 * Math.PI;

  // Start angles to visually match screenshot
  const outerStartDeg = 130; // boys ring (reverse direction)
  const innerStartDeg = 20;  // girls ring (same direction)

  const pctToDash = (pct: number, radius: number) => {
    const circumference = c * radius;
    const dash = (pct / 100) * circumference;
    return { dash, circumference };
  };

  const { dash: boysDash, circumference: boysCirc } = pctToDash(boysPct, outerR);
  const { dash: girlsDash, circumference: girlsCirc } = pctToDash(girlsPct, innerR);

  // Offsets for custom start angles (SVG circles start at 3 o'clock, rotate group first to -90 to go to 12)
  const startOffset = (deg: number, radius: number) => {
    const circumference = c * radius;
    return (circumference * (deg / 360)) * -1; // negative to move forward
  };

  return (
    <div className="rounded-2xl border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Students</h3>
        <button className="text-gray-400">•••</button>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <div className="relative" style={{ width: size, height: size }}>
          {/* Center discs to mimic layered ring background */}
          {/* <div className="absolute inset-0 rounded-full" style={{ boxShadow: `inset 0 0 0 16px ${ringBg}` }} /> */}
          {/* <div className="absolute inset-[18%] rounded-full" style={{ background: innerDisc }} /> */}
          <div className="absolute inset-[28%] rounded-full bg-white" />

          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <g transform={`translate(${size / 2}, ${size / 2}) rotate(-90)`}>
              {/* Outer background ring */}
              <circle r={outerR} fill="none" stroke={ringBg} strokeWidth={outerStroke} />
              {/* Outer progress (boys) */}
              <circle
                r={outerR}
                fill="none"
                stroke={sky}
                strokeWidth={outerStroke}
                strokeLinecap="round"
                strokeDasharray={`${boysDash} ${boysCirc}`}
                strokeDashoffset={startOffset(outerStartDeg, outerR)}
              />

              {/* Inner background ring */}
              <circle r={innerR} fill="none" stroke={ringBg} strokeWidth={innerStroke} />
              {/* Inner progress (girls) */}
              <circle
                r={innerR}
                fill="none"
                stroke={yellow}
                strokeWidth={innerStroke}
                strokeLinecap="round"
                strokeDasharray={`${girlsDash} ${girlsCirc}`}
                strokeDashoffset={startOffset(innerStartDeg, innerR)}
              />
            </g>
          </svg>

          {/* Center duo icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-end gap-3">
              <FiUser className="h-6 w-6" style={{ color: sky }} />
              <FiUser className="h-7 w-7" style={{ color: yellow }} />
            </div>
          </div>
        </div>
      </div>

      {/* Legends */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: sky }} />
          <div>
            <div className="text-base font-semibold">{boys.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Boys ({boysPct}%)</div>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-end">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: yellow }} />
          <div className="text-right">
            <div className="text-base font-semibold">{girls.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Girls ({girlsPct}%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}


