import { SEO } from '../components/ui/SEO';
import { menuItems } from '../data/menu';
import { useEffect, useState, useRef } from 'react';

// Images
import espressoImg from '../assets/images/espresso_shot_1784524108416.jpg';
import flatWhiteImg from '../assets/images/flat_white_1784524118263.jpg';
import cappuccinoImg from '../assets/images/cappuccino_1784524129263.jpg';
import filterImg from '../assets/images/filter_coffee_v60_1784523495087.jpg';
import coldBrewImg from '../assets/images/cold_brew_1784524140901.jpg';
import affogatoImg from '../assets/images/affogato_coffee_1784523507893.jpg';
import cannoloImg from '../assets/images/cannolo_1784524791418.jpg';
import pastelImg from '../assets/images/pastel_de_nata_1784524806528.jpg';

const drinks = menuItems.map(item => {
  let image = espressoImg;
  let bgColor = '#141412';
  let origin = 'Huila, Colombia';
  let roaster = 'Guest Roaster';
  let process = 'Washed';
  let altitude = '1600m';
  let temperature = '93°C';
  let brewTime = '28s';
  let notes = 'Dark Chocolate, Orange Zest';
  let pairing = 'Amaretti Biscuit';
  let isCold = false;

  if (item.name === 'Macchiato') {
    image = espressoImg;
    bgColor = '#1A1816';
    notes = 'Caramel, Cocoa';
  } else if (item.name === 'Cortado') {
    image = flatWhiteImg;
    bgColor = '#211915';
    origin = 'Antigua, Guatemala';
    notes = 'Hazelnut, Milk Choc';
  } else if (item.name === 'Flat White') {
    image = flatWhiteImg;
    bgColor = '#211915';
    origin = 'Antigua, Guatemala';
    roaster = 'House Blend';
    temperature = '60°C';
    notes = 'Caramel, Hazelnut, Milk Choc';
  } else if (item.name === 'Cappuccino') {
    image = cappuccinoImg;
    bgColor = '#1A1A18';
    origin = 'Minas Gerais, Brazil';
    process = 'Natural';
    roaster = 'House Blend';
    temperature = '65°C';
    notes = 'Cacao, Roasted Almond';
  } else if (item.name === 'Batch Brew') {
    image = filterImg;
    bgColor = '#3A3836';
    origin = 'Yirgacheffe, Ethiopia';
    temperature = '94°C';
    brewTime = '5m';
    notes = 'Peach, Earl Grey';
  } else if (item.name === 'V60 Pour Over') {
    image = filterImg;
    bgColor = '#3A3836';
    origin = 'Yirgacheffe, Ethiopia';
    temperature = '95°C';
    brewTime = '3m 15s';
    notes = 'Jasmine, Bergamot, Peach';
  } else if (item.name === 'Iced Latte') {
    image = coldBrewImg;
    bgColor = '#1D2021';
    temperature = '4°C';
    brewTime = 'Immediate';
    notes = 'Vanilla, Milk Choc';
    isCold = true;
  } else if (item.name === 'Cold Brew') {
    image = coldBrewImg;
    bgColor = '#1D2021';
    origin = 'Tarrazú, Costa Rica';
    process = 'Honey';
    roaster = 'House Blend';
    temperature = '4°C';
    brewTime = '18h';
    notes = 'Brown Sugar, Red Apple';
    isCold = true;
  } else if (item.name === 'Affogato') {
    image = affogatoImg;
    bgColor = '#2D231E';
    origin = 'Antioquia, Colombia';
    roaster = 'House Blend';
    temperature = 'Hot & Cold';
    brewTime = 'Immediate';
    notes = 'Vanilla Bean, Dark Cocoa';
    isCold = true;
  } else if (item.name === 'Cannolo Siciliano') {
    image = cannoloImg;
    bgColor = '#1A1311';
    origin = 'Sicily, Italy';
    process = 'Baked & Filled';
    roaster = 'Local Bakery';
    temperature = 'Chilled';
    brewTime = 'N/A';
    notes = 'Sweet Ricotta, Pistachio';
  } else if (item.name === 'Pastel de Nata') {
    image = pastelImg;
    bgColor = '#231E18';
    origin = 'Lisbon, Portugal';
    process = 'Baked';
    roaster = 'Local Bakery';
    temperature = 'Warm';
    brewTime = 'N/A';
    notes = 'Custard, Cinnamon, Flaky Pastry';
  }

  return {
    ...item,
    image,
    bgColor,
    origin,
    roaster,
    process,
    altitude,
    temperature,
    brewTime,
    notes,
    pairing,
    isCold
  };
});

