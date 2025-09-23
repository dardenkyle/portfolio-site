import { useEffect, useRef } from "react";

type StarfieldProps = {
  /** Stars per 10,000 CSS px² */
  density?: number;
  /** Base speed in CSS px per frame (subtle = 0.4–0.8) */
  speed?: number;
  /** Optional background fill; leave undefined for transparent */
  background?: string;
  /** Star color */
  color?: string;
  /** Max star radius in CSS px */
  maxRadius?: number;
  /** z-index for the canvas (put content above this) */
  zIndex?: number;
  /** Set true to draw a debug magenta box in the top-left */
  debug?: boolean;
};

interface Star {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  twinkle: number;
}

export default function Starfield({
  density = 0.25,
  speed = 0.6,
  background,
  color = "#ffffff",
  maxRadius = 1.4,
  zIndex = 0,
  debug = false,
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const prefersReduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    // Use CSS pixel units for all math/drawing
    let w = 0;
    let h = 0;

    function spawnStar(): Star {
      const angle = Math.random() * Math.PI * 2;
      const base = speed + Math.random() * speed;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * maxRadius + 0.2,
        vx: Math.cos(angle) * base,
        vy: Math.sin(angle) * base,
        twinkle: Math.random() * Math.PI * 2,
      };
    }

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;

      // Backing store in device pixels for crispness
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      // Map 1 canvas unit to 1 CSS pixel
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = Math.floor(((w * h) / 10000) * density);
      starsRef.current = Array.from({ length: targetCount }, () => spawnStar());
    }

    function drawFrame() {
      if (background) {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.clearRect(0, 0, w, h);
      }

      if (debug) {
        ctx.fillStyle = "magenta";
        ctx.fillRect(10, 10, 120, 40);
        ctx.fillStyle = "white";
        ctx.font = "16px sans-serif";
        ctx.fillText("STARFIELD", 16, 36);
      }

      for (const s of starsRef.current) {
        s.x += s.vx;
        s.y += s.vy;
        s.twinkle += 0.04;

        if (s.x < -5 || s.x > w + 5 || s.y < -5 || s.y > h + 5) {
          Object.assign(s, spawnStar());
        }

        const alpha = 0.4 + (Math.sin(s.twinkle) + 1) * 0.3;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    resize();

    if (prefersReduce) {
      drawFrame(); // static
    } else {
      const loop = () => {
        drawFrame();
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [density, speed, background, color, maxRadius, debug]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[2] pointer-events-none"
      aria-hidden="true"
    />
  );
}
