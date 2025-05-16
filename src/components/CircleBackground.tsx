// components/CircleBackground.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function CircleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const circles: any[] = [];
    const numCircles = 50;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (let i = 0; i < numCircles; i++) {
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 10 + 2,
        dx: Math.random() * 1 - 0.5,
        dy: Math.random() * 1 - 0.5,
        color: `rgba(255, 255, 255, ${Math.random()})`,
      });
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let c of circles) {
        c.x += c.dx;
        c.y += c.dy;

        if (c.x < 0 || c.x > canvas.width) c.dx *= -1;
        if (c.y < 0 || c.y > canvas.height) c.dy *= -1;

        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
        background: '#0f172a',
      }}
    />
  );
}
