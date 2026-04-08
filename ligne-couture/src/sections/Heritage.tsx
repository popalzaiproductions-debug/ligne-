import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Crown, Scissors } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const houses = [
  {
    name: 'Savile Row',
    location: 'London, England',
    established: '1803',
    description: 'The birthplace of bespoke tailoring. For over two centuries, the Row has set the standard for gentleman\'s dress, creating garments that defined eras and shaped the very concept of masculine elegance.',
    legacy: 'Invented the dinner jacket, perfected the three-piece suit'
  },
  {
    name: 'Naples',
    location: 'Napoli, Italy',
    established: '1930s',
    description: 'The Neapolitan school revolutionised tailoring with its soft, unstructured jackets that moved with the wearer. Where English tailors built armour, Neapolitans created a second skin.',
    legacy: 'The spalla camicia shoulder, lighter construction, vibrant styling'
  },
  {
    name: 'Biella',
    location: 'Piemonte, Italy',
    established: '1663',
    description: 'Home to the world\'s finest wool mills. For four centuries, Biella has produced fabrics that clothed emperors, statesmen, and those who understand that true luxury begins with the raw material.',
    legacy: 'Loro Piana, Vitale Barberis, Cerruti — the world\'s finest mills'
  }
]

const Heritage = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const cards = cardsRef.current
    const quote = quoteRef.current
    
    if (!section || !header || !cards || !quote) return

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

      const cardElements = cards.querySelectorAll('.house-card')
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

      gsap.fromTo(quote,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quote,
            start: 'top 80%',
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
      id="heritage"
      className="py-20 sm:py-24 lg:py-32 bg-charcoal text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16">
          <p className="animate-header text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white/60 mb-4">
            Our Heritage
          </p>
          <h2 className="animate-header font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            The Great Houses of Tailoring
          </h2>
          <p className="animate-header text-base sm:text-lg text-white/60 max-w-2xl mx-auto px-4">
            We stand on the shoulders of centuries of craftsmanship. Our atelier honours the traditions of the world's greatest tailoring centres.
          </p>
        </div>

        {/* Houses Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20"
        >
          {houses.map((house) => (
            <div 
              key={house.name}
              className="house-card bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
            >
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60" />
                <span className="text-xs sm:text-sm text-white/60">{house.location}</span>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-white/60">Est. {house.established}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-white mb-3 sm:mb-4">
                {house.name}
              </h3>
              
              <p className="text-white/70 leading-relaxed mb-4 sm:mb-6 text-sm">
                {house.description}
              </p>
              
              <div className="pt-3 sm:pt-4 border-t border-white/10">
                <div className="flex items-start gap-2">
                  <Scissors className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-white/80 italic">{house.legacy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div ref={quoteRef} className="text-center max-w-3xl mx-auto px-4">
          <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-white/90 leading-relaxed italic mb-4 sm:mb-6">
            "A well-tailored suit is to a man what armour was to a knight. It is not merely clothing — it is preparation for battle, a statement of intent, a declaration that you take yourself seriously."
          </blockquote>
          <cite className="text-xs sm:text-sm font-medium uppercase tracking-wider text-white/50 not-italic">
            — The Ligne Couture Philosophy
          </cite>
        </div>
      </div>
    </section>
  )
}

export default Heritage
