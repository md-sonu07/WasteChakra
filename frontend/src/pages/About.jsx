import { Link } from 'react-router-dom';
import { Icon } from '../components/AppIcons';

export default function About() {
  const values = [
    {
      icon: 'visibility',
      title: 'Transparency',
      description: 'Full visibility into every stage of waste handling — from collection to final resource output, nothing stays hidden.',
    },
    {
      icon: 'qr_code_scanner',
      title: 'Traceability',
      description: 'Every kilogram of waste is digitally tracked with blockchain-verified manifests through the entire circular journey.',
    },
    {
      icon: 'groups',
      title: 'Community',
      description: 'Empowering neighborhoods to take ownership of their environmental impact through accessible tools and education.',
    },
    {
      icon: 'psychology',
      title: 'Innovation',
      description: 'AI-driven sorting, adaptive processing, and continuous machine learning improve recovery rates every single day.',
    },
  ];

  const pipeline = [
    'Heterogeneous MSW',
    'Pre-processing',
    'Size Classification',
    'Material Recovery',
    'Contaminant Removal',
    'Combustible Recovery',
    'Moisture Conditioning',
    'Size Reduction',
    'Homogenization',
    'Quality-Controlled RDF',
  ];

  const stats = [
    { value: '520K+', label: 'Tons Diverted', sub: 'Saved from landfills' },
    { value: '120+', label: 'Cities Served', sub: 'Active collection routes' },
    { value: '98.4%', label: 'On-Time SLA', sub: 'Guaranteed pickups' },
    { value: '96%', label: 'Recovery Rate', sub: 'Material extraction yield' },
  ];

  return (
    <div className="grow w-full max-w-container-max mx-auto px-gutter py-16 md:py-space-3xl">
      <header className="mb-24 md:mb-space-4xl">
        <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase mb-space-xs">
          <span>✳</span>
          <span>About WasteChakra</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-display-hero text-primary font-bold tracking-tight max-w-4xl leading-tight">
          Responsible waste management, <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-secondary">measurable recovery</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-md max-w-2xl">
          We engineer circular waste systems that transform unpredictable municipal solid waste into quality-controlled, traceable resources — diverting millions of tons from landfills every year.
        </p>
      </header>

      <section className="mb-24 md:mb-space-4xl">
        <div className="bg-surface-container-lowest rounded-[28px] border border-surface-container-high/70 p-8 md:p-space-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-space-2xl">
            <div className="flex flex-col gap-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase w-fit">
                <span>✳</span>
                <span>Our Mission</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
                Building a cleaner future through responsible waste management.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                WasteChakra exists to prove that waste is not a problem — it is an underutilized resource. We design and operate decentralized processing architectures that recover maximum value from heterogeneous municipal waste streams, turning environmental liabilities into measurable economic and ecological outcomes.
              </p>
              <ul className="flex flex-col gap-space-sm mt-2">
                <li className="flex items-start gap-space-sm">
                  <Icon name="check_circle" className="text-secondary text-[20px] mt-0.5" />
                  <span className="font-body-md text-body-md text-on-surface-variant">Source-level recovery eliminates transport waste and emissions</span>
                </li>
                <li className="flex items-start gap-space-sm">
                  <Icon name="check_circle" className="text-secondary text-[20px] mt-0.5" />
                  <span className="font-body-md text-body-md text-on-surface-variant">AI-powered sorting achieves 96% material extraction yield</span>
                </li>
                <li className="flex items-start gap-space-sm">
                  <Icon name="check_circle" className="text-secondary text-[20px] mt-0.5" />
                  <span className="font-body-md text-body-md text-on-surface-variant">Digital manifests ensure full downstream accountability</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase w-fit">
                <span>✳</span>
                <span>Our Vision</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
                A greener future where waste becomes a measurable resource.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                We envision a world where every community has access to smart, decentralized waste processing — where nothing is lost, everything is tracked, and resource recovery is the standard, not the exception. Our goal is full landfill diversion across every market we serve.
              </p>
              <ul className="flex flex-col gap-space-sm mt-2">
                <li className="flex items-start gap-space-sm">
                  <Icon name="check_circle" className="text-secondary text-[20px] mt-0.5" />
                  <span className="font-body-md text-body-md text-on-surface-variant">Zero-landfill certification for enterprise clients</span>
                </li>
                <li className="flex items-start gap-space-sm">
                  <Icon name="check_circle" className="text-secondary text-[20px] mt-0.5" />
                  <span className="font-body-md text-body-md text-on-surface-variant">Community-scale modular processing hubs in every city</span>
                </li>
                <li className="flex items-start gap-space-sm">
                  <Icon name="check_circle" className="text-secondary text-[20px] mt-0.5" />
                  <span className="font-body-md text-body-md text-on-surface-variant">Transparent ESG reporting as a public good</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-24 md:mb-space-4xl">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase mb-space-xs">
            <span>✳</span>
            <span>What Drives Us</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
            Core Values
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
            The principles that guide every decision, every design, and every deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {values.map((value) => (
            <div key={value.title} className="bg-surface-container-lowest p-space-lg rounded-[28px] border border-surface-container-high/70 hover:border-secondary hover:shadow-lg transition-all flex flex-col group">
              <div className="w-12 h-12 rounded-2xl bg-secondary-container/40 group-hover:bg-secondary-container flex items-center justify-center text-primary mb-space-md transition-colors">
                <Icon name={value.icon} className="text-[26px]" />
              </div>
              <h3 className="font-title-md text-title-md text-primary font-bold mb-space-xs">{value.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24 md:mb-space-4xl">
        <div className="bg-surface-container-lowest rounded-[28px] border border-surface-container-high/70 p-8 md:p-space-2xl">
          <div className="text-center max-w-2xl mx-auto mb-space-2xl">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase mb-space-xs">
              <span>✳</span>
              <span>Adaptive Processing Architecture</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
              End-to-End Circular Pipeline
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
              Our decentralized MRF processes heterogeneous municipal solid waste through a 10-stage adaptive pipeline — transforming raw waste into quality-controlled Refuse-Derived Fuel at the source.
            </p>
          </div>

          <div className="flex flex-col gap-0 relative">
            {pipeline.map((stage, i) => (
              <div key={stage} className="flex items-stretch gap-space-md md:gap-space-lg relative">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-secondary-container text-primary font-headline-sm text-headline-sm font-extrabold flex items-center justify-center shrink-0 shadow-sm z-10">
                    {i + 1}
                  </div>
                  {i < pipeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-surface-container-high min-h-8"></div>
                  )}
                </div>
                <div className={`pb-space-lg flex-1 ${i < pipeline.length - 1 ? 'border-b border-surface-container-high/50' : ''}`}>
                  <h3 className="font-title-md text-title-md text-primary font-bold">{stage}</h3>
                  {i === 0 && (
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      Raw, unsorted waste streams accepted from residential, commercial, and industrial sources.
                    </p>
                  )}
                  {i === pipeline.length - 1 && (
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      Homogenized, contaminant-free combustible fuel output ready for thermal conversion or cement kiln co-processing.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-24 md:mb-space-4xl">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase mb-space-xs">
            <span>✳</span>
            <span>By The Numbers</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
            Our Impact in Numbers
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-lg">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface-container-lowest p-space-xl rounded-[28px] border border-surface-container-high/70 hover:border-secondary hover:shadow-lg transition-all text-center flex flex-col items-center">
              <span className="font-stat-counter text-3xl md:text-stat-counter text-primary font-extrabold tracking-tight leading-none">{stat.value}</span>
              <span className="font-label-md text-[10px] md:text-label-md text-secondary font-bold mt-space-xs uppercase tracking-wider">{stat.label}</span>
              <p className="font-label-sm text-[11px] md:text-label-sm text-on-surface-variant mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 md:mb-space-3xl">
        <div className="bg-forest rounded-[28px] p-space-xl md:p-space-2xl text-on-primary text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-space-md relative z-10">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/15 backdrop-blur-sm text-secondary-fixed font-eyebrow-tag text-eyebrow-tag font-bold uppercase">
              <span>✳</span>
              <span>Join The Circular Movement</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg md:text-[48px] md:leading-[54px] text-surface-bright font-bold tracking-tight">
              Ready to make waste your most valuable resource?
            </h2>
            <p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-xl">
              Whether you are a household, business, or municipality — WasteChakra has a circular solution for you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-space-sm pt-space-xs">
              <Link to="/contact" className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-secondary-container text-primary font-label-md text-label-md font-bold hover:bg-secondary-fixed-dim transition-all shadow-lg">
                <span>Get in Touch</span>
                <Icon name="north_east" className="text-[18px]" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-surface-container-high/15 hover:bg-surface-container-high/25 text-surface-bright font-label-md text-label-md font-bold transition-colors">
                <span>Explore Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
