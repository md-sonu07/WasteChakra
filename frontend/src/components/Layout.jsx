import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-surface-container-highest">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 w-full max-w-container-max mx-auto">
          <Link to="/" className="font-display-lg text-headline-lg-mobile md:text-headline-md text-primary tracking-tighter flex items-center gap-2">
            <img src="/logo.svg" alt="WasteChakra Logo" className="w-8 h-8 md:w-10 md:h-10" />
            WasteChakra
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link to="/system" className={`font-body-md uppercase tracking-wider transition-colors duration-300 ${isActive('/system') ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}>
              SYSTEM
            </Link>
            <Link to="/process" className={`font-body-md uppercase tracking-wider transition-colors duration-300 ${isActive('/process') ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}>
              PROCESS
            </Link>
            <Link to="/innovation" className={`font-body-md uppercase tracking-wider transition-colors duration-300 ${isActive('/innovation') ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}>
              INNOVATION
            </Link>
            <Link to="/impact" className={`font-body-md uppercase tracking-wider transition-colors duration-300 ${isActive('/impact') ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}>
              IMPACT
            </Link>
            <Link to="/team" className={`font-body-md uppercase tracking-wider transition-colors duration-300 ${isActive('/team') ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}>
              TEAM
            </Link>
          </div>
          <Link to="/simulation" className="hidden md:inline-flex items-center justify-center bg-primary-container text-on-primary-container font-label-caps text-label-caps px-6 py-3 rounded hover:bg-primary hover:text-on-primary transition-colors technical-shadow uppercase">
            Explore Simulation
          </Link>
          <button 
            className="md:hidden text-primary p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-surface-bright/95 backdrop-blur-md border-b border-surface-container-highest flex flex-col shadow-lg animate-[fadeIn_0.2s_ease-out]">
            <Link to="/system" onClick={closeMenu} className={`px-6 py-4 border-b border-surface-container font-body-md uppercase tracking-wider ${isActive('/system') ? 'text-primary bg-primary/5' : 'text-on-surface hover:bg-surface-variant'}`}>
              SYSTEM
            </Link>
            <Link to="/process" onClick={closeMenu} className={`px-6 py-4 border-b border-surface-container font-body-md uppercase tracking-wider ${isActive('/process') ? 'text-primary bg-primary/5' : 'text-on-surface hover:bg-surface-variant'}`}>
              PROCESS
            </Link>
            <Link to="/innovation" onClick={closeMenu} className={`px-6 py-4 border-b border-surface-container font-body-md uppercase tracking-wider ${isActive('/innovation') ? 'text-primary bg-primary/5' : 'text-on-surface hover:bg-surface-variant'}`}>
              INNOVATION
            </Link>
            <Link to="/impact" onClick={closeMenu} className={`px-6 py-4 border-b border-surface-container font-body-md uppercase tracking-wider ${isActive('/impact') ? 'text-primary bg-primary/5' : 'text-on-surface hover:bg-surface-variant'}`}>
              IMPACT
            </Link>
            <Link to="/team" onClick={closeMenu} className={`px-6 py-4 border-b border-surface-container font-body-md uppercase tracking-wider ${isActive('/team') ? 'text-primary bg-primary/5' : 'text-on-surface hover:bg-surface-variant'}`}>
              TEAM
            </Link>
            <Link to="/simulation" onClick={closeMenu} className={`px-6 py-4 border-b border-surface-container font-body-md uppercase tracking-wider ${isActive('/simulation') ? 'text-primary bg-primary/5' : 'text-on-surface hover:bg-surface-variant'}`}>
              SIMULATION
            </Link>
            <div className="p-6">
              <Link to="/system" onClick={closeMenu} className="flex items-center justify-center w-full bg-primary-container text-on-primary-container font-label-caps text-label-caps px-6 py-3 rounded hover:bg-primary hover:text-on-primary transition-colors uppercase">
                EXPLORE SYSTEM
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-[88px] flex flex-col items-center w-full">
        <Outlet />
      </main>

      <footer className="bg-slate-950 text-slate-300 relative border-t border-primary/20 overflow-hidden">
        {/* Animated glowing background orb */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, theme('colors.primary') 1px, transparent 1px), linear-gradient(to bottom, theme('colors.primary') 1px, transparent 1px)", backgroundSize: '30px 30px' }}></div>
        
        <div className="relative z-10 w-full max-w-360 mx-auto px-margin-mobile md:px-margin-desktop pt-24 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-16">
            
            {/* Brand Section */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <Link to="/" className="flex items-center gap-3 mb-6 group w-max">
                  <img src="/logo.svg" alt="WasteChakra Logo" className="w-10 h-10 group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
                  <span className="font-display-lg text-2xl text-white tracking-wider group-hover:text-primary transition-colors duration-300">WASTECHAKRA</span>
                </Link>
                <p className="font-mono-data text-xs leading-relaxed text-slate-400 max-w-sm uppercase tracking-widest border-l-2 border-primary/50 pl-4">
                  Engineered for Absolute Certainty.<br/>
                  Jamia Millia Islamia Affiliated.<br/>
                  Comestro Powered.
                </p>
              </div>
            </div>

            {/* Links Section */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 font-mono-data text-xs uppercase tracking-widest">
              <div className="flex flex-col gap-6">
                <h4 className="text-white font-label-caps mb-2 opacity-50">Architecture</h4>
                <Link to="/system" className="hover:text-primary hover:translate-x-2 transition-all duration-300">System Overview</Link>
                <Link to="/process" className="hover:text-primary hover:translate-x-2 transition-all duration-300">Process Parameters</Link>
                <Link to="/innovation" className="hover:text-primary hover:translate-x-2 transition-all duration-300">Core Innovations</Link>
              </div>
              <div className="flex flex-col gap-6">
                <h4 className="text-white font-label-caps mb-2 opacity-50">Company</h4>
                <Link to="/impact" className="hover:text-primary hover:translate-x-2 transition-all duration-300">Global Impact</Link>
                <Link to="/team" className="hover:text-primary hover:translate-x-2 transition-all duration-300">Our Team</Link>
              </div>
              <div className="flex flex-col gap-6">
                <h4 className="text-white font-label-caps mb-2 opacity-50">Simulation</h4>
                <Link to="/simulation" className="hover:text-primary hover:translate-x-2 transition-all duration-300">Launch Simulator</Link>
                <Link to="/problem" className="hover:text-primary hover:translate-x-2 transition-all duration-300">The Problem</Link>
                <Link to="/final" className="hover:text-primary hover:translate-x-2 transition-all duration-300">Deployment CTA</Link>
              </div>
            </div>
            
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-mono-data text-[10px] text-slate-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              SYS.STATUS: ONLINE
            </div>
            <div>
              © {new Date().getFullYear()} WasteChakra. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
