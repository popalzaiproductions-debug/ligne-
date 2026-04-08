import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { User, Ruler, Scissors, Package } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: User,
    title: 'Personal Consultation',
    description: 'We begin with an in-depth consultation to understand your lifestyle, preferences, and the occasions that define your wardrobe. Every detail matters — from your posture to your personal style.',
    number: '01'
  },
  {
    icon: Ruler,
    title: 'Precision Measurements',
    description: 'Our master tailors take over 40 measurements, accounting for your unique physique and how you move. This is the foundation of a garment that fits like a second skin.',
    number: '02'
  },
  {
    icon: Scissors,
    title: 'Master Craftsmanship',
    description: 'Your garment is cut by hand and stitched by artisans with decades of experience. We use traditional techniques passed down through generations of European tailoring houses.',
    number: '03'
  },
  {
    icon: Package,
    title: 'Fitting & Perfection',
    description: 'After your first fitting, we make precise adjustments to ensure perfection. This iterative process is what separates true bespoke from mere made-to-measure.',
    number: '04'
  }
]

const HowItWorks = () => {
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

      const cardElements = cards.querySelectorAll('.step-card')
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

  return (
    <section 
      ref={sectionRef}
      id="how-it-works"
      className="py-20 sm:py-24 lg:py-32 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16">
          <p className="animate-header text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-charcoal-muted mb-4">
            The Process
          </p>
          <h2 className="animate-header font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
            How It Works
          </h2>
          <p className="animate-header text-base sm:text-lg text-charcoal-muted max-w-xl mx-auto px-4">
            Four meticulous steps to a garment that embodies true excellence
          </p>
        </div>

        {/* Steps Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
        >
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div 
                key={step.number}
                className="step-card group bg-white border border-border rounded-xl p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-cream rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-charcoal" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <span className="text-[10px] sm:text-xs font-medium text-charcoal-muted uppercase tracking-wider">
                        Step {step.number}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl lg:text-2xl text-charcoal mb-2 sm:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-charcoal-muted leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
