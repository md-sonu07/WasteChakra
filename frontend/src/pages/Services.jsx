import { Link } from 'react-router-dom';
import { Icon } from '../components/AppIcons';

export default function Services() {
  const services = [
    {
      icon: 'delete_sweep',
      title: 'Residential & Composting',
      description: 'Scheduled household trash collection with integrated organic food-scrap and yard-waste composting — diverted straight to community facilities.',
      benefits: [
        'Bi-weekly smart bin audits for optimal pickup',
        'Zero-odor seal containers provided',
        'Free compost credits returned quarterly',
      ],
    },
    {
      icon: 'corporate_fare',
      title: 'Commercial Collection',
      description: 'High-capacity roll-off dumpsters, compactors, and ongoing collection contracts tailored for offices, retail centers, and hospitality venues.',
      benefits: [
        'Flexible nightly or weekly scheduling',
        'Monthly landfill diversion analytics',
        'Dedicated account manager on retainer',
      ],
    },
    {
      icon: 'devices_other',
      title: 'E-Waste & Hazardous',
      description: 'Certified data destruction and precious-metal recovery for computers, batteries, solar panels, and hazardous chemical waste streams.',
      benefits: [
        'R2v3 certified downstream processing',
        'Certificate of destruction issued per batch',
        'Full chain-of-custody documentation',
      ],
    },
    {
      icon: 'precision_manufacturing',
      title: 'Zero-Landfill Audit',
      description: 'Comprehensive onsite waste-stream auditing for manufacturing facilities striving for TRUE zero-waste certification and ESG compliance.',
      benefits: [
        'ESG compliance reporting package',
        'Circular byproduct matching service',
        'Annual waste reduction roadmap',
      ],
    },
    {
      icon: 'recycling',
      title: 'Resource Recovery',
      description: 'Advanced material-recovery facilities that extract recyclables, metals, and organics from mixed waste before any landfill disposition.',
      benefits: [
        '96% material extraction yield rate',
        'Real-time recovery dashboard access',
        'Downstream partner certification',
      ],
    },
    {
      icon: 'local_fire_department',
      title: 'RDF Conditioning',
      description: 'Moisture-controlled shredding and homogenization of combustible waste into quality-grade Refuse-Derived Fuel for cement kilns and WTE plants.',
      benefits: [
        'Consistent calorific value output',
        'Contaminant removal to <0.5% threshold',
        'Predictable fuel-grade specifications',
      ],
    },
    {
      icon: 'park',
      title: 'Community Cleanup',
      description: 'Organized neighborhood and shoreline cleanup events with volunteer coordination, waste classification, and real-time impact tracking.',
      benefits: [
        'Full logistics and permit handling',
        'On-site waste categorization team',
        'Published impact report per event',
      ],
    },
    {
      icon: 'monitoring',
      title: 'Waste Analytics',
      description: 'AI-powered waste-stream analytics platform providing predictive volume forecasting, cost optimization, and carbon footprint reporting.',
      benefits: [
        'AI-driven volume prediction models',
        'Cost-per-ton optimization insights',
        'Carbon offset and ESG report export',
      ],
    },
  ];

  return (
    <div className="grow w-full max-w-container-max mx-auto px-gutter py-16 md:py-space-3xl">
      <header className="mb-20 md:mb-space-4xl">
        <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase mb-space-xs">
          <span>✳</span>
          <span>Our Services</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-display-hero text-primary font-bold tracking-tight max-w-4xl leading-tight">
          Full-spectrum circular waste <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-secondary">solutions</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-md max-w-2xl">
          From curb-side household collection to full-scale industrial resource recovery — every service is designed to maximize landfill diversion and deliver measurable environmental outcomes.
        </p>
      </header>

      <section className="mb-24 md:mb-space-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-lg">
          {services.map((service) => (
            <div key={service.title} className="bg-surface-container-lowest p-space-lg rounded-[28px] border border-surface-container-high/70 hover:border-secondary hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-container/40 group-hover:bg-secondary-container flex items-center justify-center text-primary mb-space-md transition-colors">
                  <Icon name={service.icon} className="text-[26px]" />
                </div>
                <h3 className="font-title-md text-title-md text-primary font-bold mb-space-xs">{service.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                  {service.description}
                </p>
                <ul className="flex flex-col gap-space-xxs text-primary font-label-sm text-label-sm border-t border-surface-container-high/50 pt-space-sm mb-space-md">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-1.5">
                      <Icon name="check_circle" className="text-secondary text-[16px]" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/app/report" className="inline-flex items-center gap-1 font-label-md text-label-md font-bold text-secondary hover:text-primary transition-colors group/link">
                <span>Report Waste</span>
                <Icon name="arrow_forward" className="text-[16px] group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 md:mb-space-3xl">
        <div className="bg-forest rounded-[28px] p-space-xl md:p-space-2xl text-on-primary text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-space-md relative z-10">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/15 backdrop-blur-sm text-secondary-fixed font-eyebrow-tag text-eyebrow-tag font-bold uppercase">
              <span>✳</span>
              <span>Need a Custom Solution?</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg md:text-[48px] md:leading-[54px] text-surface-bright font-bold tracking-tight">
              Let us design a waste program that fits your operation.
            </h2>
            <p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-xl">
              From single-site startups to multi-city municipalities, we build bespoke circular waste architectures tailored to your exact needs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-space-sm pt-space-xs">
              <Link to="/contact" className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-secondary-container text-primary font-label-md text-label-md font-bold hover:bg-secondary-fixed-dim transition-all shadow-lg">
                <span>Contact Us</span>
                <Icon name="north_east" className="text-[18px]" />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-surface-container-high/15 hover:bg-surface-container-high/25 text-surface-bright font-label-md text-label-md font-bold transition-colors">
                <span>Learn About Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
