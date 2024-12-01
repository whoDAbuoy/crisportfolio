'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import PixelCanvas from './components/PixelCanvas';

export default function Editor() {
  const [selectedTool, setSelectedTool] = useState('pencil');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [canvasSize, setCanvasSize] = useState(32);
  const canvasRef = useRef(null);

  const tools = [
    { name: 'Pencil', value: 'pencil' },
    { name: 'Eraser', value: 'eraser' },
    { name: 'Fill', value: 'fill' },
    { name: 'Eyedropper', value: 'eyedropper' }
  ];

  const colors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#FFFFFF', '#000000'
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) {
          canvasRef.current?.redo?.();
        } else {
          canvasRef.current?.undo?.();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClear = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvasSize, canvasSize);
    }
  };

  const handleSave = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'pixel-art.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/50 backdrop-blur-sm z-50 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="pixel-text text-2xl">PixlSpace</Link>
          <div className="space-x-6">
            <Link href="/editor" className="text-purple-400 transition-colors">Editor</Link>
            <Link href="/gallery" className="hover:text-purple-400 transition-colors">Gallery</Link>
            <Link href="/community" className="hover:text-purple-400 transition-colors">Community</Link>
          </div>
        </div>
      </nav>

      {/* Editor Interface */}
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Tools Panel */}
          <div className="bg-gray-800/50 rounded-lg p-6 pixel-border">
            <h2 className="pixel-text text-xl mb-6">Tools</h2>
            <div className="grid grid-cols-2 gap-4">
              {tools.map((tool) => (
                <button
                  key={tool.value}
                  className={`p-3 rounded transition-colors pixel-border ${
                    selectedTool === tool.value
                      ? 'bg-purple-600/50'
                      : 'bg-gray-700/50 hover:bg-purple-600/30'
                  }`}
                  onClick={() => setSelectedTool(tool.value)}
                >
                  {tool.name}
                </button>
              ))}
            </div>
            
            {/* Color Picker */}
            <div className="mt-8">
              <h3 className="pixel-text text-sm mb-4">Colors</h3>
              <div className="grid grid-cols-4 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`w-12 h-12 rounded pixel-border hover:scale-105 transition-transform ${
                      selectedColor === color ? 'ring-2 ring-purple-400' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Canvas Size */}
            <div className="mt-8">
              <h3 className="pixel-text text-sm mb-4">Canvas Size</h3>
              <select
                className="w-full bg-gray-700/50 p-2 rounded pixel-border"
                value={canvasSize}
                onChange={(e) => setCanvasSize(Number(e.target.value))}
              >
                <option value={16}>16 x 16</option>
                <option value={32}>32 x 32</option>
                <option value={64}>64 x 64</option>
              </select>
            </div>

            {/* History Controls */}
            <div className="mt-8">
              <h3 className="pixel-text text-sm mb-4">History</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => canvasRef.current?.undo?.()}
                  className="flex-1 px-4 py-2 bg-gray-700/50 rounded hover:bg-gray-600/50 transition-colors pixel-border"
                  title="Undo (Ctrl+Z)"
                >
                  Undo
                </button>
                <button
                  onClick={() => canvasRef.current?.redo?.()}
                  className="flex-1 px-4 py-2 bg-gray-700/50 rounded hover:bg-gray-600/50 transition-colors pixel-border"
                  title="Redo (Ctrl+Shift+Z)"
                >
                  Redo
                </button>
              </div>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="bg-gray-800/50 rounded-lg p-6 pixel-border">
            <div className="aspect-square w-full bg-white/10 rounded-lg pixel-border">
              <PixelCanvas
                ref={canvasRef}
                canvasSize={canvasSize}
                selectedColor={selectedColor}
                selectedTool={selectedTool}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-gray-700/50 rounded hover:bg-gray-600/50 transition-colors pixel-border"
          >
            Clear
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-purple-600 rounded hover:bg-purple-700 transition-colors pixel-border"
          >
            Save
          </button>
        </div>
      </main>
    </div>
  );
} 