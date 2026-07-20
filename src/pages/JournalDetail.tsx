import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';
import { journalPosts } from '../data/journal';

export function JournalDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = journalPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 text-center">
        <div>
          <h1 className="font-display text-4xl mb-4">Not Found</h1>
          <Link to="/journal" className="text-extraction-amber border-b border-extraction-amber pb-1 font-mono">Return to Journal</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${post.title} | Laboratorio Espresso`} 
        description={post.excerpt}
      />
      
      <article className="pt-32 pb-24 bg-graphite min-h-screen">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <Link to="/journal" className="font-mono text-[10px] text-warm-concrete opacity-80 uppercase tracking-widest hover:opacity-100 transition-opacity mb-12 block">
            &larr; Back to Journal
          </Link>

          <header className="mb-12">
            <span className="font-mono text-[10px] uppercase tracking-widest text-warm-concrete opacity-80 block mb-4">{post.date}</span>
            <h1 className="font-display text-4xl md:text-6xl text-white mb-6 leading-[0.9] tracking-tighter font-bold mask-text">{post.title}</h1>
            <p className="text-xl text-white font-light">{post.excerpt}</p>
          </header>

          <figure className="aspect-[16/9] mb-12 overflow-hidden bg-graphite-soft">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-90" />
          </figure>

          <div className="prose prose-invert prose-p:font-body prose-p:text-warm-concrete prose-p:text-lg prose-p:leading-relaxed max-w-none">
            <p>{post.content}</p>
          </div>
        </div>
      </article>
    </>
  );
}
