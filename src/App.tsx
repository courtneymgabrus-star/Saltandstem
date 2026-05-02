/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  X, 
  ArrowRight, 
  Instagram, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Dog, 
  Leaf,
  Plus,
  Heart,
  MessageCircle,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2
} from "lucide-react";

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Story", href: "#story" },
    { name: "Menu", href: "#menu" },
    { name: "Gallery", href: "#gallery" },
    { name: "Events", href: "#events" },
    { name: "Visit", href: "#visit" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center ${
          scrolled ? "bg-bone/95 backdrop-blur-md py-3 shadow-md border-b border-seaglass/20" : "bg-transparent border-b border-ink/5"
        }`}
      >
        {/* Vibrant Wave Decoration (visible when scrolled) */}
        {scrolled && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-0 left-0 right-0 h-4 overflow-hidden pointer-events-none"
          >
            <motion.svg 
              viewBox="0 0 1200 40" 
              className="absolute bottom-0 left-0 w-[200%] h-8 fill-seaglass/30"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <path d="M0,20 Q150,0 300,20 T600,20 T900,20 T1200,20 V40 H0 Z" />
            </motion.svg>
            <motion.svg 
              viewBox="0 0 1200 40" 
              className="absolute bottom-0 left-0 w-[200%] h-6 fill-seaglass/20"
              animate={{ x: ["-10%", "-60%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <path d="M0,20 Q150,0 300,20 T600,20 T900,20 T1200,20 V40 H0 Z" />
            </motion.svg>
          </motion.div>
        )}

        <motion.a 
          href="#" 
          whileHover={{ scale: 1.02 }}
          className="font-display text-[28px] font-light tracking-[-1px] text-ink relative group"
        >
          Salt <span className="italic text-clay font-normal inline-block group-hover:rotate-12 transition-transform">&</span> Stem
        </motion.a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <motion.a
                href={link.href}
                whileHover={{ y: -2 }}
                className="text-[11px] uppercase font-medium tracking-[2.5px] text-ink/70 hover:text-seaglass-deep transition-colors relative"
              >
                {link.name}
                <motion.span 
                  className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-seaglass/40 scale-x-0 origin-left"
                  whileHover={{ scaleX: 1 }}
                />
              </motion.a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <motion.a
            href="#visit"
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-8 py-4 rounded-full bg-ink text-bone text-[12px] uppercase tracking-[2px] transition-all relative overflow-hidden group shadow-lg shadow-ink/10"
          >
            <span className="relative z-10">Order</span>
            <div className="absolute inset-0 bg-seaglass-deep scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </motion.a>
          <button
            className="md:hidden text-ink"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-bone flex flex-col p-12"
          >
            <button
              className="absolute top-6 right-6 text-ink p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="mt-12 flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-baseline gap-4 border-b border-ink/5 pb-4"
                >
                  <span className="font-accent text-clay text-lg opacity-40 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                  <span className="font-display text-5xl font-light text-ink group-hover:text-seaglass transition-colors">
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </div>
            <div className="mt-auto pt-12">
              <p className="font-accent text-2xl text-clay transform -rotate-1">see you soon ✿</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Reveal = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionHeader = ({ label, title, lede, centered = false }: { 
  label: string; 
  title: ReactNode; 
  lede?: string;
  centered?: boolean;
}) => (
  <div className={`mb-12 ${centered ? "text-center" : ""}`}>
    <div className={`font-display italic text-2xl text-clay mb-4 ${centered ? "justify-center" : ""}`}>
      {label.toLowerCase()}
    </div>
    <h2 className="font-display text-4xl md:text-7xl font-light leading-[0.9] text-ink mb-6">
      {title}
    </h2>
    {lede && <p className={`text-lg text-ink-soft max-w-lg leading-relaxed ${centered ? "mx-auto" : ""}`}>{lede}</p>}
  </div>
);

// --- Sections ---

const Hero = () => {
  return (
    <section className="min-h-screen relative pt-32 pb-16 md:pt-48 md:pb-32 flex items-center overflow-hidden">
      {/* Ocean Visual Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-bone via-bone/90 to-transparent z-10" />
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000" 
          alt="Ocean Shore"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply"
        />
        {/* Animated Particles */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-seaglass rounded-full opacity-20"
              animate={{ 
                y: [-20, 800],
                x: [Math.random() * 1000, Math.random() * 1000],
                opacity: [0, 0.2, 0]
              }}
              transition={{ 
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear"
              }}
              style={{ left: `${Math.random() * 100}%`, top: "-10%" }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display italic text-2xl md:text-[24px] text-clay mb-4 inline-block"
        >
          a coastal hemp café
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-[72px] sm:text-[80px] md:text-[96px] leading-[0.9] font-light text-ink mb-12"
        >
          Slow sips,
          <span className="block italic text-seaglass md:ml-10">salt air.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-[18px] text-ink-soft max-w-[480px] mb-12 leading-relaxed"
        >
          We craft plant-forward drinks and slow mornings on Hilton Head Island. Come barefoot, stay as long as you like.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a href="#menu" className="px-8 py-5 rounded-full bg-ink text-bone text-[12px] uppercase tracking-[2px] font-medium flex items-center justify-center transition-all hover:bg-clay">
            Find your calm
          </a>
          <a href="#visit" className="px-8 py-5 border-b border-ink/20 text-ink text-[12px] uppercase tracking-[2px] font-medium flex items-center justify-center transition-all hover:border-ink">
            Visit Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Story = () => {
  return (
    <section id="story" className="py-24 md:py-40 bg-bone">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-sand">
              <ImageWithFallback 
                src="https://i.postimg.cc/mZCd1z7B/94D7B217-649C-4BFB-9DDC-A7C99E58391B.png" 
                alt="Made on the Island"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-terracotta text-bone flex flex-col items-center justify-center text-center p-4 transform -rotate-12 shadow-2xl shadow-clay/30 z-20">
                <span className="font-display text-2xl leading-none">Made</span>
                <span className="text-[10px] uppercase tracking-widest mt-1">on island</span>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="space-y-8">
              <SectionHeader 
                label="Our story" 
                title={<>Slow sips, <span className="italic text-clay">salt air.</span></>}
              />
              <p className="font-display italic text-2xl md:text-3xl text-ink leading-snug">
                We built <span className="text-clay">Salt & Stem</span> for the kind of morning where nobody's in a rush.
              </p>
              <div className="space-y-6 text-lg text-ink-soft leading-relaxed">
                <p>
                  A café where the matcha is ceremonial-grade, the sodas are hemp-infused, and the chairs invite you to stay for a second round. Our menu is plant-forward and botanical-led — think adaptogen lattes, CBD tonics, cold-pressed greens, and snacks made with what's growing nearby.
                </p>
                <p>
                  Hilton Head moves with the tide. So do we. Open early for the beach walkers, slow in the afternoon, warm at golden hour. Come barefoot. Bring the dog. Stay as long as you like.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  const categories = [
    {
      name: "Hemp & Tonics",
      note: "no buzz, all calm",
      items: [
        { name: "Tide & Tonic", tag: "CBD", price: "$9", desc: "Hemp-infused tonic, yuzu, cucumber, rosemary" },
        { name: "Salt Air Soda", tag: "CBD", price: "$8", desc: "Grapefruit, sea salt, hemp extract, bubbles" },
        { name: "Low Country Lemonade", tag: "CBD", price: "$8", desc: "Meyer lemon, lavender, raw honey, hemp" },
        { name: "Calm in a Cup", price: "$7", desc: "Chamomile, passionflower, oat milk, vanilla" },
      ]
    },
    {
      name: "Lattes & Matcha",
      note: "the slow starters",
      items: [
        { name: "Beach Grass Matcha", price: "$7", desc: "Ceremonial-grade, oat milk, wildflower honey" },
        { name: "Driftwood Latte", price: "$6", desc: "Espresso, cardamom, brown butter, cream" },
        { name: "Mushroom Mocha", tag: "Adaptogen", price: "$8", desc: "Reishi, cacao, oat milk, pinch of sea salt" },
        { name: "Palmetto Chai", price: "$6", desc: "House-spiced, black tea, coconut cream" },
      ]
    },
    {
      name: "Cold Press",
      note: "straight from the garden",
      items: [
        { name: "Green Tide", price: "$9", desc: "Cucumber, kale, green apple, mint, lime" },
        { name: "Sunset Beet", price: "$9", desc: "Beet, carrot, ginger, orange, turmeric" },
        { name: "Coconut Kiss", price: "$8", desc: "Young coconut water, pineapple, basil" },
      ]
    },
    {
      name: "Small Plates",
      note: "nothing fussy",
      items: [
        { name: "Avocado Toast", price: "$12", desc: "Sourdough, hemp seed, chili crunch, lemon" },
        { name: "Island Acai Bowl", price: "$14", desc: "Granola, coconut, banana, local honey" },
        { name: "Hemp Seed Granola", price: "$9", desc: "Coconut yogurt, seasonal fruit, bee pollen" },
        { name: "Low Country Toast", price: "$11", desc: "Ricotta, stone fruit, honey, cracked pepper" },
      ]
    }
  ];

  return (
    <section id="menu" className="py-24 md:py-40 bg-bone">
      <div className="container mx-auto px-6 md:px-12">
        <Reveal>
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <SectionHeader 
              centered
              label="Today's Highlights" 
              title={<>Small, but <span className="italic text-clay">mighty.</span></>}
            />
          </div>
        </Reveal>

        <div className="max-w-4xl mx-auto bg-sand p-12 md:p-20 rounded-t-[400px] flex flex-col items-center">
          <Leaf size={48} className="text-seaglass mb-8" />
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-16 w-full">
            {categories.map((cat, idx) => (
              <div key={idx}>
                <Reveal>
                  <div className="text-center">
                    <h3 className="font-display text-2xl mb-8 flex flex-col items-center italic text-clay">
                      {cat.name}
                      <span className="font-sans text-xs uppercase tracking-widest text-ink/40 not-italic mt-2">{cat.note}</span>
                    </h3>
                    <div className="space-y-10">
                      {cat.items.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex flex-col items-center group cursor-default">
                          <span className="font-display text-xl text-ink">
                            {item.name}
                          </span>
                          <p className="text-xs text-ink/60 italic mt-1 leading-relaxed max-w-[200px]">{item.desc}</p>
                          <span className="font-display text-sm text-clay mt-2">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
          <div className="mt-20">
            <a href="#visit" className="px-10 py-5 rounded-full bg-ink text-bone text-[12px] uppercase tracking-[2px] transition-all hover:bg-clay">
              Find your calm
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const TheSpace = () => {
  const spaces = [
    {
      num: "01",
      title: "The Main Room",
      desc: "Linen curtains, skylights, low music. Built for morning lingerers and afternoon readers. Always dog-friendly.",
      color: "bg-coral/90",
      accent: "text-bone"
    },
    {
      num: "02",
      title: "The Back Deck",
      desc: "Under the live oaks. String lights. Best spot for sunset sodas and Sunday brunch with friends.",
      color: "bg-seaglass/90",
      accent: "text-bone"
    },
    {
      num: "03",
      title: "The Sunroom",
      desc: "A small, cozy nook with floor cushions and our shop corner. Books, tinctures, local goods, and ceramics for sale.",
      color: "bg-driftwood/90",
      accent: "text-bone"
    }
  ];

  return (
    <section id="space" className="py-24 md:py-40">
      <div className="container mx-auto px-6 md:px-12">
        <Reveal>
          <SectionHeader 
            label="The Space" 
            title={<>Come barefoot. <span className="italic text-clay">Stay awhile.</span></>}
            lede="Three ways to settle in. Indoors under the skylights, out back on the deck, or curled up with a book in the sunroom."
          />
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mt-16 md:mt-24">
          {spaces.map((space, i) => (
            <div key={i}>
              <Reveal>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className={`relative aspect-[3/4] rounded-[24px] p-10 flex flex-col justify-end overflow-hidden group ${space.color}`}
                >
                  <div className="absolute top-0 right-0 p-8">
                    <span className="font-accent text-2xl text-bone/60">{space.num}</span>
                  </div>
                  
                  <div className="relative z-10">
                    <h4 className="font-display text-2xl text-bone mb-4 leading-tight">
                      {space.title.split(' ')[0]} <span className="italic opacity-80">{space.title.split(' ').slice(1).join(' ')}</span>
                    </h4>
                    <p className="text-sm text-bone/90 leading-relaxed font-light">
                      {space.desc}
                    </p>
                  </div>

                  {/* Texture overlay */}
                  <div className="absolute inset-0 opacity-20 mix-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence baseFrequency=\"0.9\" numOctaves=\"2\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\" opacity=\"0.35\"/%3E%3C/svg%3E')" }} />
                </motion.div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Events = () => {
  return (
    <section id="events" className="py-24 md:py-40 bg-ink text-bone">
      <div className="container mx-auto px-6 md:px-12">
        <Reveal>
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-coral mb-4">
              <span className="w-8 h-px bg-coral" />
              Events & private bookings
            </div>
            <h2 className="font-display text-5xl md:text-8xl font-light leading-[1.1] mb-8">
              Host your <span className="italic text-coral">slow morning.</span>
            </h2>
            <p className="text-lg md:text-xl text-bone/70 max-w-2xl leading-relaxed">
              The café can be yours for a few hours. Intimate bridal showers, team offsites, yoga-and-matcha mornings, book clubs, pop-ups — we'll tailor the menu and the vibe.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="p-12 border border-bone/10 rounded-3xl hover:border-coral/50 transition-colors group">
              <h4 className="font-display text-4xl mb-6">Private <span className="italic text-coral">Buyouts</span></h4>
              <p className="text-bone/70 mb-10 leading-relaxed">
                The whole café, yours. Great for showers, rehearsal brunches, and small celebrations up to 40 guests.
              </p>
              <ul className="space-y-4 mb-12">
                {["Up to 3 hours exclusive use", "Custom menu & CBD drink station", "Florals & styling available"].map(li => (
                  <li key={li} className="flex items-center gap-3 text-sm text-bone/60">
                    <span className="w-4 h-px bg-coral" /> {li}
                  </li>
                ))}
              </ul>
              <a href="#visit" className="inline-flex items-center gap-3 text-coral text-[11px] uppercase tracking-[0.2em] font-medium group transition-all">
                Inquire <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
              </a>
            </div>
          </Reveal>

          <Reveal>
            <div className="p-12 border border-bone/10 rounded-3xl hover:border-coral/50 transition-colors group">
              <h4 className="font-display text-4xl mb-6">Workshops <span className="italic text-coral">& Pop-ups</span></h4>
              <p className="text-bone/70 mb-10 leading-relaxed">
                We host a rotating lineup — sound baths, tincture blending, botanical arrangement, and local maker pop-ups on the deck.
              </p>
              <ul className="space-y-4 mb-12">
                {["Monthly guest artist series", "Yoga + matcha Sundays", "Tincture blending workshops"].map(li => (
                  <li key={li} className="flex items-center gap-3 text-sm text-bone/60">
                    <span className="w-4 h-px bg-coral" /> {li}
                  </li>
                ))}
              </ul>
              <a href="#newsletter" className="inline-flex items-center gap-3 text-coral text-[11px] uppercase tracking-[0.2em] font-medium group transition-all">
                Get the schedule <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const ImageWithFallback = ({ src, alt, className, ...props }: { src: string; alt: string; className?: string; [key: string]: any }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className={`relative w-full h-full bg-bone overflow-hidden ${className}`}>
      {/* Aesthetic Skeleton Loader */}
      {loading && !error && (
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-sand/20 via-sand/40 to-sand/20 animate-shimmer" 
               style={{ backgroundSize: '200% 100%' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-8 h-8 rounded-full border border-clay/10 flex items-center justify-center"
            >
              <div className="w-1 h-1 bg-clay rounded-full animate-ping" />
            </motion.div>
          </div>
        </div>
      )}
      
      <motion.img
        src={error ? `https://picsum.photos/seed/${alt.replace(/\s+/g, '-')}/1600/1200` : src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        className={`w-full h-full object-cover transition-all duration-1000 ease-out ${loading ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          imageRendering: 'auto',
          WebkitBackfaceVisibility: 'hidden',
          WebkitTransform: 'translate3d(0,0,0)',
          transform: 'translate3d(0,0,0)',
          imageOrientation: 'from-image',
          // High-DPI Sharpness hint
          fontSmoothing: 'antialiased'
        }}
        {...props}
      />
    </div>
  );
};

