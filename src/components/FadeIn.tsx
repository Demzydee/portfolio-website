import { motion, Variants, useReducedMotion } from 'framer-motion';
import { ElementType, ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: ElementType;
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className,
}: FadeInProps) {
  const reducedMotion = useReducedMotion();
  const MotionTag = motion.create(as as any);

  const variants: Variants = {
    hidden: { opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : x, y: reducedMotion ? 0 : y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '50px', amount: 0 }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
