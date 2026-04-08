"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ============================================
// Footer Navigation Data
// ============================================
const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "Bespoke Tailoring", href: "#" },
      { label: "Made to Measure", href: "#" },
      { label: "Alterations", href: "#" },
      { label: "Wedding Attire", href: "#" },
      { label: "Corporate Wear", href: "#" },
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "Signature Suits", href: "#" },
      { label: "Evening Wear", href: "#" },
      { label: "Casual Elegance", href: "#" },
      { label: "Accessories", href: "#" },
      { label: "Gift Cards", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "#" },
      { label: "The Atelier", href: "#" },
      { label: "Master Craftsmen", href: "#" },
      { label: "Press & Media", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Shipping & Returns", href: "#" },
      { label: "Size Guide", href: "#" },
      { label: "Book Appointment", href: "#consultation" },
    ],
  },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

// ============================================
// Logo Component
// ============================================
const FooterLogo: React.FC = () => {
  return (
    <a href="/" className="inline-block group">
      <div className="flex flex-col items-start leading-none">
        <span className="font-display text-3xl tracking-[0.25em] text-white group-hover:text-[#C9A962] transition-colors duration-300">
          LIGNE
        </span>
        <span className="font-display text-xl tracking-[0.4em] text-gray-400 mt-1 group-hover:text-[#C9A962]/70 transition-colors duration-300">
          COUTURE
        </span>
      </div>
    </a>
  );
};

// ============================================
// Footer Column Component
// ============================================
interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => {
  const columnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!columnRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        columnRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: columnRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={columnRef}>
      <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-[#C9A962] mb-6">
        {title}
      </h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="group inline-flex items-center gap-1 text-sm font-light text-gray-300 hover:text-white transition-colors duration-200"
            >
              <span>{link.label}</span>
              <ArrowUpRight
                size={12}
                strokeWidth={1.5}
                className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ============================================
// Newsletter Component
// ============================================
const Newsletter: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <div className="lg:col-span-1">
      <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-[#C9A962] mb-4">
        Stay Connected
      </h3>
      <p className="text-sm font-light text-gray-400 mb-6 leading-relaxed">
        Subscribe to receive exclusive updates on new collections, atelier
        events, and bespoke tailoring insights.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#C9A962]/50 transition-colors duration-200"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#C9A962] text-[#1A1A1A] text-xs font-medium tracking-[0.15em] uppercase hover:bg-white transition-colors duration-300"
          >
            {isSubmitted ? "Subscribed!" : "Subscribe"}
          </button>
        </div>
      </form>

      {/* Contact Info */}
      <div className="mt-8 flex flex-col gap-3">
        <a
          href="tel:+12125550147"
          className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#C9A962] transition-colors duration-200"
        >
          <Phone size={14} strokeWidth={1.5} />
          <span className="font-light">+1 (212) 555-0147</span>
        </a>
        <a
          href="mailto:atelier@lignecouture.com"
          className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#C9A962] transition-colors duration-200"
        >
          <Mail size={14} strokeWidth={1.5} />
          <span className="font-light">atelier@lignecouture.com</span>
        </a>
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <MapPin size={14} strokeWidth={1.5} />
          <span className="font-light">750 Madison Avenue, New York, NY</span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Main Footer Component
// ============================================
const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate top section
      gsap.fromTo(
        topRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate bottom section
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#1A1A1A] text-white"
    >
      {/* Main Footer Content */}
      <div ref={topRef} className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
            {/* Logo & Description */}
            <div className="lg:col-span-2">
              <FooterLogo />
              <p className="mt-6 text-sm font-light text-gray-400 leading-relaxed max-w-sm">
                Where tradition meets contemporary elegance. Each garment is a
                testament to the art of bespoke tailoring, crafted with
                precision and passion in the heart of New York.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 mt-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 text-gray-400 hover:bg-[#C9A962] hover:text-[#1A1A1A] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={18} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Columns */}
            {footerColumns.map((column) => (
              <div key={column.title} className="hidden md:block">
                <FooterColumn title={column.title} links={column.links} />
              </div>
            ))}

            {/* Newsletter - Mobile only columns */}
            <div className="md:hidden space-y-8">
              {footerColumns.slice(0, 2).map((column) => (
                <FooterColumn
                  key={column.title}
                  title={column.title}
                  links={column.links}
                />
              ))}
            </div>

            {/* Newsletter */}
            <Newsletter />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div ref={bottomRef} className="bg-[#0D0D0D]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs text-gray-500 font-light">
              &copy; {new Date().getFullYear()} Ligne Couture. All rights
              reserved.
            </p>

            {/* Legal Links */}
            <nav className="flex items-center gap-6">
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-gray-500 hover:text-[#C9A962] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                  {index < legalLinks.length - 1 && (
                    <span className="text-gray-700">|</span>
                  )}
                </React.Fragment>
              ))}
            </nav>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 text-xs text-gray-500 hover:text-[#C9A962] transition-colors duration-200"
            >
              <span className="font-light">Back to top</span>
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="transform group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
