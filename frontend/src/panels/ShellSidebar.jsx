import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Icon } from '../components/AppIcons';

export default function ShellSidebar({ items }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 flex items-center gap-3 border-b border-white/10">
        <img alt="WasteChakra" className="h-12 w-full object-contain bg-white rounded-lg " src="/images/logo-aida.png" />
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${location.pathname === item.to ? 'bg-white/15 text-secondary-fixed' : 'text-primary-fixed-dim hover:bg-white/10 hover:text-surface-bright'}`}
          >
            <Icon name={item.icon} className="text-[20px]" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="flex items-center gap-3 px-4 py-2.5 w-full text-left rounded-xl text-sm font-semibold text-primary-fixed-dim hover:bg-white/10 transition-colors"
        >
          <Icon name="logout" className="text-[20px]" />
          Sign out
        </button>
      </div>
    </div>
  );
}