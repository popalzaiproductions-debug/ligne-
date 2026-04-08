"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Thermometer, Move, Shield } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Benefit card data
const benefits = [
  {
    icon: Thermometer,
    title: "Climate Adaptation",
    description:
      "Breathable weaves for Dubai's warmth, insulated options for travel. Your comfort in any environment.",
  },
  {
    icon: Move,
    title: "Dynamic Mobility",
    description:
      "Four-way stretch fabrics that move with you. From boardroom to evening events without constraint.",
  },
  {
    icon: Shield,
    title: "Pro Endurance",
    description:
      "Wrinkle-resistant, stain-repellent finishes. Your suit maintains its polish through the longest days.",
  },
];

// Textile partner data
const partners = [
  { name: "Loro Piana", subtitle: "Italy" },
  { name: "Scabal", subtitle: "Belgium" },
  { name: "Vitale Barberis Canonico", subtitle: "Italy" },
  { name: "REDA", subtitle: "Italy" },
];

export default function FabricsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const quote = quoteRef.current;
    const benefitsContainer = benefitsRef.current;
    const partnersContainer = partnersRef.current;

    if (!section || !quote || !benefitsContainer || !partnersContainer) return;

    const ctx = gsap.context(() => {
      // Quote animation - fade in up
      gsap.fromTo(
        quote,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: quote,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Benefit cards animation - fade in up with stagger
      const benefitCards = benefitsContainer.querySelectorAll(".benefit-card");
      gsap.fromTo(
        benefitCards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: benefitsContainer,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Partner cards animation - fade in up with stagger
      const partnerCards = partnersContainer.querySelectorAll(".partner-card");
      gsap.fromTo(
        partnerCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: partnersContainer,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="fabrics"
      className="w-full bg-[#F5F2EB] py-32 px-4 sm:px-6 lg:px-8 xl:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Quote Block */}
        <div ref={quoteRef} className="text-center mb-20">
          <blockquote className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] leading-tight mb-6">
            &ldquo;We source only the finest textiles from renowned mills,
            ensuring every garment feels as exceptional as it looks.&rdquo;
          </blockquote>
          <cite className="font-serif text-lg text-[#1A1A1A]/70 not-italic">
            — The Ligne Couture Atelier
          </cite>
        </div>

        {/* Benefit Cards */}
        <div
          ref={benefitsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-card bg-white rounded-lg p-8 border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/20 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="mb-5">
                <benefit.icon
                  className="w-8 h-8 text-[#1A1A1A] group-hover:scale-110 transition-transform duration-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-serif text-xl text-[#1A1A1A] mb-3">
                {benefit.title}
              </h3>
              <p className="text-[#1A1A1A]/70 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Textile Partners */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-[#1A1A1A]/50 mb-8">
            Our Textile Partners
          </p>
        </div>

        <div
          ref={partnersRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center"
        >
          {partners.map((partner, index) => (
            <div
              key={index}
              className="partner-card text-center group cursor-pointer"
            >
              <div className="py-6 px-4 transition-all duration-300">
                <h4 className="font-serif text-2xl md:text-3xl text-[#1A1A1A]/60 group-hover:text-[#1A1A1A] transition-colors duration-300">
                  {partner.name}
                </h4>
                <p className="text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/40 group-hover:text-[#1A1A1A]/60 transition-colors duration-300 mt-2">
                  {partner.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
