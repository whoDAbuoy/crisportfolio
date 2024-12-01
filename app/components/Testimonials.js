'use client';

import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO at TechStart',
    image: '/testimonials/sarah.jpg',
    content: 'Crispus is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.',
    company: 'TechStart'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Lead Developer',
    image: '/testimonials/michael.jpg',
    content: 'Working with Crispus was a great experience. He brings both technical expertise and creative solutions to every project.',
    company: 'InnovateLabs'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    image: '/testimonials/emily.jpg',
    content: "Crispus's ability to understand complex requirements and translate them into elegant solutions is remarkable. A true professional.",
    company: 'DigitalCraft'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Client Testimonials
        </h2>

        <div className="max-w-4xl mx-auto">
          {/* Testimonial Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${activeIndex * 100}%)`,
                }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                          {testimonial.image ? (
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                              {testimonial.name[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{testimonial.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <blockquote className="text-gray-600 dark:text-gray-300 italic">
                        "{testimonial.content}"
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex
                      ? 'bg-purple-600'
                      : 'bg-gray-300 dark:bg-gray-700 hover:bg-purple-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() =>
                setActiveIndex(
                  (current) =>
                    (current - 1 + testimonials.length) % testimonials.length
                )
              }
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Previous testimonial"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setActiveIndex((current) => (current + 1) % testimonials.length)
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Next testimonial"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 