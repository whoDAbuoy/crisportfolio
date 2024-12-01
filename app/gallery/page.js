'use client';

import Link from 'next/link';
import { useState } from 'react';

const MOCK_GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Pixel Landscape',
    artist: 'PixelArtist1',
    likes: 245,
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAOklEQVQYV2NkIAAYGRkZsQpAGBQHEoMKwBUxkaIAJg5XgKwDXQG6opGREQMDAwMjuhwjTAGGopG4AgAhzwwRRVfm8QAAAABJRU5ErkJggg=='
  },
  {
    id: 2,
    title: 'Space Explorer',
    artist: 'PixelArtist2',
    likes: 189,
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAPklEQVQYV2NkIAAYGRkZsQpAGBQHEoMKwBUxkaIAJg5XgKwDXQG6opGREQMDAwMjuhwjTAGGopG4AgYGBgYA6MQMEUE3m3QAAAAASUVORK5CYII='
  },
  // Add more mock items as needed
];

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/50 backdrop-blur-sm z-50 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="pixel-text text-2xl">PixlSpace</Link>
          <div className="space-x-6">
            <Link href="/editor" className="hover:text-purple-400 transition-colors">Editor</Link>
            <Link href="/gallery" className="text-purple-400 transition-colors">Gallery</Link>
            <Link href="/community" className="hover:text-purple-400 transition-colors">Community</Link>
          </div>
        </div>
      </nav>

      {/* Gallery Header */}
      <header className="container mx-auto px-4 pt-32 pb-16 text-center">
        <h1 className="text-4xl font-bold mb-6 pixel-text animate-float">
          Pixel Art Gallery
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Explore amazing pixel art created by our community
        </p>
      </header>

      {/* Filters and Sort */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="space-x-4">
            <select
              className="bg-gray-800/50 px-4 py-2 rounded-lg pixel-border"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="landscape">Landscape</option>
              <option value="character">Character</option>
              <option value="object">Object</option>
            </select>
            <select
              className="bg-gray-800/50 px-4 py-2 rounded-lg pixel-border"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
          <Link
            href="/editor"
            className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors pixel-border"
          >
            Create New
          </Link>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800/50 rounded-lg overflow-hidden pixel-border group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="aspect-square relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  style={{ imageRendering: 'pixelated' }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors pixel-border">
                    View Details
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 pixel-text">{item.title}</h3>
                <p className="text-gray-400 text-sm">by {item.artist}</p>
                <div className="mt-4 flex items-center justify-between">
                  <button className="text-gray-400 hover:text-purple-400 transition-colors">
                    ❤️ {item.likes}
                  </button>
                  <button className="text-gray-400 hover:text-purple-400 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More */}
      <div className="container mx-auto px-4 pb-16 text-center">
        <button className="px-8 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors pixel-border">
          Load More
        </button>
      </div>
    </div>
  );
} 