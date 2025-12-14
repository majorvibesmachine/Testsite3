import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InkTextProps } from '../types';

gsap.registerPlugin(ScrollTrigger);

const InkText: React.FC<InkTextProps> = ({ text, className = "", as = 'p' }) => {
  const elementRef = useRef<any>(null);
  const Component = as;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Initial State
    gsap.set(el, { 
      filter: "blur(4px)", 
      color: "#555555",
      opacity: 0 
    });

    // "Ink Dry" Animation
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%", // Enters viewport
        end: "top 50%",   // Hits reading line
        scrub: 1,         // Ties to scroll position
      },
      filter: "blur(0px)",
      color: "#1a1a1a",
      opacity: 1,
      ease: "power2.out"
    });

  }, []);

  return (
    <Component ref={elementRef} className={`will-change-[filter,color,opacity] ${className}`}>
      {text}
    </Component>
  );
};

export default InkText;