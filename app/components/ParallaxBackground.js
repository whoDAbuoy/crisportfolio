'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ParallaxBackground() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -600]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y1Spring = useSpring(y1, springConfig);
  const y2Spring = useSpring(y2, springConfig);
  const y3Spring = useSpring(y3, springConfig);

  useEffect(() => {
    const particles = [];
    const colors = ['#9333EA', '#A855F7', '#C084FC'];
    const container = containerRef.current;
    const ctx = container.getContext('2d');
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;

    class Particle {
      constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.originalX = x;
        this.originalY = y;
      }

      update() {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = 100;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * 5;
        const directionY = forceDirectionY * force * 5;

        if (distance < maxDistance) {
          this.speedX += directionX;
          this.speedY += directionY;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        // Return to original position
        this.speedX *= 0.9;
        this.speedY *= 0.9;
        this.x += (this.originalX - this.x) * 0.05;
        this.y += (this.originalY - this.y) * 0.05;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      container.width = window.innerWidth;
      container.height = window.innerHeight;

      for (let i = 0; i < 100; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * container.width;
        const y = Math.random() * container.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, size, color));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, container.width, container.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    };

    const handleResize = () => {
      container.width = window.innerWidth;
      container.height = window.innerHeight;
    };

    init();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
      />
      <motion.div
        style={{ y: y1Spring }}
        className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"
      />
      <motion.div
        style={{ y: y2Spring }}
        className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-transparent"
      />
      <motion.div
        style={{ y: y3Spring }}
        className="absolute inset-0 bg-gradient-to-tl from-purple-400/10 to-transparent"
      />
    </div>
  );
} 