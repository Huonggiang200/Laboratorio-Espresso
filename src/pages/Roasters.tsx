import { SEO } from '../components/ui/SEO';
import { roasters } from '../data/roasters';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

export function Roasters() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeRoaster = roasters[currentIndex];
  const totalRoasters = roasters.length;
  
  // Transition state
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalRoasters);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + totalRoasters) % totalRoasters);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const selectRoaster = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  // Keep state and actions in a ref to avoid stale closures in native event listeners
  const stateRef = useRef({ currentIndex, isTransitioning, totalRoasters });
  useEffect(() => {
    stateRef.current = { currentIndex, isTransitioning, totalRoasters };
  }, [currentIndex, isTransitioning, totalRoasters]);

  const actionsRef = useRef({ handleNext, handlePrev });
  useEffect(() => {
    actionsRef.current = { handleNext, handlePrev };
  }, [handleNext, handlePrev]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTransitioning]);

  const dialContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Wheel and Drag Handlers for the Dial Container
  useEffect(() => {
    const dial = dialContainerRef.current;
    if (!dial) return;

    let wheelAccumulator = 0;
    let lastWheelTime = 0;
    
    let isDragging = false;
    let startY = 0;

    const onWheel = (e: WheelEvent) => {
      const { currentIndex, isTransitioning, totalRoasters } = stateRef.current;
      const now = Date.now();

      // Reset accumulator if it's been a while (handles trackpad momentum pauses)
      if (now - lastWheelTime > 200) {
        wheelAccumulator = 0;
      }
      lastWheelTime = now;

      const isWheelingDown = e.deltaY > 0;
      const isWheelingUp = e.deltaY < 0;

      // Allow native page scroll when at the edges of the collection
      if (isWheelingDown && currentIndex === totalRoasters - 1) {
        return;
      }
      if (isWheelingUp && currentIndex === 0) {
        return;
      }

      // We are within the interactive boundary, consume the wheel event to prevent page scroll
      e.preventDefault();

      // If already transitioning, eat the event as a cooldown
      if (isTransitioning) return;

      wheelAccumulator += e.deltaY;
      const threshold = 50; // meaningful accumulated threshold

      if (wheelAccumulator > threshold) {
        actionsRef.current.handleNext();
        wheelAccumulator = 0;
      } else if (wheelAccumulator < -threshold) {
        actionsRef.current.handlePrev();
        wheelAccumulator = 0;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      // Only capture if it's a primary button click
      if (e.button !== 0) return;
      isDragging = true;
      startY = e.clientY;
      dial.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      
      const { currentIndex, isTransitioning, totalRoasters } = stateRef.current;
      if (isTransitioning) return;

      const deltaY = e.clientY - startY;
      const dragThreshold = 50;

      if (deltaY < -dragThreshold) {
        if (currentIndex < totalRoasters - 1) {
          actionsRef.current.handleNext();
        }
        isDragging = false; // End drag after one action
      } else if (deltaY > dragThreshold) {
        if (currentIndex > 0) {
          actionsRef.current.handlePrev();
        }
        isDragging = false;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      dial.releasePointerCapture(e.pointerId);
    };

    dial.addEventListener('wheel', onWheel, { passive: false });
    dial.addEventListener('pointerdown', onPointerDown);
    dial.addEventListener('pointermove', onPointerMove);
    dial.addEventListener('pointerup', onPointerUp);
    dial.addEventListener('pointercancel', onPointerUp);

    return () => {
      dial.removeEventListener('wheel', onWheel);
      dial.removeEventListener('pointerdown', onPointerDown);
      dial.removeEventListener('pointermove', onPointerMove);
      dial.removeEventListener('pointerup', onPointerUp);
      dial.removeEventListener('pointercancel', onPointerUp);
    };
  }, []);

  // Mobile Horizontal Swipe Handler
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchStartX || !touchStartY) return;

      const { currentIndex, isTransitioning, totalRoasters } = stateRef.current;
      if (isTransitioning) return;

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;

      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;

      // Only trigger if horizontal movement is clearly greater than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) * 1.4 && Math.abs(deltaX) > 40) {
        if (deltaX > 0 && currentIndex < totalRoasters - 1) {
          actionsRef.current.handleNext();
          touchStartX = 0;
          touchStartY = 0;
        } else if (deltaX < 0 && currentIndex > 0) {
          actionsRef.current.handlePrev();
          touchStartX = 0;
          touchStartY = 0;
        }
      }
    };

    const onTouchEnd = () => {
      touchStartX = 0;
      touchStartY = 0;
    };

    // Passive true because we do NOT prevent default for touches, preserving vertical scroll
    section.addEventListener('touchstart', onTouchStart, { passive: true });
    section.addEventListener('touchmove', onTouchMove, { passive: true });
    section.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      section.removeEventListener('touchstart', onTouchStart);
      section.removeEventListener('touchmove', onTouchMove);
      section.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const angleStep = 360 / totalRoasters;
  const currentRotation = -currentIndex * angleStep;

  return (
    <>
      <SEO 
        title="Guest Roasters | Laboratorio Espresso" 
        description="Four cities. One bar. Always in rotation. Our curated selection of European coffee roasters."
      />
      
      <div className="bg-graphite min-h-screen text-white pt-24 pb-12 overflow-x-hidden selection:bg-extraction-amber selection:text-white">
        
        {/* Intro */}
        <div className="container mx-auto px-6 lg:px-12 mb-8 lg:mb-20">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-stainless-steel mb-4 block">
              Roasters / Current Rotation
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tighter uppercase font-bold text-white leading-none">
              The European <br/>Rotation
            </h1>
            <p className="font-body text-base lg:text-lg text-warm-concrete max-w-lg leading-relaxed">
              Laboratorio brings together distinct roasting perspectives from across Europe, selected for clarity, character and relevance on the bar.
            </p>
          </div>
        </div>

        {/* Main Interactive Section */}
        <div 
          ref={sectionRef}
          className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-24"
        >
          
          {/* MOBILE ONLY: Vertical Selector */}
          <div className="lg:hidden col-span-1 border-y border-white/10 py-6 mb-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-stainless-steel mb-4">
              Select Roaster
            </div>
            <div className="flex flex-col gap-2">
              {roasters.map((r, i) => (
                <button 
                  key={r.id}
                  onClick={() => selectRoaster(i)}
                  className={clsx(
                    "flex items-center gap-4 text-left p-3 border transition-colors",
                    i === currentIndex ? "border-extraction-amber/50 bg-extraction-amber/5" : "border-white/5 hover:border-white/20 bg-transparent"
                  )}
                >
                  <span className={clsx(
                    "font-mono text-[10px] uppercase tracking-widest",
                    i === currentIndex ? "text-extraction-amber" : "text-stainless-steel"
                  )}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={clsx(
                    "font-display text-xl uppercase tracking-tight",
                    i === currentIndex ? "text-white" : "text-white/60"
                  )}>
                    {r.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* LEFT COLUMN (Desktop): DIAL & INSPECTION (Desktop: 6 col approx 50%) */}
          <div 
            ref={dialContainerRef}
            className="hidden lg:flex lg:col-span-6 relative justify-center items-center h-[70vh] w-full cursor-grab active:cursor-grabbing"
          >
            {/* The Dial */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[55vw] h-[55vw] max-w-[900px] max-h-[900px] rounded-full border border-white/5 bg-graphite-soft/20 flex items-center justify-center pointer-events-none motion-safe:transition-transform motion-safe:duration-[800ms] motion-safe:ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-opacity motion-reduce:duration-300"
                 style={{ 
                   transform: `translateY(-50%) translateX(-25%) rotate(${currentRotation}deg)`,
                   opacity: isTransitioning ? '0.7' : '1' // Only matters for reduced motion usually, but adds a nice touch
                 }}>
              
              {/* Inner rings */}
              <div className="absolute inset-4 rounded-full border border-white/[0.03]"></div>
              <div className="absolute inset-12 rounded-full border border-white/[0.02]"></div>
              <div className="absolute inset-24 rounded-full border border-white/[0.05] border-dashed opacity-30"></div>
              
              {/* Dial Items */}
              {roasters.map((roaster, idx) => {
                const angle = idx * angleStep;
                const isActive = idx === currentIndex;
                return (
                  <div 
                    key={roaster.id}
                    className="absolute w-full h-full pointer-events-auto"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div 
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-start pt-4 cursor-pointer group"
                      onClick={() => selectRoaster(idx)}
                    >
                      {/* Tick mark */}
                      <div className={clsx(
                        "w-px h-4 mb-2 transition-colors duration-500",
                        isActive ? "bg-extraction-amber" : "bg-stainless-steel/50 group-hover:bg-white"
                      )} />
                      {/* Label - Keep upright relative to its position on the dial */}
                      <span className={clsx(
                        "font-mono text-[10px] uppercase tracking-widest transition-colors duration-500 absolute top-8 whitespace-nowrap",
                        isActive ? "text-extraction-amber" : "text-stainless-steel group-hover:text-white"
                      )}>
                        {roaster.cityCode} / {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Fixed Inspection Marker */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[55vw] h-[55vw] max-w-[900px] max-h-[900px] pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-extraction-amber mb-2 shadow-[0_0_8px_rgba(200,117,46,0.8)]" />
                 <div className="w-8 h-px bg-extraction-amber absolute top-[3px] -left-10" />
                 <div className="w-8 h-px bg-extraction-amber absolute top-[3px] -right-10" />
              </div>
            </div>

            {/* Inspection Image Window (Desktop) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[45vw] max-w-[280px] aspect-[4/5] bg-graphite border border-white/10 p-3 overflow-hidden shadow-2xl pointer-events-none">
               <div className="w-full h-full relative overflow-hidden bg-black/50">
                 {roasters.map((roaster, idx) => (
                   <img 
                     key={`img-${roaster.id}`}
                     src={roaster.image}
                     alt={roaster.imageAlt}
                     className={clsx(
                       "absolute inset-0 w-full h-full object-cover transition-opacity motion-safe:duration-700 motion-reduce:duration-300 ease-out",
                       idx === currentIndex ? "opacity-100" : "opacity-0"
                     )}
                     loading={idx === 0 ? "eager" : "lazy"}
                   />
                 ))}
                 
                 {/* Technical overlay */}
                 <div className="absolute bottom-2 left-2 right-2 flex justify-between">
                    <span className="font-mono text-[9px] uppercase text-white/60 tracking-widest bg-black/40 px-1 backdrop-blur-sm">
                      {activeRoaster.cityCode}
                    </span>
                    <span className="font-mono text-[9px] uppercase text-white/60 tracking-widest bg-black/40 px-1 backdrop-blur-sm">
                      {activeRoaster.status}
                    </span>
                 </div>
               </div>
            </div>

            {/* Route to Glasgow detail (Desktop) */}
            <div className="hidden lg:block absolute bottom-0 right-10 z-20 pointer-events-none">
              <div className="font-mono text-[9px] text-stainless-steel uppercase tracking-widest flex items-center gap-4">
                 <span>{activeRoaster.city}</span>
                 <div className="w-12 h-px bg-stainless-steel/30 relative">
                   <div 
                     className="absolute top-0 left-0 h-full bg-extraction-amber transition-all duration-[800ms] motion-reduce:duration-300 ease-out" 
                     style={{ width: isTransitioning ? '0%' : '100%' }}
                   />
                 </div>
                 <span>Glasgow</span>
              </div>
              <div className="font-mono text-[9px] text-stainless-steel/50 uppercase tracking-widest mt-1 text-right">
                Selected {activeRoaster.cityCode} &mdash; Served GLA
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: EDITORIAL PROFILE (Desktop: 6 col approx 50%) */}
          <div className="col-span-1 lg:col-span-6 flex flex-col justify-center min-h-[50vh] relative z-20">
            
            <div className="mb-6 lg:mb-10 overflow-hidden">
              <div className="hidden lg:block font-mono text-xs text-stainless-steel uppercase tracking-widest mb-4">
                {String(currentIndex + 1).padStart(2, '0')} / {String(totalRoasters).padStart(2, '0')}
              </div>
              <div className={clsx(
                "transition-all duration-700 motion-reduce:duration-300 ease-out flex flex-col md:flex-row md:items-end gap-6 md:gap-8", 
                isTransitioning ? "motion-safe:translate-x-12 opacity-0" : "motion-safe:translate-x-0 opacity-100"
              )}>
                
                {/* Mobile Image (Visible only on mobile/tablet) */}
                <div className="lg:hidden w-[45%] max-w-[220px] aspect-[4/5] border border-white/10 p-2 shadow-2xl shrink-0 pointer-events-none">
                  <div className="w-full h-full relative overflow-hidden bg-black/50">
                    <img 
                      src={activeRoaster.image}
                      alt={activeRoaster.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 left-1 right-1 flex justify-between">
                        <span className="font-mono text-[8px] uppercase text-white/60 tracking-widest bg-black/40 px-1 backdrop-blur-sm">
                          {activeRoaster.cityCode}
                        </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-[clamp(4.5rem,8vw,8.5rem)] uppercase font-bold tracking-tighter leading-[0.85] text-white">
                    {activeRoaster.name}
                  </h2>
                  <div className="font-mono text-sm md:text-base text-extraction-amber uppercase tracking-widest mt-4">
                    {activeRoaster.city}, {activeRoaster.country}
                  </div>
                </div>

              </div>
            </div>

            <div className={clsx(
              "transition-all duration-[800ms] motion-reduce:duration-300 ease-out flex-1", 
              isTransitioning ? "motion-safe:translate-y-8 opacity-0" : "motion-safe:translate-y-0 opacity-100"
            )}>
              
              {/* Statement */}
              <p className="font-body text-base lg:text-lg text-warm-concrete mb-10 max-w-lg leading-relaxed">
                {activeRoaster.shortStatement}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-12">
                {/* Why Selected */}
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-stainless-steel border-b border-white/10 pb-2 mb-4">
                    Why They Are Here
                  </h3>
                  <p className="font-body text-sm text-warm-concrete leading-relaxed mb-4">
                    {activeRoaster.whySelected}
                  </p>
                  <ul className="space-y-1.5">
                    {activeRoaster.selectedFor.map((item, i) => (
                      <li key={i} className="font-mono text-[10px] uppercase tracking-widest text-white/80 flex items-center gap-2">
                        <span className="w-1 h-1 bg-white/20 rounded-full"></span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Currently on Bar */}
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-stainless-steel border-b border-white/10 pb-2 mb-4">
                    Currently On Bar
                  </h3>
                  
                  {activeRoaster.currentCoffee ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                         <span className="font-body text-base text-white">{activeRoaster.currentCoffee}</span>
                         <span className="font-mono text-[10px] text-extraction-amber uppercase text-right ml-4 shrink-0">{activeRoaster.recommendedBrew}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 font-mono text-[10px] uppercase tracking-widest">
                        <div>
                          <span className="text-stainless-steel block mb-0.5">Origin</span>
                          <span className="text-white/80">{activeRoaster.coffeeOrigin}</span>
                        </div>
                        <div>
                          <span className="text-stainless-steel block mb-0.5">Process</span>
                          <span className="text-white/80">{activeRoaster.coffeeProcess}</span>
                        </div>
                      </div>
                      <div className="pt-2">
                         <span className="font-mono text-[10px] uppercase tracking-widest text-stainless-steel block mb-1">Tasting Notes</span>
                         <div className="flex flex-wrap gap-2">
                           {activeRoaster.tastingNotes.map((note, i) => (
                             <span key={i} className="font-mono text-[9px] uppercase tracking-widest text-white/80 bg-white/5 px-1.5 py-0.5">
                               {note}
                             </span>
                           ))}
                         </div>
                      </div>
                    </div>
                  ) : (
                    <div className="font-mono text-xs text-white/60 uppercase tracking-widest py-4 border border-white/5 px-4 text-center">
                      Current Selection <br/> Ask at the bar
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Controls (Desktop) */}
            <div className="hidden lg:flex items-center justify-between border-t border-white/10 pt-6 mt-auto">
              <button 
                onClick={handlePrev}
                className="font-mono text-[10px] lg:text-xs uppercase tracking-widest text-stainless-steel hover:text-white transition-colors py-2"
                aria-label="Previous roaster"
              >
                &larr; Previous
              </button>
              
              <div className="flex items-center gap-3">
                {roasters.map((r, i) => (
                  <button
                    key={r.id}
                    onClick={() => selectRoaster(i)}
                    className={clsx(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      i === currentIndex ? "bg-extraction-amber scale-125" : "bg-white/20 hover:bg-white/40"
                    )}
                    aria-label={`Select ${r.name}`}
                  />
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="font-mono text-[10px] lg:text-xs uppercase tracking-widest text-stainless-steel hover:text-white transition-colors py-2"
                aria-label="Next roaster"
              >
                Next &rarr;
              </button>
            </div>

          </div>
        </div>

        {/* Optional Archive Section */}
        <div className="container mx-auto px-6 lg:px-12 mt-12 lg:mt-24 mb-12">
           <div className="border-t border-white/10 pt-12">
             <h3 className="font-mono text-[10px] uppercase tracking-widest text-stainless-steel mb-8">
               The Rotation Archive
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {roasters.map((r, i) => (
                  <div key={r.id} className="border border-white/5 p-4 flex flex-col justify-between min-h-[120px] hover:border-white/20 transition-colors cursor-pointer group" onClick={() => selectRoaster(i)}>
                    <span className="font-mono text-[9px] text-extraction-amber uppercase tracking-widest">{r.status}</span>
                    <div className="mt-4">
                      <h4 className="font-display text-xl text-white uppercase tracking-tight group-hover:text-extraction-amber transition-colors">{r.name}</h4>
                      <span className="font-mono text-[9px] text-stainless-steel uppercase tracking-widest">{r.cityCode}</span>
                    </div>
                  </div>
                ))}
             </div>
           </div>
        </div>

      </div>
    </>
  );
}

