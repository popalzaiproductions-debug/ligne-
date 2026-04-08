import { Instagram, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex flex-col leading-tight mb-4 sm:mb-6">
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wide">LIGNE</span>
              <span className="font-serif text-sm sm:text-base tracking-[0.3em]">COUTURE</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              AI-driven bespoke professional wear. Master craftsmanship meets modern technology.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium uppercase tracking-wider mb-4 sm:mb-6">Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['Bespoke Suits', 'Alterations', 'Style Consultation', 'Gift Cards'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium uppercase tracking-wider mb-4 sm:mb-6">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['About Us', 'Careers', 'Press', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium uppercase tracking-wider mb-4 sm:mb-6">Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['FAQ', 'Shipping', 'Returns', 'Size Guide'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
          
          <p className="text-white/40 text-xs sm:text-sm">
            © 2025 Ligne Couture. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Terms of Service
            </a>
            <button 
              onClick={scrollToTop}
              className="text-white/60 hover:text-white transition-colors"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
