'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/50 backdrop-blur-sm z-50 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="pixel-text text-2xl">PixlSpace</Link>
          <div className="space-x-6">
            <Link href="/editor" className="hover:text-purple-400 transition-colors">Editor</Link>
            <Link href="/gallery" className="hover:text-purple-400 transition-colors">Gallery</Link>
            <Link href="/community" className="hover:text-purple-400 transition-colors">Community</Link>
          </div>
        </div>
      </nav>

      {/* Auth Form */}
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-800/50 rounded-lg p-8 pixel-border">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4 pixel-text">
                {isSignIn ? 'Welcome Back!' : 'Join PixlSpace'}
              </h1>
              <p className="text-gray-400">
                {isSignIn
                  ? 'Sign in to continue your pixel art journey'
                  : 'Create an account to start creating'}
              </p>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isSignIn && (
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700/50 rounded-lg pixel-border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700/50 rounded-lg pixel-border focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700/50 rounded-lg pixel-border focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {!isSignIn && (
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700/50 rounded-lg pixel-border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors pixel-border"
              >
                {isSignIn ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Form Footer */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                {isSignIn ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => setIsSignIn(!isSignIn)}
                  className="text-purple-400 hover:text-purple-300"
                >
                  {isSignIn ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            {/* Social Auth */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800/50 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button className="flex justify-center items-center px-4 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors pixel-border">
                  <span className="sr-only">Sign in with Google</span>
                  🌐
                </button>
                <button className="flex justify-center items-center px-4 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors pixel-border">
                  <span className="sr-only">Sign in with GitHub</span>
                  💻
                </button>
                <button className="flex justify-center items-center px-4 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors pixel-border">
                  <span className="sr-only">Sign in with Discord</span>
                  🎮
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 