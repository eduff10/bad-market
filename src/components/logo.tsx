// Pink Pig butcher-cut medallion: dashed section circle with a cut mark.
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="47" fill="#eaa0ab" stroke="#1a1416" strokeWidth="3" />
      {/* dashed butcher-cut ring */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke="#1a1416"
        strokeWidth="2"
        strokeDasharray="3 6"
      />
      {/* drift-line swoosh through the middle */}
      <path
        d="M20 62 C 38 44, 62 44, 80 38"
        fill="none"
        stroke="#1a1416"
        strokeWidth="3"
        strokeDasharray="2 7"
        strokeLinecap="round"
      />
      <circle cx="50" cy="50" r="6" fill="#c8102e" />
    </svg>
  );
}
