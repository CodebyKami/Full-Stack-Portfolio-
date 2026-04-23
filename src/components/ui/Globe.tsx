import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    // @ts-ignore
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [51.5074, -0.1278], size: 0.05 },
        { location: [25.2048, 55.2708], size: 0.07 },
        { location: [31.5204, 74.3587], size: 0.08 },
        { location: [35.6762, 139.6503], size: 0.05 },
        { location: [1.3521, 103.8198], size: 0.06 },  // Singapore
        { location: [-33.8688, 151.2093], size: 0.04 }, // Sydney
        { location: [-23.5505, -46.6333], size: 0.05 }, // Sao Paulo
      ],
      onRender: (state: any) => {
        state.phi = phi;
        phi += 0.01;
      },
    } as any);

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="w-full max-w-[600px] aspect-square relative mx-auto">
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  );
}
