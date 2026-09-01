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
          <Link to="/system" className="hidden md:inline-flex items-center justify-center bg-primary-container text-on-primary-container font-label-caps text-label-caps px-6 py-3 rounded hover:bg-primary hover:text-on-primary transition-colors technical-shadow uppercase">
            EXPLORE SYSTEM
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

      <footer className="bg-surface-container-lowest text-primary font-mono-data text-mono-data uppercase w-full mt-auto border-t border-surface-container-highest">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-margin-mobile md:px-margin-desktop py-16 w-full max-w-container-max mx-auto">
          <div className="md:col-span-4 flex flex-col justify-between mb-8 md:mb-0">
            <div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mb-4 tracking-widest">WASTECHAKRA</div>
              <p className="font-mono-data text-mono-data uppercase text-text-muted max-w-sm">
                Engineered for Absolute Certainty. Jamia Millia Islamia Affiliated. Comestro Powered.
              </p>
            </div>
            <div className="mt-8 font-mono-data text-mono-data uppercase text-text-muted">
              © 2024 WasteChakra
            </div>
          </div>
          <div className="md:col-span-8 flex flex-col md:flex-row justify-end gap-12">
            <div className="flex flex-col gap-4">
              <Link to="/system" className="text-on-tertiary-fixed-variant hover:text-primary underline underline-offset-4 transition-all">SYSTEM ARCHITECTURE</Link>
              <Link to="/process" className="text-on-tertiary-fixed-variant hover:text-primary underline underline-offset-4 transition-all">PROCESS PARAMETERS</Link>
            </div>
            <div className="flex flex-col gap-4">
              <Link to="#" className="text-on-tertiary-fixed-variant hover:text-primary underline underline-offset-4 transition-all">TECHNICAL SPECS</Link>
              <Link to="#" className="text-on-tertiary-fixed-variant hover:text-primary underline underline-offset-4 transition-all">COMPLIANCE</Link>
              <Link to="#" className="text-on-tertiary-fixed-variant hover:text-primary underline underline-offset-4 transition-all">LEGAL</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
