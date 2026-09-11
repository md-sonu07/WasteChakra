import { useState, useEffect, cloneElement } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Icon } from '../components/AppIcons';

const rolePaths = {
  CITIZEN: '/app',
  COLLECTOR: '/collector',
  BUSINESS: '/business',
  SOCIETY_ADMIN: '/app',
  FACILITY_MANAGER: '/facility',
  ADMIN: '/admin',
  SUPER_ADMIN: '/admin',
};

const HIDDEN_MOBILE = ['/app/report', '/collector/pickups'];

export default function PanelShell({ sidebar, navbar, nav }) {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const basePath = rolePaths[user?.role] || '/app';
  const isMobileShell = nav.some((n) => n.prominent);
  const prominent = nav.find((n) => n.prominent);

  return (
    <div className="min-h-screen bg-surface flex">
      <aside className={`fixed inset-y-0 left-0 w-64 bg-primary text-on-primary z-40 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        {sidebar}
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 bg-surface/90 backdrop-blur border-b border-surface-container-high px-4 md:px-6 py-3 flex items-center justify-between">
          {cloneElement(navbar, { basePath, onOpenSidebar: () => setSidebarOpen(true) })}
        </header>

        {isMobileShell && (
          <nav className="fixed bottom-0 inset-x-0 z-30 bg-surface-container-lowest border-t border-surface-container-high flex lg:hidden pb-[env(safe-area-inset-bottom)]">
            {nav.filter((n) => !HIDDEN_MOBILE.includes(n.to)).slice(0, 4).map((item) => (
              <Link key={item.to} to={item.to} className={`flex-1 flex flex-col items-center py-2.5 text-[10px] font-semibold ${location.pathname === item.to ? 'text-primary' : 'text-on-surface-variant'}`}>
                <Icon name={item.icon} className="text-[22px]" />
                {item.label}
              </Link>
            ))}
            {prominent && (
              <Link to={prominent.to} className="relative flex-1 flex flex-col items-center py-2.5 text-[10px] font-semibold text-primary">
                <span className="absolute -top-4 w-14 h-14 rounded-full bg-secondary-container border-4 border-surface flex items-center justify-center shadow-lg">
                  <Icon name={prominent.icon} className="text-[26px] text-primary" />
                </span>
                <span className="mt-6">{prominent.label}</span>
              </Link>
            )}
          </nav>
        )}

        <main className="flex-1 px-4 md:px-12 py-6 pb-24 lg:pb-6 max-w-[1400px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}