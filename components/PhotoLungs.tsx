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

    // 2. Parallax Effect on Scroll
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

    // 3. Kasavu Momentum Physics Engine
    // We track velocity separately to create a "drift" effect
    let currentVelocity = 0;
    let rotation1 = 0;
    let rotation2 = 0;
    
    // Capture scroll velocity
    const velocityTrigger = ScrollTrigger.create({
        trigger: document.body,
        onUpdate: (self) => {
            const v = self.getVelocity();
            // "Kick" the velocity based on scroll speed, capped to avoid chaos
            // 0.002 is the sensitivity factor
            const targetV = Math.max(Math.min(v, 1000), -1000) * 0.002;
            
            // Apply this kick to our running velocity
            currentVelocity = targetV;
        }
    });

    // Run physics loop (60fps) to apply friction
    const physicsTick = () => {
        // Apply velocity to rotations
        rotation1 += currentVelocity;       // Layer 1 moves clockwise
        rotation2 -= currentVelocity * 1.5; // Layer 2 moves counter-clockwise and faster

        // Friction: Multiply by < 1 to slowly decay speed (0.95 = Heavy Silk)
        currentVelocity *= 0.95; 

        // Apply transforms
        if (border1) border1.style.transform = `rotate(${rotation1}deg)`;
        if (border2) border2.style.transform = `rotate(${rotation2}deg)`;
    };

    gsap.ticker.add(physicsTick);

    return () => {
      breatheAnim.kill();
      parallaxAnim.kill();
      velocityTrigger.kill();
      gsap.ticker.remove(physicsTick);
    };
  }, []);

  return (
    // Outer Container (Overflow Visible for borders)
    <div ref={outerContainerRef} className={`relative ${className}`}>
        
      {/* Kasavu Border 1 (Outer, Slow) */}
      <div 
        ref={border1Ref}
        className="absolute -inset-4 border border-dashed border-antique-gold opacity-60 z-0 pointer-events-none will-change-transform"
        style={{ borderWidth: '1px' }}
      ></div>

      {/* Kasavu Border 2 (Inner, Fast) */}
      <div 
        ref={border2Ref}
        className="absolute -inset-2 border border-dashed border-antique-gold opacity-80 z-0 pointer-events-none will-change-transform"
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