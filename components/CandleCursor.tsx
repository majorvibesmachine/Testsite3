import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CandleCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is touch/mobile to disable cursor logic
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const cursor = cursorRef.current;
    if (!cursor || isMobile) return;

    // Use GSAP's quickTo for performance optimized movement
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div 
      ref={cursorRef}
      className="fixed pointer-events-none z-40 mix-blend-soft-light w-[600px] h-[600px] rounded-full top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      style={{
        background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(253,246,227,0) 70%)'
      }}
    />
  );
};

export default CandleCursor;