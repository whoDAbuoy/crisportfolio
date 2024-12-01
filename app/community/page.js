'use client';

import Link from 'next/link';
import { useState } from 'react';

const MOCK_FORUM_POSTS = [
  {
    id: 1,
    title: 'Tips for Better Pixel Art Shading',
    author: 'PixelMaster',
    replies: 23,
    views: 156,
    lastReply: '2 hours ago'
  },
  {
    id: 2,
    title: 'Weekly Art Challenge: Cyberpunk Cities',
    author: 'ModTeam',
    replies: 45,
    views: 312,
    lastReply: '5 minutes ago'
  }
];

const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Pixel Art Workshop',
    date: '2023-12-15',
    time: '18:00 UTC',
    attendees: 42,
    host: 'ArtGuru'
  },
  {
    id: 2,
    title: 'Game Asset Creation Stream',
    date: '2023-12-18',
    time: '20:00 UTC',
    attendees: 89,
    host: 'GameDev_Pro'
  }
];

const MOCK_ACTIVE_USERS = [
  {
    id: 1,
    username: 'PixelMaster',
    avatar: '🎨',
    status: 'online',
    artworks: 156
  },
  {
    id: 2,
    username: 'GameDev_Pro',
    avatar: '🎮',
    status: 'online',
    artworks: 89
  },
  {
    id: 3,
    username: 'ArtGuru',
    avatar: '🖼️',
    status: 'away',
    artworks: 234
  }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('forum');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/50 backdrop-blur-sm z-50 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="pixel-text text-2xl">PixlSpace</Link>
          <div className="space-x-6">
            <Link href="/editor" className="hover:text-purple-400 transition-colors">Editor</Link>
            <Link href="/gallery" className="hover:text-purple-400 transition-colors">Gallery</Link>
            <Link href="/community" className="text-purple-400 transition-colors">Community</Link>
          </div>
        </div>
      </nav>

      {/* Community Header */}
      <header className="container mx-auto px-4 pt-32 pb-16 text-center">
        <h1 className="text-4xl font-bold mb-6 pixel-text animate-float">
          PixlSpace Community
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Connect, share, and learn with fellow pixel artists
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Left Column */}
          <div>
            {/* Tab Navigation */}
            <div className="flex gap-4 mb-8">
              <button
                className={`px-6 py-2 rounded-lg transition-colors pixel-border ${
                  activeTab === 'forum'
                    ? 'bg-purple-600'
                    : 'bg-gray-800/50 hover:bg-gray-700/50'
                }`}
                onClick={() => setActiveTab('forum')}
              >
                Forum
              </button>
              <button
                className={`px-6 py-2 rounded-lg transition-colors pixel-border ${
                  activeTab === 'events'
                    ? 'bg-purple-600'
                    : 'bg-gray-800/50 hover:bg-gray-700/50'
                }`}
                onClick={() => setActiveTab('events')}
              >
                Events
              </button>
            </div>

            {/* Forum Content */}
            {activeTab === 'forum' && (
              <div className="space-y-4">
                {MOCK_FORUM_POSTS.map((post) => (
                  <div
                    key={post.id}
                    className="bg-gray-800/50 rounded-lg p-6 pixel-border hover:bg-gray-700/50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                      <span className="text-sm text-gray-400">{post.lastReply}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 space-x-4">
                      <span>by {post.author}</span>
                      <span>{post.replies} replies</span>
                      <span>{post.views} views</span>
                    </div>
                  </div>
                ))}
                <button className="w-full px-6 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors pixel-border mt-4">
                  New Topic
                </button>
              </div>
            )}

            {/* Events Content */}
            {activeTab === 'events' && (
              <div className="space-y-4">
                {MOCK_EVENTS.map((event) => (
                  <div
                    key={event.id}
                    className="bg-gray-800/50 rounded-lg p-6 pixel-border hover:bg-gray-700/50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                      <span className="text-sm text-purple-400 px-3 py-1 bg-purple-900/20 rounded-full">
                        {event.attendees} attending
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 space-x-4">
                      <span>📅 {event.date}</span>
                      <span>⏰ {event.time}</span>
                      <span>👤 Hosted by {event.host}</span>
                    </div>
                    <button className="mt-4 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors pixel-border">
                      Join Event
                    </button>
                  </div>
                ))}
                <button className="w-full px-6 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors pixel-border mt-4">
                  Create Event
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Active Users */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-lg p-6 pixel-border">
              <h2 className="pixel-text text-xl mb-6">Active Users</h2>
              <div className="space-y-4">
                {MOCK_ACTIVE_USERS.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-4 hover:bg-gray-700/50 p-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center text-2xl">
                      {user.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold">{user.username}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className={`w-2 h-2 rounded-full ${
                          user.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                        <span className="text-gray-400">{user.artworks} artworks</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800/50 rounded-lg p-6 pixel-border">
              <h2 className="pixel-text text-xl mb-6">Community Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">1,234</div>
                  <div className="text-sm text-gray-400">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">567</div>
                  <div className="text-sm text-gray-400">Online</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">89</div>
                  <div className="text-sm text-gray-400">Topics</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">12</div>
                  <div className="text-sm text-gray-400">Events</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 