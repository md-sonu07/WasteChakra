import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { dataProvider } from '../../services/dataProvider';
import { api } from '../../services/api';
import { Card, Button, Avatar, Skeleton, ErrorState } from '../../components/ui';
import { Icon } from '../../components/AppIcons';

export default function CitizenProfile() {
  const { user, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [impact, setImpact] = useState(null);
  const [loadingImpact, setLoadingImpact] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone: user?.phone || '',
    city: user?.city || '',
    address: user?.address || '',
  });
  const [settings, setSettings] = useState({
    pickupReminders: true,
    reportAlerts: true,
    weeklySummary: false,
    promotional: false,
  });

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await api.updateProfile(form);
      await refreshProfile();
      setSaved(true);
    } catch {
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  if (loadingImpact) {
    dataProvider.getImpact().then(setImpact).finally(() => setLoadingImpact(false)).catch(() => setLoadingImpact(false));
  }

  const fullName = `${form.first_name || ''} ${form.last_name || ''}`.trim() || 'Citizen';

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="w-20 h-20 rounded-full bg-forest text-secondary-fixed flex items-center justify-center text-2xl font-bold">
          {fullName.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
        </div>
        <div className="text-center">
          <h1 className="font-headline-md text-headline-md text-primary font-bold">{fullName}</h1>
          <p className="text-sm text-on-surface-variant">{user?.email || 'citizen@wastechakra.com'}</p>
          <span className="inline-flex mt-2 px-2.5 py-1 rounded-full text-xs font-bold bg-secondary-container text-primary">CITIZEN</span>
        </div>
        <div className="flex gap-6 mt-2">
          <div className="text-center">
            <p className="font-stat-counter text-2xl font-extrabold text-primary">{impact?.chakra_points || user?.profile?.chakra_points || 0}</p>
            <p className="text-xs text-on-surface-variant">Points</p>
          </div>
          <div className="text-center">
            <p className="font-stat-counter text-2xl font-extrabold text-primary">{impact?.streak_days || 7}</p>
            <p className="text-xs text-on-surface-variant">Day Streak</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-space-md items-start">
        <Card className="p-5 md:p-6">
          <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-6">Edit Profile</h2>
          {saved && (
            <div className="bg-secondary-container/40 rounded-xl p-3 mb-5 text-primary text-sm font-bold flex items-center gap-2 border border-secondary-container">
              <Icon name="check_circle" className="text-lg" /> Profile saved successfully
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">First Name</label>
              <input
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(168,224,90,0.1)] transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Last Name</label>
              <input
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(168,224,90,0.1)] transition-all"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Phone Number</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(168,224,90,0.1)] transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">City</label>
            <input
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(168,224,90,0.1)] transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5 mb-6">
            <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Address</label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(168,224,90,0.1)] transition-all"
              rows={2}
            />
          </div>
          <Button variant="primary" size="lg" loading={saving} onClick={handleSave} className="w-full">
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Card>

        <Card className="p-5 md:p-6 w-full">
          <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-6">Notification Settings</h2>
          <div className="flex flex-col gap-4">
            {[
              { key: 'pickupReminders', label: 'Pickup Reminders', desc: 'Get notified about scheduled pickups' },
              { key: 'reportAlerts', label: 'Report Alerts', desc: 'Updates on your waste reports' },
              { key: 'weeklySummary', label: 'Weekly Summary', desc: 'Weekly impact recap' },
              { key: 'promotional', label: 'Promotions', desc: 'Event and reward updates' },
            ].map((item) => (
              <label key={item.key} className="flex items-center justify-between gap-3 p-4 rounded-xl border border-surface-container-high/50 bg-surface-container-lowest hover:border-secondary/50 hover:bg-surface transition-colors cursor-pointer group">
                <div>
                  <p className="font-body-md text-primary font-bold group-hover:text-[#0a3a2a] transition-colors">{item.label}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">{item.desc}</p>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={settings[item.key]}
                    onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-secondary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#A8E05A]"></div>
                </div>
              </label>
            ))}
          </div>
          <div className="pt-4 flex w-full  justify-center">
            <Button variant="danger" size="lg" onClick={handleSignOut} className="w-full max-w-sm">
              <Icon name="logout" className="text-lg" /> Sign Out
            </Button>
          </div>
        </Card>
      </div>

    </div>
  );
}
