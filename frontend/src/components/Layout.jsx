import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

const SECTIONS = [
  { label: 'Home', target: '/', active: true },
  { label: 'About Us', target: '#about' },
  { label: 'Services', target: '#services' },
  { label: 'Mission', target: '#mission' },
  { label: 'How It Works', target: '#how-it-works' },
  { label: 'Impact', target: '#impact' },
  { label: 'Contact', target: '#quote' },
];

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleSectionClick = (e, target) => {
    if (!target.startsWith('#') || target === '#') return;
    closeMenu();
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(target.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Navbar with inverted corners */}
      <nav className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] z-50">
        <div className="relative w-full bg-surface rounded-b-[20px] px-8 py-3.5 flex items-center justify-between">
          
          {/* Left Inverted Corner SVG */}
          <svg className="absolute top-0 -left-[24px] w-[24px] h-[24px] text-surface fill-current" viewBox="0 0 24 24">
            <path d="M0,0 H24 V24 A24,24 0 0,0 0,0 Z" />
          </svg>
          
          {/* Right Inverted Corner SVG */}
          <svg className="absolute top-0 -right-[24px] w-[24px] h-[24px] text-surface fill-current" viewBox="0 0 24 24">
            <path d="M24,0 H0 V24 A24,24 0 0,1 24,0 Z" />
          </svg>

          <Link to="/" className="flex items-center gap-2.5">
            <img alt="WasteChakra" className="h-10 w-auto object-contain" src="/images/logo-aida.png" />
          </Link>
          
          <nav className="hidden lg:flex items-center gap-6 font-semibold text-sm text-[#4a5568]">
            {SECTIONS.map((item) => (
              <div key={item.label} className="relative group flex items-center cursor-pointer">
                {item.target.startsWith('#') && item.target !== '#' ? (
                  <a
                    href={item.target}
                    onClick={(e) => handleSectionClick(e, item.target)}
                    className={`transition-colors hover:text-[#A8E05A] ${item.active ? 'text-[#A8E05A]' : ''}`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.target}
                    className={`transition-colors hover:text-[#A8E05A] ${item.active ? 'text-[#A8E05A]' : ''}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <a
              href="/simulation"
              className="hidden lg:inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full bg-[#A8E05A] text-[#0a3a2a] font-bold text-sm hover:bg-[#96d048] transition-all shadow-sm"
            >
              <span>Simulation</span>
              <span className="w-7 h-7 rounded-full bg-[#82bc33] flex items-center justify-center text-[#0a3a2a]">
                <span className="material-symbols-outlined text-[16px]">north_east</span>
              </span>
            </a>
            <button
              className="lg:hidden text-[#0a3a2a] p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 0' }}>
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-gutter bg-surface-container-lowest/95 backdrop-blur-md border border-surface-container-high rounded-2xl shadow-lg flex flex-col overflow-hidden">
            {SECTIONS.map((item) => (
              item.target.startsWith('#') ? (
                <a
                  key={item.label}
                  href={item.target}
                  onClick={(e) => handleSectionClick(e, item.target)}
                  className="px-6 py-4 border-b border-surface-container font-label-md text-on-surface"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.target}
                  onClick={closeMenu}
                  className="px-6 py-4 border-b border-surface-container font-label-md text-on-surface"
                >
                  {item.label}
                </Link>
              )
            ))}
            <div className="p-6">
              <a
                href="/simulation"
                className="flex items-center justify-center w-full bg-secondary-container text-primary font-label-md font-bold px-6 py-3 rounded-full"
              >
                Simulation
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow flex flex-col items-center w-full">
        <Outlet />
      </main>

      <footer className="w-full bg-forest text-surface pt-space-3xl pb-space-2xl border-t border-surface-container-high/10">
        <div className="w-full max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl pb-space-2xl border-b border-surface-container-high/10">
            {/* Col 1: Brand & Bio */}
            <div className="lg:col-span-2 flex flex-col gap-space-sm">
              <Link to="/" className="flex items-center gap-space-xs">
                <img alt="WasteChakra" className="h-12 w-auto bg-white rounded-lg object-contain" src="/images/logo-aida.png" />
              </Link>
              <p className="font-body-md text-body-md text-primary-fixed-dim max-w-sm mt-2">
                WasteChakra delivers eco-certified waste management, sustainable recycling logistics, and circular disposal solutions for residential complexes, municipalities, and commercial enterprises.
              </p>
              <div className="flex items-center gap-space-xs text-secondary-fixed mt-space-xs">
                <span className="material-symbols-outlined text-[18px]">eco</span>
                <span className="font-label-sm text-label-sm font-semibold">100% Landfill Diversion Target</span>
              </div>
            </div>

            {/* Col 2: Services */}
            <div className="flex flex-col gap-space-xs">
              <h4 className="font-title-md text-title-md font-bold text-surface-bright mb-space-xs">Services</h4>
              <ul className="flex flex-col gap-space-xs font-label-md text-label-md text-primary-fixed-dim">
                <li><a className="hover:text-secondary-fixed transition-colors" href="#services" onClick={(e) => handleSectionClick(e, '#services')}>Residential Pickup</a></li>
                <li><a className="hover:text-secondary-fixed transition-colors" href="#services" onClick={(e) => handleSectionClick(e, '#services')}>Commercial Collection</a></li>
                <li><a className="hover:text-secondary-fixed transition-colors" href="#services" onClick={(e) => handleSectionClick(e, '#services')}>Bulky Junk Cleanouts</a></li>
                <li><a className="hover:text-secondary-fixed transition-colors" href="#services" onClick={(e) => handleSectionClick(e, '#services')}>E-Waste &amp; Electronics</a></li>
                <li><a className="hover:text-secondary-fixed transition-colors" href="#services" onClick={(e) => handleSectionClick(e, '#services')}>Compost &amp; Organics</a></li>
                <li><a className="hover:text-secondary-fixed transition-colors" href="#services" onClick={(e) => handleSectionClick(e, '#services')}>Zero-Waste Audit</a></li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div className="flex flex-col gap-space-xs">
              <h4 className="font-title-md text-title-md font-bold text-surface-bright mb-space-xs">Company</h4>
              <ul className="flex flex-col gap-space-xs font-label-md text-label-md text-primary-fixed-dim">
                <li><a className="hover:text-secondary-fixed transition-colors" href="#about" onClick={(e) => handleSectionClick(e, '#about')}>About Us</a></li>
                <li><a className="hover:text-secondary-fixed transition-colors" href="#mission" onClick={(e) => handleSectionClick(e, '#mission')}>Mission &amp; Vision</a></li>
                <li><a className="hover:text-secondary-fixed transition-colors" href="#how-it-works" onClick={(e) => handleSectionClick(e, '#how-it-works')}>How It Works</a></li>
                <li><a className="hover:text-secondary-fixed transition-colors" href="#impact" onClick={(e) => handleSectionClick(e, '#impact')}>Impact Reports</a></li>
                <li><a className="hover:text-secondary-fixed transition-colors" href="#quote" onClick={(e) => handleSectionClick(e, '#quote')}>Careers at Chakra</a></li>
                <li><Link className="hover:text-secondary-fixed transition-colors" to="/simulation" onClick={closeMenu}>3D Simulator</Link></li>
              </ul>
            </div>

            {/* Col 4: Contact & Hours */}
            <div className="flex flex-col gap-space-xs">
              <h4 className="font-title-md text-title-md font-bold text-surface-bright mb-space-xs">Contact &amp; Help</h4>
              <div className="flex flex-col gap-space-xs font-label-md text-label-md text-primary-fixed-dim">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-secondary-fixed mt-0.5">location_on</span>
                  <span>104 Greenloop Way, Eco District, Metro 94016</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-secondary-fixed">call</span>
                  <span>+1 (800) CHAKRA-ECO</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-secondary-fixed">mail</span>
                  <span>support@wastechakra.org</span>
                </div>
                <div className="flex items-center gap-2 pt-1 text-surface-bright font-bold">
                  <span className="material-symbols-outlined text-[18px] text-secondary-fixed">schedule</span>
                  <span>24/7 On-Demand Dispatch</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <p className="text-primary-fixed-dim font-label-sm text-label-sm text-center sm:text-left">
              © {new Date().getFullYear()} WasteChakra Circular Sustainability Inc. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-space-md text-primary-fixed-dim font-label-sm text-label-sm">
              <a className="hover:text-surface transition-colors" href="#">Privacy Policy</a>
              <a className="hover:text-surface transition-colors" href="#">Terms of Service</a>
              <a className="hover:text-surface transition-colors" href="#">Environmental Compliance</a>
              <a className="hover:text-surface transition-colors" href="#">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}