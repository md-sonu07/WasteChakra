import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Card, Avatar, Button } from '../../components/ui';
import { Icon } from '../../components/AppIcons';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(user?.is_active ?? true);
  const [vehicleNumber, setVehicleNumber] = useState(user?.vehicle_number || 'KA 01 AB 2345');
  const [vehicleType, setVehicleType] = useState(user?.vehicle_type || 'Electric Auto');
  const [contact, setContact] = useState(user?.phone || '+91 98765 43210');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fullName = user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : (user?.first_name || 'Collector');

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await api.updateProfile({ vehicle_number: vehicleNumber, vehicle_type: vehicleType, phone: contact, is_active: isActive });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (val) => {
    setIsActive(val);
    try {
      await api.updateProfile({ is_active: val });
    } catch {
      // fallback: keep local state
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
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-secondary-container animate-pulse shadow-[0_0_6px_#abf854]' : 'bg-slate-400'}`} />
              <span>{isActive ? 'Active Shift' : 'Off-Duty'}</span>
            </span>
          </div>
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-secondary-container text-primary uppercase tracking-wider shadow-sm">
              <Icon name="local_shipping" className="text-xs" />
              <span>COLLECTOR</span>
            </span>
          </div>
        </div>

        {/* Card Body with Overlapping Avatar */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left: Avatar + Details */}
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="-mt-12 md:-mt-14 w-24 h-24 rounded-full bg-forest text-secondary-fixed ring-4 ring-surface-container-lowest flex items-center justify-center text-3xl font-extrabold shadow-xl shrink-0 z-10">
                {fullName.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() || 'CO'}
              </div>
              <div className="flex flex-col gap-1 pt-1 sm:pt-3">
                <h1 className="font-headline-md text-2xl md:text-3xl text-primary font-bold tracking-tight">
                  {fullName}
                </h1>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <Icon name="mail" className="text-xs text-secondary" />
                    <span>{user?.email || 'collector@wastechakra.com'}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="phone" className="text-xs text-secondary" />
                    <span>{contact}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Status & Vehicle Ribbon (cleanly on the light card surface) */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 bg-surface-container-low px-4 sm:px-5 py-3 rounded-2xl border border-surface-container-high/60 shadow-2xs mt-2 md:mt-3">
              <div className="text-center px-3 border-r border-surface-container-high/60">
                <p className="font-headline-md text-sm sm:text-base font-extrabold text-primary flex items-center justify-center gap-1">
                  <Icon name="directions_car" className="text-secondary text-base" />
                  <span>{vehicleNumber}</span>
                </p>
                <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mt-0.5">{vehicleType}</p>
              </div>
              <button
                onClick={() => toggleActive(!isActive)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-2xs ${isActive ? 'bg-secondary-container text-primary hover:bg-[#bbfb64]' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                  }`}
              >
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#0a3a2a] animate-pulse' : 'bg-on-surface-variant'}`} />
                <span>{isActive ? 'Online' : 'Go Online'}</span>
              </button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-space-md items-start">
        <Card className="p-5 md:p-6">
          <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-6">Vehicle Details</h2>
          {saved && (
            <div className="bg-secondary-container/40 rounded-xl p-3 mb-5 text-primary text-sm font-bold flex items-center gap-2 border border-secondary-container">
              <Icon name="check_circle" className="text-lg" /> Profile saved successfully
            </div>
          )}
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Vehicle Number</label>
            <input
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(168,224,90,0.1)] transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Vehicle Type</label>
            <input
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(168,224,90,0.1)] transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5 mb-6">
            <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Contact Number</label>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(168,224,90,0.1)] transition-all"
            />
          </div>
          <Button variant="primary" size="lg" loading={saving} onClick={save} className="w-full">
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Card>

        <Card className="p-5 md:p-6 w-full">
          <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-6">Availability</h2>
          <label className="flex items-center justify-between gap-3 p-4 rounded-xl border border-surface-container-high/50 bg-surface-container-lowest hover:border-secondary/50 hover:bg-surface transition-colors cursor-pointer group">
            <div>
              <p className="font-body-md text-primary font-bold group-hover:text-[#0a3a2a] transition-colors">Accepting Pickups</p>
              <p className="text-xs text-on-surface-variant mt-0.5">Toggle your availability to receive new assignments.</p>
            </div>
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => toggleActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-secondary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#A8E05A]"></div>
            </div>
          </label>
          <div className="pt-4 flex justify-center w-full mt-auto">
            <Button variant="danger" size="lg" onClick={() => { logout(); navigate('/'); }} className="w-full max-w-sm">
              <Icon name="logout" className="text-lg" /> Sign Out
            </Button>
          </div>
        </Card>
      </div>

    </div>
  );
}
