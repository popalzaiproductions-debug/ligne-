"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// ============================================
// Grain Component Props
// ============================================
interface GrainProps {
  opacity?: number;
  animationDuration?: number;
  zIndex?: number;
}

// ============================================
// SVG Noise Filter Component
// ============================================
const NoiseSVG: React.FC = () => {
  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        {/* Base noise filter */}
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
        </filter>

        {/* Fine grain filter */}
        <filter id="fineGrainFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.2"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
        </filter>

        {/* Rough grain filter */}
        <filter id="roughGrainFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.5"
            numOctaves="5"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
};

// ============================================
// Main Grain Component
// ============================================
const Grain: React.FC<GrainProps> = ({
  opacity = 0.03,
  animationDuration = 8,
  zIndex = 9999,
}) => {
  const grainRef = useRef<HTMLDivElement>(null);
  const grainInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!grainRef.current || !grainInnerRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Static grain for users who prefer reduced motion
      return;
    }

    const ctx = gsap.context(() => {
      // Create subtle floating animation for the grain
      gsap.to(grainInnerRef.current, {
        x: "random(-3, 3)",
        y: "random(-3, 3)",
        rotation: "random(-0.5, 0.5)",
        duration: animationDuration / 4,
        ease: "none",
        repeat: -1,
        repeatRefresh: true,
      });

      // Subtle scale pulse
      gsap.to(grainRef.current, {
        opacity: opacity * 1.2,
        duration: animationDuration / 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, [opacity, animationDuration]);

  return (
    <>
      {/* Hidden SVG filters */}
      <NoiseSVG />

      {/* Grain Overlay Container */}
      <div
        ref={grainRef}
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{
          zIndex,
          opacity,
        }}
        aria-hidden="true"
      >
        {/* Grain Inner - Animated */}
        <div
          ref={grainInnerRef}
          className="absolute -inset-[100%] w-[300%] h-[300%]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px 256px",
            mixBlendMode: "overlay",
          }}
        />

        {/* Secondary grain layer for depth */}
        <div
          className="absolute -inset-[50%] w-[200%] h-[200%] animate-grain"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fineNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fineNoise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
            mixBlendMode: "soft-light",
            opacity: 0.5,
          }}
        />
      </div>

      {/* CSS for grain animation */}
      <style jsx>{`
        @keyframes grain {
          0%,
          100% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-2%, -2%);
          }
          20% {
            transform: translate(-4%, 2%);
          }
          30% {
            transform: translate(2%, -4%);
          }
          40% {
            transform: translate(-2%, 6%);
          }
          50% {
            transform: translate(-4%, 2%);
          }
          60% {
            transform: translate(6%, 0);
          }
          70% {
            transform: translate(0, 4%);
          }
          80% {
            transform: translate(-6%, 0);
          }
          90% {
            transform: translate(4%, 2%);
          }
        }

        .animate-grain {
          animation: grain ${animationDuration}s steps(10) infinite;
        }
      `}</style>
    </>
  );
};

// ============================================
// Static Grain Component (no animation)
// ============================================
export const StaticGrain: React.FC<Omit<GrainProps, "animationDuration">> = ({
  opacity = 0.03,
  zIndex = 9999,
}) => {
  return (
    <>
      <NoiseSVG />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex,
          opacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          mixBlendMode: "overlay",
        }}
        aria-hidden="true"
      />
    </>
  );
};

// ============================================
// Canvas-based Grain Component (alternative)
// ============================================
export const CanvasGrain: React.FC<GrainProps> = ({
  opacity = 0.03,
  animationDuration = 8,
  zIndex = 9999,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value; // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 255; // A
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const animate = () => {
      generateNoise();
      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);

    if (!prefersReducedMotion) {
      // Throttle animation to every N frames for performance
      let frameCount = 0;
      const throttledAnimate = () => {
        frameCount++;
        if (frameCount % 3 === 0) {
          generateNoise();
        }
        animationRef.current = requestAnimationFrame(throttledAnimate);
      };
      throttledAnimate();
    } else {
      generateNoise();
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex,
        opacity,
        mixBlendMode: "overlay",
      }}
      aria-hidden="true"
    />
  );
};

export default Grain;
