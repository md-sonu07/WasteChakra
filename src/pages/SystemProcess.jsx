import { useState } from 'react';

export default function SystemProcess() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  return (
    <div className="grow w-full max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-margin-desktop">
      {/* Hero Section */}
      <header className="mb-16 max-w-4xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-px bg-primary"></span>
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">System Architecture</span>
        </div>
        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-6 uppercase">
          MEET WASTECHAKRA. <span className="text-text-muted">An adaptive architecture for resource recovery.</span>
        </h1>
        <p className="font-body-md text-body-md text-text-muted max-w-2xl border-l-2 border-primary pl-4">
          A highly calibrated, multi-stage processing environment designed to ingest heterogeneous waste streams and output refined RDF and secondary raw materials. Precision engineering meets sustainable throughput.
        </p>
      </header>

      {/* Central Visualization Area */}
      <section className="relative w-full aspect-square md:aspect-video bg-surface-bright technical-border blueprint-shadow mb-24 overflow-hidden group">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "linear-gradient(to right, theme('colors.border-industrial') 1px, transparent 1px), linear-gradient(to bottom, theme('colors.border-industrial') 1px, transparent 1px)", backgroundSize: '20px 20px' }}></div>
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-primary pointer-events-none"></div>
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary pointer-events-none"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-primary pointer-events-none"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-primary pointer-events-none"></div>

        <div
          className="absolute inset-4 technical-border overflow-hidden bg-surface flex items-center justify-center cursor-pointer"
          onClick={() => setIsImageModalOpen(true)}
        >
          <img className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700 ease-in-out" src="/images/system.png" alt="System Architecture" />

          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center pointer-events-none">
            <span className="material-symbols-outlined text-transparent group-hover:text-primary transition-colors text-6xl drop-shadow-md">zoom_in</span>
          </div>
        </div>

        <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-surface-bright/90 backdrop-blur technical-border p-3 md:p-4 z-10 w-36 md:w-48 shadow-sm">
          <div className="font-mono-data text-[10px] md:text-label-caps text-text-muted mb-1">SYSTEM STATUS</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span className="font-body-md text-sm md:text-body-md text-primary font-medium">OPTIMAL</span>
          </div>
          <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border-industrial">
            <div className="font-mono-data text-[10px] md:text-label-caps text-text-muted mb-1">FLOW RATE</div>
            <div className="font-headline-lg text-lg md:text-headline-lg-mobile text-on-surface leading-tight">NOMINAL</div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-surface-bright/90 backdrop-blur technical-border p-2 md:p-3 z-10 flex gap-3 md:gap-4 shadow-sm scale-90 origin-bottom-left md:scale-100 md:origin-center">
          <div>
            <div className="font-mono-data text-[10px] md:text-label-caps text-text-muted">EFFICIENCY</div>
            <div className="font-body-md text-sm md:text-body-md text-on-surface font-medium">OPTIMIZED</div>
          </div>
          <div className="w-px bg-border-industrial"></div>
          <div>
            <div className="font-mono-data text-[10px] md:text-label-caps text-text-muted">ENERGY</div>
            <div className="font-body-md text-sm md:text-body-md text-on-surface font-medium">BALANCED</div>
          </div>
        </div>
      </section>

      {/* Process Modules Grid */}
      <section>
        <div className="flex items-end justify-between mb-8 border-b border-border-industrial pb-4">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">PROCESS MODULES</h2>
          <span className="font-mono-data text-mono-data text-text-muted hidden md:inline-block">SEQ_01 {'>'} SEQ_08</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-border-industrial">
          {/* SEQ 01 */}
          <div className="bg-surface-bright border-b border-r border-border-industrial p-6 hover:bg-surface transition-colors cursor-pointer group relative">
            <div className="absolute top-2 right-2 font-mono-data text-label-caps text-text-muted">SEQ: 01</div>
            <div className="w-10 h-10 rounded-full border border-border-industrial flex items-center justify-center mb-4 group-hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>input</span>
            </div>
            <h3 className="font-body-md text-body-md font-semibold text-on-surface mb-2">Heterogeneous MSW</h3>
            <p className="font-mono-data text-mono-data text-text-muted line-clamp-3">Primary intake of variable, unpredictable municipal solid waste streams.</p>
          </div>

          {/* SEQ 02 */}
          <div className="bg-surface-bright border-b border-r border-border-industrial p-6 hover:bg-surface transition-colors cursor-pointer group relative">
            <div className="absolute top-2 right-2 font-mono-data text-label-caps text-text-muted">SEQ: 02</div>
            <div className="w-10 h-10 rounded-full border border-border-industrial flex items-center justify-center mb-4 group-hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>layers</span>
            </div>
            <h3 className="font-body-md text-body-md font-semibold text-on-surface mb-2">Pre-processing</h3>
            <p className="font-mono-data text-mono-data text-text-muted line-clamp-3">Initial screening and bag opening to expose materials for subsequent sorting.</p>
          </div>

          {/* SEQ 03 */}
          <div className="bg-surface-bright border-b border-r border-border-industrial p-6 hover:bg-surface transition-colors cursor-pointer group relative">
            <div className="absolute top-2 right-2 font-mono-data text-label-caps text-text-muted">SEQ: 03</div>
            <div className="w-10 h-10 rounded-full border border-border-industrial flex items-center justify-center mb-4 group-hover:border-secondary-container transition-colors">
              <span className="material-symbols-outlined text-text-muted group-hover:text-secondary-container transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>recycling</span>
            </div>
            <h3 className="font-body-md text-body-md font-semibold text-on-surface mb-2">Material Recovery</h3>
            <p className="font-mono-data text-mono-data text-text-muted line-clamp-3">Extraction of valuable recyclables such as ferrous and non-ferrous metals using magnetic and eddy current systems.</p>
          </div>

          {/* SEQ 04 */}
          <div className="bg-surface-bright border-b border-r border-border-industrial p-6 hover:bg-surface transition-colors cursor-pointer group relative">
            <div className="absolute top-2 right-2 font-mono-data text-label-caps text-text-muted">SEQ: 04</div>
            <div className="w-10 h-10 rounded-full border border-border-industrial flex items-center justify-center mb-4 group-hover:border-secondary-container transition-colors">
              <span className="material-symbols-outlined text-text-muted group-hover:text-secondary-container transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>air</span>
            </div>
            <h3 className="font-body-md text-body-md font-semibold text-on-surface mb-2">Contaminant Removal</h3>
            <p className="font-mono-data text-mono-data text-text-muted line-clamp-3">Ballistic separation and optical sorting to remove inert materials and non-combustibles from the core flow.</p>
          </div>

          {/* SEQ 05 */}
          <div className="bg-surface-bright border-b border-r border-border-industrial p-6 hover:bg-surface transition-colors cursor-pointer group relative">
            <div className="absolute top-2 right-2 font-mono-data text-label-caps text-text-muted">SEQ: 05</div>
            <div className="w-10 h-10 rounded-full border border-border-industrial flex items-center justify-center mb-4 group-hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>local_fire_department</span>
            </div>
            <h3 className="font-body-md text-body-md font-semibold text-on-surface mb-2">Combustible Recovery</h3>
            <p className="font-mono-data text-mono-data text-text-muted line-clamp-3">Aggregating high-calorific fractions (plastics, paper, wood) targeted for energy conversion.</p>
          </div>

          {/* SEQ 06 */}
          <div className="bg-surface-bright border-b border-r border-border-industrial p-6 hover:bg-surface transition-colors cursor-pointer group relative">
            <div className="absolute top-2 right-2 font-mono-data text-label-caps text-text-muted">SEQ: 06</div>
            <div className="w-10 h-10 rounded-full border border-border-industrial flex items-center justify-center mb-4 group-hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>water_drop</span>
            </div>
            <h3 className="font-body-md text-body-md font-semibold text-on-surface mb-2">Moisture Conditioning</h3>
            <p className="font-mono-data text-mono-data text-text-muted line-clamp-3">Controlled thermal drying to stabilize moisture content and ensure predictable calorific value.</p>
          </div>

          {/* SEQ 07 */}
          <div className="bg-surface-bright border-b border-r border-border-industrial p-6 hover:bg-surface transition-colors cursor-pointer group relative">
            <div className="absolute top-2 right-2 font-mono-data text-label-caps text-text-muted">SEQ: 07</div>
            <div className="w-10 h-10 rounded-full border border-border-industrial flex items-center justify-center mb-4 group-hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>content_cut</span>
            </div>
            <h3 className="font-body-md text-body-md font-semibold text-on-surface mb-2">Size Reduction & Homogenization</h3>
            <p className="font-mono-data text-mono-data text-text-muted line-clamp-3">Fine shredding to achieve uniform particle size distribution for efficient combustion.</p>
          </div>

          {/* SEQ 08 */}
          <div className="bg-surface-bright border-b border-r border-border-industrial p-6 hover:bg-surface transition-colors cursor-pointer group relative">
            <div className="absolute top-2 right-2 font-mono-data text-label-caps text-text-muted">SEQ: 08</div>
            <div className="w-10 h-10 rounded-full border border-border-industrial flex items-center justify-center mb-4 group-hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>check_circle</span>
            </div>
            <h3 className="font-body-md text-body-md font-semibold text-on-surface mb-2">Quality-Controlled RDF</h3>
            <p className="font-mono-data text-mono-data text-text-muted line-clamp-3">Final aggregation and pelletization into stable, predictable Refuse-Derived Fuel resources.</p>
          </div>
        </div>
      </section>
      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="relative max-w-7xl w-full h-full max-h-[90vh] bg-surface technical-border p-2">
            <button
              className="absolute -top-4 -right-4 bg-primary text-white w-10 h-10 flex items-center justify-center technical-border hover:bg-primary-container transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setIsImageModalOpen(false);
              }}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <img 
              src="/images/system.png" 
              alt="System Architecture Full View" 
              className="w-full h-full object-contain" 
            />
          </div>
        </div>
      )}
    </div>
  );
}
