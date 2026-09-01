export default function Impact() {
  return (
    <div className="grow w-full max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-margin-desktop">
      {/* Hero Section */}
      <section className="mb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-border-industrial bg-surface-bright">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
          <span className="font-label-caps text-label-caps text-text-muted uppercase tracking-widest">Deployment Status: Global Scaling</span>
        </div>
        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-6 uppercase">
          DESIGNED FOR <span className="text-primary">REAL CITIES.</span>
        </h1>
        <p className="font-body-md text-body-md text-text-muted max-w-2xl border-l-2 border-primary pl-6">
          Deployable, scalable nodes processing heterogeneous municipal waste at the source. 
          By decentralizing processing technologies, we drastically reduce logistics dependencies, 
          cut carbon emissions, and guarantee high-yield, quality-controlled resource outputs.
        </p>
      </section>

      {/* Deployment Map & Core Stats */}
      <section className="mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter relative">
          {/* Map Visual */}
          <div className="lg:col-span-8 bg-surface-bright border border-border-industrial rounded relative overflow-hidden h-125 lg:h-150 group">
            <div className="absolute top-4 right-4 z-10 font-mono-data text-mono-data text-text-muted bg-surface/90 backdrop-blur px-2 py-1 border border-border-industrial rounded">
              NODE-MAP-01
            </div>
            {/* Using a high-quality global network visualization */}
            <div className="w-full h-full bg-cover bg-center opacity-90 group-hover:scale-105 transition-transform duration-700" 
                 style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1440&auto=format&fit=crop')" }}>
            </div>
            
            {/* Overlay grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20" 
                 style={{ backgroundImage: "linear-gradient(theme('colors.on-surface') 1px, transparent 1px), linear-gradient(90deg, theme('colors.on-surface') 1px, transparent 1px)", backgroundSize: '40px 40px' }}>
            </div>
          </div>
          
          {/* Stat Stack */}
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            <div className="bg-surface-bright border border-border-industrial p-8 flex flex-col justify-between h-full group hover:border-primary transition-colors">
              <div className="flex justify-between items-start mb-8">
                <span className="material-symbols-outlined text-primary text-3xl">delete_sweep</span>
                <span className="font-mono-data text-mono-data text-text-muted">STAT-01</span>
              </div>
              <div>
                <div className="font-headline-lg text-headline-lg text-on-surface mb-2 group-hover:text-primary transition-colors">SCALE</div>
                <div className="font-label-caps text-label-caps text-text-muted uppercase mb-4">Tonnes Processed Daily</div>
                <p className="font-mono-data text-xs text-text-muted">Handling immense volumes of unpredictable urban waste through continuous adaptive processing.</p>
              </div>
            </div>
            
            <div className="bg-surface-bright border border-border-industrial p-8 flex flex-col justify-between h-full group hover:border-primary-container transition-colors">
              <div className="flex justify-between items-start mb-8">
                <span className="material-symbols-outlined text-primary-container text-3xl">bolt</span>
                <span className="font-mono-data text-mono-data text-text-muted">STAT-02</span>
              </div>
              <div>
                <div className="font-headline-lg text-headline-lg text-on-surface mb-2 group-hover:text-primary-container transition-colors">MAX YIELD</div>
                <div className="font-label-caps text-label-caps text-text-muted uppercase mb-4">Predictable Energy Output</div>
                <p className="font-mono-data text-xs text-text-muted">Producing highly homogenous, quality-controlled RDF ready for thermal conversion.</p>
              </div>
            </div>
            
            <div className="bg-surface-bright border border-border-industrial p-8 flex flex-col justify-between h-full group hover:border-secondary-container transition-colors">
              <div className="flex justify-between items-start mb-8">
                <span className="material-symbols-outlined text-secondary-container text-3xl">co2</span>
                <span className="font-mono-data text-mono-data text-text-muted">STAT-03</span>
              </div>
              <div>
                <div className="font-headline-lg text-headline-lg text-on-surface mb-2 group-hover:text-secondary-container transition-colors">REDUCTION</div>
                <div className="font-label-caps text-label-caps text-text-muted uppercase mb-4">Carbon Footprint Minimization</div>
                <p className="font-mono-data text-xs text-text-muted">Slashing logistical dependencies by recovering resources directly at the generation source.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Efficiency */}
      <section className="mb-24">
        <div className="border-t border-border-industrial pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6 uppercase">
                Operational Supremacy
              </h2>
              <p className="font-body-md text-text-muted mb-6">
                Standard waste management relies on massive, centralized sorting facilities that struggle with the chaotic nature of MSW. Our decentralized processing architecture fundamentally changes this paradigm.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                  <span className="font-body-md text-on-surface-variant">Eliminates heavy transport logistics to distant landfills.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                  <span className="font-body-md text-on-surface-variant">Recovers valuable recyclables before they are contaminated.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                  <span className="font-body-md text-on-surface-variant">Produces a predictable, commodity-grade energy resource.</span>
                </li>
              </ul>
            </div>
            <div className="bg-surface border border-border-industrial p-8 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border-industrial">
                <div className="w-16 h-16 bg-surface-bright flex items-center justify-center border border-border-industrial text-primary">
                  <span className="material-symbols-outlined text-3xl">recycling</span>
                </div>
                <div>
                  <div className="font-label-caps text-label-caps text-on-surface">RESOURCE RECOVERY</div>
                  <div className="font-mono-data text-xs text-text-muted mt-1">Maximized diversion from landfill</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-surface-bright flex items-center justify-center border border-border-industrial text-primary-container">
                  <span className="material-symbols-outlined text-3xl">account_balance</span>
                </div>
                <div>
                  <div className="font-label-caps text-label-caps text-on-surface">ECONOMIC VIABILITY</div>
                  <div className="font-mono-data text-xs text-text-muted mt-1">Turning waste liabilities into revenue</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
