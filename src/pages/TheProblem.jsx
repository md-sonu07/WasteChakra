export default function TheProblem() {
  return (
    <div className="grow w-full max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-margin-desktop">
      {/* Header Section */}
      <header className="mb-16">
        <div className="inline-flex items-center space-x-2 border border-border-industrial bg-surface-bright px-3 py-1 mb-6">
          <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">PROBLEM STATEMENT // ID-8492</span>
        </div>
        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-6 uppercase md:w-3/4">THE WASTE STREAM WON'T STAY THE SAME.</h1>
        <p className="font-body-md text-body-md text-text-muted md:w-1/2 md:text-lg">Variable and heterogeneous urban MSW makes reliable resource recovery and consistent RDF production difficult.</p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-24">
        {/* Main Visual Card (Spans 8 cols) */}
        <div className="md:col-span-8 bg-surface-bright industrial-border relative overflow-hidden technical-shadow h-64 md:h-125">
          <div className="absolute top-4 right-4 font-label-caps text-label-caps text-text-muted z-10 bg-surface-bright/80 px-2 py-1 border border-border-industrial backdrop-blur-sm">VISUALIZATION-A1</div>
          <div className="absolute inset-0 w-full h-full">
            <img className="object-cover w-full h-full opacity-90 mix-blend-multiply" src="/images/problem.jpg" alt="Waste Visualization" />
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(theme('colors.primary') 1px, transparent 1px), linear-gradient(90deg, theme('colors.primary') 1px, transparent 1px)", backgroundSize: '100px 100px', opacity: 0.05 }}></div>
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary m-4"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary m-4"></div>
        </div>

        {/* Side Cards (Span 4 cols) */}
        <div className="md:col-span-4 flex flex-col gap-gutter">
          {/* Variability Index Card */}
          <div className="flex-1 bg-surface-bright industrial-border p-6 technical-shadow relative">
            <div className="absolute top-4 right-4 font-label-caps text-label-caps text-text-muted">INDEX-V1</div>
            <h3 className="font-label-caps text-label-caps text-on-surface mb-6 uppercase border-b border-border-industrial pb-2">VARIABILITY INDEX</h3>
            
            <div className="flex items-end justify-between mb-2">
              <span className="font-display-lg text-headline-lg text-on-surface">87.4<span className="text-text-muted text-xl">%</span></span>
              <span className="inline-flex items-center space-x-1 text-secondary-container pulse-amber bg-secondary-fixed/20 px-2 py-1 border border-secondary-container/50">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                <span className="font-mono-data text-xs font-bold">HIGH FLUCTUATION</span>
              </span>
            </div>
            
            <div className="w-full h-2 bg-surface-container-highest mt-4 relative border border-border-industrial">
              <div className="absolute top-0 left-0 h-full bg-secondary-container w-[87%]"></div>
              <div className="absolute inset-0 flex justify-between pointer-events-none px-1">
                <div className="w-px h-full bg-surface-bright/50"></div>
                <div className="w-px h-full bg-surface-bright/50"></div>
                <div className="w-px h-full bg-surface-bright/50"></div>
                <div className="w-px h-full bg-surface-bright/50"></div>
                <div className="w-px h-full bg-surface-bright/50"></div>
              </div>
            </div>
            
            <ul className="mt-6 space-y-3 font-mono-data text-mono-data text-text-muted text-sm border-t border-border-industrial pt-4">
              <li className="flex justify-between border-b border-surface-container-highest pb-1 hover:bg-surface transition-colors">
                <span>PLASTICS MIX</span>
                <span className="text-on-surface font-medium">± 42%</span>
              </li>
              <li className="flex justify-between border-b border-surface-container-highest pb-1 hover:bg-surface transition-colors">
                <span>ORGANIC MOISTURE</span>
                <span className="text-secondary-container font-medium">± 65%</span>
              </li>
              <li className="flex justify-between pb-1 hover:bg-surface transition-colors">
                <span>FIBER DENSITY</span>
                <span className="text-on-surface font-medium">± 28%</span>
              </li>
            </ul>
          </div>

          {/* Separation Loss Card */}
          <div className="bg-surface-bright industrial-border p-6 technical-shadow">
            <h3 className="font-label-caps text-label-caps text-on-surface mb-4 uppercase border-b border-border-industrial pb-2">MATERIAL LOSS RATE</h3>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full border-4 border-error-container border-t-error flex items-center justify-center transform -rotate-45">
                <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>delete_sweep</span>
              </div>
              <div>
                <div className="font-mono-data text-mono-data text-text-muted uppercase text-xs mb-1">CURRENT INEFFICIENCY</div>
                <div className="font-headline-lg text-headline-lg-mobile text-error">22.5%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
