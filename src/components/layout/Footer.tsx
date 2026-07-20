import { Link } from 'react-router-dom';
import { business } from '../../data/business';

export function Footer() {
  return (
    <footer className="bg-graphite-soft text-warm-concrete py-16 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="font-display text-2xl tracking-tighter font-bold uppercase mb-4 block mask-text">
            Laboratorio Espresso
          </Link>
          <p className="text-[12px] opacity-60 font-mono mt-4 text-warm-concrete">
            The future of analogue coffee.<br />
            Poured daily in Glasgow.
          </p>
        </div>

        <div>
          <h3 className="font-mono text-white opacity-80 mb-6 uppercase text-[10px] tracking-wider">Location</h3>
          <address className="not-italic text-[12px] opacity-80 space-y-1">
            <p>{business.address}</p>
            <p>{business.postcode}</p>
          </address>
        </div>

        <div>
          <h3 className="font-mono text-white opacity-80 mb-6 uppercase text-[10px] tracking-wider">Hours</h3>
          <ul className="text-[12px] opacity-80 space-y-2">
            <li className="flex justify-between"><span>Mon-Fri</span> <span>{business.hours.weekdays}</span></li>
            <li className="flex justify-between"><span>Saturday</span> <span>{business.hours.saturday}</span></li>
            <li className="flex justify-between"><span>Sunday</span> <span>{business.hours.sunday}</span></li>
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-white opacity-80 mb-6 uppercase text-[10px] tracking-wider">Connect</h3>
          <ul className="text-[12px] opacity-80 space-y-2">
            <li><a href={business.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-amber-light transition-colors">Instagram</a></li>
            <li><a href={business.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-amber-light transition-colors">Twitter</a></li>
            <li><a href={`mailto:${business.email}`} className="hover:text-amber-light transition-colors">Email</a></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-warm-concrete opacity-60">
        <p>&copy; {new Date().getFullYear()} {business.name}. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
