'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { icon: '🏠', label: 'Home', href: '#' },
  { icon: '💼', label: 'Projects', href: '#projects' },
  { icon: '💪', label: 'Skills', href: '#skills' },
  { icon: '📝', label: 'Blog', href: '#blog' },
  { icon: '📞', label: 'Contact', href: '#contact' },
];

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <motion.button
        className="w-12 h-12 bg-purple-600 rounded-full text-white flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 left-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 space-y-2">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-gray-900 dark:text-white">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 