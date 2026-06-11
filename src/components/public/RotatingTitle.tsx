import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const TITLES = ['Consultor Zendesk', 'Especialista em CX', 'Arquiteto de Soluções', 'Fundador'];

export function RotatingTitle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TITLES.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-flex h-[1.2em] min-w-[280px] items-center overflow-hidden align-bottom md:min-w-[360px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={TITLES[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center text-gold"
        >
          {TITLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
