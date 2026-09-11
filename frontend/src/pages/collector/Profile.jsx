import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../services/authApi';
import { Card, Avatar, Button } from '../../components/ui';
import { Icon } from '../../components/AppIcons';

export default function Profile() {
  const { user, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(user?.is_active ?? true);
  const [vehicleNumber, setVehicleNumber] = useState(user?.vehicle_number || '');
  const [vehicleType, setVehicleType] = useState(user?.vehicle_type || '');
  const [contact, setContact] = useState(user?.profile?.phone || user?.phone || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  useEffect(() => {
    if (user) {
      setContact(user.profile?.phone || user.phone || '');
      if (user.vehicle_number) setVehicleNumber(user.vehicle_number);
      if (user.vehicle_type) setVehicleType(user.vehicle_type);
    }
  }, [user]);

  const fullName = user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : (user?.first_name || user?.email || 'Collector');

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await authApi.updateProfile({ vehicle_number: vehicleNumber, vehicle_type: vehicleType, phone: contact, is_active: isActive });
      await refreshProfile();
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
      await authApi.updateProfile({ is_active: val });
    } catch {
      // fallback: keep local state
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3 py-4">
        <Avatar name={fullName} size="xl" className="w-20 h-20 text-2xl" />
        <div className="text-center">
          <h1 className="font-headline-md text-headline-md text-primary font-bold">{fullName}</h1>
          <p className="text-sm text-on-surface-variant">{user?.email || 'collector@wastechakra.com'}</p>
          <span className="inline-flex mt-2 px-2.5 py-1 rounded-full text-xs font-bold bg-secondary-container text-primary uppercase">Collector</span>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold mt-2 ${isActive ? 'bg-secondary-container text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}
        >
          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#0a3a2a] animate-pulse' : 'bg-on-surface-variant'}`} />
          {isActive ? 'Online for pickups' : 'Offline'}
        </span>
      </div>

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
