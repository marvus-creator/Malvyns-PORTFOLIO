import React from 'react';

interface LiveProjectButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ href, onClick, className = '' }) => {
  const baseClasses = `inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-all duration-300 hover:bg-[#D7E2EA]/10 active:scale-95 px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base ${className}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        Live Project
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      Live Project
    </button>
  );
};
