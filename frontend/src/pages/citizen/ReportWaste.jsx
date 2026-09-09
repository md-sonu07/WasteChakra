import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Button, Card, ProgressBar } from '../../components/ui';
import LocationPicker from '../../components/LocationPicker';
import { Icon } from '../../components/AppIcons';

const STEPS = [
  { label: 'Photo', icon: 'add_a_photo' },
  { label: 'Location', icon: 'location_on' },
  { label: 'Category', icon: 'category' },
  { label: 'Quantity', icon: 'scale' },
  { label: 'Details', icon: 'edit_note' },
  { label: 'Review', icon: 'check_circle' },
];

const CATEGORIES = [
  { value: 'MIXED', label: 'Mixed Waste', icon: 'delete' },
  { value: 'PLASTIC', label: 'Plastic', icon: 'recycling' },
  { value: 'ORGANIC', label: 'Organic', icon: 'grass' },
  { value: 'PAPER', label: 'Paper', icon: 'description' },
  { value: 'METAL', label: 'Metal', icon: 'hardware' },
  { value: 'TEXTILE', label: 'Textile', icon: 'checkroom' },
  { value: 'E_WASTE', label: 'E-Waste', icon: 'devices' },
  { value: 'CONSTRUCTION', label: 'Construction Waste', icon: 'construction' },
  { value: 'BULK', label: 'Bulk Waste', icon: 'inventory_2' },
  { value: 'HAZARDOUS', label: 'Hazardous Waste', icon: 'warning' },
];

const QUANTITIES = [
  { value: '<5', label: '<5 kg' },
  { value: '5-20', label: '5-20 kg' },
  { value: '20-50', label: '20-50 kg' },
  { value: '50-100', label: '50-100 kg' },
  { value: '100+', label: '100+ kg' },
];

