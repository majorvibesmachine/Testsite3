import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridLineProps } from '../types';

gsap.registerPlugin(ScrollTrigger);

const StochasticLine: React.FC<GridLineProps> = ({ orientation, position, length = "100%" }) => {
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    // Stochastic Logic: Determine a random decay point for this specific line
    // Some lines vanish early (20%), some late (90%)
    const randomDecayPoint = 20 + Math.random() * 70; 
    
    // Timeline linked to scroll
    // We adjust the triggers to ensure the effect is felt immediately
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body, // Linked to global page scroll
        start: "top top",
        end: `bottom ${100 - randomDecayPoint}%`, 
        scrub: 1.5 // Smooth scrubbing
      }
    });

    // The Metamorphosis: Black -> Gold -> Dashed -> Dissolve
    // ADJUSTMENT: Shortened the duration of the initial transformations relative to the fade out.
    // Previously 0.3/0.3/0.4. Now 0.05/0.1/0.85.
    // This makes the line turn gold and dotted almost immediately upon scrolling, 
    // then spends the majority of the scroll distance slowly fading out.
    tl.to(line, { stroke: "#D4AF37", duration: 0.05 }) // Turn Gold instantly
      .to(line, { strokeDasharray: "4, 12", duration: 0.1 }, "<") // Become dashed simultaneously
      .to(line, { opacity: 0, duration: 0.85 }, ">"); // Long dissolve tail

    return () => {
      tl.kill();
    };
  }, []);

  const isVertical = orientation === 'vertical';

  return (
    <div className={`absolute pointer-events-none z-10 ${position}`} 
         style={{ 
           width: isVertical ? '1px' : length, 
           height: isVertical ? length : '1px' 
         }}>
      <svg width="100%" height="100%" className="overflow-visible">
        <line 
          ref={lineRef}
          x1="0" y1="0" 
          x2={isVertical ? "0" : "100%"} 
          y2={isVertical ? "100%" : "0"} 
          stroke="#1a1a1a" 
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default StochasticLine;