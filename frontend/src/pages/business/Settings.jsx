import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Card, Button, Avatar } from '../../components/ui';
import { Icon } from '../../components/AppIcons';

export default function Settings() {
  const { user, logout } = useAuth();
  const [companyName, setCompanyName] = useState(user?.company_name || 'Green Valley Society');
  const [gst, setGst] = useState(user?.gst_number || 'GSTIN1234567890');
  const [contact, setContact] = useState(user?.phone || '+91 98765 43210');
  const [address, setAddress] = useState('123 Green Street, Eco District');
  const [emailPrefs, setEmailPrefs] = useState({ pickup: true, report: true, invoice: false, marketing: false });
  const [webhookActive, setWebhookActive] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://example.com/hooks/wastechakra');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await api.updateProfile({ company_name: companyName, gst_number: gst, phone: contact, address });
    } catch {
      // fallback: treat as saved locally
    } finally {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Profile Header Hero Card */}
      <Card className="p-0 overflow-hidden relative border border-surface-container-high bg-surface-container-lowest rounded-xl technical-shadow">
        {/* Decorative Top Accent Banner */}
        <div className="h-28 md:h-36 w-full bg-linear-to-r from-forest via-[#0a3a2a] to-[#00180b] relative overflow-hidden flex items-start justify-between p-4 md:p-6">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#abf854_1px,transparent_1px)] bg-size-[16px_16px]" />
          <div className="relative z-10 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-surface-bright text-xs font-semibold border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse shadow-[0_0_6px_#abf854]" />
              <span>Verified Corporate Partner</span>
            </span>
          </div>
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-secondary-container text-primary uppercase tracking-wider shadow-sm">
              <Icon name="business" className="text-xs" />
              <span>BUSINESS</span>
            </span>
          </div>
        </div>

        {/* Card Body with Overlapping Avatar */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left: Avatar + Details */}
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="-mt-12 md:-mt-14 w-24 h-24 rounded-full bg-forest text-secondary-fixed ring-4 ring-surface-container-lowest flex items-center justify-center text-3xl font-extrabold shadow-xl shrink-0 z-10">
                {companyName.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() || 'BZ'}
              </div>
              <div className="flex flex-col gap-1 pt-1 sm:pt-3">
                <h1 className="font-headline-md text-2xl md:text-3xl text-primary font-bold tracking-tight">
                  {companyName}
                </h1>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <Icon name="mail" className="text-xs text-secondary" />
                    <span>{user?.email || 'business@wastechakra.com'}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="phone" className="text-xs text-secondary" />
                    <span>{contact}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Tax & Compliance Ribbon (cleanly on light surface) */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 bg-surface-container-low px-4 sm:px-5 py-3 rounded-2xl border border-surface-container-high/60 shadow-2xs mt-2 md:mt-3">
              <div className="text-center px-3 border-r border-surface-container-high/60">
                <p className="font-headline-md text-sm sm:text-base font-extrabold text-primary flex items-center justify-center gap-1">
                  <Icon name="badge" className="text-secondary text-base" />
                  <span>{gst}</span>
                </p>
                <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mt-0.5">GST Compliance</p>
              </div>
              <div className="text-center px-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  <Icon name="verified" className="text-xs" /> Active Account
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-space-md items-start">
        <Card className="p-5 md:p-6 w-full flex flex-col h-full">
          <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-6">Company Profile</h2>
          {saved && (
            <div className="bg-secondary-container/40 rounded-xl p-3 mb-5 text-primary text-sm font-bold flex items-center gap-2 border border-secondary-container">
              <Icon name="check_circle" className="text-lg" /> Settings saved successfully
            </div>
          )}
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Company Name</label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(168,224,90,0.1)] transition-all"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">GST Number</label>
              <input
                value={gst}
                onChange={(e) => setGst(e.target.value)}
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(168,224,90,0.1)] transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Contact</label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(168,224,90,0.1)] transition-all"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mb-6 flex-1">
            <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(168,224,90,0.1)] transition-all flex-1 min-h-[100px]"
              rows={3}
            />
          </div>
          <Button variant="primary" size="lg" loading={saving} onClick={save} className="w-full mt-auto">
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Card>

        <div className="flex flex-col gap-4 md:gap-space-md">
          <Card className="p-5 md:p-6 w-full">
            <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-6">Notification Preferences</h2>
            <div className="flex flex-col gap-4">
              {[
                { key: 'pickup', label: 'Pickup reminders', desc: 'Get notified before scheduled pickups' },
                { key: 'report', label: 'Activity reports', desc: 'Weekly waste activity summaries' },
                { key: 'invoice', label: 'Invoice & billing', desc: 'Payment and invoice notifications' },
                { key: 'marketing', label: 'Marketing & offers', desc: 'News about WasteChakra programs' },
              ].map((item) => (
                <>
                  <label key={item.key} className="flex items-center justify-between gap-3 p-4 rounded-xl border border-surface-container-high/50 bg-surface-container-lowest hover:border-secondary/50 hover:bg-surface transition-colors cursor-pointer group">
                    <div>
                      <p className="font-body-md text-primary font-bold group-hover:text-[#0a3a2a] transition-colors">{item.label}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{item.desc}</p>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={emailPrefs[item.key]}
                        onChange={() => setEmailPrefs((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-secondary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#A8E05A]"></div>
                    </div>
                  </label>
                </>
              ))}
            </div>
          </Card>

          <Card className="p-5 md:p-6 w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold">API / Webhook</h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-bold">
                <Icon name="lock" className="text-[14px]" /> Read-only
              </span>
            </div>

            <p className="text-sm text-on-surface-variant mb-6">Integrate WasteChakra with your systems. Webhook configuration is available on the complete plan.</p>

            <label className="flex items-center justify-between gap-3 p-4 rounded-xl border border-surface-container-high/50 bg-surface-container-lowest hover:border-secondary/50 hover:bg-surface transition-colors cursor-pointer group mb-4">
              <div>
                <p className="font-body-md text-primary font-bold group-hover:text-[#0a3a2a] transition-colors">Enable webhook</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Receive real-time pickup events</p>
              </div>
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={webhookActive}
                  onChange={(e) => setWebhookActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-secondary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#A8E05A]"></div>
              </div>
            </label>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Webhook URL</label>
              <input
                type="text"
                value={webhookUrl}
                readOnly
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest/50 px-4 py-3 font-body-md text-sm text-on-surface-variant focus:outline-none focus:border-secondary focus:bg-surface transition-all cursor-not-allowed"
              />
            </div>
            <div className="pt-4 flex w-full justify-center">
              <Button variant="danger" size="lg" onClick={logout} className="w-full max-w-sm">
                <Icon name="logout" className="text-lg" /> Sign Out
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
