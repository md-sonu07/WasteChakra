import { Link } from 'react-router-dom';
import { Icon } from '../components/AppIcons';

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. HERO WRAPPER */}
      <div className="w-full relative">
        {/* HERO CONTAINER */}
        <div className="w-full bg-[#0a3a2a] relative overflow-hidden flex flex-col justify-center min-h-screen md:min-h-[750px]">

          {/* BACKGROUND IMAGE WITH GRADIENT MASK */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute right-0 top-0 w-full md:w-4/5 lg:w-3/5 h-full" style={{ maskImage: 'linear-gradient(to right, transparent, black 35%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 35%)' }}>
              <img alt="Eco Waste Collection Truck" className="w-full h-full object-cover object-center" src="/images/hero-truck.jpg" />
            </div>
            {/* Additional gradient for mobile to ensure text is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a3a2a] via-[#0a3a2a]/60 to-transparent md:hidden" />
          </div>

          {/* LEFT CONTENT */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 mt-10 flex flex-col gap-6">
            {/* Reviews Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#164a35] backdrop-blur-md border border-[#1e5c43] w-fit">
              <span className="font-bold text-sm text-white">4.9</span>
              <div className="flex text-[#F59E0B]">
                <Icon name="star" className="text-[14px]" />
                <Icon name="star" className="text-[14px]" />
                <Icon name="star" className="text-[14px]" />
                <Icon name="star" className="text-[14px]" />
                <Icon name="star" className="text-[14px]" />
              </div>
              <span className="text-white/90 text-sm font-medium">5K+ Reviews</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-[68px] leading-[1.05] text-white font-bold tracking-tight">
              Clean, safe, reliable<br />
              waste <span className="text-[#A8E05A]">management</span><br />
              for home &amp; business
            </h1>

            {/* Subheadline */}
            <p className="text-white/80 text-base md:text-lg max-w-2xl mt-2 leading-relaxed">
              Turning unpredictable waste into measurable resources through smart collection, adaptive processing and responsible recovery.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-6 mt-4">
              <Link
                className="group inline-flex items-center justify-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[#A8E05A] text-[#0a3a2a] font-bold hover:bg-[#96d048] hover:shadow-[0_8px_24px_-6px_rgba(168,224,90,0.4)] transition-all duration-300"
                to="/app/report"
              >
                <span className="text-sm tracking-wide">Report Waste</span>
                <span className="w-8 h-8 rounded-full bg-[#82bc33] flex items-center justify-center group-hover:bg-[#72a62a] transition-colors duration-300">
                  <Icon name="arrow_forward" className="text-[18px] group-hover:rotate-45 transition-transform duration-300 -rotate-45" />
                </span>
              </Link>

              <Link
                className="group inline-flex items-center justify-center gap-3 pl-6 pr-2 py-2 rounded-full border-2 border-[#A8E05A]/40 text-white font-bold hover:bg-white/10 hover:border-[#A8E05A] transition-all duration-300"
                to="/app/pickups"
              >
                <span className="text-sm tracking-wide">Schedule Pickup</span>
                <span className="w-8 h-8 rounded-full bg-[#A8E05A]/20 flex items-center justify-center group-hover:bg-[#A8E05A] group-hover:text-[#0a3a2a] transition-all duration-300">
                  <Icon name="schedule" className="text-[18px]" />
                </span>
              </Link>

              <a
                className="group inline-flex items-center gap-3 pl-2 pr-2 py-2 text-white/90 hover:text-[#A8E05A] transition-all duration-300"
                href="/simulation"
              >
                <span className="w-11 h-11 rounded-full bg-[#A8E05A]/10 border border-[#A8E05A]/40 flex items-center justify-center group-hover:bg-[#A8E05A] group-hover:text-[#0a3a2a] transition-all duration-300">
                  <Icon name="view_in_ar" className="text-[20px]" />
                </span>
                <span className="flex flex-col items-start justify-center">
                  <span className="text-[11px] uppercase tracking-wider text-white/70 font-semibold leading-none mb-1">Explore</span>
                  <span className="text-sm font-bold text-white leading-none">3D Simulation</span>
                </span>
              </a>
            </div>
          </div>

          {/* SCROLLING MARQUEE TICKER RIBBON - ATTACHED TO BOTTOM */}
          <div className="w-full bg-[#A8E05A] py-3.5 overflow-hidden select-none relative z-10">
            <div className="flex whitespace-nowrap animate-[marquee_24s_linear_infinite] gap-10 text-[#0a3a2a] text-[15px] font-bold tracking-wide items-center">
              <span className="flex items-center gap-10"><span className="text-xl">✳</span> Smart waste solutions</span>
              <span className="flex items-center gap-10"><span className="text-xl">✳</span> Reliable waste collection</span>
              <span className="flex items-center gap-10"><span className="text-xl">✳</span> Sustainable recycling services</span>
              <span className="flex items-center gap-10"><span className="text-xl">✳</span> Clean greener communities</span>
              <span className="flex items-center gap-10"><span className="text-xl">✳</span> Responsible junk disposal</span>
              <span className="flex items-center gap-10"><span className="text-xl">✳</span> Smart waste solutions</span>
              <span className="flex items-center gap-10"><span className="text-xl">✳</span> Reliable waste collection</span>
              <span className="flex items-center gap-10"><span className="text-xl">✳</span> Sustainable recycling services</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2.5 STATS / REAL IMPACT BAR */}
      <section className="w-full py-12 md:py-space-xl bg-surface">
        <div className="w-full max-w-container-max mx-auto px-gutter">
          <div className="bg-surface-container-low rounded-[28px] p-6 md:p-space-xl border border-surface-container-high/60 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-space-lg text-center">
            <div className="flex flex-col items-center">
              <span className="font-stat-counter text-3xl md:text-stat-counter text-primary font-extrabold tracking-tight leading-none">520K+</span>
              <span className="font-label-md text-[10px] md:text-label-md text-secondary font-bold mt-2 uppercase tracking-wider">Tons Diverted</span>
              <p className="font-label-sm text-[11px] md:text-label-sm text-on-surface-variant mt-1">Saved from municipal landfills</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-stat-counter text-3xl md:text-stat-counter text-primary font-extrabold tracking-tight leading-none">120+</span>
              <span className="font-label-md text-[10px] md:text-label-md text-secondary font-bold mt-2 uppercase tracking-wider">Cities &amp; Towns</span>
              <p className="font-label-sm text-[11px] md:text-label-sm text-on-surface-variant mt-1">Active collection routes daily</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-stat-counter text-3xl md:text-stat-counter text-primary font-extrabold tracking-tight leading-none">350+</span>
              <span className="font-label-md text-[10px] md:text-label-md text-secondary font-bold mt-2 uppercase tracking-wider">Commercial</span>
              <p className="font-label-sm text-[11px] md:text-label-sm text-on-surface-variant mt-1">Corporate &amp; retail contracts</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-stat-counter text-3xl md:text-stat-counter text-primary font-extrabold tracking-tight leading-none">98.4%</span>
              <span className="font-label-md text-[10px] md:text-label-md text-secondary font-bold mt-2 uppercase tracking-wider">On-Time SLA</span>
              <p className="font-label-sm text-[11px] md:text-label-sm text-on-surface-variant mt-1">Guaranteed same-day pickups</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2.75 QUICK ACTIONS */}
      <section className="w-full py-12 md:py-space-xl bg-surface">
        <div className="w-full max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-space-md">
            {[
              { title: 'Report Waste', desc: 'Upload a picture of garbage and we dispatch a pickup.', icon: 'photo_camera', to: '/app/report', tone: 'bg-[#A8E05A]' },
              { title: 'Schedule Pickup', desc: 'Request waste collection from your home.', icon: 'home_work', to: '/app/pickups', tone: 'bg-[#0d2a1a]' },
              { title: 'Find Waste Nearby', desc: 'View waste reports, collection points and community events.', icon: 'location_searching', to: '/app/map', tone: 'bg-[#3d6a00]' },
              { title: 'Recycle With Us', desc: 'Learn how to submit recyclable materials.', icon: 'recycling', to: '/community', tone: 'bg-[#e2ebe1]' },
            ].map((a) => (
              <Link
                key={a.title}
                to={a.to}
                className="group p-6 rounded-[24px] bg-surface-container-lowest border border-surface-container-high/80 hover:border-secondary hover:shadow-lg transition-all flex flex-col gap-4"
              >
                <span className={`w-12 h-12 rounded-2xl ${a.tone} text-white flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon name={a.icon} className="text-[26px]" />
                </span>
                <div>
                  <h3 className="font-title-md text-title-md text-primary font-bold">{a.title}</h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">{a.desc}</p>
                </div>
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm font-bold text-secondary group-hover:text-primary transition-colors">
                  Open <Icon name="arrow_forward" className="text-[16px]" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT US & GET FREE QUOTE (Clean 2-Column Section) */}
      <section className="w-full py-16 md:py-space-3xl bg-surface" id="about">
        <div className="w-full max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="flex flex-col gap-6 lg:pr-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-xs font-bold uppercase mb-2 w-fit border border-surface-container-highest">
                <span className="text-secondary">✳</span>
                <span>About WasteChakra</span>
              </div>

              <h2 className="font-headline-lg text-4xl md:text-5xl text-primary font-extrabold tracking-tight leading-[1.1]">
                Waste management that puts the planet <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-primary">first.</span>
              </h2>

              <p className="font-body-md text-base md:text-lg text-on-surface-variant leading-relaxed">
                For over a decade, WasteChakra has helped homes and businesses replace landfill-bound chaos with clean, predictable, circular collection — powered by our smart eco-fleet and traceable sorting hubs.
              </p>

              <ul className="flex flex-col gap-4 mt-2">
                <li className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high/50 hover:border-secondary-container/50 hover:shadow-md transition-all duration-300 group">
                  <span className="w-10 h-10 shrink-0 rounded-xl bg-secondary-container/40 flex items-center justify-center text-primary group-hover:bg-secondary-container transition-colors duration-300">
                    <Icon name="eco" className="text-[20px]" />
                  </span>
                  <div className="flex flex-col pt-0.5">
                    <span className="font-bold text-primary text-sm tracking-wide">Licensed &amp; insured crews</span>
                    <span className="text-xs text-on-surface-variant mt-0.5">Nationwide network of vetted professionals.</span>
                  </div>
                </li>

                <li className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high/50 hover:border-secondary-container/50 hover:shadow-md transition-all duration-300 group">
                  <span className="w-10 h-10 shrink-0 rounded-xl bg-secondary-container/40 flex items-center justify-center text-primary group-hover:bg-secondary-container transition-colors duration-300">
                    <Icon name="recycling" className="text-[20px]" />
                  </span>
                  <div className="flex flex-col pt-0.5">
                    <span className="font-bold text-primary text-sm tracking-wide">Certified downstream partners</span>
                    <span className="text-xs text-on-surface-variant mt-0.5">Ensuring your waste truly gets recycled.</span>
                  </div>
                </li>

                <li className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high/50 hover:border-secondary-container/50 hover:shadow-md transition-all duration-300 group">
                  <span className="w-10 h-10 shrink-0 rounded-xl bg-secondary-container/40 flex items-center justify-center text-primary group-hover:bg-secondary-container transition-colors duration-300">
                    <Icon name="verified" className="text-[20px]" />
                  </span>
                  <div className="flex flex-col pt-0.5">
                    <span className="font-bold text-primary text-sm tracking-wide">Digital ESG reporting</span>
                    <span className="text-xs text-on-surface-variant mt-0.5">Detailed analytics on every single pickup.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-surface-container-lowest relative rounded-[32px] p-6 sm:p-8 md:p-10 border border-surface-container-high/60 shadow-xl overflow-hidden group" id="quote">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/30 blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none rounded-full"></div>

              <form className="flex flex-col gap-4 md:gap-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="mb-2">
                  <h3 className="font-headline-sm text-2xl md:text-3xl text-primary font-extrabold tracking-tight mb-2">Get Your Free Quote</h3>
                  <p className="font-label-sm text-xs md:text-sm text-on-surface-variant leading-relaxed">
                    Tell us what you need — we'll respond within <span className="font-bold text-primary">30 minutes</span>.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-[10px] md:text-[11px] text-primary font-bold uppercase tracking-widest ml-4">Full Name</label>
                  <input type="text" name="name" placeholder="e.g. Sarah Lindqvist" className="w-full rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 md:px-6 py-3 md:py-3.5 font-body-md text-sm md:text-base text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_4px_rgba(var(--color-secondary),0.1)] transition-all duration-300" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-[10px] md:text-[11px] text-primary font-bold uppercase tracking-widest ml-4">Phone Number</label>
                  <input type="tel" name="phone" placeholder="+1 (555) 000-0000" className="w-full rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 md:px-6 py-3 md:py-3.5 font-body-md text-sm md:text-base text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_4px_rgba(var(--color-secondary),0.1)] transition-all duration-300" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-[10px] md:text-[11px] text-primary font-bold uppercase tracking-widest ml-4">Service Needed</label>
                  <div className="relative">
                    <select name="service" className="appearance-none w-full rounded-xl border-2 border-surface-container-high bg-surface-container-lowest px-4 md:px-6 py-3 md:py-3.5 font-body-md text-sm md:text-base text-on-surface outline-none focus:border-secondary focus:bg-surface focus:shadow-[0_0_0_4px_rgba(var(--color-secondary),0.1)] transition-all duration-300 cursor-pointer">
                      <option>Residential Pickup</option>
                      <option>Commercial Collection</option>
                      <option>Bulky Junk Cleanout</option>
                      <option>E-Waste &amp; Hazardous</option>
                      <option>Zero-Landfill Audit</option>
                    </select>
                    <Icon name="expand_more" className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                  </div>
                </div>

                <button type="submit" className="group mt-2 cursor-pointer inline-flex items-center justify-center gap-3 w-full px-6 md:px-8 py-3 md:py-4 rounded-xl bg-secondary-container text-primary font-bold hover:bg-[#bbfb64] hover:-translate-y-1 hover:shadow-[0_8px_24px_-6px_rgba(171,248,84,0.4)] transition-all duration-300 border border-secondary-container">
                  <span className="text-sm md:text-base tracking-wide">Request Callback</span>
                  <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon name="north_east" className="text-[16px] md:text-[18px] group-hover:rotate-45 transition-transform duration-300" />
                  </span>
                </button>
                <p className="text-center font-label-sm text-[11px] md:text-[12px] text-on-surface-variant/80 mt-1 flex items-center justify-center gap-1.5"><Icon name="verified_user" className="text-[14px]" /> No obligation · Free on-site assessment</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 CORE SERVICES SECTION */}
      <section className="w-full py-16 md:py-space-3xl bg-surface-container-low" id="services">
        <div className="w-full max-w-container-max mx-auto px-gutter">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-space-2xl">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase mb-space-xs">
              <span>✳</span>
              <span>Tailored Environmental Solutions</span>
            </div>
            <h2 className="font-headline-lg text-3xl md:text-headline-lg text-primary font-bold tracking-tight">
              Full-Spectrum Eco Waste Services
            </h2>
            <p className="font-body-md text-sm md:text-body-md text-on-surface-variant mt-space-xs">
              From curb-side household collection to full commercial site decommissioning, our certified teams handle every tier of circular recycling.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-space-lg">
            <div className="p-6 md:p-space-lg rounded-[24px] bg-surface-container-lowest border border-surface-container-high/80 hover:border-secondary hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-container/40 group-hover:bg-secondary-container flex items-center justify-center text-primary mb-space-md transition-colors">
                  <Icon name="delete_sweep" className="text-[26px]" />
                </div>
                <h3 className="font-title-md text-title-md text-primary font-bold mb-space-xs">Residential &amp; Composting</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-space-md">
                  Weekly scheduled trash, organic food scraps, and yard waste diverted straight to community compost facilities.
                </p>
                <ul className="flex flex-col gap-space-xxs text-primary font-label-sm text-label-sm border-t border-surface-container-high/50 pt-space-sm mb-space-md">
                  <li className="flex items-center gap-1.5"><Icon name="check_circle" className="text-secondary text-[16px]" /> Bi-weekly smart bin audits</li>
                  <li className="flex items-center gap-1.5"><Icon name="check_circle" className="text-secondary text-[16px]" /> Zero-odor seal containers</li>
                </ul>
              </div>
              <a className="inline-flex items-center gap-1 font-label-md text-label-md font-bold text-secondary hover:text-primary transition-colors" href="#quote">
                <span>Explore Plans</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </a>
            </div>

            <div className="p-space-lg rounded-[24px] bg-surface-container-lowest border border-surface-container-high/80 hover:border-secondary hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-container/40 group-hover:bg-secondary-container flex items-center justify-center text-primary mb-space-md transition-colors">
                  <Icon name="corporate_fare" className="text-[26px]" />
                </div>
                <h3 className="font-title-md text-title-md text-primary font-bold mb-space-xs">Commercial Bulk Collection</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-space-md">
                  High-capacity roll-off dumpsters, compactors, and ongoing collection contracts tailored for offices, retail, and hospitality.
                </p>
                <ul className="flex flex-col gap-space-xxs text-primary font-label-sm text-label-sm border-t border-surface-container-high/50 pt-space-sm mb-space-md">
                  <li className="flex items-center gap-1.5"><Icon name="check_circle" className="text-secondary text-[16px]" /> Flexible nightly scheduling</li>
                  <li className="flex items-center gap-1.5"><Icon name="check_circle" className="text-secondary text-[16px]" /> Monthly diversion analytics</li>
                </ul>
              </div>
              <a className="inline-flex items-center gap-1 font-label-md text-label-md font-bold text-secondary hover:text-primary transition-colors" href="#quote">
                <span>Commercial Rates</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </a>
            </div>

            <div className="p-space-lg rounded-[24px] bg-surface-container-lowest border border-surface-container-high/80 hover:border-secondary hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-container/40 group-hover:bg-secondary-container flex items-center justify-center text-primary mb-space-md transition-colors">
                  <Icon name="devices_other" className="text-[26px]" />
                </div>
                <h3 className="font-title-md text-title-md text-primary font-bold mb-space-xs">E-Waste &amp; Hazardous</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-space-md">
                  Certified data destruction and precious metal recovery for computers, batteries, solar units, and chemicals.
                </p>
                <ul className="flex flex-col gap-space-xxs text-primary font-label-sm text-label-sm border-t border-surface-container-high/50 pt-space-sm mb-space-md">
                  <li className="flex items-center gap-1.5"><Icon name="check_circle" className="text-secondary text-[16px]" /> R2v3 certified downstream</li>
                  <li className="flex items-center gap-1.5"><Icon name="check_circle" className="text-secondary text-[16px]" /> Certificate of destruction</li>
                </ul>
              </div>
              <a className="inline-flex items-center gap-1 font-label-md text-label-md font-bold text-secondary hover:text-primary transition-colors" href="#quote">
                <span>E-Waste Protocol</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </a>
            </div>

            <div className="p-space-lg rounded-[24px] bg-surface-container-lowest border border-surface-container-high/80 hover:border-secondary hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-container/40 group-hover:bg-secondary-container flex items-center justify-center text-primary mb-space-md transition-colors">
                  <Icon name="precision_manufacturing" className="text-[26px]" />
                </div>
                <h3 className="font-title-md text-title-md text-primary font-bold mb-space-xs">Zero-Landfill Audit</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-space-md">
                  Comprehensive onsite waste stream auditing for manufacturing facilities striving for TRUE zero-waste certification.
                </p>
                <ul className="flex flex-col gap-space-xxs text-primary font-label-sm text-label-sm border-t border-surface-container-high/50 pt-space-sm mb-space-md">
                  <li className="flex items-center gap-1.5"><Icon name="check_circle" className="text-secondary text-[16px]" /> ESG compliance reporting</li>
                  <li className="flex items-center gap-1.5"><Icon name="check_circle" className="text-secondary text-[16px]" /> Circular byproduct matching</li>
                </ul>
              </div>
              <a className="inline-flex items-center gap-1 font-label-md text-label-md font-bold text-secondary hover:text-primary transition-colors" href="#quote">
                <span>Schedule Audit</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MISSION & VISION SECTION */}
      <section className="w-full py-16 md:py-space-3xl bg-surface" id="mission">
        <div className="w-full max-w-container-max mx-auto px-gutter">
          <div className="bg-surface-container-lowest p-6 md:p-space-2xl rounded-[32px] shadow-sm flex flex-col gap-8 md:gap-space-2xl border border-surface-container-high/60">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-space-2xl items-center">
              <div className="lg:col-span-6 flex flex-col gap-6 md:gap-space-md">
                <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/40 w-fit text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase">
                  <span>✳</span>
                  <span>Mission and Vision</span>
                </div>
                <h2 className="font-headline-lg text-3xl md:text-headline-lg text-primary font-bold tracking-tight leading-tight">
                  Building a cleaner future through responsible waste management
                </h2>
                <p className="font-body-md text-sm md:text-body-md text-on-surface-variant max-w-lg">
                  Our vision embraces cleaner environments through responsible disposal, recycling initiatives, and customer-focused services that support healthier communities for future generations.
                </p>
                <div>
                  <a className="inline-flex items-center gap-space-xs pl-space-md pr-space-xs py-space-xs rounded-full bg-primary text-on-primary hover:bg-primary-container transition-all font-label-md text-label-md font-bold shadow-sm" href="#quote">
                    <span>Get Started Now</span>
                    <span className="w-6 h-6 rounded-full bg-surface-container-high/20 flex items-center justify-center">
                      <Icon name="north_east" className="text-[16px]" />
                    </span>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="rounded-[24px] overflow-hidden shadow-md">
                  <img alt="Municipal recycling truck operating" className="w-full h-64 md:h-72 object-cover" src="/images/municipal-truck.jpg" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-space-lg pt-8 md:pt-space-md border-t border-surface-container-high/40">
              <div className="p-6 md:p-space-lg rounded-[24px] bg-surface flex flex-col-reverse sm:flex-row gap-6 md:gap-space-md items-center shadow-sm border border-surface-container-high/40">
                <div className="flex-1 flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-xs mb-space-xxs">
                    <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary shrink-0">
                      <Icon name="recycling" className="text-[18px]" />
                    </span>
                    <h3 className="font-title-md text-title-md text-primary font-bold">Mission — Building zero waste</h3>
                  </div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Helping communities reduce waste through responsible collection.
                  </p>
                  <ul className="flex flex-col gap-space-xxs text-primary font-label-sm text-label-sm pt-space-xs">
                    <li className="flex items-center gap-space-xs">
                      <Icon name="check" className="text-secondary text-[16px]" />
                      <span>Responsible waste collection</span>
                    </li>
                    <li className="flex items-center gap-space-xs">
                      <Icon name="check" className="text-secondary text-[16px]" />
                      <span>Sustainable community impact</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full h-48 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0">
                  <img alt="Waste sorting volunteer" className="w-full h-full object-cover" src="/images/volunteer-sorting.jpg" />
                </div>
              </div>

              <div className="p-6 md:p-space-lg rounded-[24px] bg-surface flex flex-col-reverse sm:flex-row gap-6 md:gap-space-md items-center shadow-sm border border-surface-container-high/40">
                <div className="flex-1 flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-xs mb-space-xxs">
                    <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary shrink-0">
                      <Icon name="eco" className="text-[18px]" />
                    </span>
                    <h3 className="font-title-md text-title-md text-primary font-bold">Vision — Greener future vision</h3>
                  </div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Creating cleaner communities through innovative recycling solutions.
                  </p>
                  <ul className="flex flex-col gap-space-xxs text-primary font-label-sm text-label-sm pt-space-xs">
                    <li className="flex items-center gap-space-xs">
                      <Icon name="check" className="text-secondary text-[16px]" />
                      <span>Long-term environmental protection</span>
                    </li>
                    <li className="flex items-center gap-space-xs">
                      <Icon name="check" className="text-secondary text-[16px]" />
                      <span>Advanced recycling solutions</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full h-48 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0">
                  <img alt="Eco technician planting" className="w-full h-full object-cover" src="/images/technician-planting.jpg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS / 3-STEP PROCESS */}
      <section className="w-full py-space-3xl bg-surface-container-low" id="how-it-works">
        <div className="w-full max-w-container-max mx-auto px-gutter">
          <div className="text-center max-w-2xl mx-auto mb-space-2xl">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase mb-space-xs">
              <span>✳</span>
              <span>Simple &amp; Seamless</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
              How WasteChakra Operates
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
              From initial pickup to downstream resource repurposing, our three-step pipeline guarantees total convenience and zero environmental guilt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg relative">
            <div className="bg-surface-container-lowest p-space-xl rounded-[28px] border border-surface-container-high/70 shadow-sm relative flex flex-col">
              <div className="w-12 h-12 rounded-full bg-secondary-container text-primary font-headline-sm text-headline-sm font-extrabold flex items-center justify-center mb-space-md shadow-sm">
                1
              </div>
              <h3 className="font-title-md text-title-md text-primary font-bold mb-space-xs">Book Online or Call</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                Select your waste volume, pickup window, and location in under 2 minutes. Receive upfront transparent pricing instantly.
              </p>
              <div className="mt-auto flex items-center gap-2 text-secondary font-label-sm text-label-sm font-bold">
                <Icon name="touch_app" className="text-[18px]" />
                Instant digital dispatch
              </div>
            </div>

            <div className="bg-surface-container-lowest p-space-xl rounded-[28px] border border-surface-container-high/70 shadow-sm relative flex flex-col">
              <div className="w-12 h-12 rounded-full bg-secondary-container text-primary font-headline-sm text-headline-sm font-extrabold flex items-center justify-center mb-space-md shadow-sm">
                2
              </div>
              <h3 className="font-title-md text-title-md text-primary font-bold mb-space-xs">Smart Eco-Truck Arrival</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                Our uniformed, insured field crew arrives on schedule with low-emission collection vehicles. We sort and load all materials safely.
              </p>
              <div className="mt-auto flex items-center gap-2 text-secondary font-label-sm text-label-sm font-bold">
                <Icon name="local_shipping" className="text-[18px]" />
                Real-time GPS tracking
              </div>
            </div>

            <div className="bg-surface-container-lowest p-space-xl rounded-[28px] border border-surface-container-high/70 shadow-sm relative flex flex-col">
              <div className="w-12 h-12 rounded-full bg-secondary-container text-primary font-headline-sm text-headline-sm font-extrabold flex items-center justify-center mb-space-md shadow-sm">
                3
              </div>
              <h3 className="font-title-md text-title-md text-primary font-bold mb-space-xs">100% Traceable Circular Hub</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                Items are transferred to our circular sorting hubs. Organics become compost, recyclables rejoin manufacturing streams, and junk is responsibly handled.
              </p>
              <div className="mt-auto flex items-center gap-2 text-secondary font-label-sm text-label-sm font-bold">
                <Icon name="compost" className="text-[18px]" />
                ESG diversion receipt issued
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. IMPACT SPOTLIGHT & RECENT PROJECTS */}
      <section className="w-full py-space-3xl bg-surface" id="impact">
        <div className="w-full max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-2xl">
            <div>
              <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase mb-space-xs">
                <span>✳</span>
                <span>Real Action In Numbers</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
                Recent Community Initiatives
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              See how our localized circular recycling programs are directly restoring shorelines, parks, and urban centers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            <div className="bg-surface-container-lowest rounded-[28px] overflow-hidden border border-surface-container-high/70 shadow-sm flex flex-col">
              <div className="h-52 w-full overflow-hidden relative">
                <img alt="Ocean coastal cleanup" className="w-full h-full object-cover" src="/images/volunteer-sorting.jpg" />
                <span className="absolute top-4 left-4 bg-secondary-container text-primary font-label-sm text-label-sm font-extrabold px-3 py-1 rounded-full">Coastal Recovery</span>
              </div>
              <div className="p-space-lg flex flex-col flex-1">
                <h3 className="font-title-md text-title-md text-primary font-bold mb-space-xs">Harbor Plastic Interception</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                  Collected over 45 metric tons of floating marine debris and single-use microplastics in partnership with regional fisheries.
                </p>
                <div className="mt-auto pt-space-sm border-t border-surface-container-high/50 flex justify-between items-center text-primary font-label-sm text-label-sm">
                  <span className="text-secondary font-bold">45.2 Tons Recycled</span>
                  <span className="text-on-surface-variant">Completed Q4</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-[28px] overflow-hidden border border-surface-container-high/70 shadow-sm flex flex-col">
              <div className="h-52 w-full overflow-hidden relative">
                <img alt="Community composting initiative" className="w-full h-full object-cover" src="/images/technician-planting.jpg" />
                <span className="absolute top-4 left-4 bg-secondary-container text-primary font-label-sm text-label-sm font-extrabold px-3 py-1 rounded-full">Urban Composting</span>
              </div>
              <div className="p-space-lg flex flex-col flex-1">
                <h3 className="font-title-md text-title-md text-primary font-bold mb-space-xs">Downtown Organic Nutrient Loop</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                  Conducted door-to-door organic waste collection across 600 residential multi-family towers, converting food waste to farm fertilizer.
                </p>
                <div className="mt-auto pt-space-sm border-t border-surface-container-high/50 flex justify-between items-center text-primary font-label-sm text-label-sm">
                  <span className="text-secondary font-bold">120 Tons Soil Enricher</span>
                  <span className="text-on-surface-variant">Ongoing</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-[28px] overflow-hidden border border-surface-container-high/70 shadow-sm flex flex-col">
              <div className="h-52 w-full overflow-hidden relative">
                <img alt="Battery and e-waste collection" className="w-full h-full object-cover" src="/images/municipal-truck.jpg" />
                <span className="absolute top-4 left-4 bg-secondary-container text-primary font-label-sm text-label-sm font-extrabold px-3 py-1 rounded-full">E-Waste Salvage</span>
              </div>
              <div className="p-space-lg flex flex-col flex-1">
                <h3 className="font-title-md text-title-md text-primary font-bold mb-space-xs">Metro Tech Park Hardware Loop</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                  Secured corporate tech retirement for 14 enterprise towers, safely dismantling circuit boards and lithium batteries for closed-loop refabrication.
                </p>
                <div className="mt-auto pt-space-sm border-t border-surface-container-high/50 flex justify-between items-center text-primary font-label-sm text-label-sm">
                  <span className="text-secondary font-bold">99.8% Metal Yield</span>
                  <span className="text-on-surface-variant">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS & TRUST */}
      <section className="w-full py-space-3xl bg-surface-container-low">
        <div className="w-full max-w-container-max mx-auto px-gutter">
          <div className="text-center max-w-2xl mx-auto mb-space-2xl">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/60 text-primary font-eyebrow-tag text-eyebrow-tag font-bold uppercase mb-space-xs">
              <span>✳</span>
              <span>Customer Feedback</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
              Trusted by Municipalities &amp; Businesses
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            <div className="bg-surface-container-lowest p-space-xl rounded-[24px] border border-surface-container-high/70 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-secondary mb-space-sm">
                  <Icon name="star" className="text-[18px]" />
                  <Icon name="star" className="text-[18px]" />
                  <Icon name="star" className="text-[18px]" />
                  <Icon name="star" className="text-[18px]" />
                  <Icon name="star" className="text-[18px]" />
                </div>
                <p className="font-body-md text-body-md text-primary italic mb-space-md">
                  "WasteChakra transformed our city center retail complex. Pickups happen like clockwork before store opening hours, and our landfill diversion metrics climbed from 35% to 88% in six months."
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-sm border-t border-surface-container-high/40">
                <div className="w-10 h-10 rounded-full bg-forest text-secondary-fixed flex items-center justify-center font-bold">MT</div>
                <div>
                  <h4 className="font-title-md text-[15px] text-primary font-bold leading-tight">Marcus Thorne</h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Facilities Director, Metro Plaza</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-space-xl rounded-[24px] border border-surface-container-high/70 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-secondary mb-space-sm">
                  <Icon name="star" className="text-[18px]" />
                  <Icon name="star" className="text-[18px]" />
                  <Icon name="star" className="text-[18px]" />
                  <Icon name="star" className="text-[18px]" />
                  <Icon name="star" className="text-[18px]" />
                </div>
                <p className="font-body-md text-body-md text-primary italic mb-space-md">
                  "Their on-demand bulky junk removal saved our residential association thousands in municipal fines. Professional crew, courteous drivers, and spotless cleanups every single time."
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-sm border-t border-surface-container-high/40">
                <div className="w-10 h-10 rounded-full bg-forest text-secondary-fixed flex items-center justify-center font-bold">SL</div>
                <div>
                  <h4 className="font-title-md text-[15px] text-primary font-bold leading-tight">Sarah Lindqvist</h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">President, Greenways HOA</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-space-xl rounded-[24px] border border-surface-container-high/70 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-secondary mb-space-sm">
                  <Icon name="star" className="text-[18px]" />
                  <Icon name="star" className="text-[18px]" />
                  <Icon name="star" className="text-[18px]" />
                  <Icon name="star" className="text-[18px]" />
                  <Icon name="star" className="text-[18px]" />
                </div>
                <p className="font-body-md text-body-md text-primary italic mb-space-md">
                  "The digital manifest tracking makes ESG reporting so effortless. We have verifiable paperwork for every ton of e-waste and recycled plastics. Exceptional team."
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-sm border-t border-surface-container-high/40">
                <div className="w-10 h-10 rounded-full bg-forest text-secondary-fixed flex items-center justify-center font-bold">DK</div>
                <div>
                  <h4 className="font-title-md text-[15px] text-primary font-bold leading-tight">Devon Kapoor</h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Sustainability Lead, Apex Logistics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="w-full py-space-2xl bg-surface">
        <div className="w-full max-w-container-max mx-auto px-gutter">
          <div className="w-full bg-forest rounded-[32px] p-space-xl md:p-space-2xl text-on-primary text-center relative overflow-hidden">
            <div className="max-w-3xl mx-auto flex flex-col items-center gap-space-md relative z-10">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high/15 backdrop-blur-sm text-secondary-fixed font-eyebrow-tag text-eyebrow-tag font-bold uppercase">
                <span>✳</span>
                <span>Zero Waste Journey</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg md:text-[48px] md:leading-[54px] text-surface-bright font-bold tracking-tight">
                Ready to build a cleaner, zero-waste future for your property?
              </h2>
              <p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-xl">
                Join over 1,200+ residential communities and commercial facilities switching to responsible, circular collection today.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-space-sm pt-space-xs">
                <a className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-secondary-container text-primary font-label-md text-label-md font-bold hover:bg-secondary-fixed-dim transition-all shadow-lg" href="#quote">
                  <span>Get Your Custom Quote</span>
                  <Icon name="north_east" className="text-[18px]" />
                </a>
                <a className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-surface-container-high/15 hover:bg-surface-container-high/25 text-surface-bright font-label-md text-label-md font-bold transition-colors" href="tel:1800242572">
                  <Icon name="call" className="text-[18px]" />
                  <span>Speak with Dispatch</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}