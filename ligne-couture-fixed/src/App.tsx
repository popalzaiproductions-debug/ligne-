import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import HowItWorks from './sections/HowItWorks'
import Tiers from './sections/Tiers'
import Fabrics from './sections/Fabrics'
import Heritage from './sections/Heritage'
import TheProblem from './sections/TheProblem'
import Studio from './sections/Studio'
import Contact from './sections/Contact'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    ScrollTrigger.refresh()
    
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <div className="relative">
      {/* Grain texture overlay */}
      <div className="grain-overlay" aria-hidden="true" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main>
        <Hero />
        <TheProblem />
        <Heritage />
        <HowItWorks />
        <Studio />
        <Tiers />
        <Fabrics />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
