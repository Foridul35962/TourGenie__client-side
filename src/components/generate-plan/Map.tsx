"use client";

import React, { useEffect, useRef, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";

export default function Map() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setSize({
        w: Math.max(0, Math.floor(rect.width)),
        h: Math.max(0, Math.floor(rect.height)),
      });
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;

    globeRef.current.pointOfView(
      { lat: 23.8103, lng: 90.4125, altitude: 2.2 },
      1200
    );

    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
  }, [size.w, size.h]);

  return (
    <div
      ref={wrapRef}
      className="w-full h-full rounded-2xl overflow-hidden border border-slate-200 bg-white"
    >
      {size.w > 0 && size.h > 0 && (
        <Globe
          ref={globeRef}
          width={size.w}
          height={size.h}
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
        />
      )}
    </div>
  );
}