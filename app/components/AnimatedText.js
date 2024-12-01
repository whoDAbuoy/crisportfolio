'use client';

import { motion } from 'framer-motion';

const letterVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.5,
    filter: 'blur(10px)',
    textShadow: '0 0 0px rgba(124, 58, 237, 0)'
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    textShadow: '0 0 20px rgba(124, 58, 237, 0.8), 0 0 40px rgba(124, 58, 237, 0.4), 0 0 60px rgba(124, 58, 237, 0.2)',
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200
    }
  },
  hover: {
    scale: 1.2,
    y: -5,
    transition: { 
      type: "spring",
      damping: 10,
      stiffness: 300
    }
  }
};

const wordVariants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      staggerChildren: 0.03,
      delayChildren: 0.02
    }
  }
};

export function AnimatedText({
  text,
  className = '',
  once = true,
  delay = 0,
  color = 'inherit',
}) {
  const words = text.split(' ');

  return (
    <motion.div
      className={`${className} transition-colors duration-300 w-full break-words overflow-hidden`}
      style={{ color }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay,
          },
        },
      }}
    >
      <div className="flex flex-wrap justify-center items-center gap-x-[0.25em] gap-y-[0.125em]">
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className="transition-colors duration-300 inline-flex whitespace-nowrap"
          >
            {word.split('').map((char, j) => (
              <motion.span
                key={j}
                className="inline-block origin-bottom transition-colors duration-300 hover:text-purple-600 dark:hover:text-purple-400"
                variants={letterVariants}
                whileHover="hover"
                style={{
                  backfaceVisibility: 'hidden',
                  perspective: '1000px'
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export function AnimatedTitle({
  text,
  className = '',
  element: Element = 'h1',
}) {
  return (
    <Element className={`${className} w-full text-center`}>
      <AnimatedText text={text} />
    </Element>
  );
}

export function AnimatedParagraph({
  text,
  className = '',
  delay = 0.2,
}) {
  return (
    <div className={`${className} w-full max-w-prose mx-auto`}>
      <AnimatedText text={text} delay={delay} />
    </div>
  );
}

export function TypewriterText({
  text,
  className = '',
  cursor = true,
}) {
  const characters = text.split('');

  return (
    <div className={`${className} w-full text-center overflow-hidden`}>
      <div className="inline-flex flex-wrap justify-center items-center">
        {characters.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.1,
              delay: i * 0.05,
            }}
          >
            {char}
          </motion.span>
        ))}
        {cursor && (
          <motion.span
            className="inline-block w-0.5 h-[1em] bg-current"
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        )}
      </div>
    </div>
  );
} 