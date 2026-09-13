import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Icon } from '../components/AppIcons';

export default function ShellSidebar({ items }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="flex flex-col h-full">
      {/* Brand Header with Home Link */}
      <div className="p-3 border-b border-white/10 flex flex-col gap-2">
        <Link to="/" title="Back to WasteChakra Home" className="block w-full group">
          <img
            alt="WasteChakra"
            className="h-11 w-full object-contain bg-white rounded-xl p-1 group-hover:scale-[1.01] transition-transform duration-200 shadow-xs cursor-pointer"
            src="/images/logo-aida.png"
          />
        </Link>
        <Link
          to="/"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl text-xs font-bold text-surface-bright bg-white/10 hover:bg-white/20 border border-white/10 hover:border-[#abf854]/40 transition-all group shadow-2xs cursor-pointer"
          title="Return to public homepage"
        >
          <Icon name="arrow_back" className="text-sm text-[#abf854] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              location.pathname === item.to
                ? 'bg-white/15 text-secondary-fixed'
                : 'text-primary-fixed-dim hover:bg-white/10 hover:text-surface-bright'
            }`}
          >
            <Icon name={item.icon} className="text-[20px]" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2.5 w-full text-left rounded-xl text-sm font-semibold text-primary-fixed-dim hover:bg-white/10 hover:text-surface-bright transition-colors cursor-pointer"
        >
          <Icon name="home" className="text-[20px] text-[#abf854]" />
          <span>Main Website</span>
        </Link>
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="flex items-center gap-3 px-4 py-2.5 w-full text-left rounded-xl text-sm font-semibold text-primary-fixed-dim hover:bg-white/10 hover:text-red-300 transition-colors cursor-pointer"
        >
          <Icon name="logout" className="text-[20px]" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}