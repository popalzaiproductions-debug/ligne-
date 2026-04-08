import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Factory, ArrowRight, Info } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Fabric data with mill partnerships
const fabrics = [
  {
    id: 'charcoal',
    name: 'Charcoal Super 120s',
    image: '/fabrics/charcoal-wool.jpg',
    mill: 'Vitale Barberis Canonico',
    origin: 'Biella, Italy',
    composition: '100% Super 120s Wool',
    weight: '260g',
    price: 'Essential Line',
    description: 'A versatile charcoal that works in any setting. The Super 120s weave offers exceptional drape and durability.'
  },
  {
    id: 'navy',
    name: 'Navy Super 130s',
    image: '/fabrics/navy-wool.jpg',
    mill: 'Loro Piana',
    origin: 'Biella, Italy',
    composition: '100% Super 130s Wool',
    weight: '270g',
    price: 'Heritage Line',
    description: 'The quintessential business suit fabric. Deep navy with a subtle sheen that commands respect.'
  },
  {
    id: 'herringbone',
    name: 'Grey Herringbone',
    image: '/fabrics/grey-herringbone.jpg',
    mill: 'Scabal',
    origin: 'Huddersfield, England',
    composition: '100% Wool',
    weight: '280g',
    price: 'Heritage Line',
    description: 'A classic pattern that adds texture without ostentation. Perfect for the discerning gentleman.'
  },
  {
    id: 'camel',
    name: 'Camel Cashmere Blend',
    image: '/fabrics/camel-cashmere.jpg',
    mill: 'Loro Piana',
    origin: 'Biella, Italy',
    composition: '90% Wool, 10% Cashmere',
    weight: '240g',
    price: 'Signature Line',
    description: 'Unparalleled softness meets sophisticated colour. For those who demand the extraordinary.'
  },
  {
    id: 'green',
    name: 'Forest Green',
    image: '/fabrics/forest-green.jpg',
    mill: 'Holland & Sherry',
    origin: 'London, England',
    composition: '100% Super 100s Wool',
    weight: '265g',
    price: 'Essential Line',
    description: 'A bold choice for the confident man. Rich colour that stands apart from the ordinary.'
  },
  {
    id: 'pinstripe',
    name: 'Charcoal Pinstripe',
    image: '/fabrics/pinstripe.jpg',
    mill: 'Scabal',
    origin: 'Huddersfield, England',
    composition: '100% Super 140s Wool',
    weight: '275g',
    price: 'Heritage Line',
    description: 'The pinstripe that built empires. Classic banking stripe with modern refinement.'
  },
  {
    id: 'check',
    name: 'Prince of Wales Check',
    image: '/fabrics/glen-check.jpg',
    mill: 'Vitale Barberis Canonico',
    origin: 'Biella, Italy',
    composition: '100% Wool',
    weight: '290g',
    price: 'Signature Line',
    description: 'The pattern of aristocracy. A statement of heritage and impeccable taste.'
  },
  {
    id: 'burgundy',
    name: 'Burgundy Super 120s',
    image: '/fabrics/burgundy.jpg',
    mill: 'REDA',
    origin: 'Biella, Italy',
    composition: '100% Super 120s Wool',
    weight: '260g',
    price: 'Essential Line',
    description: 'Rich, sophisticated, and undeniably elegant. For evenings and special occasions.'
  }
]

// Silhouette options
const silhouettes = [
  {
    id: 'classic',
    name: 'Classic British',
    description: 'Structured shoulders, suppressed waist, double vent. The Savile Row standard.',
    features: ['Padded shoulders', 'Structured canvas', 'Double vent', 'Notch lapel']
  },
  {
    id: 'neapolitan',
    name: 'Neapolitan',
    description: 'Soft shoulders, minimal padding, spalla camicia. Effortless Italian elegance.',
    features: ['Spalla camicia shoulder', 'Unlined construction', 'Single vent', 'Wide notch lapel']
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    description: 'Streamlined silhouette with modern proportions. For the forward-thinking gentleman.',
    features: ['Soft shoulders', 'Half canvas', 'Double vent', 'Peak lapel option']
  }
]

