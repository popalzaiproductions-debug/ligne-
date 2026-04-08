"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Clock } from "lucide-react";
import { Button } from "../shared/button";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const tagline = taglineRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const badges = badgesRef.current;
    const ctas = ctasRef.current;

    if (!section || !image || !tagline || !headline || !subheadline || !badges || !ctas) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([tagline, headline, subheadline, badges, ctas], {
        opacity: 0,
        y: 30,
      });

      // Content reveal animation with stagger
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(tagline, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          headline,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(
          subheadline,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(
          badges,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(
          ctas,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.5"
        );

      // Hero image parallax on scroll
      gsap.to(image, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#F5F2EB] overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Image Section - Full width on mobile, 50% on desktop */}
        <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-screen overflow-hidden">
          <div
            ref={imageRef}
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
          >
            <Image
              src="/assets/hero-suit.jpg"
              alt="Bespoke charcoal grey suit showcase"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Subtle gradient overlay for text readability on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F5F2EB]/30 lg:hidden" />
        </div>

        {/* Content Section - Full width on mobile, 50% on desktop */}
        <div className="flex w-full lg:w-1/2 items-center justify-center px-6 sm:px-8 lg:px-12 xl:px-16 py-12 lg:py-0">
          <div className="max-w-xl">
            {/* Tagline */}
            <p
              ref={taglineRef}
              className="text-sm sm:text-base font-medium tracking-[0.2em] uppercase text-[#8B7355] mb-4"
            >
              Perfected. Consistent. Delivered.
            </p>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-[#1A1A1A] leading-[1.1] tracking-tight mb-6"
            >
              Bespoke Professional Wear,{" "}
              <span className="font-normal italic">Reimagined</span>
            </h1>

            {/* Subheadline */}
            <p
              ref={subheadlineRef}
              className="text-base sm:text-lg text-[#4A4A4A] leading-relaxed mb-8 max-w-md"
            >
              Experience the future of tailoring with AI-driven style profiling.
              We craft perfectly fitted professional wardrobes that reflect your
              unique identity—delivered in as little as 1-3 weeks.
            </p>

            {/* Badges */}
            <div ref={badgesRef} className="flex flex-wrap gap-3 mb-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-white text-sm font-medium rounded-full">
                <Sparkles className="w-4 h-4" />
                AI-Powered
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-[#E5E0D5] text-[#1A1A1A] text-sm font-medium rounded-full">
                <Clock className="w-4 h-4" />
                1-3 Weeks Delivery
              </span>
            </div>

            {/* CTAs */}
            <div ref={ctasRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <Button
                size="lg"
                className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-8 py-6 text-base font-medium tracking-wide rounded-none transition-all duration-300 hover:shadow-xl"
              >
                Book Consultation
              </Button>
              <a
                href="#tiers"
                className="group inline-flex items-center gap-2 text-[#1A1A1A] font-medium text-base hover:text-[#8B7355] transition-colors duration-300"
              >
                Explore Tiers
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-[75%] hidden lg:block">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#8B7355]/30 to-transparent" />
      </div>
    </section>
  );
}