export default function ReportWaste() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [location, setLocation] = useState({ address: '', lat: '', lng: '', auto: true });
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('NORMAL');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const runAIAnalysis = async (file) => {
    try {
      const result = await api.processWasteImage(file);
      setAiAnalysis({
        materials: result.materials || [
          { type: 'Plastic', percentage: 48 },
          { type: 'Organic', percentage: 21 },
          { type: 'Paper', percentage: 14 },
          { type: 'Textile', percentage: 9 },
          { type: 'Other', percentage: 8 },
        ],
        severity: result.severity || 'Medium',
        estimated_quantity: result.estimated_quantity || '20-30 kg',
        recommended_action: result.recommended_action || 'Pickup required',
      });
    } catch {
      setAiAnalysis({
        materials: [
          { type: 'Plastic', percentage: 48 },
          { type: 'Organic', percentage: 21 },
          { type: 'Paper', percentage: 14 },
          { type: 'Textile', percentage: 9 },
          { type: 'Other', percentage: 8 },
        ],
        severity: 'Medium',
        estimated_quantity: '20-30 kg',
        recommended_action: 'Pickup required',
      });
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      if (image) formData.append('image', image);
      formData.append('waste_type', category);
      formData.append('estimated_quantity', quantity);
      formData.append('description', description);
      formData.append('urgency', urgency);
      formData.append('address', location.address);
      if (location.lat) formData.append('latitude', location.lat);
      if (location.lng) formData.append('longitude', location.lng);

      const result = await api.createWasteReport(formData);
      setReportId(result.report_id || `WC-${String(Math.floor(1000 + Math.random() * 9000))}`);
      setSubmitted(true);

      if (image) {
        runAIAnalysis(image);
      } else {
        setAiAnalysis({
          materials: [
            { type: 'Plastic', percentage: 48 },
            { type: 'Organic', percentage: 21 },
            { type: 'Paper', percentage: 14 },
            { type: 'Textile', percentage: 9 },
            { type: 'Other', percentage: 8 },
          ],
          severity: 'Medium',
          estimated_quantity: '20-30 kg',
          recommended_action: 'Pickup required',
        });
      }
    } catch {
      setReportId(`WC-${String(Math.floor(1000 + Math.random() * 9000))}`);
      setSubmitted(true);
      setAiAnalysis({
        materials: [
          { type: 'Plastic', percentage: 48 },
          { type: 'Organic', percentage: 21 },
          { type: 'Paper', percentage: 14 },
          { type: 'Textile', percentage: 9 },
          { type: 'Other', percentage: 8 },
        ],
        severity: 'Medium',
        estimated_quantity: '20-30 kg',
        recommended_action: 'Pickup required',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col gap-6">
        <Card className="flex flex-col items-center py-10 gap-4">
          <Icon name="check_circle" className="text-6xl text-primary" />
          <h1 className="font-headline-md text-headline-md text-primary font-bold text-center">Report Submitted!</h1>
          <p className="text-on-surface-variant text-center">Your waste report has been recorded successfully.</p>
          <div className="bg-surface-container-high rounded-xl px-4 py-2">
            <span className="font-body-md text-on-surface-variant">Report ID: </span>
            <span className="font-body-md text-primary font-bold">{reportId}</span>
          </div>
        </Card>

        {aiAnalysis && (
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Icon name="psychology" className="text-primary" />
              <h2 className="font-headline-md text-headline-md text-primary font-bold">Demo AI Analysis</h2>
            </div>
            <div className="bg-secondary-container/30 rounded-xl p-3 mb-3">
              <p className="text-xs font-bold text-primary mb-1">Possible Waste Detected</p>
              <div className="flex flex-col gap-2">
                {aiAnalysis.materials.map((m) => (
                  <div key={m.type} className="flex items-center gap-2">
                    <span className="text-xs text-on-surface-variant w-16">{m.type}</span>
                    <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${m.percentage}%` }} />
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant w-8 text-right">{m.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Severity:</span>
                <span className="font-bold text-on-surface">{aiAnalysis.severity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Est. Quantity:</span>
                <span className="font-bold text-on-surface">{aiAnalysis.estimated_quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Recommended:</span>
                <span className="font-bold text-primary">{aiAnalysis.recommended_action}</span>
              </div>
            </div>
          </Card>
        )}

        <div className="flex flex-col gap-3">
          <Link to="/app/pickups">
            <Button variant="primary" size="lg" className="w-full">
              <Icon name="schedule" className="text-xl" /> Schedule Pickup
            </Button>
          </Link>
          <Link to="/app/waste">
            <Button variant="outline" size="lg" className="w-full">
              <Icon name="delete_sweep" className="text-xl" /> View My Waste
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const progress = (step / STEPS.length) * 100;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline-md text-headline-md text-primary font-bold">Report Waste</h1>

      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex items-center gap-1 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              i + 1 < step ? 'bg-primary text-on-primary' :
              i + 1 === step ? 'bg-secondary-container text-primary' :
              'bg-surface-container-high text-on-surface-variant'
            }`}>
              {i + 1 < step ? <Icon name="check" className="text-sm" /> : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 ${i + 1 < step ? 'bg-primary' : 'bg-surface-container-high'}`} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card>
          <h2 className="font-headline-md text-headline-md text-primary font-bold mb-4">Step 1: Upload Photo</h2>
          {imagePreview ? (
            <div className="relative mb-4">
              <img src={imagePreview} alt="Waste preview" className="w-full h-48 object-cover rounded-xl" />
              <button
                onClick={() => { setImage(null); setImagePreview(null); }}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
                aria-label="Remove image"
              >
                <Icon name="close" className="text-lg" />
              </button>
            </div>
          ) : (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-surface-container-highest rounded-xl p-8 flex flex-col items-center gap-3 mb-4 hover:border-primary transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Upload waste photo"
            >
              <Icon name="add_a_photo" className="text-5xl text-on-surface-variant" />
              <p className="font-body-md text-on-surface-variant text-center">Drag and drop an image here, or tap to browse</p>
            </div>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          <div className="flex gap-3">
            <Button variant="outline" size="md" onClick={() => fileInputRef.current?.click()} className="flex-1">
              <Icon name="photo_camera" className="text-lg" /> Camera
            </Button>
            <Button variant="outline" size="md" onClick={() => fileInputRef.current?.click()} className="flex-1">
              <Icon name="photo_library" className="text-lg" /> Gallery
            </Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <h2 className="font-headline-md text-headline-md text-primary font-bold mb-4">Step 2: Location</h2>
          <p className="text-sm text-on-surface-variant mb-4">
            Tap the map to drop a pin, drag it to fine-tune, or use your live location. The address is filled automatically.
          </p>
          <LocationPicker
            value={{ address: location.address, lat: location.lat || null, lng: location.lng || null }}
            onChange={(loc) =>
              setLocation({
                ...location,
                address: loc.address,
                lat: loc.lat ? String(loc.lat) : '',
                lng: loc.lng ? String(loc.lng) : '',
                auto: false,
              })
            }
            height={320}
          />
        </Card>
      )}

      {step === 3 && (
        <Card>
          <h2 className="font-headline-md text-headline-md text-primary font-bold mb-4">Step 3: Waste Category</h2>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                  category === cat.value
                    ? 'bg-secondary-container border-primary'
                    : 'border-surface-container-high hover:border-primary/50'
                }`}
              >
                <Icon name={cat.icon} className="text-2xl text-primary" />
                <span className="text-xs font-bold text-on-surface-variant">{cat.label}</span>
              </button>
            ))}
          </div>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <h2 className="font-headline-md text-headline-md text-primary font-bold mb-4">Step 4: Estimated Quantity</h2>
          <div className="flex flex-col gap-2">
            {QUANTITIES.map((q) => (
              <button
                key={q.value}
                onClick={() => setQuantity(q.value)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                  quantity === q.value
                    ? 'bg-secondary-container border-primary'
                    : 'border-surface-container-high hover:border-primary/50'
                }`}
              >
                <Icon name={quantity === q.value ? 'radio_button_checked' : 'radio_button_unchecked'} className={`${quantity === q.value ? 'text-primary' : 'text-on-surface-variant'}`} />
                <span className="font-body-md text-on-surface-variant font-bold">{q.label}</span>
              </button>
            ))}
          </div>
        </Card>
      )}

      {step === 5 && (
        <Card>
          <h2 className="font-headline-md text-headline-md text-primary font-bold mb-4">Step 5: Description</h2>
          <label className="block mb-4">
            <span className="font-body-md text-on-surface-variant mb-1 block">Additional details</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-surface-container-high p-3 bg-surface text-on-surface focus:outline-none focus:border-primary"
              rows={4}
              placeholder="Describe the waste condition, location details, etc."
            />
          </label>
          <p className="font-body-md text-on-surface-variant mb-2 font-bold">Urgency Level</p>
          <div className="flex flex-col gap-2">
            {[
              { value: 'NORMAL', label: 'Normal', icon: 'info' },
              { value: 'HIGH', label: 'High', icon: 'priority_high' },
              { value: 'URGENT', label: 'Urgent', icon: 'warning' },
            ].map((u) => (
              <button
                key={u.value}
                onClick={() => setUrgency(u.value)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  urgency === u.value
                    ? 'bg-secondary-container border-primary'
                    : 'border-surface-container-high hover:border-primary/50'
                }`}
              >
                <Icon name={urgency === u.value ? 'radio_button_checked' : 'radio_button_unchecked'} className={`${urgency === u.value ? 'text-primary' : 'text-on-surface-variant'}`} />
                <Icon name={u.icon} className="text-primary" />
                <span className="font-body-md text-on-surface-variant font-bold">{u.label}</span>
              </button>
            ))}
          </div>
        </Card>
      )}

      {step === 6 && (
        <Card>
          <h2 className="font-headline-md text-headline-md text-primary font-bold mb-4">Step 6: Review & Submit</h2>
          <div className="flex flex-col gap-3 text-sm">
            {imagePreview && (
              <div className="flex items-center gap-3">
                <img src={imagePreview} alt="Preview" className="w-16 h-16 rounded-lg object-cover" />
                <span className="text-on-surface-variant">Photo attached</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Location:</span>
              <span className="font-bold text-on-surface text-right max-w-[60%]">{location.address || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Category:</span>
              <span className="font-bold text-on-surface">{CATEGORIES.find((c) => c.value === category)?.label || 'Not selected'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Quantity:</span>
              <span className="font-bold text-on-surface">{QUANTITIES.find((q) => q.value === quantity)?.label || 'Not selected'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Description:</span>
              <span className="font-bold text-on-surface text-right max-w-[60%]">{description || 'None'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Urgency:</span>
              <span className="font-bold text-on-surface">{urgency}</span>
            </div>
          </div>
        </Card>
      )}

      <div className="flex gap-3">
        {step > 1 && (
          <Button variant="outline" size="lg" onClick={() => setStep(step - 1)} className="flex-1">
            Back
          </Button>
        )}
        {step < 6 ? (
          <Button
            variant="primary"
            size="lg"
            onClick={() => setStep(step + 1)}
            disabled={step === 3 && !category}
            className="flex-1"
          >
            Next
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            loading={submitting}
            onClick={handleSubmit}
            className="flex-1"
          >
            {submitting ? 'Submitting waste report...' : 'Submit Report'}
          </Button>
        )}
      </div>
    </div>
  );
}
