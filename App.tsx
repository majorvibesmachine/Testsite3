import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import NoiseOverlay from './components/NoiseOverlay';
import CandleCursor from './components/CandleCursor';
import InkText from './components/InkText';
import PhotoLungs from './components/PhotoLungs';
import StochasticLine from './components/StochasticLine';
import RSVPModal from './components/RSVPModal';
import LotusScroll from './components/LotusScroll';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  // Parallax for the ampersand in Hero
  useEffect(() => {
    gsap.to(".hero-ampersand", {
      y: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-kasavu-cream text-ink-black selection:bg-antique-gold selection:text-white">
      <NoiseOverlay />
      <CandleCursor />
      
      {/* RSVP Modal */}
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />

      {/* --- HERO SECTION --- */}
      <section className="hero-section relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Mobile Center Crop / Object Fit */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover filter contrast-[1.1] brightness-90"
            src="hero.mp4"
          />
          {/* Tint Overlay */}
          <div className="absolute inset-0 bg-ink-black opacity-30 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 text-center text-kasavu-cream mix-blend-difference px-4">
          <h1 className="font-birdhouse text-[15vw] md:text-[18vw] leading-[0.8] tracking-tight text-shadow-lg">
            <div>Karthika</div>
            <div className="hero-ampersand font-serif italic text-antique-gold text-[8vw] my-[-2vw]">&</div>
            <div>Vaibhav</div>
          </h1>
          <div className="mt-8 font-sans text-xs tracking-[0.3em] uppercase opacity-80">
            The Union
          </div>
        </div>
        
        {/* Gradient Fade to Content */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-kasavu-cream to-transparent z-20"></div>
      </section>

      {/* --- NARRATIVE GRID SECTION --- */}
      <section className="relative w-full max-w-screen-2xl mx-auto py-24 px-6 md:px-12">
        
        {/* The Deconstructed Mondrian Grid (Stochastic Decay Lines) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          {/* Vertical Lines */}
          <StochasticLine orientation="vertical" position="left-[10%]" length="80%" />
          <StochasticLine orientation="vertical" position="left-[50%]" length="100%" />
          <StochasticLine orientation="vertical" position="right-[15%]" length="60%" />
          
          {/* Horizontal Lines */}
          <StochasticLine orientation="horizontal" position="top-[15%]" length="40%" />
          <StochasticLine orientation="horizontal" position="top-[45%]" length="100%" />
          <StochasticLine orientation="horizontal" position="top-[75%]" length="30%" />
        </div>

        {/* Content Flow */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-y-48 gap-x-12">
          
          {/* BLOCK 1: Text Left, Image Right */}
          <div className="md:col-span-5 md:col-start-2 flex flex-col justify-center">
            <InkText 
              as="h2" 
              text="From the gardens of Singapore to the skylines of Dubai." 
              className="font-serif text-3xl md:text-5xl leading-tight mb-8"
            />
            <InkText 
              as="p" 
              text="A journey mapped in silence, now culminating in a joyous union amidst the backwaters." 
              className="font-serif text-lg md:text-xl italic text-gray-600"
            />
          </div>
          
          <div className="md:col-span-4 md:col-start-8 mt-12 md:mt-0 relative">
             {/* Image Peeking / Offset */}
            <div className="md:translate-y-12">
              <PhotoLungs src="photo1.jpg" alt="Texture Shot" className="aspect-[3/4]" />
              <p className="absolute -bottom-8 -left-8 font-sans text-[0.6rem] tracking-widest -rotate-90 origin-top-right text-antique-gold">
                FIG. 01 — ORIGIN
              </p>
            </div>
          </div>

          {/* BLOCK 2: Image Left (Wide), Text Right */}
          <div className="md:col-span-6 md:col-start-1 relative">
             <PhotoLungs src="photo2.jpg" alt="Silhouette" className="aspect-video" />
             <div className="absolute top-4 right-4 md:-right-12 w-24 h-[1px] bg-antique-gold"></div>
          </div>

          <div className="md:col-span-4 md:col-start-8 flex flex-col justify-end">
             <div className="border-l border-antique-gold pl-6 py-4">
              <InkText 
                as="p" 
                text="We invite you to witness the beginning of our forever. Not as spectators, but as part of the atmosphere." 
                className="font-serif text-2xl md:text-3xl leading-snug"
              />
            </div>
          </div>
          
          {/* BLOCK 3: Centerpiece */}
           <div className="md:col-span-8 md:col-start-3 text-center py-24">
             <PhotoLungs src="candid.jpg" alt="Portrait" className="aspect-[4/5] md:w-1/2 mx-auto mb-12 grayscale hover:grayscale-0 transition-all duration-1000" />
             
             <InkText 
                as="div" 
                text="AUGUST 20TH, 2026" 
                className="font-sans text-sm md:text-base tracking-[0.4em] mb-2"
              />
              <InkText 
                as="div" 
                text="KRISHNA BEACH RESORT, KERALA" 
                className="font-sans text-xs md:text-sm tracking-[0.2em] text-gray-500"
              />
           </div>

        </div>
      </section>

      {/* --- FINALE / RSVP --- */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center pb-24">
        {/* Lotus Animation Background */}
        <LotusScroll />

        {/* Minimalist Divider */}
        <div className="relative z-10 w-[1px] h-24 bg-ink-black mb-12"></div>
        
        <p className="relative z-10 font-serif text-xl italic mb-8">The Narrative Continues</p>
        
        <button 
          onClick={() => setIsRSVPOpen(true)}
          className="relative z-10 group px-12 py-4 overflow-hidden"
        >
          <span className="relative z-10 font-sans text-sm tracking-[0.3em] group-hover:text-kasavu-cream transition-colors duration-300">
            RSVP
          </span>
          {/* Button Hover Fill Effect */}
          <div className="absolute inset-0 bg-ink-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-ink-black group-hover:opacity-0 transition-opacity"></div>
        </button>

         {/* Footer Metadata */}
         <div className="absolute bottom-8 w-full text-center z-10">
            <p className="font-sans text-[0.5rem] tracking-[0.5em] opacity-40">EST. 2026 — KERALA</p>
         </div>
      </section>
    </div>
  );
};

export default App;