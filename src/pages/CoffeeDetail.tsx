import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';
import { coffeeExperiences } from '../data/coffee';
import { motion } from 'framer-motion';

export function CoffeeDetail() {
  const { slug } = useParams<{ slug: string }>();
  const experience = coffeeExperiences.find(c => c.slug === slug);

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 text-center">
        <div>
          <h1 className="font-display text-4xl mb-4">Not Found</h1>
          <Link to="/coffee" className="text-extraction-amber border-b border-extraction-amber pb-1 font-mono">Return to Coffee</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${experience.title} | Laboratorio Espresso`} 
        description={experience.description}
      />
      
      <section className="pt-32 pb-24 bg-graphite min-h-screen flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="aspect-square relative overflow-hidden"
            >
              <img 
                src={experience.image} 
                alt={experience.title} 
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/coffee" className="font-mono text-[10px] text-warm-concrete opacity-80 uppercase tracking-widest hover:opacity-100 transition-opacity mb-8 block">
                &larr; Back to Coffee
              </Link>
              <h1 className="font-display text-5xl md:text-7xl mb-2 tracking-tighter font-bold mask-text">{experience.title}</h1>
              <p className="font-mono text-warm-concrete opacity-80 uppercase tracking-widest text-[10px] mb-8">
                {experience.subtitle}
              </p>
              
              <p className="text-lg text-white mb-12">
                {experience.description}
              </p>

              <div className="space-y-8 border-t border-white/5 pt-8">
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-warm-concrete opacity-60 mb-2">Preparation</h3>
                  <p className="text-white text-sm">{experience.preparation}</p>
                </div>
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-warm-concrete opacity-60 mb-2">Ingredients</h3>
                  <p className="text-white text-sm">{experience.ingredients.join(', ')}</p>
                </div>
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-warm-concrete opacity-60 mb-2">Pairing</h3>
                  <p className="text-white text-sm">{experience.pairing}</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
