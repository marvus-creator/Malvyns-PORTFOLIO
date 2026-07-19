import React, { useState, useEffect, useRef } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance to the bounding box edges
      let distX = 0;
      if (e.clientX < rect.left) {
        distX = rect.left - e.clientX;
      } else if (e.clientX > rect.right) {
        distX = e.clientX - rect.right;
      }

      let distY = 0;
      if (e.clientY < rect.top) {
        distY = rect.top - e.clientY;
      } else if (e.clientY > rect.bottom) {
        distY = e.clientY - rect.bottom;
      }

      const distanceToEdge = Math.sqrt(distX * distX + distY * distY);

      if (distanceToEdge <= padding) {
        setIsActive(true);
        // Calculate offset from center, divided by the strength factor
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        
        // Ensure strength is not 0 to avoid division by zero
        const divisor = strength || 1;
        setPosition({
          x: dx / divisor,
          y: dy / divisor,
        });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, strength]);

  const style: React.CSSProperties = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: isActive ? activeTransition : inactiveTransition,
    willChange: 'transform',
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
};
export default Magnet;
