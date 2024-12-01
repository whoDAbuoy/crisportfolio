'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const commands = [
  { id: 'home', name: 'Go to Home', shortcut: 'g h', action: () => window.location.href = '#' },
  { id: 'projects', name: 'View Projects', shortcut: 'g p', action: () => window.location.href = '#projects' },
  { id: 'skills', name: 'View Skills', shortcut: 'g s', action: () => window.location.href = '#skills' },
  { id: 'blog', name: 'Read Blog', shortcut: 'g b', action: () => window.location.href = '#blog' },
  { id: 'contact', name: 'Contact Me', shortcut: 'g c', action: () => window.location.href = '#contact' },
  { id: 'theme', name: 'Toggle Theme', shortcut: 'cmd k', action: () => document.documentElement.classList.toggle('dark') },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = commands.filter((command) =>
    command.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle palette with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (!isOpen) return;

      // Navigate with arrow keys
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }

      // Execute command with Enter
      if (e.key === 'Enter') {
        e.preventDefault();
        filteredCommands[selectedIndex]?.action();
        setIsOpen(false);
      }

      // Close with Escape
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    className="flex-1 bg-transparent border-0 focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400"
                    placeholder="Search commands..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setSelectedIndex(0);
                    }}
                  />
                  <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded">
                    esc
                  </kbd>
                </div>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {filteredCommands.map((command, index) => (
                  <button
                    key={command.id}
                    className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      index === selectedIndex
                        ? 'bg-gray-100 dark:bg-gray-700'
                        : ''
                    }`}
                    onClick={() => {
                      command.action();
                      setIsOpen(false);
                    }}
                  >
                    <span className="text-gray-900 dark:text-white">
                      {command.name}
                    </span>
                    <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded">
                      {command.shortcut}
                    </kbd>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 