export function MenuPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const sections = document.querySelectorAll('.drink-section');
    
    // Observer for animations (triggers slightly early so animations start before fully in view)
    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
          // Reset flip when it leaves view
          const index = parseInt((entry.target as HTMLElement).dataset.index || '0', 10);
          setFlippedCards(prev => ({ ...prev, [index]: false }));
        }
      });
    }, { threshold: 0.25 });

    // Observer for active index (triggers when element is near the middle)
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveIndex(parseInt((entry.target as HTMLElement).dataset.index || '0', 10));
        }
      });
    }, { rootMargin: "-40% 0px -40% 0px" });

    sections.forEach(sec => {
      animObserver.observe(sec);
      activeObserver.observe(sec);
    });
    
    return () => {
      animObserver.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
         if (activeIndex < drinks.length - 1) {
           e.preventDefault();
           document.getElementById(`drink-${activeIndex + 1}`)?.scrollIntoView({ behavior: 'smooth' });
         }
      } else if (e.key === 'ArrowLeft') {
         if (activeIndex > 0) {
           e.preventDefault();
           document.getElementById(`drink-${activeIndex - 1}`)?.scrollIntoView({ behavior: 'smooth' });
         }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const navNext = () => {
    if (activeIndex < drinks.length - 1) {
      document.getElementById(`drink-${activeIndex + 1}`)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navPrev = () => {
    if (activeIndex > 0) {
      document.getElementById(`drink-${activeIndex - 1}`)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO 
        title="Menu | Laboratorio Espresso" 
        description="Our current offerings of espresso, filter, cold drinks, and pastries."
      />
      
      <div className="relative w-full">
        {/* Dynamic Fixed Background */}
        <div 
          className="fixed inset-0 z-[-10] transition-colors duration-1000 ease-out"
          style={{ backgroundColor: drinks[activeIndex]?.bgColor || '#141412' }}
        >
           <div className="absolute inset-0 steel-reflection opacity-40 pointer-events-none" />
        </div>

        {/* Scrollable Content */}
        <div className="flex flex-col">
          {drinks.map((drink, i) => (
            <section 
              key={drink.id}
              id={`drink-${i}`}
              data-index={i}
              className="drink-section relative w-full min-h-[90vh] py-24 flex items-center"
            >
              <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-center">
                
                {/* TEXT CONTENT */}
                <div className="md:col-span-7 flex flex-col justify-center order-2 md:order-1 relative z-20">
                  <div className="overflow-hidden mb-2 md:mb-6">
                    <h2 className="drink-title font-display text-[clamp(4.5rem,9vw,9.5rem)] leading-[0.85] tracking-tighter uppercase font-bold text-white whitespace-nowrap">
                      {drink.name}
                    </h2>
                  </div>
                  
                  <p className="drink-desc text-warm-concrete font-body text-base sm:text-lg max-w-md mb-8 sm:mb-12">
                    {drink.description}
                  </p>

                  <div className="drink-specs grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4 sm:gap-x-8 mb-10 sm:mb-12 font-mono text-xs sm:text-sm text-white">
                    <div>
                      <span className="text-stainless-steel text-[9px] sm:text-[10px] uppercase block mb-1">Origin</span>
                      {drink.origin}
                    </div>
                    <div>
                      <span className="text-stainless-steel text-[9px] sm:text-[10px] uppercase block mb-1">Process</span>
                      {drink.process}
                    </div>
                    <div>
                      <span className="text-stainless-steel text-[9px] sm:text-[10px] uppercase block mb-1">Roaster</span>
                      {drink.roaster}
                    </div>
                    <div className="hidden sm:block">
                      <span className="text-stainless-steel text-[9px] sm:text-[10px] uppercase block mb-1">Temperature</span>
                      {drink.temperature}
                    </div>
                    <div className="hidden sm:block">
                      <span className="text-stainless-steel text-[9px] sm:text-[10px] uppercase block mb-1">Brew Time</span>
                      {drink.brewTime}
                    </div>
                    <div className="hidden sm:block">
                      <span className="text-stainless-steel text-[9px] sm:text-[10px] uppercase block mb-1">Notes</span>
                      {drink.notes}
                    </div>
                  </div>

                  <div className="drink-cta flex items-center gap-8">
                    <span className="font-display text-4xl sm:text-5xl text-white tracking-tight">{drink.price}</span>
                    <button className="border border-white/20 text-white px-8 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                      Order at bar
                    </button>
                  </div>
                </div>

                {/* IMAGE FLIP CARD */}
                <div className="md:col-span-5 flex justify-center md:justify-end order-1 md:order-2 z-10">
                  <div className="drink-image-wrapper w-[45%] md:w-full max-w-[220px] md:max-w-[340px]">
                    <div 
                      className={`card-wrapper perspective-1200 cursor-pointer w-full aspect-[3/4] ${flippedCards[i] ? 'flipped' : ''}`}
                      onClick={() => toggleFlip(i)}
                    >
                      <div className="card-inner preserve-3d relative w-full h-full">
                        
                        {/* FRONT */}
                        <div className="absolute inset-0 backface-hidden shadow-2xl shadow-black/80 ring-1 ring-white/10 overflow-hidden bg-graphite">
                          <img 
                            src={drink.image} 
                            alt={drink.name} 
                            className={`w-full h-full object-cover scale-[1.03] ${drink.isCold ? 'float-cold' : 'float-hot'}`}
                            draggable={false}
                          />
                        </div>

                        {/* BACK */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-graphite-soft border border-white/10 p-5 md:p-8 flex flex-col justify-center text-left">
                          <h4 className="font-display text-xl md:text-2xl text-white mb-4 md:mb-6 tracking-tight uppercase border-b border-white/10 pb-3 md:pb-4">
                            Exhibit Data
                          </h4>
                          <div className="space-y-3 md:space-y-4 font-mono text-[10px] md:text-xs">
                            <div>
                              <span className="text-stainless-steel uppercase opacity-70 block mb-0.5 md:mb-1">Origin</span>
                              <span className="text-white">{drink.origin}</span>
                            </div>
                            <div>
                              <span className="text-stainless-steel uppercase opacity-70 block mb-0.5 md:mb-1">Altitude</span>
                              <span className="text-white">{drink.altitude}</span>
                            </div>
                            <div>
                              <span className="text-stainless-steel uppercase opacity-70 block mb-0.5 md:mb-1">Tasting Notes</span>
                              <span className="text-white">{drink.notes}</span>
                            </div>
                            <div>
                              <span className="text-stainless-steel uppercase opacity-70 block mb-0.5 md:mb-1">Pairing</span>
                              <span className="text-extraction-amber">{drink.pairing}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </section>
          ))}
          
          {/* Bottom Padding for last item so it can scroll fully into view if needed */}
          <div className="h-[10vh] w-full" />
        </div>

        {/* Persistent Bottom Navigation */}
        <div className="fixed bottom-0 left-0 w-full z-50 p-6 md:p-8 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
          <div className="container mx-auto flex justify-between items-end">
            <div className="w-1/3 text-left pointer-events-auto">
              <button 
                onClick={navPrev}
                className={`font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:text-white ${activeIndex > 0 ? 'text-white/60' : 'text-transparent pointer-events-none'}`}
              >
                &larr; {activeIndex > 0 ? drinks[activeIndex - 1].name : ''}
              </button>
            </div>
            
            <div className="w-1/3 text-center flex flex-col items-center gap-3">
              <div className="font-mono text-[10px] text-white/80 uppercase tracking-widest">
                {String(activeIndex + 1).padStart(2, '0')} / {String(drinks.length).padStart(2, '0')}
              </div>
              <div className="w-32 h-[1px] bg-white/20 relative overflow-hidden">
                 <div 
                   className="absolute top-0 left-0 h-full bg-white transition-all duration-500 ease-out"
                   style={{ width: `${((activeIndex + 1) / drinks.length) * 100}%` }}
                 />
              </div>
            </div>
            
            <div className="w-1/3 text-right pointer-events-auto">
              <button 
                onClick={navNext}
                className={`font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:text-white ${activeIndex < drinks.length - 1 ? 'text-white/60' : 'text-transparent pointer-events-none'}`}
              >
                {activeIndex < drinks.length - 1 ? drinks[activeIndex + 1].name : ''} &rarr;
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
