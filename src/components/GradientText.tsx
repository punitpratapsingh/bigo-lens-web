import React, { useEffect, useRef, useState } from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors = ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"],
  animationSpeed = 3,
  showBorder = false,
  className = ""
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [gradientId] = useState(`gradient-${Math.random().toString(36).substr(2, 9)}`);
  const [borderGradientId] = useState(`border-gradient-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!textRef.current) return;

    const updateGradient = () => {
      const gradient = document.getElementById(gradientId) as SVGLinearGradientElement;
      const borderGradient = document.getElementById(borderGradientId) as SVGLinearGradientElement;
      
      if (gradient && borderGradient) {
        const now = Date.now();
        const cycleDuration = animationSpeed * 1000;
        const progress = (now % cycleDuration) / cycleDuration;
        
        // Animate gradient stops
        gradient.querySelectorAll('stop').forEach((stop, index) => {
          const stopProgress = (index / (colors.length - 1) + progress) % 1;
          const colorIndex = Math.floor(stopProgress * colors.length);
          const nextColorIndex = (colorIndex + 1) % colors.length;
          const colorProgress = (stopProgress * colors.length) % 1;
          
          // Simple color interpolation
          stop.setAttribute('stop-color', colors[colorIndex]);
        });

        // Sync border gradient with text gradient
        borderGradient.querySelectorAll('stop').forEach((stop, index) => {
          const stopProgress = (index / (colors.length - 1) + progress) % 1;
          const colorIndex = Math.floor(stopProgress * colors.length);
          stop.setAttribute('stop-color', colors[colorIndex]);
        });
      }

      requestAnimationFrame(updateGradient);
    };

    const animationFrame = requestAnimationFrame(updateGradient);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [colors, animationSpeed, gradientId, borderGradientId]);

  return (
    <span 
      ref={textRef}
      className={`relative inline-block ${className}`}
    >
      {/* SVG for animated gradient */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            {colors.map((color, index) => (
              <stop 
                key={index}
                offset={`${(index / (colors.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </linearGradient>
          <linearGradient id={borderGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            {colors.map((color, index) => (
              <stop 
                key={index}
                offset={`${(index / (colors.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </linearGradient>
        </defs>
      </svg>

      {/* Border (if enabled) */}
      {showBorder && (
        <span 
          className="absolute -inset-2 rounded-lg opacity-20"
          style={{
            background: `linear-gradient(45deg, ${colors.join(', ')})`,
            backgroundSize: '400% 400%',
            animation: `gradientShift ${animationSpeed * 2}s ease infinite`
          }}
        />
      )}

      {/* Main text with gradient */}
      <span 
        style={{ 
          background: `url(#${gradientId})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          backgroundSize: '200% 200%',
        }}
        className="relative z-10"
      >
        {children}
      </span>

      {/* CSS Animation for border */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </span>
  );
};

export default GradientText;