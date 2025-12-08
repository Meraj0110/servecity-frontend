// src/widgets/services/VideoPreview.tsx
"use client";

import React from "react";

export default function VideoPreview({ videoUrl }: { videoUrl: string }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-neutral-200">
      <video
        src={videoUrl}
        muted
        autoPlay
        loop
        playsInline
        className="w-full h-[280px] object-cover"
      />
    </div>
  );
}
