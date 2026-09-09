import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { dataProvider } from '../../services/dataProvider';
import { StatCard, Card, StatusBadge, Skeleton, EmptyState, ErrorState, formatWeight } from '../../components/ui';
import { Icon } from '../../components/AppIcons';

const ACTIVE_STATUSES = ['REQUESTED', 'CONFIRMED', 'ASSIGNED', 'EN_ROUTE', 'ARRIVED', 'PROCESSING'];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function today() {
  return new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
}

function distanceLabel() {
  return `${(1.2 + Math.random() * 3).toFixed(1)} km away`;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await dataProvider.getPickups();
        if (!mounted) return;
        setPickups(Array.isArray(data) ? data : []);
      } catch (e) {
        if (mounted) setError(e.message || 'Failed to load pickups');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const todayPickups = pickups.filter((p) => !['COMPLETED', 'CANCELLED'].includes(p.status));
  const estTotal = todayPickups.reduce((sum, p) => {
    const m = String(p.estimated_quantity || '').match(/\d+/);
    return sum + (m ? Number(m[0]) : 0);
  }, 0);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-9 w-56" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
        </div>
        <Skeleton className="h-12 rounded-full" />
        <div className="flex flex-col gap-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}</div>
      </div>
    );
  }

  if (error && todayPickups.length === 0) {
    return <ErrorState title="Couldn't load dashboard" message={error} onRetry={() => window.location.reload()} />;
  }

  const firstName = user?.first_name || 'Collector';

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">{greeting()} {firstName} 👋</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">{today()}</p>
      </div>

      <section aria-label="Today's collection summary">
        <h2 className="font-title-md text-title-md text-primary font-bold mb-3">Today's Collection</h2>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Pickups" value={todayPickups.length} icon="local_shipping" />
          <StatCard label="Distance" value="38.5 km" icon="route" />
          <StatCard label="Est. Weight" value={formatWeight(estTotal)} icon="scale" />
        </div>
      </section>

      <button
        onClick={() => navigate('/collector/routes')}
        className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-secondary-container text-primary font-bold py-4 text-base hover:bg-[#bbfb64] transition-colors shadow-lg shadow-secondary-container/40"
      >
        <Icon name="directions" className="" />
        START ROUTE
        <Icon name="chevron_right" className="" />
      </button>

      <section aria-label="Today's pickups">
        <h2 className="font-title-md text-title-md text-primary font-bold mb-3">Your Pickups</h2>
        {todayPickups.length === 0 ? (
          <Card>
            <EmptyState title="No active pickups" message="You're all caught up. New assignments will appear here." icon="task_alt" />
          </Card>
        ) : (
          <ul className="flex flex-col gap-3">
            {todayPickups.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/collector/pickups/${p.id}`}
                  className="block bg-surface-container-lowest border border-surface-container-high rounded-2xl p-4 hover:border-secondary transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-label-md text-label-md text-primary font-bold">{p.pickup_id || `#${p.id}`}</span>
                        <StatusBadge status={p.status} />
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant truncate">{p.address}</p>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-on-surface-variant">
                          <Icon name="delete" className="text-[16px]" />
                          {p.waste_type || 'MIXED'}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container/30 text-primary text-xs font-bold">
                          <Icon name="near_me" className="text-[14px]" />
                          {distanceLabel()}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-on-surface-variant">
                          <Icon name="scale" className="text-[16px]" />
                          {formatWeight(Number(String(p.estimated_quantity).match(/\d+/)?.[0] || 0))}
                        </span>
                      </div>
                    </div>
                    <Icon name="chevron_right" className="text-on-surface-variant shrink-0" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
