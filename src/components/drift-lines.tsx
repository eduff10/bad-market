// Curved butcher-cut / drift-line background.
// Echoes the dotted section lines painted across the Pink Pig Porsche,
// flowing like drift trajectories behind the content.
export function DriftLines({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g
        stroke="var(--ink)"
        strokeWidth="2.5"
        opacity="0.16"
        strokeLinecap="round"
      >
        {/* Long sweeping drift arcs, dotted + dashed like butcher cuts */}
        <path
          d="M-50 180 C 300 60, 700 40, 1000 220 S 1500 520, 1520 360"
          strokeDasharray="2 12"
        />
        <path
          d="M-50 320 C 350 200, 760 200, 1050 380 S 1480 640, 1520 500"
          strokeDasharray="14 12"
        />
        <path
          d="M-50 520 C 380 400, 820 460, 1120 600 S 1500 820, 1520 720"
          strokeDasharray="2 12"
        />
        <path
          d="M-50 700 C 300 620, 780 700, 1080 760 S 1520 900, 1520 880"
          strokeDasharray="14 12"
        />
        {/* A tighter drift transition curve */}
        <path
          d="M200 900 C 260 560, 620 460, 980 500"
          strokeDasharray="2 12"
        />
      </g>
    </svg>
  );
}
