'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './components/ThemeToggle';
import ProjectModal from './components/ProjectModal';
import Testimonials from './components/Testimonials';
import BlogSection from './components/BlogSection';
import { AnimatedTitle, AnimatedText, TypewriterText } from './components/AnimatedText';
import { useToast } from './components/Toast';
import Image from 'next/image';

// Project data
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution built with Next.js and Stripe',
    longDescription: 'A full-featured e-commerce platform with real-time inventory management, secure payments, and an intuitive admin dashboard.',
    tags: ['Next.js', 'React', 'Stripe', 'Tailwind'],
    image: '/projects/ecommerce.png',
    features: [
      'Real-time inventory tracking',
      'Secure payment processing',
      'Admin dashboard',
      'Order management',
      'Analytics and reporting'
    ],
    liveUrl: 'https://ecommerce-demo.com',
    githubUrl: 'https://github.com/crispusosano/ecommerce'
  },
  {
    id: 2,
    title: 'AI Content Generator',
    description: 'AI-powered content generation using OpenAI GPT-3',
    longDescription: "An intelligent content generation platform that leverages OpenAI's GPT-3 to create high-quality, contextually relevant content.",
    tags: ['Python', 'FastAPI', 'React', 'OpenAI'],
    image: '/projects/ai-generator.png',
    features: [
      'Multiple content types',
      'Custom training models',
      'API integration',
      'Content optimization',
      'Export capabilities'
    ],
    liveUrl: 'https://ai-content.demo.com',
    githubUrl: 'https://github.com/crispusosano/ai-content'
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'Real-time task management with collaborative features',
    longDescription: 'A collaborative task management application with real-time updates, team workspaces, and advanced project tracking capabilities.',
    tags: ['React', 'Firebase', 'Material-UI', 'TypeScript'],
    image: '/projects/task-app.png',
    features: [
      'Real-time collaboration',
      'Team workspaces',
      'Task dependencies',
      'Progress tracking',
      'Resource management'
    ],
    liveUrl: 'https://taskapp-demo.com',
    githubUrl: 'https://github.com/crispusosano/taskapp'
  }
];

// Skills data
const skills = [
  { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { name: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
  { name: 'DevOps', items: ['Docker', 'AWS', 'CI/CD', 'Git'] },
  { name: 'Tools', items: ['VS Code', 'Figma', 'Postman', 'Jest'] }
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('_replyto');
    const message = formData.get('message');

    if (name.length < 2) {
      addToast('Please enter a valid name', 'error');
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      addToast('Please enter a valid email address', 'error');
      return;
    }

    if (message.length < 10) {
      addToast('Message must be at least 10 characters long', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        form.reset();
        addToast('Message sent successfully! I\'ll get back to you soon.', 'success');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      addToast('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <ThemeToggle />
      
      {/* Navigation */}
      <nav className="fixed w-full bg-white/50 dark:bg-black/50 backdrop-blur-sm z-50 px-4 py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
            Crispus Osano
          </Link>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link href="#projects" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Projects
            </Link>
            <Link href="#skills" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Skills
            </Link>
            <Link href="#testimonials" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Testimonials
            </Link>
            <Link href="#blog" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Blog
            </Link>
            <Link href="#contact" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Contact
            </Link>
            
            <a 
              href="/resume.pdf" 
              target="_blank"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Resume
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedTitle
            text="Full Stack Developer"
            className="text-4xl md:text-6xl font-bold mb-4"
          />
          
          <TypewriterText
            text="Building Modern Web Solutions"
            className="text-3xl md:text-5xl font-bold mb-8 block"
          />
          
          <div className="mb-12 px-4 md:px-0">
            <AnimatedText
              text="I create scalable applications with cutting-edge technology."
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300"
              delay={0.5}
            />
            <AnimatedText
              text="Specialized in React, Node.js, and cloud architecture."
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300"
              delay={1.5}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link 
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 text-center"
            >
              Get in Touch
            </Link>
            
            <Link
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 border-2 border-purple-600 rounded-lg hover:bg-purple-600/20 transition-all duration-300 text-center"
            >
              View Projects
            </Link>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <AnimatedTitle
            text="Featured Projects"
            className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center"
            element="h2"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:transform hover:scale-105 transition-all duration-300 cursor-pointer h-full"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <AnimatedTitle
            text="Skills & Technologies"
            className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center"
            element="h2"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
            {skills.map((category) => (
              <div key={category.name} className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg h-full">
                <h3 className="text-xl md:text-2xl font-bold mb-6">{category.name}</h3>
                
                <div className="space-y-3">
                  {category.items.map((skill) => (
                    <div
                      key={skill}
                      className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Blog Section */}
      <BlogSection />

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-3xl mx-auto">
          <AnimatedTitle
            text="Get in Touch"
            className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center"
            element="h2"
          />
          
          <form 
            action="https://formspree.io/f/xjkvpqyw"
            method="POST"
            className="space-y-6 md:space-y-8 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                required
                minLength={2}
                disabled={isSubmitting}
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="_replyto"
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                required
                disabled={isSubmitting}
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                rows={6}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                required
                minLength={10}
                disabled={isSubmitting}
                placeholder="Your message here..."
              />
            </div>

            {/* Anti-spam honeypot field */}
            <input type="text" name="_gotcha" style={{ display: 'none' }} />
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <svg 
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send Message</span>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 border-t border-gray-200 dark:border-gray-800 pt-8 md:pt-12">
          <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
            © 2023 Crispus Osano. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <a 
              href="https://github.com" 
              target="_blank" 
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
