"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Instagram,
  Facebook,
  ArrowRight,
} from "lucide-react";

// ============================================
// Navigation Data
// ============================================
const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Tiers", href: "#tiers" },
  { label: "Fabrics", href: "#fabrics" },
  { label: "Book Consultation", href: "#consultation", isButton: true },
];

const contactInfo = {
  phone: "+1 (212) 555-0147",
  email: "atelier@lignecouture.com",
  location: "Madison Avenue, New York",
};

// ============================================
// Top Info Bar Component
// ============================================
const TopInfoBar: React.FC = () => {
  return (
    <div className="bg-[#1A1A1A] text-white py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between text-xs tracking-wider">
        {/* Left - Phone & Email */}
        <div className="hidden sm:flex items-center gap-6">
          <a
            href={`tel:${contactInfo.phone}`}
            className="flex items-center gap-2 text-gray-300 hover:text-[#C9A962] transition-colors duration-200"
          >
            <Phone size={12} strokeWidth={1.5} />
            <span className="font-light">{contactInfo.phone}</span>
          </a>
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-2 text-gray-300 hover:text-[#C9A962] transition-colors duration-200"
          >
            <Mail size={12} strokeWidth={1.5} />
            <span className="font-light hidden md:inline">{contactInfo.email}</span>
          </a>
        </div>

        {/* Center - Location (visible on all screens) */}
        <div className="flex items-center gap-2 text-gray-300 mx-auto sm:mx-0">
          <MapPin size={12} strokeWidth={1.5} />
          <span className="font-light">{contactInfo.location}</span>
        </div>

        {/* Right - Social Icons */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#C9A962] transition-colors duration-200"
            aria-label="Instagram"
          >
            <Instagram size={14} strokeWidth={1.5} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#C9A962] transition-colors duration-200"
            aria-label="Facebook"
          >
            <Facebook size={14} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Logo Component
// ============================================
const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <a href="/" className={`block ${className}`}>
      <div className="flex flex-col items-start leading-none">
        <span className="font-display text-2xl sm:text-3xl tracking-[0.2em] text-[#1A1A1A]">
          LIGNE
        </span>
        <span className="font-display text-lg sm:text-xl tracking-[0.35em] text-[#4A4A4A] mt-0.5">
          COUTURE
        </span>
      </div>
    </a>
  );
};

// ============================================
// Desktop Navigation Links
// ============================================
const DesktopNavLinks: React.FC = () => {
  return (
    <nav className="hidden lg:flex items-center gap-10">
      {navLinks.map((link) =>
        link.isButton ? (
          <a
            key={link.href}
            href={link.href}
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white text-xs font-medium tracking-[0.15em] uppercase overflow-hidden transition-all duration-300 hover:bg-[#C9A962]"
          >
            <span className="relative z-10">{link.label}</span>
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
        ) : (
          <a
            key={link.href}
            href={link.href}
            className="relative text-sm font-light tracking-[0.1em] text-[#1A1A1A] hover:text-[#C9A962] transition-colors duration-300 group"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A962] transition-all duration-300 group-hover:w-full" />
          </a>
        )
      )}
    </nav>
  );
};

// ============================================
// Mobile Menu Component
// ============================================
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current || !overlayRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      if (isOpen) {
        // Open animation
        gsap.set(menuRef.current, { visibility: "visible" });

        // Fade in overlay
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" }
        );

        // Slide in content
        gsap.fromTo(
          contentRef.current,
          { x: "100%" },
          { x: "0%", duration: 0.5, ease: "power3.out" }
        );

        // Stagger in links
        if (linksRef.current) {
          const links = linksRef.current.querySelectorAll(".mobile-link");
          gsap.fromTo(
            links,
            { opacity: 0, x: 40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.08,
              delay: 0.2,
              ease: "power2.out",
            }
          );
        }
      } else {
        // Close animation
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(menuRef.current, { visibility: "hidden" });
          },
        });

        // Fade out links first
        if (linksRef.current) {
          const links = linksRef.current.querySelectorAll(".mobile-link");
          tl.to(links, {
            opacity: 0,
            x: -20,
            duration: 0.2,
            stagger: 0.03,
            ease: "power2.in",
          });
        }

        // Slide out content
        tl.to(
          contentRef.current,
          { x: "100%", duration: 0.4, ease: "power3.in" },
          "-=0.1"
        );

        // Fade out overlay
        tl.to(
          overlayRef.current,
          { opacity: 0, duration: 0.3, ease: "power2.in" },
          "-=0.3"
        );
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-[500] visibility-hidden lg:hidden"
      style={{ visibility: "hidden" }}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Content */}
      <div
        ref={contentRef}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
        style={{ transform: "translateX(100%)" }}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Logo />
          <button
            onClick={onClose}
            className="p-2 text-[#1A1A1A] hover:text-[#C9A962] transition-colors duration-200"
            aria-label="Close menu"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>

        {/* Navigation Links */}
        <div ref={linksRef} className="p-8">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`mobile-link group flex items-center justify-between py-4 border-b border-gray-100 ${
                  link.isButton
                    ? "mt-4 border-none"
                    : "hover:border-[#C9A962] transition-colors duration-300"
                }`}
              >
                {link.isButton ? (
                  <span className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white text-sm font-medium tracking-[0.15em] uppercase hover:bg-[#C9A962] transition-colors duration-300">
                    {link.label}
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </span>
                ) : (
                  <>
                    <span className="font-display text-2xl text-[#1A1A1A] group-hover:text-[#C9A962] transition-colors duration-300">
                      {link.label}
                    </span>
                    <ArrowRight
                      size={20}
                      strokeWidth={1.5}
                      className="text-gray-300 group-hover:text-[#C9A962] transform group-hover:translate-x-1 transition-all duration-300"
                    />
                  </>
                )}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-[#FAFAFA]">
          <div className="flex flex-col gap-3 text-sm">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-3 text-[#4A4A4A] hover:text-[#C9A962] transition-colors duration-200"
            >
              <Phone size={16} strokeWidth={1.5} />
              <span className="font-light">{contactInfo.phone}</span>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-3 text-[#4A4A4A] hover:text-[#C9A962] transition-colors duration-200"
            >
              <Mail size={16} strokeWidth={1.5} />
              <span className="font-light">{contactInfo.email}</span>
            </a>
            <div className="flex items-center gap-3 text-[#4A4A4A]">
              <MapPin size={16} strokeWidth={1.5} />
              <span className="font-light">{contactInfo.location}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#4A4A4A] hover:text-[#C9A962] hover:bg-[#C9A962]/10 rounded-full transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#4A4A4A] hover:text-[#C9A962] hover:bg-[#C9A962]/10 rounded-full transition-all duration-200"
              aria-label="Facebook"
            >
              <Facebook size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Main Navigation Component
// ============================================
const Nav: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Handle scroll for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Header animation on mount
  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Top Info Bar */}
      <div
        className={`transition-transform duration-300 ${
          isScrolled ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <TopInfoBar />
      </div>

      {/* Main Header */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-[200] transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-white"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <DesktopNavLinks />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#1A1A1A] hover:text-[#C9A962] transition-colors duration-200"
              aria-label="Open menu"
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Nav;
