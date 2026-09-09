import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/ui';
import { Icon } from '../components/AppIcons';

export default function ShellNavbar({ basePath, onOpenSidebar }) {
  const { user } = useAuth();

  return (
    <>
      <div className="flex items-center gap-3">
        <button className="lg:hidden p-2 hover:bg-surface-container-low rounded-full" onClick={onOpenSidebar} aria-label="Open menu">
          <Icon name="menu" className="" />
        </button>
        <Link to={basePath} className="font-headline-md text-headline-md text-primary font-bold hidden sm:block">
          {window.location.pathname.split('/')[1]}
        </Link>
      </div>
      <div className="flex items-center gap-3">
        {user?.profile?.chakra_points > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container/40 text-primary text-sm font-bold">
            <Icon name="stars" className="text-[18px] text-secondary" />
            {user.profile.chakra_points.toLocaleString()}
          </div>
        )}
        <Link to="/simulation" className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-surface-container-high text-sm font-semibold text-primary hover:bg-surface-container-high">
          <Icon name="view_in_ar" className="text-[16px] text-secondary" />
          Simulation
        </Link>
        <Link to={basePath} className="flex items-center gap-2">
          {user && <Avatar name={user.first_name || 'User'} size="sm" />}
        </Link>
      </div>
    </>
  );
}