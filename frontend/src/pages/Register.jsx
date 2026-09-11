import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spinner } from '../components/ui';
import { Icon } from '../components/AppIcons';

const ROLES = [
  { value: 'CITIZEN', label: 'Citizen', icon: 'person', desc: 'Report waste & schedule pickups' },
  { value: 'COLLECTOR', label: 'Collector', icon: 'local_shipping', desc: 'Collect & transport waste' },
  { value: 'BUSINESS', label: 'Business', icon: 'business_center', desc: 'Manage business waste' },
  { value: 'FACILITY_MANAGER', label: 'Facility Manager', icon: 'factory', desc: 'Manage processing facility' },
];

const homeFor = (role) => {
  if (role === 'COLLECTOR') return '/collector';
  if (role === 'BUSINESS') return '/business';
  if (role === 'FACILITY_MANAGER') return '/facility';
  return '/app';
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', username: '', first_name: '', last_name: '', password: '', password_confirm: '', role: 'CITIZEN' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await register(form);
      navigate(homeFor(user.role));
    } catch (err) {
      const data = err.response?.data;
      if (data) {
        const msg = Object.values(data).flat().join('. ');
        setError(msg || 'Registration failed');
      } else {
        setError(err.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary-container/20 blur-[100px] rounded-full" />
      <div className="w-full max-w-md relative z-10">
        <div className="bg-surface-container-lowest rounded-[28px] border border-surface-container-high shadow-xl p-8">
          <div className="flex flex-col items-center mb-6">
            <Link to="/"><img alt="WasteChakra" className="h-12 object-contain bg-white rounded-lg" src="/images/logo-aida.png" /></Link>
            <h1 className="font-headline-md text-headline-md text-primary font-bold mt-4">Create your account</h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Join the circular economy</p>
          </div>

          {/* Role Selector */}
          <div className="mb-5">
            <label className="font-label-sm text-xs text-primary font-bold uppercase tracking-widest ml-1 mb-2 block">I am a</label>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setForm({ ...form, role: r.value })}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 transition-all text-left ${
                    form.role === r.value
                      ? 'border-secondary bg-secondary-container/30 shadow-sm'
                      : 'border-surface-container-high bg-surface-container-lowest hover:border-surface-container'
                  }`}
                >
                  <span className={`flex items-center justify-center w-8 h-8 rounded-lg text-lg ${
                    form.role === r.value ? 'bg-secondary-container text-primary' : 'bg-surface-container-high text-on-surface-variant'
                  }`}>
                    <Icon name={r.icon} className="text-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <div className={`text-xs font-bold leading-tight ${form.role === r.value ? 'text-primary' : 'text-on-surface'}`}>{r.label}</div>
                    <div className="text-[10px] text-on-surface-variant leading-tight truncate">{r.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-xs text-primary font-bold uppercase tracking-widest ml-1">First name</label>
                <input type="text" value={form.first_name} onChange={set('first_name')} required placeholder="Aarav" className="w-full rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm outline-none focus:border-secondary transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-xs text-primary font-bold uppercase tracking-widest ml-1">Last name</label>
                <input type="text" value={form.last_name} onChange={set('last_name')} placeholder="Sharma" className="w-full rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm outline-none focus:border-secondary transition-all" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-xs text-primary font-bold uppercase tracking-widest ml-1">Email</label>
              <input type="email" value={form.email} onChange={set('email')} required placeholder="you@example.com" className="w-full rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm outline-none focus:border-secondary transition-all" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-xs text-primary font-bold uppercase tracking-widest ml-1">Username</label>
              <input type="text" value={form.username} onChange={set('username')} required placeholder="aarav" className="w-full rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm outline-none focus:border-secondary transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-xs text-primary font-bold uppercase tracking-widest ml-1">Password</label>
                <input type="password" value={form.password} onChange={set('password')} required minLength={8} placeholder="••••••••" className="w-full rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm outline-none focus:border-secondary transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-xs text-primary font-bold uppercase tracking-widest ml-1">Confirm</label>
                <input type="password" value={form.password_confirm} onChange={set('password_confirm')} required placeholder="••••••••" className="w-full rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm outline-none focus:border-secondary transition-all" />
              </div>
            </div>

            {error && (
              <div className="bg-error-container text-on-error-container rounded-xl px-4 py-3 text-sm font-semibold flex items-center gap-2">
                <Icon name="error" className="text-[18px]" />
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary-container text-primary font-bold py-3 hover:bg-[#bbfb64] transition-all disabled:opacity-50">
              {loading && <Spinner size="sm" />}
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="text-center font-label-sm text-label-sm text-on-surface-variant mt-6">
            Already have an account? <Link to="/login" className="text-secondary font-bold hover:text-primary">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}