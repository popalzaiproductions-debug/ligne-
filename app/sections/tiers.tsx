"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

const tiers: PricingTier[] = [
  {
    name: "Essential Line",
    price: "From AED 2,500",
    description: "Perfect for the modern professional seeking quality and value",
    features: [
      "Premium wool blends",
      "Standard lining options",
      "1-2 week delivery",
      "1 fitting session",
      "Basic style consultation",
    ],
  },
  {
    name: "Heritage Line",
    price: "From AED 4,500",
    description: "Our most sought-after experience, balancing luxury with accessibility",
    features: [
      "Fine Italian wool & cashmere",
      "Premium lining selection",
      "1-3 week delivery",
      "2 fitting sessions",
      "AI style profiling",
      "Priority support",
    ],
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Signature Line",
    price: "From AED 8,000",
    description: "The pinnacle of bespoke tailoring for the discerning individual",
    features: [
      "Loro Piana & Scabal fabrics",
      "Bespoke lining options",
      "2-3 week delivery",
      "Unlimited fittings",
      "Comprehensive style consultation",
      "Dedicated style advisor",
      "Lifetime alterations",
    ],
  },
];

function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={`pricing-card relative bg-white rounded-xl p-8 transition-all duration-300 ${
        tier.highlighted
          ? "border-2 border-[#1A1A1A] scale-[1.02] shadow-xl"
          : "border border-gray-200 hover:border-gray-300"
      }`}
      data-index={index}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-block bg-[#1A1A1A] text-white text-xs font-medium tracking-wider uppercase px-4 py-1.5 rounded-full">
            {tier.badge}
          </span>
        </div>
      )}

      {/* Tier Name */}
      <h3 className="text-xl font-medium text-[#1A1A1A] mb-2">{tier.name}</h3>

      {/* Price */}
      <div className="mb-4">
        <span className="text-3xl font-semibold text-[#1A1A1A]">{tier.price}</span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-6">{tier.description}</p>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-6"></div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {tier.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[#1A1A1A] flex-shrink-0 mt-0.5" strokeWidth={2} />
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        className={`w-full py-3.5 px-6 rounded-lg font-medium text-sm tracking-wide transition-all duration-300 ${
          tier.highlighted
            ? "bg-[#1A1A1A] text-white hover:bg-[#333333] hover:scale-[1.02]"
            : "bg-transparent text-[#1A1A1A] border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
        }`}
      >
        Enquire
      </button>
    </div>
  );
}

export default function Tiers() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards animation with stagger
      const cardElements = cards.querySelectorAll(".pricing-card");
      gsap.fromTo(
        cardElements,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cards,
            start: "top 75%",
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
      id="pricing"
      className="py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase mb-4">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-4">
            Choose Your Line
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Three tiers of excellence, each crafted to meet your professional needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
        >
          {tiers.map((tier, index) => (
            <PricingCard key={tier.name} tier={tier} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
