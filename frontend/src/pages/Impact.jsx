import { Icon } from '../components/AppIcons';

const STATS = [
  { icon: 'delete_sweep', label: 'Tonnes diverted from landfill', value: '2.4M', suffix: '+' },
  { icon: 'co2', label: 'CO₂e emissions avoided', value: '840K', suffix: ' t' },
  { icon: 'local_fire_department', label: 'RDF produced for energy', value: '128K', suffix: ' t' },
  { icon: 'house', label: 'Households served', value: '1.2M', suffix: '+' },
];

const RECOVERY = [
  { name: 'Organic Compost', pct: 34, icon: 'solar_power', bar: '#5b9a26' },
  { name: 'RDF — Energy Fuel', pct: 27, icon: 'local_fire_department', bar: '#abf854' },
  { name: 'Ferrous Metals', pct: 12, icon: 'factory', bar: '#0d2a1a' },
  { name: 'Paper & Cardboard', pct: 11, icon: 'grass', bar: '#769780' },
  { name: 'Non-Ferrous Metals', pct: 8, icon: 'autorenew', bar: '#9bb873' },
  { name: 'Inert Residue', pct: 8, icon: 'recycling', bar: '#c2c8c1' },
];

const PILLARS = [
  { icon: 'scale', code: 'STAT-01', title: 'SCALE', stat: '6,400 t', desc: 'Tonnes processed daily across nodes.' },
  { icon: 'bolt', code: 'STAT-02', title: 'MAX YIELD', stat: '91%', desc: 'Commodity-grade RDF with predictable calorific value.' },
  { icon: 'co2', code: 'STAT-03', title: 'REDUCTION', stat: '-38%', desc: 'Carbon footprint minimized at the source.' },
];

export default function Impact() {
  return (
    <div className="grow w-full max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-space-3xl">
      {/* Hero */}
      <section className="mb-24">
        <div className="inline-flex items-center gap-2 px-space-sm py-space-xxs rounded-full border border-surface-container-high bg-surface-container-low mb-6">
          <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Impact Report · FY 2025-26</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-display-hero text-primary mb-6 max-w-4xl">
          TURNING WASTE INTO <span className="text-secondary">MEASURABLE IMPACT.</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl border-l-2 border-primary pl-6 mb-10">
          Every tonne recorded, every gram tracked. We decentralize processing at the source —
          cutting logistics, slashing emissions, and turning municipal waste into verified resources.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="/report" className="btn-industrial btn-industrial--primary">Report Waste <Icon name="arrow_forward" /></a>
          <a href="/simulation" className="btn-industrial btn-industrial--neutral">Explore the Plant <Icon name="arrow_up_right" /></a>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-32">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-headline-md text-headline-md text-primary">Network-Wide, Verifiable</h2>
          <span className="font-mono-data text-mono-data text-on-surface-variant hidden md:block">DATA · LIVE · VERIFIED</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {STATS.map((s) => (
            <div key={s.label} className="bg-surface-container-lowest border border-surface-container-high rounded-[24px] p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-4 text-forest">
                <Icon name={s.icon} className="text-xl" />
                <span className="font-label-sm text-label-sm text-on-surface-variant">{s.label}</span>
              </div>
              <div className="font-stat-counter text-stat-counter-mobile lg:text-stat-counter text-primary flex items-baseline gap-1">
                {s.value}
                <span className="text-secondary text-2xl">{s.suffix}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recovery mix */}
      <section className="mb-32">
        <div className="border-t border-surface-container-highest pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            <div className="lg:col-span-4">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">What Comes Out Matters.</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
                Each stream is diverted from landfill and routed to its highest-value use —
                compost for soil, RDF for industry, metals back into manufacturing.
              </p>
              <div className="data-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary-container/20 flex items-center justify-center rounded-xl text-forest">
                    <Icon name="leaderboard" className="text-xl" />
                  </div>
                  <div className="font-label-md text-label-md text-primary uppercase font-bold tracking-wider">92% Landfill Diversion Rate</div>
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Across all active nodes, 12-month rolling average.</p>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-6">
              {RECOVERY.map((r) => (
                <div key={r.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon name={r.icon} className="text-forest" />
                      <span className="font-label-md text-label-md text-primary uppercase font-bold tracking-wider">{r.name}</span>
                    </div>
                    <span className="font-mono-data text-mono-data text-secondary">{r.pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-surface-container-high overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: r.bar }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {PILLARS.map((c) => (
            <div key={c.code} className="bg-surface-container-lowest border border-surface-container-high rounded-[24px] p-8 group hover:border-forest transition-colors technical-shadow">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-secondary-container/20 flex items-center justify-center rounded-2xl text-forest">
                  <Icon name={c.icon} className="text-2xl" />
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{c.code}</span>
              </div>
              <div className="font-display-lg text-display-lg text-primary mb-2 group-hover:text-forest transition-colors">{c.stat}</div>
              <div className="font-label-md text-label-md text-on-surface-variant uppercase font-bold tracking-wider mb-1">{c.title}</div>
              <p className="font-label-sm text-label-sm text-on-surface-variant">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-[24px] bg-primary text-on-primary p-10 lg:p-16 relative overflow-hidden blueprint-shadow">
        <div className="absolute inset-0 pointer-events-none opacity-30"
             style={{ backgroundImage: "linear-gradient(theme('colors.secondary-container') 1px, transparent 1px), linear-gradient(90deg, theme('colors.secondary-container') 1px, transparent 1px)", backgroundSize: '48px 48px' }} />
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-headline-md text-headline-md mb-4">Want your numbers on this board?</h2>
            <p className="font-body-lg text-body-lg text-on-primary/80">Report waste, schedule a pickup, and watch your community's impact grow in real time.</p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <a href="/register" className="btn-industrial btn-industrial--secondary">Get Started <Icon name="arrow_forward" /></a>
            <a href="/contact" className="btn-industrial btn-industrial--neutral">Talk to Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}