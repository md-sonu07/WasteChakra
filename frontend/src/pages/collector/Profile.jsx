import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../services/authApi';
import { Card, Avatar, Button } from '../../components/ui';
import { Icon } from '../../components/AppIcons';
import LocationPicker from '../../components/LocationPicker';

export default function Profile() {
  const { user, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(user?.is_active ?? true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    vehicle_number: user?.profile?.vehicle_number || user?.collector_profile?.vehicle_number || user?.vehicle_number || '',
    vehicle_type: user?.profile?.vehicle_type || user?.collector_profile?.vehicle_type || user?.vehicle_type || 'VAN',
    phone: user?.profile?.phone || user?.phone || '',
    address_line1: user?.profile?.address_line1 || '',
    address_line2: user?.profile?.address_line2 || '',
    city: user?.profile?.city || user?.city || '',
    state: user?.profile?.state || '',
    pincode: user?.profile?.pincode || '',
    address: user?.profile?.address || user?.address || '',
    latitude: user?.collector_profile?.current_lat || null,
    longitude: user?.collector_profile?.current_lng || null,
  });

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  useEffect(() => {
    if (user) {
      setIsActive(user.collector_profile?.is_active ?? user.is_active ?? true);
      setForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        vehicle_number: user.profile?.vehicle_number || user.collector_profile?.vehicle_number || user.vehicle_number || '',
        vehicle_type: user.profile?.vehicle_type || user.collector_profile?.vehicle_type || user.vehicle_type || 'VAN',
        phone: user.profile?.phone || user.phone || '',
        address_line1: user.profile?.address_line1 || '',
        address_line2: user.profile?.address_line2 || '',
        city: user.profile?.city || user.city || '',
        state: user.profile?.state || '',
        pincode: user.profile?.pincode || '',
        address: user.profile?.address || user.address || '',
        latitude: user.collector_profile?.current_lat || null,
        longitude: user.collector_profile?.current_lng || null,
      });
    }
  }, [user]);

  const fullName = `${form.first_name || user?.first_name || ''} ${form.last_name || user?.last_name || ''}`.trim() || user?.email || 'Collector';
  const vehicleNumber = form.vehicle_number || user?.collector_profile?.vehicle_number || 'KA 01 AB 1234';
  const vehicleType = form.vehicle_type || user?.collector_profile?.vehicle_type || 'VAN';
  const contact = form.phone || user?.profile?.phone || '+91 98765 43210';

  const save = async () => {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      await authApi.updateProfile({
        first_name: form.first_name,
        last_name: form.last_name,
        vehicle_number: form.vehicle_number,
        vehicle_type: form.vehicle_type,
        phone: form.phone,
        address_line1: form.address_line1,
        address_line2: form.address_line2,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        current_lat: form.latitude ? parseFloat(form.latitude) : null,
        current_lng: form.longitude ? parseFloat(form.longitude) : null,
        is_active: isActive,
      });
      await refreshProfile();
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError(err.message || "Failed to update profile in database.");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (val) => {
    setIsActive(val);
    try {
      await authApi.updateProfile({ is_active: val });
    } catch {
      // fallback: keep local state
    }
  };

  const handleMapLocationChange = (loc) => {
    setForm((prev) => ({
      ...prev,
      latitude: loc.lat,
      longitude: loc.lng,
      address_line1: loc.address ? loc.address.split(',')[0] : prev.address_line1,
      address: loc.address || prev.address,
    }));
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

            {/* Right: Status & Vehicle Ribbon */}
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
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-2xs ${
                  isActive ? 'bg-secondary-container text-primary hover:bg-[#bbfb64]' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
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
          <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-6 flex items-center gap-2">
            <Icon name="badge" className="text-secondary" /> Personal & Vehicle Information
          </h2>
          {saved && (
            <div className="bg-secondary-container/40 rounded-xl p-3 mb-5 text-primary text-sm font-bold flex items-center gap-2 border border-secondary-container">
              <Icon name="check_circle" className="text-lg text-forest" /> Profile saved successfully!
            </div>
          )}
          {error && (
            <div className="bg-red-500/10 text-red-700 rounded-xl p-3 mb-5 text-sm font-bold flex items-center gap-2 border border-red-200">
              <Icon name="error" className="text-lg" /> {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">First Name</label>
              <input
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface transition-all"
                placeholder="First Name"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Last Name</label>
              <input
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface transition-all"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Phone / Contact Number</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface transition-all"
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Vehicle Number</label>
              <input
                value={form.vehicle_number}
                onChange={(e) => setForm({ ...form, vehicle_number: e.target.value.toUpperCase() })}
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface transition-all font-mono uppercase tracking-wider"
                placeholder="KA 01 AB 1234"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Vehicle Type</label>
              <select
                value={form.vehicle_type}
                onChange={(e) => setForm({ ...form, vehicle_type: e.target.value })}
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface transition-all font-medium"
              >
                <option value="AUTO">Electric Auto Rickshaw</option>
                <option value="VAN">Collection Van</option>
                <option value="TRUCK">Heavy Utility Truck</option>
                <option value="BIKE">Cargo Bike</option>
              </select>
            </div>
          </div>

          <Button variant="primary" size="lg" loading={saving} onClick={save} className="w-full">
            {saving ? 'Saving Profile...' : 'Save Profile Changes'}
          </Button>
        </Card>

        <Card className="p-5 md:p-6 w-full flex flex-col gap-6">
          <div>
            <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-2 flex items-center gap-2">
              <Icon name="location_on" className="text-secondary" /> Service Depot & Address Details
            </h2>
            <p className="text-xs text-on-surface-variant mb-6">
              Enter your accurate structured address or pin your hub location on the map for route assignment.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Address Line 1 (Flat/House No., Building, Street)</label>
              <input
                value={form.address_line1}
                onChange={(e) => setForm({ ...form, address_line1: e.target.value })}
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface transition-all"
                placeholder="Plot 42, Green Park Main Road"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Address Line 2 (Area, Colony, Landmark)</label>
              <input
                value={form.address_line2}
                onChange={(e) => setForm({ ...form, address_line2: e.target.value })}
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface transition-all"
                placeholder="Near Waste Recycling Depot #3"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">City</label>
                <input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface transition-all"
                  placeholder="Bengaluru"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">State</label>
                <input
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface transition-all"
                  placeholder="Karnataka"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2">Pincode</label>
                <input
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-secondary focus:bg-surface transition-all"
                  placeholder="560001"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-2 mb-2 block">
                Pin Depot Hub on Map
              </label>
              <LocationPicker
                value={{ address: form.address || form.address_line1, lat: form.latitude, lng: form.longitude }}
                onChange={handleMapLocationChange}
                height={220}
                showAddress={false}
              />
            </div>
          </div>

          <Button variant="primary" size="lg" loading={saving} onClick={save} className="w-full">
            {saving ? 'Saving Depot & Profile...' : 'Save Depot & Address Changes'}
          </Button>

          <div className="pt-2 border-t border-surface-container-high flex flex-col gap-4">
            <h3 className="font-title-md text-base text-primary font-bold">Collector Availability Status</h3>
            <label className="flex items-center justify-between gap-3 p-4 rounded-xl border border-surface-container-high/50 bg-surface-container-lowest hover:border-secondary/50 hover:bg-surface transition-colors cursor-pointer group">
              <div>
                <p className="font-body-md text-primary font-bold group-hover:text-[#0a3a2a] transition-colors">Accepting Pickups</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Toggle your active online status for route assignments.</p>
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
            <div className="pt-2 flex justify-center w-full">
              <Button variant="danger" size="lg" onClick={() => { logout(); navigate('/'); }} className="w-full">
                <Icon name="logout" className="text-lg" /> Sign Out
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
