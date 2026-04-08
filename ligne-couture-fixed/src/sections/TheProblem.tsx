import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const americanProblems = [
  'Fused construction that bubbles after dry cleaning',
  'Synthetic fabrics that don\'t breathe',
  'Boxy silhouettes that hide the physique',
  'Machine stitching that unravels',
  'Standardised sizing that fits no one',
  'Designed to be replaced, not cherished'
]

const europeanStandards = [
  'Full canvas construction that moulds to your body',
  'Natural fibres from heritage mills',
  'Tailored silhouettes that flatter',
  'Hand-finished details that endure',
  'Made to your exact measurements',
  'Built to last a lifetime with proper care'
]

const TheProblem = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const content = contentRef.current
    
    if (!section || !header || !content) return

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

      const columns = content.querySelectorAll('.comparison-column')
      gsap.fromTo(columns,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
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
      id="problem"
      className="py-20 sm:py-24 lg:py-32 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16">
          <p className="animate-header text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-charcoal-muted mb-4">
            The State of Modern Suiting
          </p>
          <h2 className="animate-header font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
            What Went Wrong
          </h2>
          <p className="animate-header text-base sm:text-lg text-charcoal-muted max-w-2xl mx-auto px-4">
            The modern suit has been reduced to an afterthought — mass-produced, disposable, and devoid of soul. We believe a gentleman deserves better.
          </p>
        </div>

        {/* Comparison */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* American Suits */}
          <div className="comparison-column bg-white border border-border rounded-xl p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center">
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal">
                The American Way
              </h3>
            </div>
            
            <p className="text-charcoal-muted mb-6 sm:mb-8 text-sm leading-relaxed">
              Born from the industrial revolution's demand for speed and standardisation, the American suit prioritised efficiency over excellence. The result: garments that fit poorly, wear quickly, and age badly.
            </p>

            <ul className="space-y-3 sm:space-y-4">
              {americanProblems.map((item, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-charcoal text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* European Standards */}
          <div className="comparison-column bg-charcoal text-white rounded-xl p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-white">
                The European Standard
              </h3>
            </div>
            
            <p className="text-white/70 mb-6 sm:mb-8 text-sm leading-relaxed">
              European tailoring treats each garment as a work of art. From the first measurement to the final stitch, every decision serves one purpose: creating a suit that elevates the wearer.
            </p>

            <ul className="space-y-3 sm:space-y-4">
              {europeanStandards.map((item, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 sm:mt-16 text-center px-4">
          <p className="font-serif text-lg sm:text-xl text-charcoal italic max-w-2xl mx-auto">
            "The difference is not merely in the construction — it is in the philosophy. One approach asks 'How quickly can we make this?' The other asks 'How well can we make this?'"
          </p>
        </div>
      </div>
    </section>
  )
}

export default TheProblem
