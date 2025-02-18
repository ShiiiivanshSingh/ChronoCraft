
import { useEffect, useRef } from "react";
import p5 from "p5";

const Background = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let particles: Array<{ x: number; y: number; vx: number; vy: number }> = [];
      const particleCount = 50;

      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.position(0, 0);
        canvas.style("z-index", "-1");

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-0.5, 0.5),
            vy: p.random(-0.5, 0.5),
          });
        }
      };

      p.draw = () => {
        p.clear();
        const isDark = document.documentElement.classList.contains("dark");
        
        // Update and draw particles
        particles.forEach((particle, i) => {
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Wrap around screen
          if (particle.x < 0) particle.x = p.width;
          if (particle.x > p.width) particle.x = 0;
          if (particle.y < 0) particle.y = p.height;
          if (particle.y > p.height) particle.y = 0;

          // Draw connections
          particles.forEach((other, j) => {
            if (i !== j) {
              const d = p.dist(particle.x, particle.y, other.x, other.y);
              if (d < 150) {
                const alpha = p.map(d, 0, 150, 255, 0);
                p.stroke(isDark ? 255 : 0, alpha * 0.15);
                p.line(particle.x, particle.y, other.x, other.y);
              }
            }
          });

          // Draw particle
          p.noStroke();
          p.fill(isDark ? 255 : 0, 50);
          p.circle(particle.x, particle.y, 4);
        });
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };
    };

    const p5Instance = new p5(sketch, containerRef.current);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};

export default Background;
