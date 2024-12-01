'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
    content: 'Crispus&apos;s ability to understand complex requirements and translate them into elegant solutions is remarkable. A true professional.',
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
                        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
                          {testimonial.image ? (
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
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
                        &ldquo;{testimonial.content}&rdquo;
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
          </div>
        </div>
      </div>
    </section>
  );
} 