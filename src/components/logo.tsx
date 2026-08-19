// Crash-test-dummy target reticle mark.
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Alternating quadrants like a calibration target */}
      <circle cx="50" cy="50" r="48" fill="#0a0a0b" stroke="#ffdd00" strokeWidth="4" />
      <path d="M50 6 A44 44 0 0 1 94 50 L50 50 Z" fill="#ffdd00" />
      <path d="M50 94 A44 44 0 0 1 6 50 L50 50 Z" fill="#ffdd00" />
      <circle cx="50" cy="50" r="14" fill="#0a0a0b" />
      <circle cx="50" cy="50" r="5" fill="#ffdd00" />
    </svg>
  );
}
