import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ParallaxImageProps } from '../types';

gsap.registerPlugin(ScrollTrigger);

const PhotoLungs: React.FC<ParallaxImageProps> = ({ src, alt, className = "" }) => {
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const border1Ref = useRef<HTMLDivElement>(null);
  const border2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const container = containerRef.current;
    const border1 = border1Ref.current;
    const border2 = border2Ref.current;
    
    if (!img || !container) return;

    // 1. "Photo Lungs" - Idle Breathing Animation
    const breatheAnim = gsap.to(img, {
      scale: 1.05,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 2. Parallax Effect on Scroll (Image moves inside mask)
    const parallaxAnim = gsap.fromTo(img, 
      { y: "-10%" },
      {
        y: "10%",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        ease: "none"
      }
    );

    // 3. Kasavu Momentum Borders
    let rotation1 = 0;
    let rotation2 = 0;
    
    const updateBorders = (self: ScrollTrigger) => {
        // Get velocity (pixels per second approx)
        let v = self.getVelocity();
        // Cap the velocity so it doesn't spin wildly (Max 300)
        const cappedV = Math.max(Math.min(v, 300), -300);
        
        // Add momentum to rotation (Momentum factor)
        // Border 1: Clockwise
        rotation1 += cappedV * 0.002; 
        // Border 2: Counter-Clockwise (faster)
        rotation2 -= cappedV * 0.003;

        if (border1) gsap.set(border1, { rotation: rotation1 });
        if (border2) gsap.set(border2, { rotation: rotation2 });
    };

    const borderScrollTrigger = ScrollTrigger.create({
        trigger: document.body, // Track global scroll for border momentum
        onUpdate: updateBorders
    });

    return () => {
      breatheAnim.kill();
      parallaxAnim.kill();
      borderScrollTrigger.kill();
    };
  }, []);

  return (
    // Outer Container (Overflow Visible for borders)
    <div ref={outerContainerRef} className={`relative ${className}`}>
        
      {/* Kasavu Border 1 (Outer, Slow) */}
      <div 
        ref={border1Ref}
        className="absolute -inset-4 border border-dashed border-antique-gold opacity-60 z-0 pointer-events-none"
        style={{ borderWidth: '1px' }}
      ></div>

      {/* Kasavu Border 2 (Inner, Fast) */}
      <div 
        ref={border2Ref}
        className="absolute -inset-2 border border-dashed border-antique-gold opacity-80 z-0 pointer-events-none"
        style={{ borderWidth: '0.5px' }}
      ></div>

      {/* Image Mask (Overflow Hidden) */}
      <div ref={containerRef} className="relative overflow-hidden w-full h-full z-10">
        <img 
            ref={imgRef}
            src={src} 
            alt={alt} 
            className="w-full h-[120%] object-cover object-center origin-center will-change-transform"
        />
      </div>
    </div>
  );
};

export default PhotoLungs;