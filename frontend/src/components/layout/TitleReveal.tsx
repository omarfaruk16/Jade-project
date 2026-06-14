'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TitleRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function TitleReveal({ children, className, delay = 0 }: TitleRevealProps) {
  return (
    <div className={className} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
          delay: delay
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}