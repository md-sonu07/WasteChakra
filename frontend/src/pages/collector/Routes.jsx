import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collectorApi } from '../../services/collectorApi';
import { Card, StatusBadge, Skeleton, EmptyState, ErrorState } from '../../components/ui';
import { Icon } from '../../components/AppIcons';

function mapsUrl(p) {
  if (p.latitude && p.longitude) {
    return `https://maps.google.com/?q=${p.latitude},${p.longitude}`;
  }
  return `https://maps.google.com/?q=${encodeURIComponent(p.address || 'India')}`;
}

export default function Routes() {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await collectorApi.getAssignedPickups();
        if (!mounted) return;
        const resList = Array.isArray(data) ? data : data.results || [];
        const ordered = resList.slice().sort((a, b) => (a.status === 'EN_ROUTE' ? -1 : 1));
        setPickups(ordered);
      } catch (e) {
        if (mounted) setError(e.message || 'Failed to load route');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const move = (index, dir) => {
    setPickups((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const markComplete = async (p) => {
    try {
      await collectorApi.updatePickupStatus(p.id, { status: 'COLLECTED' });
    } catch (err) {
      console.error('Status update error:', err);
    }
    setPickups((prev) => {
      const i = prev.findIndex((x) => x.id === p.id);
      if (i === -1) return prev;
      const next = [...prev];
      next[i] = { ...next[i], status: 'COLLECTED' };
      return next;
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-56 rounded-2xl" />
        <div className="flex flex-col gap-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-32 rounded-2xl" />)}</div>
      </div>
    );
  }

  if (error && pickups.length === 0) {
    return <ErrorState title="Couldn't load route" message={error} onRetry={() => window.location.reload()} />;
  }

  const active = pickups.filter((p) => !['COMPLETED', 'CANCELLED'].includes(p.status));
  const stopCoords = active.slice(0, 6);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Today's Route</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">{active.length} stops · Plan your optimal path</p>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-surface-container-high flex items-center gap-2">
          <Icon name="map" className="text-secondary" />
          <h2 className="font-title-md text-title-md text-primary font-bold">Route Map Preview</h2>
        </div>
        <div className="relative bg-gradient-to-b from-secondary-container/15 to-secondary-container/25 h-48 overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(13,42,26,0.05) 24px), repeating-linear-gradient(90deg, transparent, transparent 23px, rgba(13,42,26,0.05) 24px)' }} />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden="true">
            {stopCoords.length > 1 && (
              <polyline
                points={stopCoords.map((_, i) => `${40 + i * 40},${150 - (i % 2 === 0 ? 60 : 100)}`).join(' ')}
                fill="none"
                stroke="rgba(13,42,26,0.35)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="6 6"
              />
            )}
          </svg>
          {stopCoords.map((p, i) => (
            <span
              key={p.id}
              className="absolute w-7 h-7 rounded-full bg-secondary-container border-2 border-forest text-primary text-xs font-bold flex items-center justify-center shadow-md"
              style={{ left: `${10 + i * 16}%`, top: `${i % 2 === 0 ? 22 : 46}%` }}
              aria-label={`Stop ${i + 1}`}
            >
              {i + 1}
            </span>
          ))}
        </div>
        <div className="p-4 flex items-center justify-between text-xs font-semibold text-on-surface-variant">
          <span className="inline-flex items-center gap-1"><Icon name="directions_car" className="text-[16px] text-secondary" /> Starting point</span>
          <span>{stopCoords.length} stops</span>
        </div>
      </Card>

      <section aria-label="Pickup order">
        <h2 className="font-title-md text-title-md text-primary font-bold mb-3">Pickup Order</h2>
        {active.length === 0 ? (
          <Card>
            <EmptyState title="Route is clear" message="No active pickups scheduled for today." icon="route" />
          </Card>
        ) : (
          <ol className="flex flex-col gap-3">
            {active.map((p, i) => (
              <li key={p.id}>
                <Card className="flex items-start gap-3 p-4">
                  <div className="w-9 h-9 rounded-full bg-secondary-container text-primary font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-label-md text-label-md text-primary font-bold">Pickup {i + 1}</span>
                      <StatusBadge status={p.status} />
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant">{p.address}</p>
                    <p className="text-xs font-semibold text-on-surface-variant mt-1 inline-flex items-center gap-1">
                      <Icon name="near_me" className="text-[14px]" />{p.latitude && p.longitude ? `${p.latitude.toFixed(2)}, ${p.longitude.toFixed(2)}` : 'On route list'}
                    </p>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <a
                        href={mapsUrl(p)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container text-primary text-xs font-bold hover:bg-[#bbfb64] transition-colors"
                      >
                        <Icon name="map" className="text-[16px]" /> Navigate
                      </a>
                      <Link
                        to={`/collector/pickups/${p.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-surface-container-highest text-primary text-xs font-bold hover:bg-surface-container-low transition-colors"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => markComplete(p)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-surface-container-highest text-on-surface-variant text-xs font-bold hover:bg-surface-container-low transition-colors"
                        aria-label={`Mark pickup ${p.pickup_id} complete`}
                      >
                        <Icon name="task_alt" className="text-[16px]" /> Mark Complete
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      className="w-8 h-8 rounded-full border border-surface-container-highest text-primary flex items-center justify-center hover:bg-surface-container-low disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label={`Move pickup ${p.pickup_id} up`}
                    >
                      <Icon name="expand_less" className="text-[18px]" />
                    </button>
                    <button
                      onClick={() => move(i, 1)}
                      disabled={i === active.length - 1}
                      className="w-8 h-8 rounded-full border border-surface-container-highest text-primary flex items-center justify-center hover:bg-surface-container-low disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label={`Move pickup ${p.pickup_id} down`}
                    >
                      <Icon name="expand_more" className="text-[18px]" />
                    </button>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
