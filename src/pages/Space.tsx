import { SEO } from '../components/ui/SEO';
import { motion } from 'framer-motion';

export function Space() {
  return (
    <>
      <SEO 
        title="Space | Laboratorio Espresso" 
        description="Thirty square metres. No wasted movement. Concrete, brick, and reclaimed timber."
      />
      
      <section className="pt-32 pb-24 bg-graphite min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <header className="mb-16 max-w-2xl">
            <h1 className="font-display text-5xl md:text-7xl mb-4 tracking-tighter font-bold mask-text">Thirty Square Metres.</h1>
            <p className="font-mono text-warm-concrete uppercase tracking-widest text-[10px] opacity-80">
              No wasted movement.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="aspect-[4/3] bg-graphite-soft overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1470&auto=format&fit=crop" alt="Cafe interior" className="w-full h-full object-cover opacity-80" />
              </div>
              <p className="font-mono text-xs text-stainless-steel uppercase tracking-widest">01. Workflow</p>
              <h2 className="font-display text-3xl text-white">The Bar</h2>
              <p className="text-warm-concrete">Every inch of the bar is designed to eliminate unnecessary movement. The grinder, the machine, the tools—all within arm's reach. A stage built for speed and precision.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 md:mt-32"
            >
              <div className="aspect-[3/4] bg-graphite-soft overflow-hidden">
                <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1447&auto=format&fit=crop" alt="Cafe materials" className="w-full h-full object-cover opacity-80" />
              </div>
              <p className="font-mono text-xs text-stainless-steel uppercase tracking-widest">02. Materials</p>
              <h2 className="font-display text-3xl text-white">Concrete & Timber</h2>
              <p className="text-warm-concrete">Industrial concrete floors ground the space, while reclaimed timber adds warmth. It is a utilitarian environment that respects the human element of hospitality.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
