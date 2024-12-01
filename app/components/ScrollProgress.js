'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-50"
        style={{ scaleX }}
      />
      <motion.div
        className="fixed bottom-6 left-6 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-sm font-medium z-50"
        style={{
          opacity: scrollYProgress,
        }}
      >
        <motion.div
          style={{
            rotate: scrollYProgress.get() * 360,
          }}
        >
          <svg
            className="w-6 h-6 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 11l7-7 7 7M5 19l7-7 7 7"
            />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
} 