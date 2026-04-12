import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin, Clock, ChevronDown, Send, Loader2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const tiers = [
  'Select a line',
  'Essential Line',
  'Heritage Line',
  'Signature Line'
]

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+971 50 569 3732',
    href: 'tel:+971505693732'
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@lignecouture.com',
    href: 'mailto:hello@lignecouture.com'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Dubai Design District, Building 7, Suite 301',
    href: '#'
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Sunday - Thursday, 10:00 AM - 7:00 PM',
    href: null
  }
]

const deliveryTimeline = [
  { tier: 'Essential Line', time: '4-6 weeks' },
  { tier: 'Heritage Line', time: '6-8 weeks' },
  { tier: 'Signature Line', time: '8-10 weeks' }
]

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tier: '',
    message: ''
  })
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const form = formRef.current
    const info = infoRef.current
    const timeline = timelineRef.current
    
    if (!section || !form || !info || !timeline) return

    const ctx = gsap.context(() => {
      gsap.fromTo(form,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      )

      gsap.fromTo(info,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: info,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      )

      gsap.fromTo(timeline,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('https://formspree.io/f/xeepwqbg', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          tier: formData.tier,
          message: formData.message,
          _subject: `New enquiry from ${formData.name} - ${formData.tier || 'General'}`,
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          tier: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="py-20 sm:py-24 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-charcoal-muted mb-4">
            Get In Touch
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
            Begin Your Journey
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted max-w-xl mx-auto px-4">
            Book a consultation or send us your enquiry
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
          {/* Form */}
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-border-input rounded-lg text-charcoal placeholder-charcoal-muted focus:outline-none focus:border-charcoal transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-border-input rounded-lg text-charcoal placeholder-charcoal-muted focus:outline-none focus:border-charcoal transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-border-input rounded-lg text-charcoal placeholder-charcoal-muted focus:outline-none focus:border-charcoal transition-colors"
                  placeholder="+971 50 000 0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Preferred Line
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    className="w-full px-4 py-3 bg-white border border-border-input rounded-lg text-left text-charcoal focus:outline-none focus:border-charcoal transition-colors flex items-center justify-between"
                  >
                    <span className={formData.tier ? 'text-charcoal' : 'text-charcoal-muted'}>
                      {formData.tier || 'Select a line'}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-charcoal-muted transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isSelectOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-10">
                      {tiers.slice(1).map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, tier })
                            setIsSelectOpen(false)
                          }}
                          className="w-full px-4 py-3 text-left text-charcoal hover:bg-cream transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-border-input rounded-lg text-charcoal placeholder-charcoal-muted focus:outline-none focus:border-charcoal transition-colors resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    Thank you for your enquiry. We will be in touch within 24 hours.
                  </p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">
                    Something went wrong. Please try again or contact us directly at hello@lignecouture.com
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-charcoal text-white font-medium uppercase tracking-wider text-xs sm:text-sm rounded-lg hover:bg-charcoal-light transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Enquiry
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-6 sm:space-y-8">
            <div className="bg-cream rounded-xl p-6 sm:p-8">
              <h3 className="font-serif text-lg sm:text-xl text-charcoal mb-4 sm:mb-6">
                Contact Information
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((item) => {
                  const Icon = item.icon
                  const content = (
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-charcoal" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-charcoal-muted mb-0.5">{item.label}</p>
                        <p className="text-sm sm:text-base text-charcoal break-words">{item.value}</p>
                      </div>
                    </div>
                  )
                  
                  return item.href ? (
                    <a 
                      key={item.label} 
                      href={item.href}
                      className="block hover:opacity-80 transition-opacity"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  )
                })}
              </div>
            </div>

            {/* Delivery Timeline */}
            <div ref={timelineRef} className="bg-charcoal text-white rounded-xl p-6 sm:p-8">
              <h3 className="font-serif text-lg sm:text-xl mb-4 sm:mb-6">
                Delivery Timeline
              </h3>
              <p className="text-white/60 text-sm mb-4">
                True bespoke tailoring cannot be rushed. Each garment requires time to achieve perfection.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {deliveryTimeline.map((item) => (
                  <div key={item.tier} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                    <span className="text-white/80 text-sm">{item.tier}</span>
                    <span className="font-medium text-sm">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
