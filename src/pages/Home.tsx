import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, ArrowRight, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${
          isScrolled ? "bg-background/95 backdrop-blur-md py-4 border-border/50 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
            <span className={`font-serif text-2xl font-bold tracking-tight ${isScrolled ? "text-foreground" : "text-white"}`}>
              ARTHESWARA
            </span>
          </div>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-8 text-sm font-medium tracking-wide ${isScrolled ? "text-foreground/80" : "text-white/90"}`}>
            <button onClick={() => scrollTo('about')} className="hover:text-primary transition-colors">Atelier</button>
            <button onClick={() => scrollTo('services')} className="hover:text-primary transition-colors">Expertise</button>
            <button onClick={() => scrollTo('portfolio')} className="hover:text-primary transition-colors">Journal</button>
            <Button 
              variant="outline" 
              className={`rounded-none border px-6 ${isScrolled ? "border-foreground text-foreground hover:bg-foreground hover:text-background" : "border-white text-white hover:bg-white hover:text-foreground bg-transparent"}`}
              onClick={() => scrollTo('contact')}
            >
              Consultation
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden ${isScrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <button onClick={() => scrollTo('about')} className="text-2xl font-serif text-foreground hover:text-primary">Atelier</button>
        <button onClick={() => scrollTo('services')} className="text-2xl font-serif text-foreground hover:text-primary">Expertise</button>
        <button onClick={() => scrollTo('portfolio')} className="text-2xl font-serif text-foreground hover:text-primary">Journal</button>
        <button onClick={() => scrollTo('contact')} className="text-2xl font-serif text-foreground hover:text-primary">Consultation</button>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="/images/hero.png" 
            alt="Luxury Interior Design" 
            className="w-full h-full object-cover scale-105"
          />
        </motion.div>
        
        <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm mb-6"
          >
            Jakarta, Indonesia
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-medium leading-tight max-w-4xl"
          >
            Crafting Spaces of <span className="italic text-primary">Quiet Elegance</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-white/70 mt-8 max-w-xl text-lg md:text-xl font-light"
          >
            Bespoke interior solutions and masterfully crafted furniture for those who appreciate the poetry of living well.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-12"
          >
            <Button 
              size="lg" 
              className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base tracking-wide"
              onClick={() => scrollTo('contact')}
            >
              Begin Your Journey
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust & Narrative Section */}
      <section id="about" className="py-24 md:py-32 bg-background relative z-30">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-tight">
                The poetry is in the <span className="italic text-primary">precision</span>.
              </h2>
              <div className="w-12 h-[1px] bg-primary my-8" />
              <p className="text-muted-foreground text-lg leading-relaxed font-light mb-6">
                At Artheswara Raya, we believe a home should be a reflection of your deepest values. We do not mass-produce; we tailor. We do not assemble; we craft. 
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed font-light">
                Rooted in the rich heritage of Indonesian woodworking and elevated by contemporary global sensibilities, our atelier bridges the gap between luxury hospitality and residential warmth. Every joint, every finish, every choice of stone is a deliberate act of design.
              </p>
              <div className="mt-10 flex items-center gap-4">
                <img src="/images/gallery-1.png" alt="Craftsmanship" className="w-16 h-16 object-cover rounded-full" />
                <div>
                  <p className="font-serif text-lg text-foreground">Bima Artheswara</p>
                  <p className="text-sm text-muted-foreground tracking-wider uppercase">Master Craftsman</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/gallery-1.png" alt="Detail 1" className="w-full h-[300px] object-cover object-center" />
              <img src="/images/gallery-5.png" alt="Detail 2" className="w-full h-[300px] object-cover object-center mt-8" />
            </div>
          </motion.div>

          <div className="mt-32 pt-16 border-t border-border flex flex-col items-center">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8 text-center">Trusted By Visionary Developers</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale">
              <span className="font-serif text-2xl font-bold">Kavling</span>
              <span className="font-serif text-2xl font-bold">LUMIERE</span>
              <span className="font-serif text-2xl font-bold">AETERNA</span>
              <span className="font-serif text-2xl font-bold">SANTAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">Our Expertise</h2>
            <div className="w-12 h-[1px] bg-primary mx-auto my-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Comprehensive interior solutions tailored to the rhythm of your daily life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Bespoke Kitchens",
                desc: "The heart of the home, crafted for both grand entertaining and intimate mornings.",
                img: "/images/service-kitchen.png"
              },
              {
                title: "Sanctuary Bedrooms",
                desc: "Private retreats designed for deep rest, featuring custom wardrobes and mood lighting.",
                img: "/images/service-bedroom.png"
              },
              {
                title: "Full Interior Form",
                desc: "End-to-end design and execution for cohesive, breathtaking residential estates.",
                img: "/images/service-full.png"
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-[4/3] mb-6">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl font-serif text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-4">{service.desc}</p>
                <div className="flex items-center text-primary font-medium tracking-wide text-sm group-hover:underline underline-offset-4">
                  Explore <ArrowRight size={16} className="ml-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section id="portfolio" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground">Selected Works</h2>
              <div className="w-12 h-[1px] bg-primary mt-6" />
            </div>
            <p className="text-muted-foreground max-w-md text-lg">
              A curated look into our recent residential and boutique hospitality commissions across Indonesia.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "/images/gallery-2.png",
              "/images/gallery-3.png",
              "/images/gallery-4.png",
              "/images/gallery-6.png",
              "/images/service-kitchen.png",
              "/images/service-bedroom.png"
            ].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative group overflow-hidden aspect-square"
              >
                <img 
                  src={img} 
                  alt={`Gallery ${i}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white tracking-widest text-sm uppercase border-b border-white pb-1">View Project</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-foreground text-background relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Let's discuss your space.</h2>
              <p className="text-background/70 text-lg mb-12 max-w-md font-light">
                Whether you're building a new home or refining an existing space, our atelier is ready to bring your vision to life.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-background/20 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Studio & Showroom</p>
                    <p className="text-background/60 font-light text-sm">Jl. Senopati Raya No. 45, Jakarta Selatan</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-background/20 flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Direct Line</p>
                    <p className="text-background/60 font-light text-sm">+62 812-3456-7890</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-background/20 flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-background/60 font-light text-sm">inquiries@artheswara.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-background text-foreground p-8 md:p-10"
            >
              <h3 className="text-2xl font-serif mb-6">Request a Consultation</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input className="rounded-none border-border bg-transparent h-12 focus-visible:ring-primary" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input className="rounded-none border-border bg-transparent h-12 focus-visible:ring-primary" placeholder="+62" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Project Details</label>
                  <Textarea className="rounded-none border-border bg-transparent min-h-[120px] focus-visible:ring-primary resize-none" placeholder="Tell us about your space..." />
                </div>
                <Button className="w-full rounded-none h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-base tracking-wide">
                  Send Inquiry
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1513] py-12 border-t border-white/10 text-white/50">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-serif text-xl text-white tracking-widest">ARTHESWARA</div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Pinterest</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <div className="text-sm font-light">
            &copy; {new Date().getFullYear()} Artheswara Raya. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6281234567890?text=Hello%20Artheswara%20Raya,%20I%20would%20like%20to%20inquire%20about%20an%20interior%20project."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </a>
    </div>
  );
}
