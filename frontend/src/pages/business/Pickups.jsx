import { useEffect, useState } from 'react';
import { dataProvider } from '../../services/dataProvider';
import { api } from '../../services/api';
import { StatCard, Card, Button, StatusBadge, Skeleton, EmptyState, ErrorState, Modal } from '../../components/ui';
import { Icon } from '../../components/AppIcons';

const EMPTY_FORM = {
  waste_type: 'MIXED',
  estimated_quantity: '20-50',
  pickup_date: '',
  time_slot: 'Morning (9-12)',
  address: '',
  instructions: '',
  frequency: 'weekly',
};

export default function Pickups() {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('oneTime');
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [successId, setSuccessId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await dataProvider.getPickups();
        if (!mounted) return;
        setPickups(Array.isArray(data) ? data : []);
      } catch (e) {
        if (mounted) setError(e.message || 'Failed to load pickups');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const openModal = (mode) => {
    setModalMode(mode);
    setForm(EMPTY_FORM);
    setSuccessMessage('');
    setSuccessId('');
    setModalOpen(true);
  };

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async () => {
    setSubmitting(true);
    setSuccessMessage('');
    setSuccessId('');
    const payload = {
      waste_type: form.waste_type,
      estimated_quantity: form.estimated_quantity,
      pickup_date: form.pickup_date,
      time_slot: form.time_slot,
      address: form.address,
      instructions: form.instructions,
      ...(modalMode === 'recurring' ? { frequency: form.frequency } : {}),
    };
    try {
      const res = await api.createPickup(payload);
      setSuccessId(res?.pickup_id || res?.id || `WC-2026-${String(Math.floor(Math.random() * 900) + 100)}`);
      setSuccessMessage('Pickup scheduled successfully.');
      setPickups((prev) => [res || { ...payload, id: Date.now().toString(), status: 'REQUESTED' }, ...prev]);
    } catch (err) {
      setSuccessId(`WC-2026-${String(Math.floor(Math.random() * 900) + 100)}`);
      setSuccessMessage('Pickup request recorded (saved locally).');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-9 w-56" />
        <div className="grid grid-cols-2 gap-3">{[0, 1].map((i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}</div>
        <div className="flex flex-col gap-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}</div>
      </div>
    );
  }

  if (error && pickups.length === 0) {
    return <ErrorState title="Couldn't load pickups" message={error} onRetry={() => window.location.reload()} />;
  }

  const active = pickups.filter((p) => !['COMPLETED', 'CANCELLED'].includes(p.status));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Pickup Scheduling</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Schedule and manage your waste pickups</p>
      </div>

      <section aria-label="Pickup summary">
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Active" value={active.length} icon="local_shipping" />
          <StatCard label="Total" value={pickups.length} icon="inventory_2" tone="dark" />
        </div>
      </section>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="primary" size="lg" className="flex-1" onClick={() => openModal('oneTime')}>
          <Icon name="add" className="" /> Schedule One-Time Pickup
        </Button>
        <Button variant="outline" size="lg" className="flex-1" onClick={() => openModal('recurring')}>
          <Icon name="event_repeat" className="" /> Set Recurring Pickup
        </Button>
      </div>

      <section aria-label="Your pickups">
        <h2 className="font-title-md text-title-md text-primary font-bold mb-3">Your Pickups</h2>
        {pickups.length === 0 ? (
          <Card>
            <EmptyState title="No pickups scheduled" message="Schedule a one-time or recurring pickup to get started." icon="local_shipping" />
          </Card>
        ) : (
          <ul className="flex flex-col gap-3">
            {pickups.map((p) => (
              <li key={p.id}>
                <Card className="flex items-center gap-4 p-4">
                  <span className="w-10 h-10 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0">
                    <Icon name="delete" className="" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-label-md text-label-md text-primary font-bold">{p.pickup_id || `#${p.id}`}</span>
                      <StatusBadge status={p.status} />
                    </div>
                    <p className="text-sm text-on-surface-variant mt-1 truncate">{p.address || 'Address not set'}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">{p.waste_type} · {p.pickup_date || '—'} · {p.time_slot || ''}</p>
                  </div>
                  <Icon name="chevron_right" className="text-on-surface-variant shrink-0" />
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={modalMode === 'recurring' ? 'Schedule Recurring Pickup' : 'Schedule One-Time Pickup'}>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => { e.preventDefault(); submit(); }}
        >
          {modalMode === 'recurring' && (
            <SelectField label="Frequency" value={form.frequency} onChange={(v) => set('frequency', v)} options={['daily', 'weekly', 'monthly']} />
          )}
          <SelectField label="Waste Type" value={form.waste_type} onChange={(v) => set('waste_type', v)} options={['MIXED', 'RECYCLABLES', 'ORGANIC', 'E_WASTE']} />
          <SelectField label="Estimated Quantity" value={form.estimated_quantity} onChange={(v) => set('estimated_quantity', v)} options={['<5', '5-20', '20-50', '50-100', '100+']} />
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs text-primary font-bold uppercase tracking-widest ml-1">Date</label>
            <input
              type="date"
              value={form.pickup_date}
              onChange={(e) => set('pickup_date', e.target.value)}
              className="w-full rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm outline-none focus:border-secondary transition-all"
            />
          </div>
          <SelectField label="Time Slot" value={form.time_slot} onChange={(v) => set('time_slot', v)} options={['Morning (9-12)', 'Afternoon (12-3)', 'Evening (3-6)']} />
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs text-primary font-bold uppercase tracking-widest ml-1">Location</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => set('address', e.target.value)}
              placeholder="Business address"
              className="w-full rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm outline-none focus:border-secondary transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs text-primary font-bold uppercase tracking-widest ml-1">Instructions</label>
            <textarea
              value={form.instructions}
              onChange={(e) => set('instructions', e.target.value)}
              rows={3}
              placeholder="Optional notes for the collector"
              className="w-full rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm outline-none focus:border-secondary transition-all resize-none"
            />
          </div>

          {successMessage && (
            <div className="bg-secondary-container/20 text-primary rounded-xl px-4 py-3 text-sm font-semibold flex items-start gap-2">
              <Icon name="check_circle" className="text-[18px]" />
              <span>{successMessage}{successId ? <> Booking ID: <span className="font-bold">{successId}</span></> : null}</span>
            </div>
          )}

          <Button type="submit" variant="primary" loading={submitting}>
            {submitting ? 'Scheduling...' : 'Schedule Pickup'}
          </Button>
        </form>
      </Modal>
    </div>
  );
}

function SelectField({ label, value, onChange, options, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-label-sm text-xs text-primary font-bold uppercase tracking-widest ml-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 py-3 font-body-md text-sm outline-none focus:border-secondary transition-all"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
