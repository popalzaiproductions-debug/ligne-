import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const tiers = [
  {
    name: 'Essential Line',
    description: 'For the gentleman who appreciates quality craftsmanship without compromise',
    features: [
      'Premium English & Italian wool',
      'Half-canvas construction',
      'Standard lining options',
      '4-6 week delivery',
      '2 fitting sessions',
      'Personal consultation'
    ],
    highlighted: false,
    cta: 'Enquire'
  },
  {
    name: 'Heritage Line',
    description: 'Our most distinguished offering, for those who demand true excellence',
    features: [
      'Super 150s wool & cashmere blends',
      'Full-canvas construction',
      'Premium lining selection',
      '6-8 week delivery',
      '3 fitting sessions',
      'Comprehensive style consultation',
      'Priority atelier access'
    ],
    highlighted: true,
    badge: 'Most Popular',
    cta: 'Enquire'
  },
  {
    name: 'Signature Line',
    description: 'The pinnacle of bespoke tailoring, reserved for the true connoisseur',
    features: [
      'Loro Piana, Scabal & Holland & Sherry fabrics',
      'Hand-padded lapels',
      'Bespoke lining with monogram',
      '8-10 week delivery',
      'Unlimited fittings',
      'Dedicated master tailor',
      'Lifetime alterations',
      'Private showroom access'
    ],
    highlighted: false,
    cta: 'Enquire'
  }
]

const Tiers = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const cards = cardsRef.current
    
    if (!section || !header || !cards) return

    const ctx = gsap.context(() => {
      const headerElements = header.querySelectorAll('.animate-header')
      gsap.fromTo(headerElements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )

      const cardElements = cards.querySelectorAll('.tier-card')
      gsap.fromTo(cardElements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="tiers"
      className="py-20 sm:py-24 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16">
          <p className="animate-header text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-charcoal-muted mb-4">
            Our Lines
          </p>
          <h2 className="animate-header font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
            Choose Your Line
          </h2>
          <p className="animate-header text-base sm:text-lg text-charcoal-muted max-w-xl mx-auto px-4">
            Three tiers of excellence, each crafted with unwavering attention to detail
          </p>
        </div>

        {/* Tiers Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`tier-card relative bg-white rounded-xl p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:-translate-y-2 ${
                tier.highlighted 
                  ? 'border-2 border-charcoal shadow-xl md:scale-[1.02]' 
                  : 'border border-border hover:shadow-lg'
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-charcoal text-white text-[10px] sm:text-xs font-medium uppercase tracking-wider rounded-full">
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Tier Name */}
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal mb-3 sm:mb-4">
                {tier.name}
              </h3>

              {/* Description */}
              <p className="text-charcoal-muted text-sm leading-relaxed mb-6 sm:mb-8">
                {tier.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-charcoal flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-charcoal">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={scrollToContact}
                className={`w-full py-3 sm:py-4 rounded-lg font-medium uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                  tier.highlighted
                    ? 'bg-charcoal text-white hover:bg-charcoal-light'
                    : 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-white'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Tiers
