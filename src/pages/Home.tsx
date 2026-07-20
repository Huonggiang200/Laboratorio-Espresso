import { Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <SEO 
        title="Laboratorio Espresso | The Future of Analogue Coffee" 
        description="Milanese espresso discipline. Glasgow urban movement. European guest roasters poured daily."
      />
      
      {/* Cinematic Extraction Portal Hero */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-graphite">
        
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop" 
            alt="Espresso extraction" 
            className="w-full h-full object-cover mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite-soft/80 to-graphite/40" />
        </div>
        
        {/* Animated Ripple / Mask Effect (Simulated via Framer Motion) */}
        <motion.div 
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: isLoaded ? 1.5 : 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[10px] h-[10px] rounded-full bg-extraction-amber mix-blend-screen glow-amber" />
        </motion.div>

        <div className="absolute inset-0 steel-reflection pointer-events-none z-10" />

        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center mt-12 md:mt-0">
          <div className="overflow-hidden mb-6">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] tracking-tighter font-bold leading-[0.9] mask-text"
            >
              Glasgow moves fast.<br />
              We pull slowly.
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="font-mono text-stainless-steel uppercase tracking-widest text-xs sm:text-sm md:text-base mb-12 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center">
              <span>European roasters.</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>Milanese discipline.</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>Poured daily.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto mt-4">
              <Link 
                to="/menu" 
                className="bg-extraction-amber text-black px-8 py-4 font-display font-bold uppercase text-lg hover:bg-amber-light transition-colors text-center"
              >
                See what's on bar
              </Link>
              <Link 
                to="/space" 
                className="border border-white/20 text-white px-8 py-4 font-display font-bold uppercase text-lg hover:bg-white/5 transition-colors text-center"
              >
                Enter the laboratory
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Technical overlay */}
        <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 z-20 flex gap-12 hidden md:flex">
          <div>
            <span className="font-mono text-[10px] block text-warm-concrete uppercase mb-1 opacity-80">The Address</span>
            <span className="text-sm text-white">Queen Street, G1</span>
          </div>
          <div>
            <span className="font-mono text-[10px] block text-warm-concrete uppercase mb-1 opacity-80">The Room</span>
            <span className="text-sm text-white">30 Square Metres</span>
          </div>
        </div>
        <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 z-20 flex gap-12 text-right hidden md:flex">
          <div>
            <span className="font-mono text-[10px] block text-warm-concrete uppercase mb-1 opacity-80">Temp (C°)</span>
            <span className="text-xl font-light tracking-tight text-white">93.2</span>
          </div>
          <div>
            <span className="font-mono text-[10px] block text-warm-concrete uppercase mb-1 opacity-80">Yield (G)</span>
            <span className="text-xl font-light tracking-tight text-white">38.4</span>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-40 bg-graphite-soft text-center px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-display text-4xl md:text-6xl lg:text-7xl mb-8 leading-[0.9] tracking-tighter font-bold mask-text"
          >
            One small room.<br/>A rotating map of Europe in the hopper.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-warm-concrete font-body font-light max-w-2xl mx-auto"
          >
            The coffee changes. The address doesn't. Thirty square metres of concrete and timber, designed to remove variables and highlight clarity.
          </motion.p>
        </div>
      </section>

      {/* Extraction Process / On Bar */}
      <section className="py-24 md:py-32 bg-graphite border-b border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full md:w-1/2"
            >
               <div className="aspect-[3/4] relative bg-graphite-soft overflow-hidden">
                 <img 
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1374&auto=format&fit=crop" 
                    alt="Precision pour over" 
                    className="w-full h-full object-cover mix-blend-luminosity opacity-80"
                  />
                  <div className="absolute inset-0 border border-white/10 m-4" />
               </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full md:w-1/2"
            >
               <span className="font-mono text-extraction-amber uppercase tracking-widest text-[10px] mb-4 block opacity-80">Extraction</span>
               <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tighter font-bold leading-tight mask-text">Coffee measured in seconds.<br/>Remembered for much longer.</h2>
               <p className="text-warm-concrete mb-10 text-lg">
                 We approach brewing as a discipline. Every parameter—dose, yield, time, and temperature—is locked in. The result is a cup that faithfully represents the roaster's intent.
               </p>
               <Link to="/coffee" className="inline-block border-b border-stainless-steel text-stainless-steel pb-1 font-mono uppercase text-sm tracking-wider hover:text-white transition-colors">
                 Explore the Menu
               </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roasters Preview */}
      <section className="py-24 md:py-32 bg-graphite-soft text-center px-6">
        <div className="container mx-auto max-w-5xl">
          <span className="font-mono text-extraction-amber uppercase tracking-widest text-[10px] opacity-80 mb-4 block">Guest Roasters</span>
          <h2 className="font-display text-4xl md:text-6xl mb-16 tracking-tighter font-bold mask-text">The European Archive</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
             {/* Abstract representations of cities */}
             <div className="border-t border-white/10 pt-4 text-left">
               <span className="font-mono text-xs text-stainless-steel uppercase block mb-1">Aarhus</span>
               <span className="font-display text-2xl text-white">La Cabra</span>
             </div>
             <div className="border-t border-white/10 pt-4 text-left">
               <span className="font-mono text-xs text-stainless-steel uppercase block mb-1">Berlin</span>
               <span className="font-display text-2xl text-white">The Barn</span>
             </div>
             <div className="border-t border-white/10 pt-4 text-left">
               <span className="font-mono text-xs text-stainless-steel uppercase block mb-1">Amsterdam</span>
               <span className="font-display text-2xl text-white">Friedhats</span>
             </div>
             <div className="border-t border-white/10 pt-4 text-left">
               <span className="font-mono text-xs text-stainless-steel uppercase block mb-1">Rotterdam</span>
               <span className="font-display text-2xl text-white">Manhattan</span>
             </div>
          </div>

          <Link to="/roasters" className="inline-block border-b border-stainless-steel text-stainless-steel pb-1 font-mono uppercase text-sm tracking-wider hover:text-white transition-colors">
            View full archive
          </Link>
        </div>
      </section>
    </>
  );
}
