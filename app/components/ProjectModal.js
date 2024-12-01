'use client';

import { useEffect, useRef } from 'react';

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (modalRef.current === e.target) onClose();
  };

  if (!project) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Project Image */}
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-6">
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            {project.features && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            <div className="flex gap-4 pt-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  View Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 border-2 border-purple-600 rounded-lg hover:bg-purple-600/20 transition-colors"
                >
                  View Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 