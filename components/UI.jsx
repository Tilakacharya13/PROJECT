import React, { useRef, useEffect } from 'react';
import { motion, animate, useInView, useMotionValue, useMotionTemplate } from 'framer-motion';

// Counter Component
export const CountUp = ({ to, prefix = '', suffix = '', decimals = 0, separator = false }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !isInView) return;

    const controls = animate(0, to, {
      duration: 2.5,
      onUpdate(value) {
        let formatted = value.toFixed(decimals);
        if (separator) {
             const parts = formatted.split('.');
             parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
             formatted = parts.join('.');
             if (to === 9.180 && decimals === 3) {
                 formatted = value.toFixed(3);
             }
        }
        node.textContent = `${prefix}${formatted}${suffix}`;
      },
      ease: [0.34, 1.56, 0.64, 1] // Custom bouncy ease
    });

    return () => controls.stop();
  }, [to, prefix, suffix, decimals, separator, isInView]);

  return <span ref={nodeRef} className="tabular-nums" />;
};

// Spotlight Button Component
export const SpotlightButton = ({ 
    children, 
    className = "", 
    spotlightColor = "rgba(255,255,255,0.25)" 
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.button
            onMouseMove={handleMouseMove}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative group overflow-hidden ${className}`}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: useMotionTemplate`radial-gradient(100px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`,
                }}
            />
            <div className="relative z-10 flex items-center gap-2">
                {children}
            </div>
        </motion.button>
    );
};
