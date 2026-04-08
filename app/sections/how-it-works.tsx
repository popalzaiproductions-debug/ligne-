"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, Ruler, Scissors, Package } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stepNumber: string;
}

function StepCard({ icon, title, description, stepNumber }: StepCardProps) {
  return (
    <div className="step-card group bg-white border border-[#E5E5E5] rounded-[0.75rem] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-default">
      <div className="flex items-start gap-6">
        {/* Step Number */}
        <span className="text-[#C9A87C] text-sm font-medium tracking-wider">
          {stepNumber}
        </span>
        
        <div className="flex-1">
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-[#F5F2EB] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
            <div className="text-[#1A1A1A]">
              {icon}
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-medium text-[#1A1A1A] mb-3 tracking-tight">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-[#6B6B6B] leading-relaxed text-[0.9375rem]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards animation with stagger
      const cardElements = cards.querySelectorAll(".step-card");
      gsap.fromTo(
        cardElements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: <User className="w-5 h-5" strokeWidth={1.5} />,
      title: "AI-Powered Onboarding",
      description:
        "Complete our intelligent style profile. Our AI learns your preferences, professional environment, and personal style to recommend the perfect fabrics and cuts.",
      stepNumber: "01",
    },
    {
      icon: <Ruler className="w-5 h-5" strokeWidth={1.5} />,
      title: "Precision Measurements",
      description:
        "Choose between a guided self-measurement session at home or visit our studio for a professional fitting. Our technology ensures accuracy to the millimetre.",
      stepNumber: "02",
    },
    {
      icon: <Scissors className="w-5 h-5" strokeWidth={1.5} />,
      title: "Master Craftsmanship",
      description:
        "Your garment is handcrafted by skilled artisans using time-honoured techniques combined with modern precision. Every stitch is placed with intention.",
      stepNumber: "03",
    },
    {
      icon: <Package className="w-5 h-5" strokeWidth={1.5} />,
      title: "Swift Delivery",
      description:
        "Receive your bespoke garment within 1-3 weeks. Try it on, and if any adjustments are needed, we provide complimentary alterations.",
      stepNumber: "04",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-32 px-4 sm:px-6 lg:px-12 bg-[#F5F2EB]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block text-xs font-medium tracking-[0.2em] text-[#C9A87C] uppercase mb-4">
            THE PROCESS
          </span>
          <h2 className="text-4xl sm:text-5xl font-light text-[#1A1A1A] tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-[#6B6B6B] text-lg max-w-md mx-auto">
            Four simple steps to your perfect suit
          </p>
        </div>

        {/* Step Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              stepNumber={step.stepNumber}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
