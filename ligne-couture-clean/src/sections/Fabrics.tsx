import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Thermometer, Move, Shield } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  {
    icon: Thermometer,
    title: 'Climate Adaptation',
    description: "Breathable weaves for Dubai's warmth, insulated options for travel. Your comfort in any environment."
  },
  {
    icon: Move,
    title: 'Dynamic Mobility',
    description: 'Four-way stretch fabrics that move with you. From boardroom to evening events without constraint.'
  },
  {
    icon: Shield,
    title: 'Pro Endurance',
    description: 'Wrinkle-resistant, stain-repellent finishes. Your suit maintains its polish through the longest days.'
  }
]

const Fabrics = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const quote = quoteRef.current
    const benefitsEl = benefitsRef.current
    
    if (!section || !quote || !benefitsEl) return

    const ctx = gsap.context(() => {
      // Quote animation
      gsap.fromTo(quote,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quote,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Benefits animation
      const benefitCards = benefitsEl.querySelectorAll('.benefit-card')
      gsap.fromTo(benefitCards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: benefitsEl,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="fabrics"
      className="py-20 sm:py-24 lg:py-32 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quote Block */}
        <div ref={quoteRef} className="text-center mb-12 sm:mb-20">
          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-charcoal leading-snug italic max-w-4xl mx-auto mb-4 sm:mb-6 px-4">
            "We source only the finest textiles from renowned mills, ensuring every garment feels as exceptional as it looks."
          </blockquote>
          <cite className="text-xs sm:text-sm font-medium uppercase tracking-wider text-charcoal-muted not-italic">
            — The Ligne Couture Atelier
          </cite>
        </div>

        {/* Benefits Grid */}
        <div 
          ref={benefitsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div 
                key={benefit.title}
                className="benefit-card bg-white border border-border rounded-xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cream rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-charcoal" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-charcoal mb-2 sm:mb-3">
                  {benefit.title}
                </h3>
                <p className="text-charcoal-muted leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Fabrics
