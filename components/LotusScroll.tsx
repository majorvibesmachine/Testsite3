import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LotusScroll: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Helper to smoothly reverse video using RequestAnimationFrame
    // HTML5 Video doesn't always support negative playbackRate well across all browsers
    const reverseVideo = () => {
      video.pause();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      const stepReverse = () => {
        if (video.currentTime > 0.1) {
          video.currentTime -= 0.05; // Adjust speed of rewind here
          animationRef.current = requestAnimationFrame(stepReverse);
        } else {
          video.currentTime = 0;
        }
      };
      stepReverse();
    };

    const playVideo = () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      video.play().catch(() => {
        // Handle autoplay policies if necessary, though muted usually works
      });
    };

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 70%", // Triggers when the top of the lotus section hits 70% down the viewport
      end: "bottom top", 
      onEnter: () => playVideo(),       // Scroll Down -> Play
      onLeaveBack: () => reverseVideo(), // Scroll Up (leaving) -> Reverse
      // onEnterBack: () => playVideo(),    // Optional: if they scroll back up from bottom?
    });

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0"
    >
      <video
        ref={videoRef}
        src="lotus.webm"
        muted
        playsInline
        preload="auto"
        className="w-[600px] max-w-full opacity-60 mix-blend-multiply filter contrast-125 grayscale"
        style={{
          // Use mix-blend-multiply to blend white/transparent backgrounds into the paper texture
        }}
      />
    </div>
  );
};

export default LotusScroll;