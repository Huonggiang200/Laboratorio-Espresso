import { Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';
import { journalPosts } from '../data/journal';
import { motion } from 'framer-motion';

export function Journal() {
  return (
    <>
      <SEO 
        title="Journal | Laboratorio Espresso" 
        description="Thoughts, updates, and philosophy from the laboratory."
      />
      
      <section className="pt-32 pb-24 bg-graphite min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <header className="mb-16 max-w-2xl">
            <h1 className="font-display text-5xl md:text-7xl mb-4 tracking-tighter font-bold mask-text">Journal</h1>
            <p className="font-mono text-warm-concrete uppercase tracking-widest text-[10px] opacity-80">
              Field notes.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journalPosts.map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/journal/${post.slug}`} className="block">
                  <div className="aspect-[4/3] overflow-hidden bg-graphite-soft mb-6 relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                    />
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-warm-concrete opacity-80">{post.date}</span>
                    <span className="h-[1px] bg-white/10 flex-grow"></span>
                  </div>
                  <h2 className="font-display text-3xl text-white mb-3 tracking-tighter group-hover:text-amber-light transition-colors">{post.title}</h2>
                  <p className="text-sm text-warm-concrete opacity-80 line-clamp-3">{post.excerpt}</p>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
