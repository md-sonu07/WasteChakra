import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dataProvider } from '../../services/dataProvider';
import { StatCard, Card, StatusBadge, Skeleton, EmptyState, ErrorState, formatWeight } from '../../components/ui';
import { Icon } from '../../components/AppIcons';

export default function Dashboard() {
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
        if (mounted) setError(e.message || 'Failed to load dashboard');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-9 w-56" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
        </div>
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (error && pickups.length === 0) {
    return <ErrorState title="Couldn't load dashboard" message={error} onRetry={() => window.location.reload()} />;
  }

  const recent = pickups.slice(0, 6);
  const totalCollected = pickups.reduce((s, p) => s + (Number(p.actual_weight_kg) || 0), 0);

  const quickActions = [
    { label: 'Schedule Pickup', to: '/business/pickups', icon: 'local_shipping' },
    { label: 'Download Reports', to: '/business/analytics', icon: 'download' },
    { label: 'View Impact', to: '/business/certificates', icon: 'monitoring' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Business Dashboard</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Welcome back · here's your waste program</p>
      </div>

      <section aria-label="Waste summary">
        <h2 className="font-title-md text-title-md text-primary font-bold mb-3">Waste Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Total Waste" value="4.8 t" icon="delete" />
          <StatCard label="Recovered" value="3.7 t" icon="recycling" tone="dark" />
          <StatCard label="Recycled" value="2.1 t" icon="eco" />
          <StatCard label="RDF" value="1.2 t" icon="local_fire_department" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
          <StatCard label="Organic" value="0.9 t" icon="yard" />
          <StatCard label="Pickup Frequency" value="Weekly" icon="event_repeat" tone="accented" />
        </div>
      </section>

      <section aria-label="Quick actions">
        <h2 className="font-title-md text-title-md text-primary font-bold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              to={a.to}
              className="flex items-center gap-3 bg-surface-container-lowest border border-surface-container-high rounded-2xl p-4 hover:border-secondary transition-colors"
            >
              <span className="w-10 h-10 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0">
                <Icon name={a.icon} className="" />
              </span>
              <span className="font-label-md text-label-md text-primary font-bold">{a.label}</span>
              <Icon name="chevron_right" className="text-on-surface-variant ml-auto" />
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="Recent pickups">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-title-md text-title-md text-primary font-bold">Recent Pickups</h2>
          <Link to="/business/pickups" className="text-sm font-bold text-secondary hover:text-primary">View all</Link>
        </div>
        {recent.length === 0 ? (
          <Card>
            <EmptyState title="No pickups yet" message="Schedule your first pickup to get started." icon="local_shipping" action={
              <Link to="/business/pickups" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container text-primary font-bold text-sm">Schedule Pickup</Link>
            } />
          </Card>
        ) : (
          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-on-surface-variant border-b border-surface-container-high">
                    <th className="px-4 py-3 font-bold">Pickup</th>
                    <th className="px-4 py-3 font-bold">Date</th>
                    <th className="px-4 py-3 font-bold">Type</th>
                    <th className="px-4 py-3 font-bold">Est.</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((p) => (
                    <tr key={p.id} className="border-b border-surface-container-high last:border-0 hover:bg-surface-container-low">
                      <td className="px-4 py-3 font-bold text-primary">{p.pickup_id || `#${p.id}`}</td>
                      <td className="px-4 py-3 text-on-surface-variant">{p.pickup_date || '—'}</td>
                      <td className="px-4 py-3 text-on-surface-variant">{p.waste_type}</td>
                      <td className="px-4 py-3 text-on-surface-variant">{formatWeight(Number(String(p.estimated_quantity).match(/\d+/)?.[0] || 0))}</td>
                      <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-4 py-3 text-xs font-semibold text-on-surface-variant border-t border-surface-container-high">Collected to date: {formatWeight(totalCollected)}</p>
          </Card>
        )}
      </section>
    </div>
  );
}