const Studio = () => {
  const [selectedFabric, setSelectedFabric] = useState(fabrics[0])
  const [selectedSilhouette, setSelectedSilhouette] = useState(silhouettes[0])
  const [showMillInfo, setShowMillInfo] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const millsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const content = contentRef.current
    const mills = millsRef.current
    
    if (!section || !header || !content || !mills) return

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

      gsap.fromTo(content,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      )

      gsap.fromTo(mills,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mills,
            start: 'top 85%',
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
      id="studio"
      className="py-20 sm:py-24 lg:py-32 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-12">
          <p className="animate-header text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-charcoal-muted mb-4">
            The Atelier
          </p>
          <h2 className="animate-header font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
            Bespoke Studio
          </h2>
          <p className="animate-header text-base sm:text-lg text-charcoal-muted max-w-2xl mx-auto px-4">
            Select your silhouette and fabric. Each cloth is sourced directly from the world's finest mills.
          </p>
        </div>

        {/* Configurator */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          
          {/* Left Column - Preview */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            {/* Preview Card */}
            <div className="bg-white border border-border rounded-xl overflow-hidden">
              <div className="aspect-square relative">
                <img 
                  src={selectedFabric.image} 
                  alt={selectedFabric.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <p className="text-xs uppercase tracking-wider opacity-80 mb-1">{selectedSilhouette.name}</p>
                  <h3 className="font-serif text-xl sm:text-2xl">{selectedFabric.name}</h3>
                </div>
              </div>
              
              {/* Fabric Details */}
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-charcoal-muted">Mill</span>
                  <span className="text-sm font-medium text-charcoal">{selectedFabric.mill}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-charcoal-muted">Origin</span>
                  <span className="text-sm font-medium text-charcoal">{selectedFabric.origin}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-charcoal-muted">Composition</span>
                  <span className="text-sm font-medium text-charcoal">{selectedFabric.composition}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-charcoal-muted">Weight</span>
                  <span className="text-sm font-medium text-charcoal">{selectedFabric.weight}</span>
                </div>
                <div className="pt-3 sm:pt-4 border-t border-border">
                  <p className="text-sm text-charcoal-muted">{selectedFabric.description}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium text-charcoal">Starting at</span>
                  <span className="text-base sm:text-lg font-medium text-charcoal">{selectedFabric.price}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={scrollToContact}
              className="w-full py-3 sm:py-4 bg-charcoal text-white font-medium uppercase tracking-wider text-xs sm:text-sm rounded-lg hover:bg-charcoal-light transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Begin Your Commission
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column - Selection */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Silhouette Selection */}
            <div>
              <h3 className="font-serif text-lg sm:text-xl text-charcoal mb-3 sm:mb-4">Select Silhouette</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {silhouettes.map((silhouette) => (
                  <button
                    key={silhouette.id}
                    onClick={() => setSelectedSilhouette(silhouette)}
                    className={`p-3 sm:p-4 border rounded-lg text-left transition-all duration-300 ${
                      selectedSilhouette.id === silhouette.id
                        ? 'border-charcoal bg-charcoal text-white'
                        : 'border-border bg-white text-charcoal hover:border-charcoal-light'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <span className="font-medium text-sm">{silhouette.name}</span>
                      {selectedSilhouette.id === silhouette.id && (
                        <Check className="w-4 h-4" />
                      )}
                    </div>
                    <p className={`text-xs ${selectedSilhouette.id === silhouette.id ? 'text-white/70' : 'text-charcoal-muted'}`}>
                      {silhouette.description}
                    </p>
                  </button>
                ))}
              </div>
              
              {/* Silhouette Features */}
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                {selectedSilhouette.features.map((feature) => (
                  <span 
                    key={feature}
                    className="px-2 sm:px-3 py-1 bg-white border border-border rounded-full text-xs text-charcoal"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Fabric Selection */}
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="font-serif text-lg sm:text-xl text-charcoal">Select Fabric</h3>
                <button
                  onClick={() => setShowMillInfo(!showMillInfo)}
                  className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-charcoal-muted hover:text-charcoal transition-colors"
                >
                  <Info className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  {showMillInfo ? 'Hide mill info' : 'Show mill info'}
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {fabrics.map((fabric) => (
                  <button
                    key={fabric.id}
                    onClick={() => setSelectedFabric(fabric)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedFabric.id === fabric.id
                        ? 'border-charcoal scale-105 shadow-lg'
                        : 'border-transparent hover:border-charcoal-light'
                    }`}
                  >
                    <img 
                      src={fabric.image} 
                      alt={fabric.name}
                      className="w-full h-full object-cover"
                    />
                    {selectedFabric.id === fabric.id && (
                      <div className="absolute top-2 right-2 w-5 sm:w-6 h-5 sm:h-6 bg-charcoal rounded-full flex items-center justify-center">
                        <Check className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-3">
                      <p className="text-white text-[10px] sm:text-xs font-medium truncate">{fabric.name}</p>
                      {showMillInfo && (
                        <p className="text-white/70 text-[10px] truncate">{fabric.mill}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mill Partnership Section */}
        <div ref={millsRef} className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-border">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-charcoal text-white rounded-full text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-4">
              <Factory className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              Direct Mill Partnerships
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal mb-3 sm:mb-4">
              From Loom to Atelier
            </h3>
            <p className="text-sm sm:text-base text-charcoal-muted max-w-2xl mx-auto px-4">
              We work directly with the world's finest fabric mills, bypassing middlemen to ensure authenticity, traceability, and access to the most exceptional textiles. When you commission a Ligne Couture garment, you are wearing cloth that has travelled from the looms of Biella and Huddersfield directly to our atelier in Dubai.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { name: 'Loro Piana', origin: 'Biella, Italy', since: '1924' },
              { name: 'Scabal', origin: 'Huddersfield, UK', since: '1938' },
              { name: 'Vitale Barberis', origin: 'Biella, Italy', since: '1663' },
              { name: 'Holland & Sherry', origin: 'London, UK', since: '1836' },
            ].map((mill) => (
              <div key={mill.name} className="text-center p-4 sm:p-6 bg-white border border-border rounded-lg">
                <p className="font-serif text-base sm:text-lg text-charcoal mb-1">{mill.name}</p>
                <p className="text-xs sm:text-sm text-charcoal-muted">{mill.origin}</p>
                <p className="text-[10px] sm:text-xs text-charcoal-muted/60 mt-1 sm:mt-2">Est. {mill.since}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Studio
