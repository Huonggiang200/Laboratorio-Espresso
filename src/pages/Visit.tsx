import { SEO } from '../components/ui/SEO';
import { business } from '../data/business';

export function Visit() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "name": business.name,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "93 West Nile St",
      "addressLocality": "Glasgow",
      "postalCode": business.postcode,
      "addressCountry": "UK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": business.coordinates.lat,
      "longitude": business.coordinates.lng
    },
    "url": "https://laboratorioespresso.co.uk",
    "telephone": business.phone,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:30",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "16:00"
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Visit & Contact | Laboratorio Espresso" 
        description="Location, hours, and contact information for Laboratorio Espresso in Glasgow."
        schema={schema}
      />
      
      <section className="pt-32 pb-24 bg-graphite min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <header className="mb-16 max-w-2xl">
            <h1 className="font-display text-5xl md:text-7xl mb-4 tracking-tighter font-bold mask-text">Visit</h1>
            <p className="font-mono text-warm-concrete uppercase tracking-widest text-[10px] opacity-80">
              The Laboratory.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div>
                <h2 className="font-mono text-warm-concrete opacity-80 uppercase tracking-widest text-[10px] mb-4">Location</h2>
                <address className="not-italic text-2xl font-display tracking-tighter text-white mb-6">
                  {business.address}<br/>
                  {business.postcode}
                </address>
                <div className="flex gap-4">
                  <a href={business.mapLink} target="_blank" rel="noopener noreferrer" className="bg-white text-black px-6 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-extraction-amber hover:text-black transition-colors font-bold">
                    Open in Maps
                  </a>
                  <button onClick={() => navigator.clipboard.writeText(`${business.address}, ${business.postcode}`)} className="border border-white/20 text-white px-6 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-white/5 transition-colors">
                    Copy Address
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                  <h2 className="font-mono text-warm-concrete opacity-80 uppercase tracking-widest text-[10px] mb-4">Hours</h2>
                  <ul className="space-y-2 text-white font-mono text-sm">
                    <li className="flex justify-between"><span>Mon &mdash; Fri</span> <span>{business.hours.weekdays}</span></li>
                    <li className="flex justify-between"><span>Saturday</span> <span>{business.hours.saturday}</span></li>
                    <li className="flex justify-between"><span>Sunday</span> <span>{business.hours.sunday}</span></li>
                  </ul>
                </div>
                <div>
                  <h2 className="font-mono text-warm-concrete opacity-80 uppercase tracking-widest text-[10px] mb-4">Contact</h2>
                  <ul className="space-y-2 text-white font-mono text-sm">
                    <li><a href={`mailto:${business.email}`} className="hover:text-extraction-amber transition-colors">{business.email}</a></li>
                    <li>{business.phone}</li>
                    <li className="pt-2">
                      <a href={business.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-extraction-amber transition-colors">Instagram</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 space-y-4">
                 <div>
                  <h3 className="font-mono text-warm-concrete opacity-80 uppercase tracking-widest text-[10px] mb-2">Transport</h3>
                  <p className="text-sm text-white">{business.publicTransport}</p>
                 </div>
                 <div>
                  <h3 className="font-mono text-warm-concrete opacity-80 uppercase tracking-widest text-[10px] mb-2">Accessibility</h3>
                  <p className="text-sm text-white">{business.accessibility}</p>
                 </div>
              </div>
            </div>

            <div>
              <h2 className="font-mono text-warm-concrete opacity-80 uppercase tracking-widest text-[10px] mb-8">FAQ</h2>
              <div className="space-y-8">
                {business.faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-6">
                    <h3 className="font-display text-2xl text-white mb-2 tracking-tighter">{faq.question}</h3>
                    <p className="text-warm-concrete text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
