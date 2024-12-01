'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

export function LoadingDots() {
  const dotVariants = {
    hidden: { y: 0 },
    visible: { y: -10 },
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-3 h-3 bg-purple-600 rounded-full"
          variants={dotVariants}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
}

export function LoadingPulse() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="w-16 h-16 bg-purple-600 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

export function LoadingBar() {
  return (
    <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-full">
      <motion.div
        className="h-full bg-purple-600"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
    </div>
  );
} 