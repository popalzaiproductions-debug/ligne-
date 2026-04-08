"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Import shared components
import Nav from "./nav";
import Footer from "./footer";
import Grain from "./grain";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ============================================
// Layout Props Interface
// ============================================
interface LayoutProps {
  children: React.ReactNode;
  showGrain?: boolean;
  className?: string;
}

// ============================================
// Smooth Scroll Setup Component
// ============================================
const SmoothScrollSetup: React.FC = () => {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: "play none none reverse",
    });

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Handle anchor links with smooth scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            gsap.to(window, {
              duration: 1.2,
              scrollTo: { y: targetElement, offsetY: 100 },
              ease: "power3.inOut",
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleAnchorClick);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
};

// ============================================
// Page Transition Component
// ============================================
const PageTransition: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      // Fade in content on mount
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={contentRef} className="min-h-screen">
      {children}
    </div>
  );
};

// ============================================
// Main Layout Component
// ============================================
const Layout: React.FC<LayoutProps> = ({
  children,
  showGrain = true,
  className = "",
}) => {
  const mainRef = useRef<HTMLElement>(null);

  // Setup smooth scroll and global behaviors
  useEffect(() => {
    // Add class to html element for global styles
    document.documentElement.classList.add("scroll-smooth");

    // Prefers reduced motion check
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0);
      ScrollTrigger.defaults({
        animation: undefined,
      });
    }

    return () => {
      document.documentElement.classList.remove("scroll-smooth");
    };
  }, []);

  return (
    <>
      {/* Smooth Scroll Setup */}
      <SmoothScrollSetup />

      {/* Grain Texture Overlay */}
      {showGrain && <Grain />}

      {/* Page Wrapper */}
      <div className={`relative min-h-screen flex flex-col ${className}`}>
        {/* Navigation */}
        <Nav />

        {/* Main Content */}
        <main
          ref={mainRef}
          className="flex-1 relative"
          role="main"
          aria-label="Main content"
        >
          <PageTransition>{children}</PageTransition>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

// ============================================
// Simple Layout (without Nav/Footer)
// ============================================
interface SimpleLayoutProps {
  children: React.ReactNode;
  showGrain?: boolean;
  className?: string;
}

export const SimpleLayout: React.FC<SimpleLayoutProps> = ({
  children,
  showGrain = true,
  className = "",
}) => {
  return (
    <>
      <SmoothScrollSetup />
      {showGrain && <Grain />}
      <div className={`relative min-h-screen ${className}`}>{children}</div>
    </>
  );
};

// ============================================
// Content Layout (just content wrapper)
// ============================================
interface ContentLayoutProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({
  children,
  className = "",
  as: Component = "div",
}) => {
  return (
    <Component
      className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 ${className}`}
    >
      {children}
    </Component>
  );
};

// ============================================
// Section Layout (for page sections)
// ============================================
interface SectionLayoutProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export const SectionLayout: React.FC<SectionLayoutProps> = ({
  children,
  className = "",
  id,
  fullWidth = false,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle parallax effect for sections
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0.95 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative py-16 md:py-24 lg:py-32 ${className}`}
    >
      {fullWidth ? (
        children
      ) : (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {children}
        </div>
      )}
    </section>
  );
};

export default Layout;
