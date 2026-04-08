import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const image = imageRef.current
    const content = contentRef.current
    
    if (!section || !image || !content) return

    const ctx = gsap.context(() => {
      const elements = content.querySelectorAll('.animate-item')
      gsap.set(elements, { opacity: 0, y: 30 })
      
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.3
      })

      // Parallax only on desktop
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        gsap.to(image, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-cream relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Image Column - Full width on mobile, sticky on desktop */}
          <div 
            ref={imageRef}
            className="relative h-[40vh] sm:h-[50vh] lg:h-screen lg:sticky lg:top-0 order-1 lg:order-1"
          >
            <img
              src="/hero-suit.jpg"
              alt="Bespoke charcoal suit"
              className="w-full h-full object-cover object-top"
            />
            {/* Gradient overlay - more subtle on mobile */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/60 lg:bg-gradient-to-r lg:from-transparent lg:to-cream/40" />
          </div>

          {/* Content Column */}
          <div 
            ref={contentRef}
            className="flex flex-col justify-center px-6 sm:px-8 lg:px-12 xl:px-16 py-12 lg:py-0 order-2 lg:order-2"
          >
            {/* Tagline */}
            <p className="animate-item text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-charcoal-muted mb-4 sm:mb-6">
              Est. 2019 — Dubai
            </p>

            {/* Headline */}
            <h1 className="animate-item font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-charcoal leading-[1.1] mb-4 sm:mb-6">
              The Art of <em className="italic">True</em> Bespoke Tailoring
            </h1>

            {/* Subheadline */}
            <p className="animate-item text-base sm:text-lg text-charcoal-muted leading-relaxed mb-6 sm:mb-8 max-w-lg">
              Where centuries of Savile Row tradition meet the discerning standards of the modern gentleman. Each garment is handcrafted by master tailors who understand that excellence cannot be rushed.
            </p>

            {/* Badges */}
            <div className="animate-item flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-charcoal text-white text-[10px] sm:text-xs font-medium uppercase tracking-wider rounded-full">
                Handcrafted
              </span>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-charcoal text-charcoal text-[10px] sm:text-xs font-medium uppercase tracking-wider rounded-full">
                European Fabrics
              </span>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-charcoal text-charcoal text-[10px] sm:text-xs font-medium uppercase tracking-wider rounded-full">
                Master Tailors
              </span>
            </div>

            {/* CTAs */}
            <div className="animate-item flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-charcoal text-white font-medium uppercase tracking-wider text-xs sm:text-sm rounded-lg hover:bg-charcoal-light transition-all duration-300 hover:-translate-y-0.5"
              >
                Book Consultation
              </button>
              <button 
                onClick={() => scrollToSection('heritage')}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-charcoal font-medium uppercase tracking-wider text-xs sm:text-sm group"
              >
                Our Heritage
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
