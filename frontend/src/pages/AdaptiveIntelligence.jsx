export default function AdaptiveIntelligence() {
  return (
    <div className="grow w-full max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-margin-desktop flex flex-col gap-16">
      <header className="w-full max-w-4xl pt-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-border-industrial bg-surface-bright">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
          <span className="font-label-caps text-label-caps text-text-muted uppercase tracking-widest">Architecture Status: Active</span>
        </div>
        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-6 uppercase">
          NOT A FIXED LINE. <br className="hidden md:block"/>
          <span className="text-primary">AN ADAPTIVE SYSTEM.</span>
        </h1>
        <p className="font-mono-data text-mono-data text-text-muted max-w-2xl uppercase tracking-wider leading-relaxed">
          Adaptive Processing Architecture executing real-time material characterization. Modulating separation parameters autonomously for absolute certainty in output purity.
        </p>
      </header>

      {/* Process Flow UI */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-border-industrial -z-10 translate-y-[-50%]"></div>
          
          <div className="bg-surface-bright border border-border-industrial p-6 flex flex-col items-start gap-4">
            <div className="w-10 h-10 border border-primary text-primary flex items-center justify-center bg-surface">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>sensors</span>
            </div>
            <div>
              <h3 className="font-label-caps text-label-caps text-on-surface mb-1">PHASE 01 // SENSE</h3>
              <p className="font-mono-data text-[12px] text-text-muted">Multispectral input scanning.</p>
            </div>
          </div>

          <div className="bg-surface-bright border border-border-industrial p-6 flex flex-col items-start gap-4">
            <div className="w-10 h-10 border border-primary text-primary flex items-center justify-center bg-surface">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
            </div>
            <div>
              <h3 className="font-label-caps text-label-caps text-on-surface mb-1">PHASE 02 // ASSESS</h3>
              <p className="font-mono-data text-[12px] text-text-muted">Composition analysis algorithms.</p>
            </div>
          </div>

          <div className="border border-border-industrial p-6 flex flex-col justify-between min-h-50 relative group hover:border-primary-container transition-colors">
            <div className="w-10 h-10 bg-primary-container text-on-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>tune</span>
            </div>
            <div>
              <h3 className="font-label-caps text-label-caps text-primary mb-1">PHASE 03 // ADJUST</h3>
              <p className="font-mono-data text-[12px] text-text-muted">Real-time parameter modulation.</p>
            </div>
          </div>

          <div className="bg-surface-bright border border-border-industrial p-6 flex flex-col items-start gap-4">
            <div className="w-10 h-10 border border-border-industrial text-text-muted flex items-center justify-center bg-surface">
              <span className="material-symbols-outlined">call_split</span>
            </div>
            <div>
              <h3 className="font-label-caps text-label-caps text-on-surface mb-1">PHASE 04 // SEPARATE</h3>
              <p className="font-mono-data text-[12px] text-text-muted">Precision physical divergence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Telemetry Data Grid */}
      <section className="w-full">
        <h2 className="font-label-caps text-label-caps text-text-muted mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">troubleshoot</span>
          LIVE TELEMETRY // SYSTEM CALIBRATION
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Moisture Content Card */}
          <article className="bg-surface-bright border border-border-industrial p-gutter relative min-h-[200px] flex flex-col justify-between group hover:border-outline transition-colors duration-300">
            <div className="absolute top-4 right-4 font-label-caps text-label-caps text-text-muted tracking-widest border border-border-industrial px-2 py-0.5">
              ID: MST-8A
            </div>
            <div>
              <h3 className="font-mono-data text-mono-data text-text-muted uppercase mb-2">Moisture Content</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary-container animate-data-pulse">NOMINAL</span>
                <span className="font-mono-data text-[12px] text-text-muted">REL VOL</span>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between font-mono-data text-[10px] text-text-muted mb-1">
                <span>0%</span>
                <span>Target: 40%</span>
                <span>100%</span>
              </div>
              <div className="h-2 w-full bg-surface-dim relative gauge-notches border border-border-industrial">
                <div className="absolute top-0 left-0 h-full bg-primary-container" style={{ width: '42.8%' }}></div>
                <div className="absolute -top-1 -bottom-1 -left-1 w-0.5 bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
              </div>
            </div>
          </article>

          {/* Inert Material Card */}
          <article className="bg-surface-bright border border-border-industrial p-gutter relative min-h-[200px] flex flex-col justify-between group hover:border-outline transition-colors duration-300">
            <div className="absolute top-4 right-4 font-label-caps text-label-caps text-text-muted tracking-widest border border-border-industrial px-2 py-0.5">
              ID: INR-2B
            </div>
            <div>
              <h3 className="font-mono-data text-mono-data text-text-muted uppercase mb-2">Inert Fraction</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary-container animate-data-pulse">OPTIMAL</span>
                <span className="font-mono-data text-[12px] text-text-muted">MASS</span>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between font-mono-data text-[10px] text-text-muted mb-1">
                <span>0%</span>
                <span>Limit: &lt;15%</span>
                <span>50%</span>
              </div>
              <div className="h-2 w-full bg-surface-dim relative gauge-notches border border-border-industrial">
                <div className="absolute top-0 left-0 h-full bg-primary-container" style={{ width: '22.8%' }}></div>
                <div className="absolute top-[-4px] bottom-[-4px] w-[2px] bg-outline z-10" style={{ left: '30%' }}></div>
              </div>
            </div>
          </article>

          {/* Particle Size Card */}
          <article className="bg-surface-bright border border-border-industrial p-gutter relative min-h-[200px] flex flex-col justify-between group hover:border-outline transition-colors duration-300">
            <div className="absolute top-4 right-4 font-label-caps text-label-caps text-text-muted tracking-widest border border-border-industrial px-2 py-0.5">
              ID: PSD-9X
            </div>
            <div>
              <h3 className="font-mono-data text-mono-data text-text-muted uppercase mb-2">Particle Size &lt;50mm</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary-container animate-data-pulse">TARGET</span>
                <span className="font-mono-data text-[12px] text-text-muted">PASSING</span>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between font-mono-data text-[10px] text-text-muted mb-1">
                <span>0%</span>
                <span>Optimum: &gt;80%</span>
                <span>100%</span>
              </div>
              <div className="h-2 w-full bg-surface-dim relative gauge-notches border border-border-industrial">
                <div className="absolute top-0 left-0 h-full bg-primary-container" style={{ width: '86.2%' }}></div>
                <div className="absolute top-0 h-full bg-primary/20 z-10" style={{ left: '80%', right: 0 }}></div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
