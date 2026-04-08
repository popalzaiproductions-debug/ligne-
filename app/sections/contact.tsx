"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, MapPin, Clock, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  tier: string;
  message: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    tier: "",
    message: "",
  });

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const info = infoRef.current;
    const timeline = timelineRef.current;

    if (!section || !form || !info || !timeline) return;

    const ctx = gsap.context(() => {
      // Form fade in up
      gsap.fromTo(
        form,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: form,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Contact info fade in up with delay
      gsap.fromTo(
        info,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: info,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Timeline fade in up
      gsap.fromTo(
        timeline,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timeline,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTierSelect = (tier: string) => {
    setFormData((prev) => ({ ...prev, tier }));
    setIsSelectOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const tierOptions = [
    { value: "", label: "Select a tier" },
    { value: "essential", label: "Essential Line" },
    { value: "heritage", label: "Heritage Line" },
    { value: "signature", label: "Signature Line" },
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+971 50 569 3732",
      href: "tel:+971505693732",
    },
    {
      icon: Mail,
      label: "Email",
      value: "hello@lignecouture.com",
      href: "mailto:hello@lignecouture.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dubai Design District, Building 7, Suite 301",
      href: "#",
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Sunday - Thursday, 10:00 AM - 7:00 PM",
      href: "#",
    },
  ];

  const deliveryTimeline = [
    { tier: "Essential Line", time: "1-2 weeks" },
    { tier: "Heritage Line", time: "1-3 weeks" },
    { tier: "Signature Line", time: "2-3 weeks" },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-white py-32 px-4 sm:px-6 lg:px-8 xl:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#666666] mb-4 block">
            GET IN TOUCH
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] mb-4">
            Begin Your Journey
          </h2>
          <p className="text-lg text-[#666666] max-w-xl mx-auto">
            Book a consultation or send us your enquiry
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form Column */}
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-[#1A1A1A] mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-[#D1D1D1] rounded-lg text-[#1A1A1A] placeholder-[#999999] transition-all duration-300 focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A]"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#1A1A1A] mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-[#D1D1D1] rounded-lg text-[#1A1A1A] placeholder-[#999999] transition-all duration-300 focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A]"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-[#1A1A1A] mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-[#D1D1D1] rounded-lg text-[#1A1A1A] placeholder-[#999999] transition-all duration-300 focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A]"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-[#1A1A1A] mb-2"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-[#D1D1D1] rounded-lg text-[#1A1A1A] placeholder-[#999999] transition-all duration-300 focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A]"
                  placeholder="Enter your company name"
                />
              </div>

              {/* Preferred Tier */}
              <div className="relative">
                <label
                  htmlFor="tier"
                  className="block text-sm font-medium text-[#1A1A1A] mb-2"
                >
                  Preferred Tier
                </label>
                <button
                  type="button"
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className="w-full px-4 py-3 bg-white border border-[#D1D1D1] rounded-lg text-left text-[#1A1A1A] transition-all duration-300 focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] flex items-center justify-between"
                >
                  <span
                    className={
                      formData.tier ? "text-[#1A1A1A]" : "text-[#999999]"
                    }
                  >
                    {formData.tier
                      ? tierOptions.find((opt) => opt.value === formData.tier)
                          ?.label
                      : "Select a tier"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#666666] transition-transform duration-300 ${
                      isSelectOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isSelectOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-[#D1D1D1] rounded-lg shadow-lg">
                    {tierOptions.slice(1).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleTierSelect(option.value)}
                        className="w-full px-4 py-3 text-left text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#1A1A1A] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-[#D1D1D1] rounded-lg text-[#1A1A1A] placeholder-[#999999] transition-all duration-300 focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#1A1A1A] text-white font-medium rounded-lg transition-all duration-300 hover:bg-[#333333] hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Send Enquiry
              </button>
            </form>
          </div>

          {/* Contact Info Column */}
          <div ref={infoRef} className="space-y-8">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-start gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-[#F5F5F5] group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[#F5F5F5] rounded-lg flex items-center justify-center transition-colors duration-300 group-hover:bg-[#1A1A1A]">
                    <item.icon className="w-5 h-5 text-[#666666] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#666666] mb-1">{item.label}</p>
                    <p className="text-[#1A1A1A] font-medium">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Delivery Timeline */}
            <div
              ref={timelineRef}
              className="bg-[#F5F5F5] rounded-xl p-6 mt-8"
            >
              <h3 className="text-lg font-medium text-[#1A1A1A] mb-4">
                Delivery Timeline
              </h3>
              <div className="space-y-3">
                {deliveryTimeline.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-[#D1D1D1] last:border-0"
                  >
                    <span className="text-[#666666]">{item.tier}</span>
                    <span className="text-[#1A1A1A] font-medium">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
