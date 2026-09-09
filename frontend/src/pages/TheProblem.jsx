import { Icon } from '../components/AppIcons';
export default function TheProblem() {
  return (
    <div className="grow w-full max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-space-3xl">
      {/* Header Section */}
      <header className="mb-16">
        <div className="inline-flex items-center space-x-2 border border-surface-container-high bg-surface-container-low px-space-sm py-space-xxs rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">PROBLEM STATEMENT // ID-8492</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-display-hero text-primary mb-6 uppercase md:w-3/4">
          THE WASTE STREAM WON'T STAY THE SAME.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant md:w-1/2">Variable and heterogeneous urban MSW makes reliable resource recovery and consistent RDF production difficult.</p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg mb-24">
        {/* Main Visual Card */}
        <div className="md:col-span-8 bg-surface-container-lowest border border-surface-container-high relative overflow-hidden rounded-[24px] technical-shadow h-64 md:h-125">
          <div className="absolute top-4 right-4 font-label-sm text-label-sm text-on-surface-variant z-10 bg-surface-container-lowest/80 px-2 py-1 rounded-full border border-surface-container-high backdrop-blur-sm">VISUALIZATION-A1</div>
          <div className="absolute inset-0 w-full h-full">
            <img className="object-cover w-full h-full opacity-90" src="/images/problem.jpg" alt="Waste Visualization" />
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(theme('colors.primary') 1px, transparent 1px), linear-gradient(90deg, theme('colors.primary') 1px, transparent 1px)", backgroundSize: '100px 100px', opacity: 0.05 }}></div>
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary m-4"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary m-4"></div>
        </div>

        {/* Side Cards */}
        <div className="md:col-span-4 flex flex-col gap-space-lg">
          {/* Variability Index Card */}
          <div className="flex-1 bg-surface-container-lowest border border-surface-container-high p-6 rounded-[24px] technical-shadow relative">
            <div className="absolute top-4 right-4 font-label-sm text-label-sm text-on-surface-variant">INDEX-V1</div>
            <h3 className="font-label-md text-label-md text-primary mb-6 uppercase border-b border-surface-container-highest pb-2">VARIABILITY INDEX</h3>

            <div className="flex items-end justify-between mb-2">
              <span className="font-headline-md text-headline-md text-primary">87.4<span className="text-on-surface-variant text-xl">%</span></span>
              <span className="inline-flex items-center space-x-1 text-error bg-error-container/40 px-2 py-1 rounded-full border border-error/30">
                <Icon name="warning" className="text-sm" />
                <span className="font-label-sm text-label-sm font-bold">HIGH FLUCTUATION</span>
              </span>
            </div>

            <div className="w-full h-2 bg-surface-container-highest mt-4 relative rounded-full overflow-hidden border border-surface-container-high">
              <div className="absolute top-0 left-0 h-full bg-error-container w-[87%]"></div>
            </div>

            <ul className="mt-6 space-y-3 font-label-md text-label-md text-on-surface-variant text-sm border-t border-surface-container-highest pt-4">
              <li className="flex justify-between border-b border-surface-container-highest pb-1">
                <span>PLASTICS MIX</span>
                <span className="text-primary font-medium">± 42%</span>
              </li>
              <li className="flex justify-between border-b border-surface-container-highest pb-1">
                <span>ORGANIC MOISTURE</span>
                <span className="text-secondary font-medium">± 65%</span>
              </li>
              <li className="flex justify-between pb-1">
                <span>FIBER DENSITY</span>
                <span className="text-primary font-medium">± 28%</span>
              </li>
            </ul>
          </div>

          {/* Separation Loss Card */}
          <div className="bg-surface-container-lowest border border-surface-container-high p-6 rounded-[24px] technical-shadow">
            <h3 className="font-label-md text-label-md text-primary mb-4 uppercase border-b border-surface-container-highest pb-2">MATERIAL LOSS RATE</h3>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full border-4 border-error-container border-t-error flex items-center justify-center transform -rotate-45">
                <Icon name="delete_sweep" className="text-error" />
              </div>
              <div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase text-xs mb-1 font-bold tracking-wider">CURRENT INEFFICIENCY</div>
                <div className="font-headline-md text-headline-md text-error">22.5%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}