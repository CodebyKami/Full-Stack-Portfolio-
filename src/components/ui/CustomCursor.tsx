import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const mouse = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Instant dot movement
      gsap.set(dot, { x: mouse.x, y: mouse.y });
    };

    const updateRing = () => {
      // Lerp for ring
      ringPos.x += (mouse.x - ringPos.x) * 0.12;
      ringPos.y += (mouse.y - ringPos.y) * 0.12;

      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
      requestAnimationFrame(updateRing);
    };

    const onMouseEnter = () => {
      gsap.to(dot, { scale: 0.5, backgroundColor: '#fff', duration: 0.3 });
      gsap.to(ring, { scale: 1.5, opacity: 0.3, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to(dot, { scale: 1, backgroundColor: '#c8f538', duration: 0.3 });
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    const raf = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-primary/30 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block shadow-[0_0_20px_rgba(200,245,56,0.1)]"
      />
    </>
  );
}
