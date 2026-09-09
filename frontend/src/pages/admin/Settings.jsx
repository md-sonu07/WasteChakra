import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Card, Button, StatusBadge, Avatar } from '../../components/ui';
import { Icon } from '../../components/AppIcons';

const DEFAULT_STATS = { tonsDiverted: 184, cities: 4, clients: 128, onTime: 96 };

const REWARD_DEFAULTS = [
  { id: 'rd1', label: 'Valid waste report', value: 10 },
  { id: 'rd2', label: 'Successful pickup', value: 20 },
  { id: 'rd3', label: 'Recyclable submission', value: 15 },
  { id: 'rd4', label: 'Community cleanup', value: 50 },
];

export default function AdminSettings() {
  const [stats, setStats] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('wc_homepage_stats'));
      return saved || DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });
  const [statMsg, setStatMsg] = useState('');
  const [apiStatus, setApiStatus] = useState({ state: 'checking', latency: null });
  const [mapProvider, setMapProvider] = useState(() => localStorage.getItem('wc_map_provider') || 'demo');
  const [language, setLanguage] = useState(() => localStorage.getItem('wc_language') || 'en');
  const [toggles, setToggles] = useState({
    email: true, sms: true, push: false, autoAssign: true, alerts: true,
  });

  const saveStats = () => {
    localStorage.setItem('wc_homepage_stats', JSON.stringify(stats));
    localStorage.setItem('wc_map_provider', mapProvider);
    localStorage.setItem('wc_language', language);
    setStatMsg('Settings saved successfully.');
    setTimeout(() => setStatMsg(''), 3000);
  };

  const resetDemo = () => {
    ['wc_homepage_stats', 'wc_map_provider', 'wc_language'].forEach((k) => localStorage.removeItem(k));
    setStats(DEFAULT_STATS);
    setMapProvider('demo');
    setLanguage('en');
    setStatMsg('Demo data reset. Defaults restored.');
    setTimeout(() => setStatMsg(''), 3000);
  };

  useEffect(() => {
    let mounted = true;
    const start = Date.now();
    api.getStatsSummary()
      .then(() => mounted && setApiStatus({ state: 'ok', latency: Date.now() - start }))
      .catch(() => mounted && setApiStatus({ state: 'down', latency: null }));
    return () => { mounted = false; };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3 py-4">
        <Avatar name="Admin" size="xl" className="w-20 h-20 text-2xl" />
        <div className="text-center">
          <h1 className="font-headline-md text-headline-md text-primary font-bold">System Settings</h1>
          <p className="text-sm text-on-surface-variant">Manage homepage, rewards, map provider and notifications</p>
          <span className="inline-flex mt-2 px-2.5 py-1 rounded-full text-xs font-bold bg-secondary-container text-primary uppercase">Super Admin</span>
        </div>
      </div>

      {statMsg && (
        <div className="bg-secondary-container/40 rounded-xl p-3 text-primary text-sm font-bold flex items-center justify-center gap-2 border border-secondary-container">
          <Icon name="check_circle" className="text-lg" /> {statMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-space-md items-start">
        <div className="flex flex-col gap-4 md:gap-space-md">
          <Card className="p-5 md:p-6 w-full">
            <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-6">Homepage Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Tons Diverted</label>
                <input type="number" value={stats.tonsDiverted} onChange={(e) => setStats({ ...stats, tonsDiverted: Number(e.target.value) })} className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Cities</label>
                <input type="number" value={stats.cities} onChange={(e) => setStats({ ...stats, cities: Number(e.target.value) })} className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Clients</label>
                <input type="number" value={stats.clients} onChange={(e) => setStats({ ...stats, clients: Number(e.target.value) })} className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">On-Time %</label>
                <input type="number" value={stats.onTime} onChange={(e) => setStats({ ...stats, onTime: Number(e.target.value) })} className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary transition-all" />
              </div>
            </div>
            <Button variant="primary" size="lg" className="w-full" onClick={saveStats}>Save Stats</Button>
          </Card>

          <Card className="p-5 md:p-6 w-full">
            <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-6">Reward Rule Defaults</h2>
            <div className="flex flex-col gap-3">
              {REWARD_DEFAULTS.map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-surface-container-high/50 bg-surface-container-lowest hover:border-secondary/50 hover:bg-surface transition-colors group">
                  <span className="text-sm font-bold text-primary group-hover:text-[#0a3a2a] transition-colors">{r.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-secondary-container/30 text-primary font-bold text-sm rounded-lg">{r.value} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-4 md:gap-space-md">
          <Card className="p-5 md:p-6 w-full">
            <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-6">API Status</h2>
            <div className="p-5 rounded-2xl border border-surface-container-high bg-surface-container-lowest flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${apiStatus.state === 'ok' ? 'bg-secondary-container text-primary' : apiStatus.state === 'down' ? 'bg-error-container text-on-error-container' : 'bg-surface-container-low text-on-surface-variant'}`}>
                  <Icon name={apiStatus.state === 'ok' ? 'cloud_done' : apiStatus.state === 'down' ? 'cloud_off' : 'sync'} className="text-2xl" />
                </span>
                <div>
                  <p className="font-bold text-primary text-lg">
                    {apiStatus.state === 'ok' ? 'Backend healthy' : apiStatus.state === 'down' ? 'Backend unreachable' : 'Checking…'}
                  </p>
                  <p className="text-sm text-on-surface-variant mt-0.5">
                    {apiStatus.state === 'ok' ? `Latency ${apiStatus.latency}ms` : apiStatus.state === 'down' ? 'Falling back to demo data' : 'Contacting /stats/summary/'}
                  </p>
                </div>
              </div>
              {apiStatus.state === 'ok' && <StatusBadge status="COMPLETED" />}
            </div>
          </Card>

          <Card className="p-5 md:p-6 w-full h-full flex flex-col">
            <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-6">System Toggles</h2>
            <div className="flex flex-col gap-4 mb-6">
              {[
                { key: 'email', label: 'Email alerts', desc: 'Send automated email notifications' },
                { key: 'sms', label: 'SMS alerts', desc: 'Send automated SMS via Twilio' },
                { key: 'push', label: 'Push notifications', desc: 'FCM push notifications to mobile apps' },
                { key: 'autoAssign', label: 'Auto-assign pickups', desc: 'Algorithmically route pickups to nearest collectors' },
                { key: 'alerts', label: 'Urgent report alerts', desc: 'Flag toxic/hazardous waste immediately' },
              ].map((item) => (
                <>
                  <label key={item.key} className="flex items-center justify-between gap-3 p-4 rounded-xl border border-surface-container-high/50 bg-surface-container-lowest hover:border-secondary/50 hover:bg-surface transition-colors cursor-pointer group">
                    <div>
                      <p className="font-body-md text-primary font-bold group-hover:text-[#0a3a2a] transition-colors">{item.label}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{item.desc}</p>
                    </div>
                    <div className="relative flex items-center shrink-0">
                      <input
                        type="checkbox"
                        checked={toggles[item.key]}
                        onChange={() => setToggles((t) => ({ ...t, [item.key]: !t[item.key] }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-secondary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#A8E05A]"></div>
                    </div>
                  </label>
                </>
              ))}
            </div>
            <div className="pt-4 flex justify-center w-full mt-auto border-t border-surface-container-high">
              <Button variant="danger" size="lg" onClick={() => { localStorage.clear(); window.location.href = '/'; }} className="w-full max-w-sm mt-4">
                <Icon name="logout" className="text-lg" /> Sign Out
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}