import { Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';
import { coffeeExperiences } from '../data/coffee';
import { motion } from 'framer-motion';

export function Coffee() {
  return (
    <>
      <SEO 
        title="Coffee | Laboratorio Espresso" 
        description="Explore our extraction methods: Espresso, Milk, Filter, Cold, and Affogato."
      />
      
      <section className="pt-32 pb-16 bg-graphite min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <header className="mb-16 max-w-2xl">
            <h1 className="font-display text-5xl md:text-7xl mb-4 tracking-tighter font-bold mask-text">Coffee</h1>
            <p className="font-mono text-warm-concrete uppercase tracking-widest text-[10px] opacity-80">
              Controlled extraction. Expressed intent.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coffeeExperiences.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative block overflow-hidden bg-graphite-soft aspect-[4/5]"
              >
                <img 
                  src={exp.image} 
                  alt={exp.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent opacity-80" />
                
                <Link to={`/coffee/${exp.slug}`} className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                  <h2 className="font-display text-3xl mb-2 text-white tracking-tighter group-hover:text-extraction-amber transition-colors">{exp.title}</h2>
                  <p className="font-mono text-[10px] text-warm-concrete opacity-80 mb-4 tracking-widest uppercase">{exp.subtitle}</p>
                  <span className="text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 self-start group-hover:border-extraction-amber transition-colors font-mono">
                    Explore
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
