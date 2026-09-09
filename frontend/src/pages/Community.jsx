import { Link } from 'react-router-dom';
import { Icon } from '../components/AppIcons';

export default function Community() {
  const events = [
    {
      title: 'Park Cleanup Drive',
      type: 'Cleanup',
      location: 'Riverside Central Park',
      date: 'Sep 14, 2026',
      participants: 85,
      wasteKg: 320,
    },
    {
      title: 'Plastic Collection Campaign',
      type: 'Collection',
      location: 'Greenview Neighborhood',
      date: 'Sep 21, 2026',
      participants: 120,
      wasteKg: 580,
    },
    {
      title: 'E-Waste Drive',
      type: 'Specialized',
      location: 'Metro Tech Park',
      date: 'Sep 28, 2026',
      participants: 60,
      wasteKg: 145,
    },
    {
      title: 'School Recycling Workshop',
      type: 'Education',
      location: 'Oakwood Elementary',
      date: 'Oct 5, 2026',
      participants: 45,
      wasteKg: 75,
    },
    {
      title: 'Beach Shoreline Cleanup',
      type: 'Cleanup',
      location: 'Harbor Bay Waterfront',
      date: 'Oct 12, 2026',
      participants: 200,
      wasteKg: 1200,
    },
    {
      title: 'Compost Awareness Festival',
      type: 'Education',
      location: 'Community Botanical Garden',
      date: 'Oct 19, 2026',
      participants: 150,
      wasteKg: 90,
    },
  ];

  const nearbyItems = [
    { icon: 'water_drop', label: 'Plastic Dump', distance: '250m', type: 'Hazard' },
    { icon: 'devices_other', label: 'E-Waste Collection', distance: '800m', type: 'Specialized' },
    { icon: 'groups', label: 'Community Cleanup', distance: '1.2km', type: 'Event' },
    { icon: 'recycling', label: 'Recycling Point', distance: '1.8km', type: 'Drop-off' },
  ];

  const typeColors = {
    Cleanup: 'bg-secondary-container text-primary',
    Collection: 'bg-primary-container text-secondary-fixed',
    Specialized: 'bg-tertiary-container text-secondary-fixed',
    Education: 'bg-surface-container-high text-primary',
  };

  return (
    <div className="grow w-full max-w-container-max mx-auto px-gutter py-16 md:py-space-3xl">
      <header className="mb-20 md:mb-space-4xl">
        <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase mb-space-xs">
          <span>✳</span>
          <span>Community</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-display-hero text-primary font-bold tracking-tight max-w-4xl leading-tight">
          Your neighborhood, <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-secondary">your impact</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-md max-w-2xl">
          Join local cleanup events, collection drives, and educational workshops — and see the real-time environmental impact of your participation.
        </p>
      </header>

      <section className="mb-24 md:mb-space-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {events.map((event) => (
            <div key={event.title} className="bg-surface-container-lowest rounded-[28px] border border-surface-container-high/70 hover:border-secondary hover:shadow-lg transition-all flex flex-col overflow-hidden group">
              <div className="p-space-lg flex flex-col flex-1">
                <div className="flex items-center justify-between mb-space-md">
                  <span className={`inline-flex items-center px-space-sm py-space-xxs rounded-full font-eyebrow-tag text-eyebrow-tag font-bold uppercase ${typeColors[event.type] || 'bg-surface-container-high text-primary'}`}>
                    {event.type}
                  </span>
                  <Icon name="event" className="text-surface-container-highest text-[20px]" />
                </div>
                <h3 className="font-title-md text-title-md text-primary font-bold mb-space-sm">{event.title}</h3>
                <div className="flex flex-col gap-space-xxs mb-space-md">
                  <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                    <Icon name="location_on" className="text-[16px] text-secondary" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                    <Icon name="calendar_today" className="text-[16px] text-secondary" />
                    {event.date}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-space-sm pt-space-sm border-t border-surface-container-high/50 mb-space-md">
                  <div className="flex flex-col">
                    <span className="font-stat-counter text-stat-counter-mobile text-primary font-extrabold leading-none">{event.participants}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Participants</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-stat-counter text-stat-counter-mobile text-primary font-extrabold leading-none">{event.wasteKg}<span className="text-secondary text-lg">kg</span></span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Waste Recovered</span>
                  </div>
                </div>
                <div className="mt-auto">
                  <button className="w-full inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-xl bg-secondary-container text-primary font-label-md text-label-md font-bold hover:bg-secondary-fixed-dim hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(171,248,84,0.4)] transition-all duration-300 cursor-pointer">
                    <span>Join Event</span>
                    <Icon name="arrow_forward" className="text-[18px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24 md:mb-space-4xl">
        <div className="bg-surface-container-lowest rounded-[28px] border border-surface-container-high/70 p-8 md:p-space-2xl">
          <div className="text-center max-w-2xl mx-auto mb-space-2xl">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase mb-space-xs">
              <span>✳</span>
              <span>Nearby</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
              Waste Around You
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
              Active waste points and collection events happening in your neighborhood right now.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            {nearbyItems.map((item) => (
              <div key={item.label} className="flex items-center gap-space-md p-space-md rounded-2xl bg-surface border border-surface-container-high/50 hover:border-secondary hover:shadow-md transition-all duration-300 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-secondary-container/40 group-hover:bg-secondary-container flex items-center justify-center text-primary shrink-0 transition-colors">
                  <Icon name={item.icon} className="text-[22px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-title-md text-title-md text-primary font-bold truncate">{item.label}</h4>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-label-sm text-label-sm text-secondary font-bold">{item.distance}</span>
                    <span className="text-on-surface-variant">·</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{item.type}</span>
                  </div>
                </div>
                <Icon name="arrow_forward" className="text-surface-container-highest text-[20px] group-hover:text-secondary transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-16 md:mb-space-3xl">
        <div className="bg-forest rounded-[28px] p-space-xl md:p-space-2xl text-on-primary text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-space-md relative z-10">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/15 backdrop-blur-sm text-secondary-fixed font-eyebrow-tag text-eyebrow-tag font-bold uppercase">
              <span>✳</span>
              <span>Spotted Illegal Dumping?</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg md:text-[48px] md:leading-[54px] text-surface-bright font-bold tracking-tight">
              Help us keep your neighborhood clean.
            </h2>
            <p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-xl">
              Report waste in your area and our eco-crew will respond within hours. Every report earns you points toward community rewards.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-space-sm pt-space-xs">
              <Link to="/app/report" className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-secondary-container text-primary font-label-md text-label-md font-bold hover:bg-secondary-fixed-dim transition-all shadow-lg">
                <span>Report Waste Now</span>
                <Icon name="north_east" className="text-[18px]" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-surface-container-high/15 hover:bg-surface-container-high/25 text-surface-bright font-label-md text-label-md font-bold transition-colors">
                <span>Contact Support</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
