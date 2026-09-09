import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataProvider } from '../../services/dataProvider';
import { Card, Button, Skeleton, ErrorState, EmptyState, formatDate } from '../../components/ui';
import { Icon } from '../../components/AppIcons';

const LOCATION_ITEMS = [
  { label: 'Plastic Dump', distance: '250m', type: 'reported' },
  { label: 'E-Waste Collection', distance: '800m', type: 'assigned' },
  { label: 'Community Cleanup', distance: '1.2km', type: 'completed' },
  { label: 'Recycling Point', distance: '1.8km', type: 'facility' },
];

const TYPE_DOT = {
  reported: 'bg-yellow-400',
  assigned: 'bg-blue-500',
  completed: 'bg-green-500',
  facility: 'bg-purple-500',
};

export default function CitizenCommunity() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joined, setJoined] = useState({});

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataProvider.getEvents();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchEvents} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline-md text-headline-md text-primary font-bold">Community</h1>

      <Link to="/app/map" aria-label="Open community map">
        <div className="bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 rounded-2xl border border-surface-container-high p-5 flex items-center gap-4">
          <Icon name="map" className="text-4xl text-primary" />
          <div className="flex-1">
            <p className="font-body-md text-body-md text-primary font-bold">Community Map</p>
            <p className="text-sm text-on-surface-variant">See waste around you</p>
          </div>
          <Icon name="chevron_right" className="text-on-surface-variant" />
        </div>
      </Link>

      <h2 className="font-headline-md text-headline-md text-primary font-bold">Waste Around You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {LOCATION_ITEMS.map((item) => (
          <Card key={item.label} className="p-4">
            <Link to="/app/map" className="flex items-center gap-3" aria-label={`View ${item.label} on map`}>
              <span className={`w-3 h-3 rounded-full shrink-0 ${TYPE_DOT[item.type]}`} />
              <div className="flex-1 min-w-0">
                <p className="font-body-md text-body-md text-on-surface-variant font-bold">{item.label}</p>
                <p className="text-xs text-on-surface-variant">{item.distance} away</p>
              </div>
              <Icon name="chevron_right" className="text-on-surface-variant" />
            </Link>
          </Card>
        ))}
      </div>

      <h2 className="font-headline-md text-headline-md text-primary font-bold">Events</h2>
      {events.length === 0 ? (
        <EmptyState title="No events yet" message="Check back soon for community events." icon="event" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {events.map((event) => {
            const isJoined = joined[event.id];
            return (
              <Card key={event.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container text-primary flex items-center justify-center shrink-0">
                    <Icon name="emoji_events" className="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-title-md text-title-md text-primary font-bold">{event.title}</h3>
                    <p className="text-sm text-on-surface-variant mt-1">{event.location} · {formatDate(event.date)}</p>
                    <div className="flex flex-wrap gap-2 mt-2 text-xs">
                      <span className="bg-surface-container-high rounded-full px-2 py-0.5 text-on-surface-variant">
                        {event.participants} joined
                      </span>
                      {event.waste_recovered_kg > 0 && (
                        <span className="bg-secondary-container/40 rounded-full px-2 py-0.5 text-primary">
                          {event.waste_recovered_kg} kg recovered
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button
                    variant={isJoined ? 'outline' : 'primary'}
                    size="sm"
                    onClick={() => setJoined({ ...joined, [event.id]: !isJoined })}
                  >
                    {isJoined ? 'Joined ✓' : 'Join Event'}
                  </Button>
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
