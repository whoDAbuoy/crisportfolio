'use client';

import { useEffect, useRef, useState } from 'react';

export default function PixelCanvas({ 
  canvasSize = 32,
  selectedColor = '#000000',
  selectedTool = 'pencil'
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [pixelSize, setPixelSize] = useState(1);
  const [context, setContext] = useState(null);
  const [layers, setLayers] = useState([{ id: 1, name: 'Layer 1', visible: true }]);
  const [currentLayer, setCurrentLayer] = useState(1);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [layerContexts, setLayerContexts] = useState({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    setContext(ctx);

    // Set canvas size
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Calculate pixel size based on canvas container
    const container = canvas.parentElement;
    const containerSize = Math.min(container.clientWidth, container.clientHeight);
    setPixelSize(containerSize / canvasSize);

    // Create layer canvases
    const newLayerContexts = {};
    layers.forEach(layer => {
      const layerCanvas = document.createElement('canvas');
      layerCanvas.width = canvasSize;
      layerCanvas.height = canvasSize;
      const layerCtx = layerCanvas.getContext('2d');
      layerCtx.fillStyle = '#ffffff';
      layerCtx.fillRect(0, 0, canvasSize, canvasSize);
      layerCtx.imageSmoothingEnabled = false;
      newLayerContexts[layer.id] = layerCtx;
    });
    setLayerContexts(newLayerContexts);

    // Enable image smoothing
    ctx.imageSmoothingEnabled = false;
  }, [canvasSize, layers]);

  useEffect(() => {
    renderCanvas();
  }, [layers, layerContexts]);

  const renderCanvas = () => {
    if (!context) return;

    // Clear main canvas
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvasSize, canvasSize);

    // Render visible layers from bottom to top
    layers.forEach(layer => {
      if (layer.visible && layerContexts[layer.id]) {
        context.drawImage(layerContexts[layer.id].canvas, 0, 0);
      }
    });
  };

  const addToHistory = () => {
    const newHistory = history.slice(0, historyIndex + 1);
    const layerStates = {};
    
    layers.forEach(layer => {
      const layerCanvas = layerContexts[layer.id].canvas;
      layerStates[layer.id] = layerCanvas.toDataURL();
    });

    newHistory.push({
      layers: JSON.parse(JSON.stringify(layers)),
      layerStates
    });

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const previousState = history[newIndex];
      
      // Restore layer structure
      setLayers(previousState.layers);
      
      // Restore layer contents
      const newLayerContexts = { ...layerContexts };
      Object.entries(previousState.layerStates).forEach(([layerId, dataUrl]) => {
        const img = new Image();
        img.onload = () => {
          newLayerContexts[layerId].clearRect(0, 0, canvasSize, canvasSize);
          newLayerContexts[layerId].drawImage(img, 0, 0);
          renderCanvas();
        };
        img.src = dataUrl;
      });
      
      setLayerContexts(newLayerContexts);
      setHistoryIndex(newIndex);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextState = history[newIndex];
      
      // Restore layer structure
      setLayers(nextState.layers);
      
      // Restore layer contents
      const newLayerContexts = { ...layerContexts };
      Object.entries(nextState.layerStates).forEach(([layerId, dataUrl]) => {
        const img = new Image();
        img.onload = () => {
          newLayerContexts[layerId].clearRect(0, 0, canvasSize, canvasSize);
          newLayerContexts[layerId].drawImage(img, 0, 0);
          renderCanvas();
        };
        img.src = dataUrl;
      });
      
      setLayerContexts(newLayerContexts);
      setHistoryIndex(newIndex);
    }
  };

  const addLayer = () => {
    const newLayer = {
      id: layers.length + 1,
      name: `Layer ${layers.length + 1}`,
      visible: true
    };

    const layerCanvas = document.createElement('canvas');
    layerCanvas.width = canvasSize;
    layerCanvas.height = canvasSize;
    const layerCtx = layerCanvas.getContext('2d');
    layerCtx.fillStyle = '#ffffff';
    layerCtx.fillRect(0, 0, canvasSize, canvasSize);
    layerCtx.imageSmoothingEnabled = false;

    setLayerContexts(prev => ({
      ...prev,
      [newLayer.id]: layerCtx
    }));

    setLayers(prev => [...prev, newLayer]);
    setCurrentLayer(newLayer.id);
    addToHistory();
  };

  const toggleLayerVisibility = (layerId) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId 
        ? { ...layer, visible: !layer.visible }
        : layer
    ));
    addToHistory();
  };

  const drawPixel = (x, y) => {
    if (!layerContexts[currentLayer]) return;

    const pixelX = Math.floor(x / pixelSize);
    const pixelY = Math.floor(y / pixelSize);

    const ctx = layerContexts[currentLayer];
    if (selectedTool === 'eraser') {
      ctx.fillStyle = '#ffffff';
    } else {
      ctx.fillStyle = selectedColor;
    }

    ctx.fillRect(pixelX, pixelY, 1, 1);
    renderCanvas();
  };

  const fill = (startX, startY, targetColor) => {
    if (!layerContexts[currentLayer]) return;

    const ctx = layerContexts[currentLayer];
    const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
    const pixels = imageData.data;

    const startPos = (startY * canvasSize + startX) * 4;
    const startR = pixels[startPos];
    const startG = pixels[startPos + 1];
    const startB = pixels[startPos + 2];

    if (
      startR === parseInt(targetColor.slice(1, 3), 16) &&
      startG === parseInt(targetColor.slice(3, 5), 16) &&
      startB === parseInt(targetColor.slice(5, 7), 16)
    ) {
      return;
    }

    const stack = [[startX, startY]];
    const [r, g, b] = [
      parseInt(targetColor.slice(1, 3), 16),
      parseInt(targetColor.slice(3, 5), 16),
      parseInt(targetColor.slice(5, 7), 16),
    ];

    while (stack.length > 0) {
      const [x, y] = stack.pop();
      const pos = (y * canvasSize + x) * 4;

      if (
        x < 0 || x >= canvasSize ||
        y < 0 || y >= canvasSize ||
        pixels[pos] !== startR ||
        pixels[pos + 1] !== startG ||
        pixels[pos + 2] !== startB
      ) {
        continue;
      }

      pixels[pos] = r;
      pixels[pos + 1] = g;
      pixels[pos + 2] = b;
      pixels[pos + 3] = 255;

      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
    renderCanvas();
    addToHistory();
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool === 'fill') {
      fill(Math.floor(x / pixelSize), Math.floor(y / pixelSize), selectedColor);
    } else {
      drawPixel(x, y);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || selectedTool === 'fill') return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    drawPixel(x, y);
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      addToHistory();
    }
    setIsDrawing(false);
  };

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-crosshair"
        style={{
          width: `${canvasSize * pixelSize}px`,
          height: `${canvasSize * pixelSize}px`,
          imageRendering: 'pixelated'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <div className="absolute top-4 right-4 bg-gray-800/50 rounded-lg p-4 pixel-border">
        <h3 className="pixel-text text-sm mb-4">Layers</h3>
        <div className="space-y-2">
          {layers.map(layer => (
            <div key={layer.id} className="flex items-center gap-2">
              <button
                onClick={() => toggleLayerVisibility(layer.id)}
                className={`w-6 h-6 ${layer.visible ? 'bg-purple-600' : 'bg-gray-600'} rounded`}
              >
                {layer.visible ? '👁️' : '👁️‍🗨️'}
              </button>
              <button
                onClick={() => setCurrentLayer(layer.id)}
                className={`flex-1 px-2 py-1 text-sm rounded ${
                  currentLayer === layer.id ? 'bg-purple-600' : 'bg-gray-700'
                }`}
              >
                {layer.name}
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addLayer}
          className="w-full mt-2 px-2 py-1 bg-purple-600 rounded text-sm"
        >
          Add Layer
        </button>
      </div>
    </div>
  );
} 