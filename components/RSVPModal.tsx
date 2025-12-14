import React, { useState } from 'react';
import { X } from 'lucide-react'; // Assuming usage of a standard icon library, or replace with SVG

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-kasavu-cream transition-opacity duration-500">
      <div className="absolute top-8 right-8 cursor-pointer group" onClick={onClose}>
        <span className="font-sans text-xs tracking-[0.2em] text-ink-black group-hover:text-antique-gold transition-colors">CLOSE</span>
      </div>

      <div className="w-full max-w-md p-8 relative">
        {status === 'success' ? (
           <div className="text-center">
             <h2 className="font-serif text-3xl italic text-ink-black mb-4">It is noted.</h2>
             <p className="font-sans text-xs tracking-widest text-antique-gold">WE AWAIT YOU IN KERALA.</p>
           </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-2">
              <label className="block font-sans text-[0.6rem] tracking-[0.25em] text-antique-gold">NOMENCLATURE</label>
              <input 
                required 
                type="text" 
                placeholder="Full Name"
                className="w-full bg-transparent border-b border-gray-300 py-2 font-serif text-2xl text-ink-black focus:border-ink-black focus:outline-none placeholder-gray-300 transition-colors"
              />
            </div>
             <div className="space-y-2">
              <label className="block font-sans text-[0.6rem] tracking-[0.25em] text-antique-gold">DIGITAL CONTACT</label>
              <input 
                required 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-gray-300 py-2 font-serif text-2xl text-ink-black focus:border-ink-black focus:outline-none placeholder-gray-300 transition-colors"
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-4 bg-ink-black text-kasavu-cream font-sans text-xs tracking-[0.3em] hover:bg-antique-gold transition-colors duration-500"
            >
              {status === 'sending' ? 'TRANSMITTING...' : 'CONFIRM PRESENCE'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RSVPModal;