const PanZoomImage = ({ src, alt }: { src: string; alt: string }) => {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.5, 1));
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
  };

  return (
    <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden bg-ink/20 rounded-lg cursor-grab active:cursor-grabbing">
      {/* Zoom Controls Overlay */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-2" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={handleZoomIn}
          className="p-3 bg-bone/10 backdrop-blur-md text-bone rounded-full hover:bg-bone/20 transition-colors border border-bone/20"
          title="Zoom In"
        >
          <ZoomIn size={20} />
        </button>
        <button 
          onClick={handleZoomOut}
          className="p-3 bg-bone/10 backdrop-blur-md text-bone rounded-full hover:bg-bone/20 transition-colors border border-bone/20"
          title="Zoom Out"
        >
          <ZoomOut size={20} />
        </button>
        <button 
          onClick={handleReset}
          className="p-3 bg-bone/10 backdrop-blur-md text-bone rounded-full hover:bg-bone/20 transition-colors border border-bone/20"
          title="Reset"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      {/* Touch/Mouse Help Hint */}
      {scale === 1 && (
        <div className="absolute top-6 left-6 z-20 pointer-events-none opacity-40">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-bone font-medium">
            <Maximize2 size={12} /> Click to zoom or drag to pan
          </div>
        </div>
      )}

      <motion.div
        drag={scale > 1}
        dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        animate={{ scale }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full h-full flex items-center justify-center"
        onDoubleClick={() => setScale(scale > 1 ? 1 : 2)}
      >
        <ImageWithFallback 
          src={src} 
          alt={alt} 
          referrerPolicy="no-referrer"
          className={`w-full h-full object-contain pointer-events-none transition-transform duration-300 ${isDragging ? 'scale-95' : 'scale-100'}`}
        />
      </motion.div>
    </div>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const images = [
    { src: "https://i.postimg.cc/h45Zgc4M/IMG-3725.png", caption: "Crafted with precision" },
    { src: "https://i.postimg.cc/23n77pZn/IMG-3726.png", caption: "Morning light at the bar" },
    { src: "https://i.postimg.cc/T24NGf2H/IMG-3727.png", caption: "Coastal botanicals" },
    { src: "https://i.postimg.cc/xj4pYnjZ/IMG-3728.png", caption: "Slow coffee culture" },
    { src: "https://i.postimg.cc/WpHYjTpx/IMG-3729.png", caption: "Our signature space" },
    { src: "https://i.postimg.cc/1Rj7PsRk/IMG-3730.png", caption: "Details in focus" },
    { src: "https://i.postimg.cc/HWhvHdsm/IMG-3731.png", caption: "Afternoon sea breeze" },
    { src: "https://i.postimg.cc/JzYJ945Z/IMG-3735.png", caption: "The perfect pour" },
    { src: "https://i.postimg.cc/c13mwYMj/IMG-3734.png", caption: "Coastal vibes" }
  ];

  return (
    <section id="gallery" className="py-24 md:py-40 bg-bone/30">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <Reveal>
          <SectionHeader 
            label="Gallery" 
            title={<>Coastal snapshots. <span className="italic text-clay">Captured slow.</span></>}
            lede="A visual journal of Salt & Stem. Tag us #SaltAndStemHHI to be featured."
          />
        </Reveal>

        <div className="grid grid-cols-3 gap-1 md:gap-4 mt-16 px-1 md:px-0">
          {images.map((img, i) => (
            <div key={i} className="aspect-square relative overflow-hidden group cursor-pointer" onClick={() => setSelectedImage(img)}>
              <Reveal className="h-full">
                <div className="relative h-full w-full overflow-hidden bg-sand">
                  <ImageWithFallback 
                    src={img.src} 
                    alt={img.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  
                  {/* Enhanced Hover Overlay */}
                  <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-4">
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center text-bone font-medium gap-1.5 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <Heart size={20} fill="currentColor" />
                        <span className="text-sm">24</span>
                      </div>
                      <div className="flex items-center text-bone font-medium gap-1.5 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                        <MessageCircle size={20} fill="currentColor" />
                        <span className="text-sm">4</span>
                      </div>
                    </div>
                    
                    <div className="w-8 h-px bg-bone/30 mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-300" />
                    
                    <p className="text-bone text-center text-xs font-medium tracking-wider uppercase opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-400">
                      {img.caption}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 bg-ink/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-full flex flex-col items-center gap-6 cursor-default"
            >
              <PanZoomImage src={selectedImage.src} alt={selectedImage.caption} />
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <p className="font-display italic text-2xl text-bone mb-2">
                  {selectedImage.caption}
                </p>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="text-bone/50 hover:text-bone text-[10px] uppercase tracking-[3px] transition-colors"
                >
                  Close [Esc]
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Visit = () => {
  const details = [
    { label: "Address", value: "Coligny Plaza", detail: "Hilton Head Island, SC 29928", accent: true },
    { label: "Hours", value: "Mon–Fri · 7am — 6pm", detail: "Sat–Sun · 8am — 8pm" },
    { label: "Phone", value: "(843) 000-0000" },
    { label: "Email", value: "hello@saltandstem.co" },
    { label: "Instagram", value: "@saltandstem.hhi", accent: true },
  ];

  return (
    <section id="visit" className="py-24 md:py-40">
      <div className="container mx-auto px-6 md:px-12">
        <Reveal>
          <SectionHeader label="Visit us" title={<>Find your way <span className="italic text-clay">in.</span></>} />
        </Reveal>

        <div className="grid md:grid-cols-5 gap-16 md:gap-24 items-center">
          <div className="md:col-span-2 space-y-1">
            {details.map((item, i) => (
              <div key={i}>
                <Reveal>
                  <div className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] py-6 border-t border-ink/10 first:border-ink/20">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-driftwood pt-2">{item.label}</span>
                    <div>
                      <span className="font-display text-xl md:text-2xl text-ink block leading-tight">
                        {item.value}
                      </span>
                      {item.detail && (
                        <span className={`text-sm block mt-1 ${item.accent ? "italic text-clay" : "text-ink-soft"}`}>
                          {item.detail}
                        </span>
                      )}
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
            <Reveal>
              <div className="pt-10">
                <button className="px-10 py-5 rounded-full bg-clay text-bone text-[12px] uppercase tracking-[0.2em] font-medium group transition-all hover:bg-clay/90 flex items-center gap-3">
                  Get directions <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="md:col-span-3 aspect-square rounded-[40px] relative overflow-hidden bg-gradient-to-br from-sand via-coral/30 to-sand flex items-center justify-center">
              {/* Map texture simulation */}
              <div className="absolute inset-0 opacity-40 mix-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\"%3E%3Cg fill=\"none\" stroke=\"%237A6651\" stroke-width=\"0.5\" opacity=\"0.25\"%3E%3Cpath d=\"M0 40 Q50 30, 100 50 T200 40\"/%3E%3Cpath d=\"M0 80 Q60 70, 120 90 T200 80\"/%3E%3Cpath d=\"M0 120 Q50 110, 110 130 T200 120\"/%3E%3Cpath d=\"M0 160 Q70 150, 130 170 T200 160\"/%3E%3C/g%3E%3C/svg%3E')" }} />
              
              <div className="text-center relative z-10">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 0 0px rgba(168,94,62,0)",
                      "0 0 0 20px rgba(168,94,62,0.2)",
                      "0 0 0 40px rgba(168,94,62,0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-6 h-6 rounded-full bg-clay mx-auto mb-6 shadow-xl" 
                />
                <p className="font-accent text-3xl text-ink transform -rotate-3">you'll find us here</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Newsletter = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="newsletter" className="py-32 md:py-48 bg-seaglass/10 text-ink overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <Reveal>
          <div className="max-w-3xl mx-auto">
            <div className="font-display italic text-2xl text-clay mb-6">
              the slow list
            </div>
            <h2 className="font-display text-5xl md:text-8xl font-light mb-8">
              Join the <span className="italic text-seaglass">slow list.</span>
            </h2>
            <p className="font-sans text-xl opacity-70 mb-12 max-w-xl mx-auto">
              Seasonal menu drops, workshop invites, and the occasional love letter from the island.
            </p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                >
                  <input 
                    type="email" 
                    placeholder="your email" 
                    required 
                    className="flex-1 px-8 py-4 rounded-full bg-sand border border-ink/10 text-ink placeholder:text-ink/40 outline-none focus:border-ink transition-colors"
                  />
                  <button type="submit" className="px-10 py-4 rounded-full bg-ink text-bone text-[12px] uppercase tracking-[2px] transition-all hover:bg-clay">
                    Subscribe
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="thanks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-3xl italic text-clay"
                >
                  Welcome aboard ✿
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Footer = () => {
  const years = new Date().getFullYear();
  return (
    <footer className="bg-bone pt-24 pb-12 text-ink">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-24 border-t border-ink/10 pt-16">
          <div className="md:col-span-2 space-y-6">
            <h3 className="font-display text-[28px] text-ink font-light tracking-tight">
              Salt <span className="italic text-clay font-normal">&</span> Stem
            </h3>
            <p className="text-sm max-w-xs leading-relaxed opacity-70">
              A coastal hemp café on Hilton Head Island. Plant-forward, barefoot-friendly, always made on island.
            </p>
          </div>

          <div className="space-y-4">
            <h5 className="text-[10px] uppercase tracking-[2px] text-clay font-medium">Location</h5>
            <p className="font-display text-lg">Coligny Plaza, HHI</p>
          </div>

          <div className="space-y-4">
            <h5 className="text-[10px] uppercase tracking-[2px] text-clay font-medium">Hours</h5>
            <p className="font-display text-lg">Daily 7am — 6pm</p>
          </div>
        </div>

        <div className="pt-12 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[2px] opacity-40">
          <span>© {years} Salt & Stem, LLC</span>
          <div className="flex gap-8">
            <span>Hilton Head Island</span>
            <span>South Carolina</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-clay/20 bg-bone">
      <Navbar />
      <Hero />
      <Story />
      <MenuSection />
      <TheSpace />
      <Gallery />
      <Events />
      <Visit />
      <Newsletter />
      <Footer />
    </div>
  );
}
