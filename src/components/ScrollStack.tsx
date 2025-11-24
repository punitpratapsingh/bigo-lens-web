import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollStackItemProps {
  children: React.ReactNode;
  className?: string;
}

interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemSpacing?: number;
  triggerOffset?: number;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`scroll-stack-item ${className}`}>
      {children}
    </div>
  );
};

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemSpacing = 100,
  triggerOffset = 0.1
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [items, setItems] = useState<React.ReactElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Extract children and ensure they are ScrollStackItem components
  useEffect(() => {
    const childrenArray = React.Children.toArray(children) as React.ReactElement[];
    const validItems = childrenArray.filter(child => 
      child.type === ScrollStackItem
    );
    setItems(validItems);
  }, [children]);

  // Calculate progress for each item
  const getItemProgress = useCallback((index: number) => {
    const totalItems = items.length;
    if (totalItems === 0) return 0;

    const start = index / totalItems;
    const end = (index + 1) / totalItems;
    
    return useTransform(
      scrollYProgress,
      [start - triggerOffset, start, end, end + triggerOffset],
      [0, 1, 1, 0]
    );
  }, [items.length, scrollYProgress, triggerOffset]);

  // Spring-based transforms for smooth animations
  const springConfig = { stiffness: 300, damping: 30 };
  
  // Transform values for different effects
  const getItemTransform = (index: number, progress: any) => {
    const scale = useTransform(progress, [0, 1], [0.8, 1], { clamp: true });
    const y = useTransform(progress, [0, 1], [50, 0], { clamp: true });
    const opacity = useTransform(progress, [0, 1], [0.3, 1], { clamp: true });
    const rotateX = useTransform(progress, [0, 1], [15, 0], { clamp: true });
    
    return {
      scale: useSpring(scale, springConfig),
      y: useSpring(y, springConfig),
      opacity: useSpring(opacity, springConfig),
      rotateX: useSpring(rotateX, springConfig)
    };
  };

  // Update active index based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const totalItems = items.length;
      if (totalItems === 0) return;

      const progressPerItem = 1 / totalItems;
      const newActiveIndex = Math.min(
        Math.floor(latest / progressPerItem),
        totalItems - 1
      );
      
      setActiveIndex(newActiveIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress, items.length]);

  return (
    <div 
      ref={containerRef}
      className={`scroll-stack-container relative ${className}`}
      style={{
        minHeight: `${items.length * itemSpacing}vh`
      }}
    >
      {/* Background Progress Indicator */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col items-center space-y-4">
          {items.map((_, index) => {
            const progress = getItemProgress(index);
            const dotScale = useTransform(progress, [0, 1], [0.6, 1.2]);
            const dotOpacity = useTransform(progress, [0, 1], [0.3, 1]);
            
            return (
              <motion.div
                key={index}
                className="relative"
                style={{
                  scale: useSpring(dotScale, springConfig),
                  opacity: useSpring(dotOpacity, springConfig)
                }}
              >
                <div 
                  className={`w-3 h-3 rounded-full border-2 ${
                    index === activeIndex 
                      ? 'border-cyan-400 bg-cyan-400' 
                      : 'border-white/30'
                  } transition-colors duration-300`}
                />
                {index === activeIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-cyan-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stack Items */}
      <div className="scroll-stack-items">
        {items.map((item, index) => {
          const progress = getItemProgress(index);
          const transforms = getItemTransform(index, progress);
          
          return (
            <motion.div
              key={index}
              className={`scroll-stack-item-wrapper sticky top-0 h-screen flex items-center ${
                index === activeIndex ? 'z-30' : 'z-20'
              }`}
              style={{
                top: `${index * itemSpacing}vh`,
                height: `${itemSpacing}vh`
              }}
            >
              <motion.div
                className="w-full max-w-4xl mx-auto px-6"
                style={{
                  scale: transforms.scale,
                  y: transforms.y,
                  opacity: transforms.opacity,
                  rotateX: transforms.rotateX,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Active item highlight effect */}
                {index === activeIndex && (
                  <motion.div
                    className="absolute -inset-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
                
                {/* Content */}
                <div className="relative z-10">
                  {React.cloneElement(item, {
                    className: `${item.props.className || ''} ${
                      index === activeIndex ? 'active' : ''
                    }`
                  })}
                </div>

                {/* Connection lines between items */}
                {index < items.length - 1 && (
                  <motion.div
                    className="absolute left-1/2 -bottom-24 transform -translate-x-1/2 w-0.5 h-20 bg-gradient-to-b from-cyan-400/50 to-transparent"
                    style={{
                      opacity: transforms.opacity
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-cyan-400 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2"
        >
          <div className="text-sm font-medium">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50"
        style={{ scaleX: scrollYProgress }}
      >
        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" />
      </motion.div>
    </div>
  );
};

export default ScrollStack;