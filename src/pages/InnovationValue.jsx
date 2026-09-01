export default function InnovationValue() {
  return (
    <div className="flex-grow max-w-[1440px] mx-auto w-full">
      {/* Hero Section */}
      <section className="px-margin-mobile md:px-margin-desktop py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
            <line stroke="currentColor" strokeWidth="0.5" x1="0" x2="100" y1="0" y2="100"></line>
            <line stroke="currentColor" strokeWidth="0.5" x1="100" x2="0" y1="0" y2="100"></line>
          </svg>
        </div>
        <div className="max-w-4xl relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-1 bg-primary"></div>
            <span className="font-label-caps text-label-caps text-primary uppercase">Core Principle 01</span>
          </div>
          <h1 className="font-display-lg text-display-lg md:text-display-lg text-on-surface mb-8">
            OUR INNOVATION IS<br/>
            <span className="text-text-muted">THE ARCHITECTURE.</span>
          </h1>
          <p className="font-body-md text-body-md text-text-muted max-w-2xl border-l-2 border-primary pl-6">
            We do not invent novel waste streams; we architect precise, controlled environments where standard physics and chemistry are executed with uncompromising certainty.
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="px-margin-mobile md:px-margin-desktop py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="data-card p-8 group hover:border-primary-container transition-colors duration-300 flex flex-col">
            <div className="flex justify-between items-start mb-12">
              <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>memory</span>
              <span className="font-mono-data text-mono-data text-text-muted">ID: TECH-01</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg-mobile mb-4">Established Tech</h3>
            <p className="font-body-md text-body-md text-text-muted mb-6 flex-grow">
              Deploying proven industrial methodologies—thermal depolymerization, catalytic reforming—within a rigid, scalable framework.
            </p>
            <div className="h-1 w-full bg-surface-container-highest mt-auto">
              <div className="h-full bg-primary w-3/4 group-hover:w-full transition-all duration-500"></div>
            </div>
          </div>

          <div className="data-card p-8 group hover:border-primary-container transition-colors duration-300 flex flex-col">
            <div className="flex justify-between items-start mb-12">
              <span className="material-symbols-outlined text-secondary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>tune</span>
              <span className="font-mono-data text-mono-data text-text-muted">ID: ADPT-02</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg-mobile mb-4">Adaptive Control</h3>
            <p className="font-body-md text-body-md text-text-muted mb-6 flex-grow">
              Real-time telemetry and algorithmic adjustments ensure process stability despite volatile input composition.
            </p>
            <div className="h-1 w-full bg-surface-container-highest mt-auto">
              <div className="h-full bg-secondary-container w-2/3 group-hover:w-full transition-all duration-500"></div>
            </div>
          </div>

          <div className="data-card p-8 group hover:border-primary-container transition-colors duration-300 flex flex-col">
            <div className="flex justify-between items-start mb-12">
              <span className="material-symbols-outlined text-on-surface text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
              <span className="font-mono-data text-mono-data text-text-muted">ID: STD-03</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg-mobile mb-4">Output Standardization</h3>
            <p className="font-body-md text-body-md text-text-muted mb-6 flex-grow">
              Transforming chaotic municipal solid waste into homogenous, predictable resource streams suitable for global commodities markets.
            </p>
            <div className="h-1 w-full bg-surface-container-highest mt-auto">
              <div className="h-full bg-on-surface w-4/5 group-hover:w-full transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Flow Diagram Section */}
      <section className="px-margin-mobile md:px-margin-desktop py-24 border-t border-border-industrial mt-12 relative bg-surface-bright">
        <div className="mb-16">
          <span className="font-label-caps text-label-caps text-secondary-container uppercase mb-4 block">Process Telemetry</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">VALUE FROM EVERY TONNE</h2>
        </div>

        <div className="relative w-full border border-border-industrial bg-surface p-12">
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "linear-gradient(theme('colors.on-surface') 1px, transparent 1px), linear-gradient(90deg, theme('colors.on-surface') 1px, transparent 1px)", backgroundSize: '20px 20px' }}></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="data-card p-6 min-w-[250px] border-l-4 border-l-on-surface">
              <span className="font-mono-data text-mono-data text-text-muted block mb-2">INPUT_STREAM_01</span>
              <h4 className="font-headline-lg-mobile text-headline-lg-mobile mb-2">Mixed MSW</h4>
              <div className="flex items-center gap-2 mt-4">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="font-mono-data text-mono-data text-xs uppercase">High Variability</span>
              </div>
            </div>

            <div className="flex-grow flex items-center justify-center relative min-h-[200px]">
              <div className="hidden lg:block absolute w-full h-px bg-border-industrial top-1/2 -z-10"></div>
              <div className="w-32 h-32 rounded-full border-2 border-primary-container flex items-center justify-center bg-surface-bright shadow-[0_0_20px_rgba(34,197,94,0.15)] relative">
                <span className="material-symbols-outlined text-primary text-5xl animate-spin" style={{ animationDuration: '4s' }}>sync</span>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono-data text-xs whitespace-nowrap bg-surface px-2 border border-border-industrial">
                  PROCESSING_CORE
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 min-w-[300px]">
              <div className="data-card p-4 border-r-4 border-r-primary-container flex items-center justify-between">
                <div>
                  <span className="font-mono-data text-mono-data text-text-muted text-xs block">OUT_A</span>
                  <span className="font-headline-lg-mobile text-lg font-bold">Recyclables</span>
                </div>
                <span className="material-symbols-outlined text-primary-container">recycling</span>
              </div>

              <div className="data-card p-4 border-r-4 border-r-secondary-container flex items-center justify-between">
                <div>
                  <span className="font-mono-data text-mono-data text-text-muted text-xs block">OUT_B</span>
                  <span className="font-headline-lg-mobile text-lg font-bold">Refuse-Derived Fuel (RDF)</span>
                </div>
                <span className="material-symbols-outlined text-secondary-container">local_fire_department</span>
              </div>

              <div className="data-card p-4 border-r-4 border-r-primary flex items-center justify-between">
                <div>
                  <span className="font-mono-data text-mono-data text-text-muted text-xs block">OUT_C</span>
                  <span className="font-headline-lg-mobile text-lg font-bold">Organic Fraction</span>
                </div>
                <span className="material-symbols-outlined text-primary">compost</span>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-border-industrial flex gap-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-primary-container"></div>
              <span className="font-mono-data text-xs uppercase">High Value Recovery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-secondary-container"></div>
              <span className="font-mono-data text-xs uppercase">Energy Potential</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
