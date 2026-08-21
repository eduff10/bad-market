"use client";

import { useState } from "react";

export function ListingImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const hasSrc = src && src.trim() !== "";

  if (!hasSrc || failed) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-surface-2 ${className ?? ""}`}
      >
        <span className="stencil text-center text-xs text-muted">
          BAD<span className="text-accent">/</span>MARKET
          <br />
          <span className="mono text-[10px] normal-case tracking-normal text-muted">
            photo coming soon
          </span>
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
