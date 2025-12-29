import React from 'react';

const Logo = ({ className }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Dış Altıgen (Hexagon) */}
      <path
        d="M50 5L93.3 30V80L50 105L6.7 80V30L50 5Z"
        className="fill-medic-card stroke-medic-primary"
        strokeWidth="4"
      />

      {/* İç Nabız Çizgisi (Pulse) */}
      <path
        d="M20 50H35L42.5 35L57.5 65L65 50H80"
        className="stroke-white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* AI Noktaları (Neural Nodes) */}
      <circle cx="42.5" cy="35" r="4" className="fill-medic-secondary animate-pulse" />
      <circle cx="57.5" cy="65" r="4" className="fill-medic-secondary animate-pulse" />
    </svg>
  );
};

export default Logo;