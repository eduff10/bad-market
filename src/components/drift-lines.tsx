// Curved butcher-cut / drift-line background.
// Echoes the dotted section lines of the Pink Pig Porsche, flowing like
// layered drift trajectories. Mixed bone + hot-pink strokes on dark.
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
      <g strokeWidth="6" strokeLinecap="round">
        {/* bone lines */}
        <path
          d="M-50 180 C 300 60, 700 40, 1000 220 S 1500 520, 1520 360"
          stroke="var(--ink)"
          strokeDasharray="3 16"
          opacity="0.14"
        />
        <path
          d="M-50 520 C 380 400, 820 460, 1120 600 S 1500 820, 1520 720"
          stroke="var(--ink)"
          strokeDasharray="3 16"
          opacity="0.14"
        />
        {/* pink lines */}
        <path
          d="M-50 320 C 350 200, 760 200, 1050 380 S 1480 640, 1520 500"
          stroke="var(--accent)"
          strokeDasharray="22 16"
          opacity="0.22"
        />
        <path
          d="M-50 700 C 300 620, 780 700, 1080 760 S 1520 900, 1520 880"
          stroke="var(--accent)"
          strokeDasharray="22 16"
          opacity="0.20"
        />
        {/* a tighter pink drift transition curve */}
        <path
          d="M200 900 C 260 560, 620 460, 980 500"
          stroke="var(--accent)"
          strokeDasharray="3 16"
          opacity="0.18"
        />
      </g>
    </svg>
  );
}
