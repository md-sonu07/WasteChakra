import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { dataProvider } from '../../services/dataProvider';
import { Card, StatCard, StatusBadge, Skeleton, ErrorState, EmptyState, formatWeight, formatDate, TimeAgo } from '../../components/ui';
import { Icon } from '../../components/AppIcons';

export default function CitizenDashboard() {
  const { user } = useAuth();
  const [pickups, setPickups] = useState([]);
  const [impact, setImpact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [pickupData, impactData] = await Promise.all([
        dataProvider.getPickups(),
        dataProvider.getImpact(),
      ]);
      setPickups(pickupData);
      setImpact(impactData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const firstName = user?.first_name || 'there';
  const points = user?.profile?.chakra_points || impact?.chakra_points || 0;
  const recentPickup = pickups.length > 0 ? pickups[0] : null;

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
        <Skeleton className="h-40" />
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchData} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline-md text-headline-md text-primary font-bold">Hello, {firstName} 👋</h1>

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Chakra Points"
          value={points.toLocaleString()}
          sub="Loyalty balance"
          icon={<Icon name="stars" className="" />}
          tone="accented"
        />
        <StatCard
          label="Waste Recovered"
          value={formatWeight(impact?.waste_recovered_kg)}
          sub="Total recovered"
          icon={<Icon name="recycling" className="" />}
          tone="dark"
        />
        <StatCard
          label="Waste Recycled"
          value={formatWeight(impact?.waste_recovered_kg ? impact.waste_recovered_kg * 0.68 : 0)}
          sub="Recyclable fraction"
          icon={<Icon name="autorenew" className="" />}
        />
        <StatCard
          label="Impact Score"
          value={Math.round(points / 10)}
          sub="Based on activity"
          icon={<Icon name="eco" className="" />}
        />
      </div>

      <div className="grid grid-cols-2 grid-cols-4 gap-3">
        <Link
          to="/app/report"
          className="flex flex-col items-center justify-center gap-2 bg-secondary-container rounded-2xl p-5 border border-surface-container-high active:scale-95 transition-transform"
          aria-label="Report Waste"
        >
          <Icon name="add_a_photo" className="text-3xl text-primary" />
          <span className="font-body-md text-body-md text-primary font-bold">Report Waste</span>
        </Link>
        <Link
          to="/app/pickups"
          className="flex flex-col items-center justify-center gap-2 bg-secondary-container rounded-2xl p-5 border border-surface-container-high active:scale-95 transition-transform"
          aria-label="Schedule Pickup"
        >
          <Icon name="schedule" className="text-3xl text-primary" />
          <span className="font-body-md text-body-md text-primary font-bold">Schedule Pickup</span>
        </Link>
        <Link
          to="/app/pickups"
          className="flex flex-col items-center justify-center gap-2 bg-secondary-container rounded-2xl p-5 border border-surface-container-high active:scale-95 transition-transform"
          aria-label="Track Pickup"
        >
          <Icon name="local_shipping" className="text-3xl text-primary" />
          <span className="font-body-md text-body-md text-primary font-bold">Track Pickup</span>
        </Link>
        <Link
          to="/app/waste"
          className="flex flex-col items-center justify-center gap-2 bg-secondary-container rounded-2xl p-5 border border-surface-container-high active:scale-95 transition-transform"
          aria-label="My Waste"
        >
          <Icon name="delete_sweep" className="text-3xl text-primary" />
          <span className="font-body-md text-body-md text-primary font-bold">My Waste</span>
        </Link>
      </div>

      {recentPickup ? (
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-headline-md text-headline-md text-primary font-bold">Current Pickup</h2>
            <Link to={`/app/pickups/${recentPickup.id}`} className="text-sm font-bold text-primary underline" aria-label="View pickup details">
              View All
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Icon name="local_shipping" className="text-3xl text-primary" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-body-md text-body-md text-on-surface-variant font-bold">{recentPickup.pickup_id}</span>
                <StatusBadge status={recentPickup.status} pending={recentPickup.status === 'EN_ROUTE'} />
              </div>
              <p className="text-sm text-on-surface-variant mt-1">{recentPickup.waste_type} · {recentPickup.address}</p>
              <p className="text-xs text-on-surface-variant mt-1">{formatDate(recentPickup.pickup_date)} · {recentPickup.time_slot}</p>
            </div>
          </div>
        </Card>
      ) : (
        <EmptyState
          title="No pickups yet"
          message="Schedule your first pickup to start making an impact!"
          icon="local_shipping"
          action={
            <Link to="/app/pickups" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container text-primary font-bold text-sm">
              Schedule Pickup
            </Link>
          }
        />
      )}
    </div>
  );
}
