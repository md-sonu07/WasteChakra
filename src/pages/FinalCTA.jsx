import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <div className="flex-grow flex items-center justify-center w-full min-h-[calc(100vh-88px)] bg-surface relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(theme('colors.border-industrial') 1px, transparent 1px), linear-gradient(90deg, theme('colors.border-industrial') 1px, transparent 1px)", backgroundSize: '40px 40px', opacity: 0.5 }}></div>

      <div className="w-full max-w-[1440px] px-margin-mobile md:px-margin-desktop py-24 relative z-10 flex flex-col items-center justify-center">
        {/* Core Content Box */}
        <div className="bg-surface-bright border-2 border-primary w-full max-w-4xl p-8 md:p-16 relative shadow-[0_0_40px_rgba(34,197,94,0.1)]">
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary"></div>
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-4 border border-border-industrial font-mono-data text-xs text-text-muted">
            SYSTEM_READY // INITIATE_DEPLOYMENT
          </div>

          <div className="text-center">
            <h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-6 uppercase tracking-tight">
              STOP MANAGING WASTE. <br/>
              <span className="text-primary">START ENGINEERING IT.</span>
            </h2>
            <p className="font-body-md text-text-muted mb-12 max-w-2xl mx-auto text-lg">
              The Adaptive Architecture is ready for integration. Standardize your outputs, achieve compliance certainty, and eliminate chaotic processing variables.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/contact" className="group relative inline-flex items-center justify-center bg-primary-container text-on-primary-container font-label-caps px-8 py-5 text-sm transition-all hover:bg-primary hover:text-white border border-primary overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  REQUEST TECHNICAL SPECIFICATIONS
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat group-hover:animate-[shimmer_1.5s_infinite]"></div>
              </Link>
              <Link to="/demo" className="inline-flex items-center justify-center font-label-caps text-on-surface bg-surface-container hover:bg-surface-container-high border border-border-industrial px-8 py-5 text-sm transition-colors">
                VIEW VIRTUAL DEMO
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Data Points */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl mt-16 border-t border-border-industrial pt-8">
          <div className="text-center md:text-left border-r border-border-industrial border-opacity-0 md:border-opacity-100 last:border-r-0">
            <div className="font-mono-data text-[10px] text-text-muted uppercase mb-1">Architecture</div>
            <div className="font-headline-lg-mobile text-on-surface">MODULAR</div>
          </div>
          <div className="text-center md:text-left border-r border-border-industrial border-opacity-0 md:border-opacity-100 last:border-r-0">
            <div className="font-mono-data text-[10px] text-text-muted uppercase mb-1">Processing</div>
            <div className="font-headline-lg-mobile text-on-surface">ADAPTIVE</div>
          </div>
          <div className="text-center md:text-left border-r border-border-industrial border-opacity-0 md:border-opacity-100 last:border-r-0">
            <div className="font-mono-data text-[10px] text-text-muted uppercase mb-1">Outputs</div>
            <div className="font-headline-lg-mobile text-on-surface">HOMOGENEOUS</div>
          </div>
          <div className="text-center md:text-left">
            <div className="font-mono-data text-[10px] text-text-muted uppercase mb-1">RDF Quality</div>
            <div className="font-headline-lg-mobile text-on-surface">PREDICTABLE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
