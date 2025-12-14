import React from 'react';

const NoiseOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden mix-blend-multiply opacity-[0.08]">
      <div className="w-[200%] h-[200%] -top-[50%] -left-[50%] absolute animate-noise bg-noise"></div>
    </div>
  );
};

export default NoiseOverlay;