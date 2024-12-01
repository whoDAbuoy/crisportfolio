'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const blogPosts = [
  {
    id: 1,
    title: 'Building Scalable Web Applications with Next.js',
    excerpt: 'Learn how to create performant and maintainable web applications using Next.js and React.',
    date: '2023-12-01',
    readTime: '8 min read',
    category: 'Development',
    image: '/blog/nextjs-scaling.jpg'
  },
  {
    id: 2,
    title: 'The Future of Web Development: 2024 Trends',
    excerpt: 'Explore upcoming trends in web development and how they will shape the industry.',
    date: '2023-11-28',
    readTime: '6 min read',
    category: 'Industry',
    image: '/blog/future-trends.jpg'
  },
  {
    id: 3,
    title: 'Optimizing React Performance',
    excerpt: 'Tips and tricks for improving the performance of your React applications.',
    date: '2023-11-25',
    readTime: '10 min read',
    category: 'Development',
    image: '/blog/react-performance.jpg'
  }
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Latest Articles</h2>
          <a
            href="/blog"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            View all articles →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:transform hover:scale-105 transition-all duration-300"
            >
              {/* Article Image */}
              <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                  <span className="mx-2">·</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold mb-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <a href={`/blog/${post.id}`}>{post.title}</a>
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>

                <a
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Read more
                  <svg
                    className="w-4 h-4 ml-2"
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
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 