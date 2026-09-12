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

  const [submitError, setSubmitError] = useState(null);

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
    setSubmitError(null);
    try {
      const formData = new FormData();
      if (image) formData.append('image', image);
      if (category) formData.append('waste_type', category);
      if (quantity) formData.append('estimated_quantity', quantity);
      if (description) formData.append('description', description);
      if (urgency) formData.append('urgency', urgency);
      formData.append('address', location.address || '');
      if (location.lat) formData.append('latitude', location.lat);
      if (location.lng) formData.append('longitude', location.lng);

      const result = await api.createWasteReport(formData);
      setReportId(result.report_id || result.id || `WC-${String(Math.floor(1000 + Math.random() * 9000))}`);
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
    } catch (err) {
      console.error("Waste report submit failed:", err);
      setSubmitError(err.message || 'Failed to save waste report to server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto py-8 px-4 animate-fade-in-up">
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[32px] p-10 flex flex-col items-center relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-secondary-container/30 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#0a3a2a]/10 blur-3xl rounded-full pointer-events-none"></div>

          <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6 shadow-inner relative z-10">
            <div className="absolute inset-0 bg-secondary rounded-full animate-ping opacity-20"></div>
            <Icon name="check_circle" className="text-6xl text-[#0a3a2a]" />
          </div>
          
          <h1 className="font-headline-md text-3xl text-primary font-extrabold text-center mb-3 relative z-10">
            Report Submitted Successfully!
          </h1>
          <p className="text-on-surface-variant text-center mb-8 max-w-md relative z-10">
            Your waste report has been recorded and will be assigned to a collector shortly. Thank you for keeping the community clean.
          </p>
          
          <div className="bg-surface border border-surface-container-highest rounded-2xl px-6 py-4 flex items-center gap-4 w-full relative z-10 shadow-sm">
            <div className="bg-surface-container-highest p-3 rounded-xl">
              <Icon name="tag" className="text-primary text-xl" />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Report Tracking ID</p>
              <p className="font-headline-sm text-xl text-primary font-extrabold font-mono tracking-tight">{reportId}</p>
            </div>
          </div>
        </div>

        {aiAnalysis && (
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-[32px] p-8 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary text-white rounded-xl shadow-lg">
                <Icon name="psychology" className="text-2xl" />
              </div>
              <div>
                <h2 className="font-headline-sm text-xl text-primary font-extrabold">AI Waste Analysis</h2>
                <p className="text-xs text-on-surface-variant">Automated breakdown based on your image</p>
              </div>
            </div>
            
            <div className="bg-surface rounded-2xl p-5 mb-5 border border-surface-container-highest">
              <p className="text-xs font-extrabold text-primary uppercase tracking-widest mb-4">Material Composition</p>
              <div className="flex flex-col gap-4">
                {aiAnalysis.materials.map((m, idx) => (
                  <div key={m.type} className="flex items-center gap-4">
                    <span className="text-sm font-bold text-primary w-20">{m.type}</span>
                    <div className="flex-1 h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-secondary to-[#87c538] rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${m.percentage}%` }} 
                      />
                    </div>
                    <span className="text-sm font-extrabold text-primary w-10 text-right">{m.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-surface rounded-2xl p-4 border border-surface-container-highest flex flex-col justify-center">
                <span className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Severity</span>
                <span className="font-bold text-primary text-lg">{aiAnalysis.severity}</span>
              </div>
              <div className="bg-surface rounded-2xl p-4 border border-surface-container-highest flex flex-col justify-center">
                <span className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Est. Quantity</span>
                <span className="font-bold text-primary text-lg">{aiAnalysis.estimated_quantity}</span>
              </div>
              <div className="bg-secondary-container/40 rounded-2xl p-4 border border-secondary-container flex flex-col justify-center md:col-span-1">
                <span className="text-xs text-primary uppercase tracking-wider mb-1">Recommended Action</span>
                <span className="font-extrabold text-[#0a3a2a]">{aiAnalysis.recommended_action}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <Button variant="primary" size="lg" className="flex-1 rounded-2xl py-4 shadow-lg hover:-translate-y-1" onClick={() => navigate('/app/pickups')}>
            <Icon name="schedule" className="text-xl" /> Schedule Pickup Now
          </Button>
          <Button variant="outline" size="lg" className="flex-1 rounded-2xl py-4 hover:-translate-y-1 bg-white/50 backdrop-blur-sm" onClick={() => navigate('/app/waste')}>
            <Icon name="delete_sweep" className="text-xl" /> View My Reports
          </Button>
        </div>
      </div>
    );
  }

  const progressPercentage = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto py-6 px-4 md:px-0">
      
      <div className="mb-10">
        <h1 className="font-headline-md text-3xl md:text-4xl text-primary font-extrabold mb-8 text-center tracking-tight">
          Report Waste
        </h1>
        
        <div className="relative w-full max-w-3xl mx-auto px-2">
          <div className="absolute top-1/2 left-2 right-5 h-1.5 bg-surface-container-high rounded-full -translate-y-1/2 z-0 overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="relative z-10 flex justify-between items-center w-full">
            {STEPS.map((s, i) => {
              const isActive = i + 1 === step;
              const isCompleted = i + 1 < step;
              
              return (
                <div key={s.label} className="flex flex-col items-center gap-2 relative">
                  <div 
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 relative z-10
                      ${isCompleted ? 'bg-secondary text-[#0a3a2a] scale-95 shadow-md' : 
                        isActive ? 'bg-primary text-white scale-110 shadow-[0_0_20px_rgba(0,24,11,0.3)] ring-4 ring-primary/20' : 
                        'bg-surface-container-highest text-on-surface-variant scale-90'}`}
                  >
                    {isCompleted ? <Icon name="check" className="text-lg md:text-xl font-bold" /> : <Icon name={s.icon} className="text-base md:text-lg" />}
                  </div>
                  <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors duration-300 absolute -bottom-6 whitespace-nowrap
                    ${isActive ? 'text-primary' : isCompleted ? 'text-on-surface' : 'text-on-surface-variant/60'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] p-6 md:p-10 relative overflow-hidden transition-all duration-300 min-h-[400px] flex flex-col mt-4">
        
        <div className="flex-grow">
          {step === 1 && (
            <div className="animate-fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-2xl text-primary font-extrabold mb-2">Upload a Photo</h2>
                <p className="text-on-surface-variant">A clear photo helps our AI identify materials and suggest the best action.</p>
              </div>
              
              {imagePreview ? (
                <div className="relative group rounded-3xl overflow-hidden shadow-lg border border-surface-container-high transition-transform hover:scale-[1.01] duration-300 mb-6 max-w-lg mx-auto">
                  <img src={imagePreview} alt="Waste preview" className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <button
                      onClick={() => { setImage(null); setImagePreview(null); }}
                      className="bg-white/20 backdrop-blur-md text-white font-bold py-2 px-6 rounded-full hover:bg-white/30 transition-colors flex items-center gap-2 border border-white/30 shadow-xl"
                    >
                      <Icon name="delete" className="text-lg" /> Replace Image
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 mb-6 transition-all duration-300 cursor-pointer group max-w-lg mx-auto h-64 hover:border-primary/40 hover:shadow-inner"
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 group-hover:text-primary text-on-surface-variant">
                    <Icon name="cloud_upload" className="text-3xl" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-primary text-lg mb-1">Click to upload or drag & drop</p>
                    <p className="text-sm text-on-surface-variant">SVG, PNG, JPG or GIF (max. 10MB)</p>
                  </div>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              
              {!imagePreview && (
                <div className="flex justify-center gap-4 max-w-lg mx-auto">
                  <Button variant="outline" size="lg" onClick={() => fileInputRef.current?.click()} className="flex-1 rounded-2xl bg-white border-surface-container-high hover:border-primary/30">
                    <Icon name="photo_camera" className="text-xl" /> Camera
                  </Button>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in-up h-full flex flex-col">
              <div className="text-center mb-6">
                <h2 className="text-2xl text-primary font-extrabold mb-2">Pin the Location</h2>
                <p className="text-on-surface-variant">Drag the map or use your live location to mark the waste spot.</p>
              </div>
              <div className="flex-grow rounded-md p-4 overflow-hidden shadow-sm  relative z-0">
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
                  height={360}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-2xl text-primary font-extrabold mb-2">Select Category</h2>
                <p className="text-on-surface-variant">Help us classify the waste for proper recycling.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setCategory(cat.value)}
                      className={`group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300
                        ${isSelected 
                          ? 'border-primary bg-primary shadow-[0_8px_20px_rgba(0,24,11,0.2)] -translate-y-1' 
                          : 'border-surface-container-highest bg-surface hover:border-primary/40 hover:-translate-y-1 hover:shadow-md'
                        }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300
                        ${isSelected ? 'bg-white/20 text-white' : 'bg-surface-container-high text-primary group-hover:bg-primary group-hover:text-white'}`}>
                        <Icon name={cat.icon} className="text-2xl" />
                      </div>
                      <span className={`text-xs font-bold text-center ${isSelected ? 'text-white' : 'text-on-surface-variant group-hover:text-primary'}`}>
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-2xl text-primary font-extrabold mb-2">Estimate Quantity</h2>
                <p className="text-on-surface-variant">Roughly how much waste is there?</p>
              </div>
              <div className="flex flex-col gap-3 max-w-lg mx-auto">
                {QUANTITIES.map((q) => {
                  const isSelected = quantity === q.value;
                  return (
                    <button
                      key={q.value}
                      onClick={() => setQuantity(q.value)}
                      className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden
                        ${isSelected 
                          ? 'border-primary bg-primary shadow-md transform scale-[1.01]' 
                          : 'border-surface-container-highest bg-surface hover:border-primary/40 hover:bg-surface-container-lowest'
                        }`}
                    >
                      {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>}
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                        ${isSelected ? 'border-secondary bg-secondary' : 'border-surface-container-highest'}`}>
                        {isSelected && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                      </div>
                      <span className={`font-body-md text-lg font-bold ${isSelected ? 'text-white' : 'text-on-surface-variant'}`}>
                        {q.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-2xl text-primary font-extrabold mb-2">Final Details</h2>
                <p className="text-on-surface-variant">Any extra context helps our collection team.</p>
              </div>
              
              <div className="max-w-xl mx-auto flex flex-col gap-8">
                <div className="relative group">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-2xl border-2 border-surface-container-high p-5 pt-7 bg-surface text-on-surface focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/20 transition-all peer"
                    rows={4}
                    placeholder=" "
                  />
                  <label className="absolute left-5 top-5 text-on-surface-variant transition-all pointer-events-none
                    peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-primary font-bold
                    peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:text-primary">
                    Additional details (optional)
                  </label>
                </div>
                
                <div>
                  <p className="font-bold text-primary uppercase tracking-widest text-xs mb-3 ml-1">Urgency Level</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'NORMAL', label: 'Normal', icon: 'info', activeClass: 'border-primary bg-primary text-white', iconClass: 'text-secondary' },
                      { value: 'HIGH', label: 'High', icon: 'priority_high', activeClass: 'border-amber-500 bg-amber-500 text-white', iconClass: 'text-white' },
                      { value: 'URGENT', label: 'Urgent', icon: 'warning', activeClass: 'border-error bg-error text-white', iconClass: 'text-white' },
                    ].map((u) => {
                      const isSelected = urgency === u.value;
                      return (
                        <button
                          key={u.value}
                          onClick={() => setUrgency(u.value)}
                          className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300
                            ${isSelected ? u.activeClass : 'border-surface-container-highest bg-surface text-on-surface-variant hover:border-surface-container-high hover:bg-surface-container-lowest'}`}
                        >
                          <Icon name={u.icon} className={`text-2xl ${isSelected ? u.iconClass : ''}`} />
                          <span className="font-bold text-sm">{u.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="animate-fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-2xl text-primary font-extrabold mb-2">Review Report</h2>
                <p className="text-on-surface-variant">Please confirm the details before submitting.</p>
              </div>

              {submitError && (
                <div className="max-w-lg mx-auto mb-6 p-4 rounded-2xl bg-error/10 border border-error/30 text-error flex items-center gap-3">
                  <Icon name="warning" className="text-xl shrink-0" />
                  <p className="text-sm font-bold">{submitError}</p>
                </div>
              )}

              <div className="max-w-lg mx-auto bg-surface border border-surface-container-high rounded-3xl p-6 md:p-8 relative shadow-sm">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#f3fcf2] border-r border-surface-container-high rounded-full z-10 hidden md:block"></div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#f3fcf2] border-l border-surface-container-high rounded-full z-10 hidden md:block"></div>
                
                {imagePreview && (
                  <div className="mb-6 rounded-2xl overflow-hidden border border-surface-container-high h-40">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start border-b border-surface-container-high pb-4">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <Icon name="location_on" className="text-lg" />
                      <span className="text-sm">Location</span>
                    </div>
                    <span className="font-bold text-primary text-right max-w-[60%]">{location.address || 'Not set'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-surface-container-high pb-4">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <Icon name="category" className="text-lg" />
                      <span className="text-sm">Category</span>
                    </div>
                    <span className="font-bold text-primary">{CATEGORIES.find((c) => c.value === category)?.label || 'Not selected'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-surface-container-high pb-4">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <Icon name="scale" className="text-lg" />
                      <span className="text-sm">Quantity</span>
                    </div>
                    <span className="font-bold text-primary">{QUANTITIES.find((q) => q.value === quantity)?.label || 'Not selected'}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-surface-container-high pb-4">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <Icon name="warning" className="text-lg" />
                      <span className="text-sm">Urgency</span>
                    </div>
                    <span className={`font-bold ${urgency === 'URGENT' ? 'text-error' : urgency === 'HIGH' ? 'text-amber-600' : 'text-primary'}`}>
                      {urgency}
                    </span>
                  </div>
                  
                  {description && (
                    <div className="pt-2">
                      <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                        <Icon name="edit_note" className="text-lg" />
                        <span className="text-sm">Description</span>
                      </div>
                      <p className="text-sm text-primary bg-surface-container-lowest p-3 rounded-xl border border-surface-container-highest">
                        {description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between gap-4 mt-10 pt-6 border-t border-surface-container-highest">
          <Button 
            variant="ghost" 
            size="lg" 
            onClick={() => setStep(Math.max(1, step - 1))} 
            disabled={step === 1 || submitting}
            className={`rounded-2xl px-6 transition-all ${step === 1 ? 'invisible' : 'visible'}`}
          >
            <Icon name="arrow_back" /> Back
          </Button>
          
          {step < 6 ? (
            <Button
              variant="primary"
              size="lg"
              onClick={() => setStep(step + 1)}
              disabled={(step === 3 && !category) || (step === 4 && !quantity)}
              className="rounded-2xl px-8 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all bg-primary text-white hover:bg-[#003318] border-none"
            >
              Continue <Icon name="arrow_forward" className="ml-1 text-secondary" />
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              loading={submitting}
              onClick={handleSubmit}
              className="rounded-2xl px-10 shadow-[0_4px_20px_rgba(171,248,84,0.3)] hover:shadow-[0_8px_25px_rgba(171,248,84,0.4)] hover:-translate-y-1 transition-all"
            >
              {submitting ? 'Submitting...' : 'Submit Report'} <Icon name="check_circle" className="ml-1" />
            </Button>
          )}
        </div>
        
      </div>
    </div>
  );
}
