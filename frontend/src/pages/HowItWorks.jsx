import { Link } from 'react-router-dom';
import { Icon } from '../components/AppIcons';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Book Online or Call',
      description: 'Select your waste volume, pickup window, and location in under 2 minutes. Receive upfront transparent pricing instantly — no hidden fees, no surprises.',
      icon: 'touch_app',
      detail: 'Instant digital dispatch',
    },
    {
      number: '2',
      title: 'Smart Eco-Truck Arrival',
      description: 'Our uniformed, insured field crew arrives on schedule with low-emission collection vehicles. We sort, load, and secure all materials safely on-site.',
      icon: 'local_shipping',
      detail: 'Real-time GPS tracking',
    },
    {
      number: '3',
      title: '100% Traceable Circular Hub',
      description: 'Items are transferred to our circular sorting hubs. Organics become compost, recyclables rejoin manufacturing streams, and combustible fractions become quality-controlled RDF.',
      icon: 'compost',
      detail: 'ESG diversion receipt issued',
    },
  ];

  const loop = [
    { icon: 'flag', label: 'Report' },
    { icon: 'local_shipping', label: 'Recover' },
    { icon: 'precision_manufacturing', label: 'Process' },
    { icon: 'emoji_events', label: 'Reward' },
    { icon: 'autorenew', label: 'Repeat' },
  ];

  const mrfStages = [
    { icon: 'inventory_2', title: 'Reception', description: 'Incoming MSW is weighed, scanned, and logged into the digital tracking system with full batch provenance.' },
    { icon: 'qr_code_scanner', title: 'AI Material Scanner', description: 'Hyperspectral cameras and AI classifiers identify waste composition in real-time for adaptive routing decisions.' },
    { icon: 'hardware', title: 'Pre-processing / Shredding', description: 'Oversized and bundled materials are mechanically broken down to uniform sizing for downstream efficiency.' },
    { icon: 'filter_alt', title: 'Trommel Screen', description: 'Rotating drum screens separate waste by particle size, isolating fines, mid-range fractions, and oversize materials.' },
    { icon: 'magnet', title: 'Magnetic Separator', description: 'High-power overhead magnets extract ferrous metals with 99% capture efficiency from the moving waste stream.' },
    { icon: 'tokens', title: 'Non-Ferrous Separator', description: 'Eddy current separators recover aluminum, copper, and other non-ferrous metals for downstream smelting.' },
    { icon: 'camera', title: 'Optical AI Sorter', description: 'AI-powered robotic arms with optical sensors identify and remove remaining contaminants at high speed.' },
    { icon: 'verified', title: 'Quality / Contamination Check', description: 'Final inline inspection ensures output meets strict purity thresholds before advancing to conditioning.' },
    { icon: 'route', title: 'Intelligent Routing', description: 'Cleaned fractions are automatically directed to composting, recycling, or RDF conditioning based on material properties.' },
  ];

  return (
    <div className="grow w-full max-w-container-max mx-auto px-gutter py-16 md:py-space-3xl">
      <header className="mb-20 md:mb-space-4xl">
        <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase mb-space-xs">
          <span>✳</span>
          <span>How It Works</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-display-hero text-primary font-bold tracking-tight max-w-4xl leading-tight">
          From waste to <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-secondary">resource</span> in three steps
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-md max-w-2xl">
          Our streamlined process makes responsible waste management effortless for households, businesses, and municipalities alike.
        </p>
      </header>

      <section className="mb-24 md:mb-space-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg relative">
          {steps.map((step) => (
            <div key={step.number} className="bg-surface-container-lowest p-space-xl rounded-[28px] border border-surface-container-high/70 shadow-sm relative flex flex-col group hover:border-secondary hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-secondary-container text-primary font-headline-sm text-headline-sm font-extrabold flex items-center justify-center mb-space-md shadow-sm">
                {step.number}
              </div>
              <h3 className="font-title-md text-title-md text-primary font-bold mb-space-xs">{step.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                {step.description}
              </p>
              <div className="mt-auto flex items-center gap-2 text-secondary font-label-sm text-label-sm font-bold">
                <Icon name={step.icon} className="text-[18px]" />
                {step.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24 md:mb-space-4xl">
        <div className="bg-surface-container-lowest rounded-[28px] border border-surface-container-high/70 p-8 md:p-space-2xl">
          <div className="text-center max-w-2xl mx-auto mb-space-2xl">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase mb-space-xs">
              <span>✳</span>
              <span>The Circular Loop</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
              Report → Recover → Process → Reward → Repeat
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
              A self-reinforcing cycle that turns waste generation into environmental reward — the more you report, the more you recover, and the greater your impact.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-space-md md:gap-space-xl">
            {loop.map((item, i) => (
              <div key={item.label} className="flex items-center gap-space-md">
                <div className="flex flex-col items-center gap-space-xs">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary-container/30 flex items-center justify-center text-primary group-hover:bg-secondary-container/50 transition-colors">
                    <Icon name={item.icon} className="text-[28px] md:text-[32px]" />
                  </div>
                  <span className="font-label-md text-label-md text-primary font-bold">{item.label}</span>
                </div>
                {i < loop.length - 1 && (
                  <Icon name="arrow_forward" className="text-surface-container-highest text-[24px] md:text-[32px]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-24 md:mb-space-4xl">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase mb-space-xs">
            <span>✳</span>
            <span>Processing Architecture</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
            9-Stage Material Recovery Facility
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
            Our decentralized MRF processes heterogeneous municipal waste through nine precision-engineered stages — extracting maximum value at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {mrfStages.map((stage, i) => (
            <div key={stage.title} className="bg-surface-container-lowest p-space-lg rounded-[28px] border border-surface-container-high/70 hover:border-secondary hover:shadow-lg transition-all flex flex-col group">
              <div className="flex items-center gap-space-sm mb-space-md">
                <div className="w-10 h-10 rounded-full bg-secondary-container/40 group-hover:bg-secondary-container flex items-center justify-center text-primary font-headline-sm text-headline-sm font-extrabold transition-colors shadow-sm shrink-0">
                  {i + 1}
                </div>
                <div className="w-10 h-10 rounded-2xl bg-surface-container-high/50 group-hover:bg-secondary-container/30 flex items-center justify-center text-primary transition-colors shrink-0">
                  <Icon name={stage.icon} className="text-[22px]" />
                </div>
              </div>
              <h3 className="font-title-md text-title-md text-primary font-bold mb-space-xs">{stage.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{stage.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 md:mb-space-3xl">
        <div className="bg-forest rounded-[28px] p-space-xl md:p-space-2xl text-on-primary text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-space-md relative z-10">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/15 backdrop-blur-sm text-secondary-fixed font-eyebrow-tag text-eyebrow-tag font-bold uppercase">
              <span>✳</span>
              <span>Experience It Live</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg md:text-[48px] md:leading-[54px] text-surface-bright font-bold tracking-tight">
              See the full pipeline in our interactive simulator.
            </h2>
            <p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-xl">
              Walk through every stage of the waste-to-resource journey in real-time — from street-level reporting to quality-controlled RDF output.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-space-sm pt-space-xs">
              <Link to="/simulation" className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-secondary-container text-primary font-label-md text-label-md font-bold hover:bg-secondary-fixed-dim transition-all shadow-lg">
                <span>Launch Simulation</span>
                <Icon name="north_east" className="text-[18px]" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-surface-container-high/15 hover:bg-surface-container-high/25 text-surface-bright font-label-md text-label-md font-bold transition-colors">
                <span>Schedule a Demo</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
