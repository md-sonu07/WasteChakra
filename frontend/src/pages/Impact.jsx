import { Icon } from '../components/AppIcons';
export default function Impact() {
  return (
    <div className="grow w-full max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-space-3xl">
      {/* Hero Section */}
      <section className="mb-24">
        <div className="inline-flex items-center gap-2 px-space-sm py-space-xxs rounded-full border border-surface-container-high bg-surface-container-low mb-6">
          <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Deployment Status: Global Scaling</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-display-hero text-primary mb-6">
          DESIGNED FOR <span className="text-secondary">REAL CITIES.</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl border-l-2 border-primary pl-6">
          Deployable, scalable nodes processing heterogeneous municipal waste at the source.
          By decentralizing processing technologies, we drastically reduce logistics dependencies,
          cut carbon emissions, and guarantee high-yield, quality-controlled resource outputs.
        </p>
      </section>

      {/* Deployment Map & Core Stats */}
      <section className="mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg relative">
          {/* Map Visual */}
          <div className="lg:col-span-8 bg-surface-container-lowest border border-surface-container-high rounded-[24px] relative overflow-hidden h-125 lg:h-150 group">
            <div className="absolute top-4 right-4 z-10 font-label-sm text-label-sm text-on-surface-variant bg-surface-container-lowest/90 backdrop-blur px-2 py-1 rounded-full border border-surface-container-high">
              NODE-MAP-01
            </div>
            <div className="w-full h-full bg-cover bg-center opacity-90 group-hover:scale-105 transition-transform duration-700"
                 style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1440&auto=format&fit=crop')" }}>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-20"
                 style={{ backgroundImage: "linear-gradient(theme('colors.forest') 1px, transparent 1px), linear-gradient(90deg, theme('colors.forest') 1px, transparent 1px)", backgroundSize: '40px 40px' }}>
            </div>
          </div>

          {/* Stat Stack */}
          <div className="lg:col-span-4 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest border border-surface-container-high rounded-[24px] p-8 flex flex-col justify-between h-full group hover:border-forest transition-colors technical-shadow">
              <div className="flex justify-between items-start mb-8">
                <Icon name="delete_sweep" className="text-primary text-3xl" />
                <span className="font-label-sm text-label-sm text-on-surface-variant">STAT-01</span>
              </div>
              <div>
                <div className="font-headline-md text-headline-md text-primary mb-2 group-hover:text-forest transition-colors">SCALE</div>
                <div className="font-label-md text-label-md text-on-surface-variant uppercase mb-4 font-bold tracking-wider">Tonnes Processed Daily</div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Handling immense volumes of unpredictable urban waste through continuous adaptive processing.</p>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-surface-container-high rounded-[24px] p-8 flex flex-col justify-between h-full group hover:border-forest transition-colors technical-shadow">
              <div className="flex justify-between items-start mb-8">
                <Icon name="bolt" className="text-forest text-3xl" />
                <span className="font-label-sm text-label-sm text-on-surface-variant">STAT-02</span>
              </div>
              <div>
                <div className="font-headline-md text-headline-md text-primary mb-2 group-hover:text-forest transition-colors">MAX YIELD</div>
                <div className="font-label-md text-label-md text-on-surface-variant uppercase mb-4 font-bold tracking-wider">Predictable Energy Output</div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Producing highly homogenous, quality-controlled RDF ready for thermal conversion.</p>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-surface-container-high rounded-[24px] p-8 flex flex-col justify-between h-full group hover:border-forest transition-colors technical-shadow">
              <div className="flex justify-between items-start mb-8">
                <Icon name="co2" className="text-secondary text-3xl" />
                <span className="font-label-sm text-label-sm text-on-surface-variant">STAT-03</span>
              </div>
              <div>
                <div className="font-headline-md text-headline-md text-primary mb-2 group-hover:text-forest transition-colors">REDUCTION</div>
                <div className="font-label-md text-label-md text-on-surface-variant uppercase mb-4 font-bold tracking-wider">Carbon Footprint Minimization</div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Slashing logistical dependencies by recovering resources directly at the generation source.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Efficiency */}
      <section className="mb-24">
        <div className="border-t border-surface-container-highest pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">
                Operational Supremacy
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
                Standard waste management relies on massive, centralized sorting facilities that struggle with the chaotic nature of MSW. Our decentralized processing architecture fundamentally changes this paradigm.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Icon name="check_circle" className="text-secondary mt-1" />
                  <span className="font-body-md text-body-md text-on-surface-variant">Eliminates heavy transport logistics to distant landfills.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="check_circle" className="text-secondary mt-1" />
                  <span className="font-body-md text-body-md text-on-surface-variant">Recovers valuable recyclables before they are contaminated.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="check_circle" className="text-secondary mt-1" />
                  <span className="font-body-md text-body-md text-on-surface-variant">Produces a predictable, commodity-grade energy resource.</span>
                </li>
              </ul>
            </div>
            <div className="bg-surface-container-lowest border border-surface-container-high rounded-[24px] p-8 flex flex-col justify-center technical-shadow">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-surface-container-highest">
                <div className="w-16 h-16 bg-secondary-container/20 flex items-center justify-center rounded-2xl text-forest">
                  <Icon name="recycling" className="text-3xl" />
                </div>
                <div>
                  <div className="font-label-md text-label-md text-primary uppercase font-bold tracking-wider">RESOURCE RECOVERY</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">Maximized diversion from landfill</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-forest/10 flex items-center justify-center rounded-2xl text-forest">
                  <Icon name="account_balance" className="text-3xl" />
                </div>
                <div>
                  <div className="font-label-md text-label-md text-primary uppercase font-bold tracking-wider">ECONOMIC VIABILITY</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">Turning waste liabilities into revenue</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}