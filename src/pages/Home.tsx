import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, ArrowRight, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import TrustBlock from "@/components/TrustBlock";
import NavBrand from "@/components/NavBrand";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOnContact, setIsOnContact] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
  const timeout = setTimeout(() => setIsLoaded(true), 100);
  return () => clearTimeout(timeout);
}, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsOnContact(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
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

  const contactItems = [
    {
      icon: <MapPin size={20} className="text-primary" />,
      label: "Our Location",
      value: "Gunung Putri, Bogor, Indonesia.",
      href: undefined,
    },
    {
      icon: <Phone size={20} className="text-primary" />,
      label: "Whatsapp",
      value: "+62 895-3432-62675",
      href: "https://wa.me/62895343262675?text=Hello%20Artheswara%20Furniture!%20Saya%20ingin%20bertanya%20seputar%20design.",
    },
    {
      icon: <Mail size={20} className="text-primary" />,
      label: "Email",
      value: "artheswara.furniture@gmail.com",
      href: "mailto:artheswara.furniture@gmail.com",
    },
    {
      icon: <Instagram size={20} className="text-primary" />,
      label: "Instagram",
      value: "@artheswara_furniture",
      href: "https://www.instagram.com/artheswara_furniture/",
    },
  ];

  return (
    <>
    {/* Loading Screen */}
<div
  className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-700 ${
    isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
  }`}
>
  <div className="flex flex-col items-center gap-4">
    <div className="w-10 h-10 rounded-full border-2 border-foreground/20 border-t-primary animate-spin" />
    <p className="text-muted-foreground text-sm tracking-widest uppercase">Loading</p>
  </div>
</div>
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${
          isOnContact
            ? "bg-foreground py-3 md:py-4 border-white/10"
            : isScrolled
            ? "bg-background/95 backdrop-blur-md py-3 md:py-4 border-border/50 shadow-sm"
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-12 flex items-center justify-between">
          <NavBrand scrolled={isScrolled && !isOnContact} onClick={() => scrollTo('home')} />

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-8 text-sm font-medium tracking-wide ${isScrolled && !isOnContact ? "text-foreground/80" : "text-white/90"}`}>
            <button onClick={() => scrollTo('about')} className="hover:text-primary transition-colors">About Us</button>
            <button onClick={() => scrollTo('services')} className="hover:text-primary transition-colors">Services</button>
            <button onClick={() => scrollTo('portfolio')} className="hover:text-primary transition-colors">Projects</button>
            <Button
              variant="outline"
              className={`rounded-none border px-6 ${isScrolled && !isOnContact ? "border-foreground text-foreground hover:bg-foreground hover:text-background" : "border-white text-white hover:bg-white hover:text-foreground bg-transparent"}`}
              onClick={() => scrollTo('contact')}
            >
              Consultation
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 ${isScrolled && !isOnContact ? "text-foreground" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-10 transition-transform duration-500 ease-in-out ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <button onClick={() => scrollTo('about')} className="text-2xl font-serif text-foreground hover:text-primary">About Us</button>
        <button onClick={() => scrollTo('services')} className="text-2xl font-serif text-foreground hover:text-primary">Services</button>
        <button onClick={() => scrollTo('portfolio')} className="text-2xl font-serif text-foreground hover:text-primary">Projects</button>
        <button onClick={() => scrollTo('contact')} className="text-2xl font-serif text-foreground hover:text-primary">Contact</button>
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

        <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-16 md:mt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-white/80 uppercase tracking-[0.3em] text-xs mb-4 md:mb-6"
          >
            Gunung Putri, Bogor
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white font-medium leading-tight max-w-4xl"
          >
            Discover Your Perfect <span className="italic text-primary">Dream</span> Home
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-white/70 mt-6 md:mt-8 max-w-sm md:max-w-xl text-base md:text-xl font-light"
          >
            Custom interior design and well-crafted furniture built around function, comfort, and style.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 md:mt-12"
          >
            <Button
              size="lg"
              className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-5 md:py-6 text-base tracking-wide"
              onClick={() => scrollTo('contact')}
            >
              Begin Your Journey
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust & Narrative Section */}
      <section id="about" className="py-16 md:py-32 bg-background relative z-30">
        <div className="container mx-auto px-4 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-tight">
                The Art is in the <span className="italic text-primary">detail</span>.
              </h2>
              <div className="w-12 h-[1px] bg-primary my-6 md:my-8" />
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light mb-6">
                At Artheswara Raya, we believe every home should reflect who you are. We create, we craft, and we bring your ideas to life.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light">
                Drawing from local experience and modern design ideas, we create interiors that are both comfortable and stylish. Every corner, every texture, and every material is chosen to make your space feel personal, functional, and welcoming.
              </p>
              <div className="mt-8 md:mt-10 flex items-center gap-4">
                <div>
                  <p className="font-serif text-lg text-foreground">— Suwito</p>
                  <p className="text-sm text-muted-foreground tracking-wider uppercase">Owner & Designer</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <img src="/images/pict1.png" alt="Detail 1" className="w-full h-[200px] md:h-[300px] object-cover object-center" />
              <img src="/images/pict2.png" alt="Detail 2" className="w-full h-[200px] md:h-[300px] object-cover object-center mt-6 md:mt-8" />
            </div>
          </motion.div>

          <TrustBlock />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-32 bg-card">
        <div className="container mx-auto px-4 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-foreground">Our Expertise</h2>
            <div className="w-12 h-[1px] bg-primary mx-auto my-5 md:my-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Comprehensive interior solutions tailored to the rhythm of your daily life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Kitchen Design",
                desc: "Designed for efficiency and everyday use, balancing functionality with refined aesthetics.",
                img: "/images/kitchn.png"
              },
              {
                title: "Bedrooms Design",
                desc: "Carefully designed to support rest, comfort, and a well-balanced space.",
                img: "/images/bedrum.png"
              },
              {
                title: "Repair Service",
                desc: "Furniture repair services for everyday wear, damage, and basic restoration.",
                img: "/images/servis.png"
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
                <div className="relative overflow-hidden aspect-[4/3] mb-5 md:mb-6">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-foreground mb-2 md:mb-3">{service.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-4 text-sm md:text-base">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section id="portfolio" className="py-16 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4 md:gap-6"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-serif text-foreground">Selected Works</h2>
              <div className="w-12 h-[1px] bg-primary mt-5 md:mt-6" />
            </div>
            <p className="text-muted-foreground max-w-md text-base md:text-lg">
              A curated look into our recent residential and boutique hospitality commissions across Indonesia.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {[
              "/images/pro1.png",
              "/images/pro2.png",
              "/images/pro3.png",
              "/images/pro4.png",
              "/images/pro5.png",
              "/images/pro6.png"
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative overflow-hidden aspect-square cursor-pointer"
                onClick={() => setLightboxImg(img)}
              >
                <img
                  src={img}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-32 bg-foreground text-background relative">
        <div className="container mx-auto px-4 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Let's discuss your space.</h2>
            <p className="text-background/70 text-base md:text-lg max-w-md mx-auto font-light">
              Whether you're building a new home or refining an existing space, our atelier is ready to bring your vision to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
            {contactItems.map((item, i) => {
              const isWA = item.href?.includes("wa.me");
              return isWA ? (
                <motion.a
                  key={i}
                  id="whatsapp-tile"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="relative flex items-center gap-4 border border-[#25D366]/60 p-5 md:p-6 bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors duration-500 cursor-pointer overflow-hidden"
                  style={{ animation: "breathe-border 3s ease-in-out infinite" }}
                >
                  <div className="relative w-12 h-12 bg-[#25D366] flex items-center justify-center shrink-0 rounded-full shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <div className="relative min-w-0">
                    <p className="font-medium text-sm md:text-base text-white">WhatsApp</p>
                    <p className="text-[#25D366] font-light text-sm">{item.value}</p>
                  </div>
                </motion.a>
              ) : (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="flex items-center gap-4 border border-background/15 p-5 md:p-6"
                >
                  <div className="w-12 h-12 border border-background/20 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm md:text-base">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-background/60 font-light text-sm hover:text-primary transition-colors break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-background/60 font-light text-sm">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1513] py-10 md:py-12 border-t border-white/10 text-white/50">
        <div className="container mx-auto px-4 md:px-12 flex flex-col items-center gap-3 text-center">
          <div className="font-serif text-xl text-white tracking-widest">ARTHESWARA</div>
          <div className="text-sm font-light">
            &copy; {new Date().getFullYear()} Artheswara Raya. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className={`fixed bottom-6 right-4 md:right-6 z-50 transition-opacity duration-500 ${isOnContact ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <button
          onClick={() => document.getElementById("whatsapp-tile")?.scrollIntoView({ behavior: "smooth", block: "center" })}
          className="relative bg-[#25D366] text-white p-3 md:p-4 rounded-full hover:scale-110 transition-transform flex items-center justify-center"
          style={{ animation: "breathe-bubble 3s ease-in-out infinite" }}
          aria-label="Chat on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </button>
      </div>
    </div>

    {lightboxImg && (
      <div
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        onClick={() => setLightboxImg(null)}
      >
        <button
          className="absolute top-4 right-4 text-white opacity-70 hover:opacity-100 transition-opacity"
          onClick={() => setLightboxImg(null)}
        >
          <X size={32} />
        </button>
        <img
          src={lightboxImg}
          alt="Preview"
          className="max-w-full max-h-full object-contain rounded-sm shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    )}
    </>
  );
}
