import { useState } from 'react';
import { StatCard, Card, Button } from '../../components/ui';
import { Icon } from '../../components/AppIcons';

const MONTHS = [
  { month: 'Mar', tonnes: 3.4 },
  { month: 'Apr', tonnes: 3.9 },
  { month: 'May', tonnes: 4.1 },
  { month: 'Jun', tonnes: 4.4 },
  { month: 'Jul', tonnes: 4.6 },
  { month: 'Aug', tonnes: 4.8 },
];

const RECOVERY = [
  { label: 'Plastic', value: 0.9, color: 'bg-[#0d2a1a]' },
  { label: 'Paper', value: 0.8, color: 'bg-secondary-container' },
  { label: 'Metal', value: 0.6, color: 'bg-[#a3d1b0]' },
  { label: 'Organic', value: 0.9, color: 'bg-primary/30' },
  { label: 'RDF', value: 1.2, color: 'bg-[#e2ebe1]' },
  { label: 'Residual', value: 0.4, color: 'bg-surface-container-highest' },
];

export default function Analytics() {
  const [range, setRange] = useState('Last 6 months');
  const [wasteType, setWasteType] = useState('All waste');
  const total = RECOVERY.reduce((s, r) => s + r.value, 0);
  const maxT = Math.max(...MONTHS.map((m) => m.tonnes));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Analytics</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Track your waste recovery performance</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 py-2.5 font-body-md text-sm outline-none focus:border-secondary transition-all"
          aria-label="Date range"
        >
          {['Last 6 months', 'Last year', 'This year', 'Last quarter'].map((o) => <option key={o}>{o}</option>)}
        </select>
        <select
          value={wasteType}
          onChange={(e) => setWasteType(e.target.value)}
          className="rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 py-2.5 font-body-md text-sm outline-none focus:border-secondary transition-all"
          aria-label="Waste type"
        >
          {['All waste', 'Plastic', 'Paper', 'Metal', 'Organic', 'RDF'].map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      <section aria-label="Analytics summary">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Waste Processed" value="4.8 t" icon="delete" />
          <StatCard label="Recovery Rate" value="77%" icon="recycling" tone="dark" />
          <StatCard label="RDF Yield" value="1.2 t" icon="local_fire_department" />
          <StatCard label="Diversion" value="92%" icon="trending_up" tone="accented" />
        </div>
      </section>

      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-title-md text-title-md text-primary font-bold">Monthly Volume</h2>
          <span className="text-xs font-semibold text-on-surface-variant">tonnes</span>
        </div>
        <div className="flex items-end gap-3 h-48">
          {MONTHS.map((m) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <span className="text-xs font-bold text-primary">{m.tonnes}</span>
              <div
                className="w-full rounded-t-lg bg-secondary-container"
                style={{ height: `${(m.tonnes / maxT) * 100}%` }}
                role="img"
                aria-label={`${m.month}: ${m.tonnes} tonnes`}
              />
              <span className="text-[11px] font-semibold text-on-surface-variant">{m.month}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="flex flex-col gap-4">
        <h2 className="font-title-md text-title-md text-primary font-bold">Recovery Breakdown</h2>
        <div className="flex h-6 rounded-full overflow-hidden">
          {RECOVERY.map((r) => (
            <div key={r.label} className={r.color} style={{ width: `${(r.value / total) * 100}%` }} role="img" aria-label={`${r.label}: ${r.value} tonnes`} />
          ))}
        </div>
        <ul className="flex flex-col gap-2">
          {RECOVERY.map((r) => (
            <li key={r.label} className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${r.color}`} />
              <span className="text-sm font-semibold text-on-surface-variant flex-1">{r.label}</span>
              <span className="text-sm font-bold text-primary">{r.value} t</span>
              <span className="text-xs text-on-surface-variant w-12 text-right">{Math.round((r.value / total) * 100)}%</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="flex items-center justify-between gap-3 bg-secondary-container/10">
        <p className="font-body-md text-body-md text-on-surface-variant text-sm flex items-center gap-2">
          <Icon name="download" className="text-secondary" />
          Export these analytics for reporting.
        </p>
        <Button variant="outline" size="sm" onClick={() => alert('Report export is a placeholder.')}>Export</Button>
      </Card>
    </div>
  );
}
