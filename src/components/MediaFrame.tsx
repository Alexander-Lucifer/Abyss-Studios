'use client';

import React from 'react';

interface MediaFrameProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string; // tailwind max width class, e.g. 'max-w-md'
  bg?: string; // background utility e.g. 'bg-black/20'
  padding?: string; // padding utility e.g. 'p-4'
  rounded?: string; // rounded utility e.g. 'rounded-lg'
  border?: string; // border utility e.g. 'border border-white/5'
  aspectClass?: string; // height classes or aspect ratio e.g. 'h-32 sm:h-40' or 'aspect-w-16 aspect-h-9'
  aspectRatio?: string; // e.g. '16:9'
  mediaType?: string; // current media type for conditional wrapping
  applyTo?: string[]; // which media types this frame should wrap; default ['image','embed']
}

export default function MediaFrame({
  children,
  className = '',
  maxWidth = 'max-w-md',
  bg = 'bg-black/20',
  padding = 'p-4',
  rounded = 'rounded-lg',
  border = 'border border-white/5',
  aspectClass = '', aspectRatio, mediaType, applyTo
}: MediaFrameProps) {
  const targets = applyTo ?? ['image', 'embed'];

  if (mediaType && !targets.includes(mediaType)) {
    // If current mediaType is not in the apply list, render children as-is
    return <>{children}</>;
  }

  // If an explicit aspectRatio is requested (e.g. '16:9'), use padding-top trick
  if (aspectRatio === '16:9') {
    return (
      <div className={`w-full ${maxWidth} ${bg} ${padding} ${rounded} ${border} ${className}`}>
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }} className="rounded-md overflow-hidden">
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${maxWidth} ${bg} ${padding} ${rounded} ${border} ${className}`}>
      <div className={`${aspectClass} w-full overflow-hidden rounded-md`}>{children}</div>
    </div>
  );
}
