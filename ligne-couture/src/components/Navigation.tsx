import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo('.mobile-link', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: 'power2.out', delay: 0.15 }
      )
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const scrollToSection = (id: string) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinks = [
    { label: 'Philosophy', id: 'problem' },
    { label: 'Heritage', id: 'heritage' },
    { label: 'Process', id: 'how-it-works' },
    { label: 'Studio', id: 'studio' },
    { label: 'Tiers', id: 'tiers' },
    { label: 'Fabrics', id: 'fabrics' },
  ]

  return (
    <>
      {/* Top Info Bar */}
      <div className={`bg-charcoal text-white transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden' : 'h-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full text-xs">
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              <span>+971 50 569 3732</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              <span>Dubai, UAE</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Mail className="w-3 h-3" />
              <span>hello@lignecouture.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm' : 'bg-cream'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="#" className="flex flex-col leading-tight">
              <span className="font-serif text-lg sm:text-xl font-semibold tracking-wide text-charcoal">LIGNE</span>
              <span className="font-serif text-xs sm:text-sm tracking-[0.3em] text-charcoal">COUTURE</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="relative text-sm font-medium uppercase tracking-wider text-charcoal hover:text-charcoal-light transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-charcoal transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-charcoal text-white text-sm font-medium uppercase tracking-wider rounded-lg hover:bg-charcoal-light transition-all duration-300 hover:-translate-y-0.5"
              >
                Book
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-charcoal"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-cream transition-transform duration-500 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-5 px-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="mobile-link font-serif text-2xl sm:text-3xl text-charcoal hover:text-charcoal-light transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="mobile-link mt-6 px-8 py-4 bg-charcoal text-white text-lg font-medium uppercase tracking-wider rounded-lg w-full max-w-xs"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </>
  )
}

export default Navigation
