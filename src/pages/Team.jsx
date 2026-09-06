export default function Team() {
  const teamMembers = [
    {
      id: 'DAN-01',
      name: 'Danish',
      role: 'Systems Architect',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHAqvQVVkj2Xcpe6_In79GTK0cQW56yjVrmO7bpo9HP8F_yJrgkXICFy6zWgdbENNGBp81Dhkvcj8Yw2A_e8-J8LGhZZZ-67cFVnj3ZgJDH4zT-emkHyt8RblFGRI4hOQdy7f58fO5KXBg87TdpBMmPUDCjDsVa9Ga2oH2zYujMGswX_K2nLr46YYL7fJtqPxNGAFvotaDBxrLKyHouFhBCCEOvSoRfDXtooc9xcdWHDOOjMvqNmAw'
    },
    {
      id: 'PRA-02',
      name: 'Prashant Gupta',
      role: 'Process Engineer',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATlauWnGAyAE4I0eYWLyLWfCrCBFTHVgNbYNnVwKRoN_Pkz0u6l7hei9IVpx2K4xpAcA1jLozPPVIj1IUo6q4yLlvrGv3TbLprwjsfY8RxCFyxUk4ftf4qOcEU-ckscN03zURn90gFrsw3xhW10-SN-YVf1ZMS-zxPcw7-8nsD-pi_uQRLFPsNc00Qkn27hkWjCZcavkX8IovbdSt153bANdOSRirZmbzu76Wck6CpunvSNhRAgIA0'
    },
    {
      id: 'RAH-03',
      name: 'Rahul Kumar Acharya',
      role: 'Hardware Lead',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrYx1hrLDxsymtxEps8jMTZOkALYi4_cgnXTASdGmkxopyT7lJ491JJto4DKa8y-rrHTRSnHNWroy9ygdYYVePkz21SlLcxDIFGtKK1JMkLWX5b5vXPidZfmlt5icZg5ksh5k8pcaG6AQrf_EDdtcCWNnNwWxTzKNfiqlIA3GX9Nzc58oe4R9UkNQpW1ycn6L0ARdpFccvVbIb-LMSzPtITvhiQeUrVn7qB7R8ahhWpjAVlbAev3re'
    },
    {
      id: 'SAK-04',
      name: 'Sakshi Kumari',
      role: 'Data Operations',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTmUWjaMRND43NlbU09iay_FmSrOVw6fMUg1ewFZZu-zbUHuXWpmOrso66VgYUkNHT7Kauz0VVfP2uKVsb1tV7hVYbR_XgteVhl_C9YgxskfFkVD1D1vstaqRFb65k6aDG6TujDLnH0WDM_gg0i53C50FwROvi3xexKquhzjNrNEB6R50Mx_Aixu1Pq8wmtRpmsA1WwU_x0E0x-0UhqLZxAwe2NEeWR6StZeabD5VJqvpONUf8Dh22'
    },
    {
      id: 'NAR-05',
      name: 'Naresh Kumar',
      role: 'Deployment Specialist',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMOgl_RlrthCEcjzv4Zg91fxOEDPFTClAIGqDwFwsUtSe10d1dBKmcK1tJnjy-Qircz5xQbHkE38HaioXhkqes_mGqN-lJ5YZvBrUwkl1cmzZAEUgSODGZ1vcZO_Wr1aiLVre004uoZKdxHICwXQ2_RSA8yH81T3e8q0X9YnLLgryqUvj5hc_AxPA8k5WTWqC_Fv3gD3K-Ooiv0hOjOyFczHa7fRyC7iu8K6h_fPM5sYQuS45pBpLX'
    }
  ];

  return (
    <div className="flex-grow w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-margin-desktop">
      {/* About Comestro Section */}
      <section className="mb-24">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-border-industrial bg-surface-bright">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">ABOUT COMESTRO</span>
          </div>
          <h1 className="font-display-lg text-headline-lg-mobile md:text-6xl text-on-surface mb-8 uppercase">
            ENGINEERING PRECISION. <br/>
            <span className="text-text-muted">LABORATORY DISCIPLINE.</span>
          </h1>
          <p className="font-body-md text-text-muted text-lg mb-8">
            Comestro was forged at Jamia Millia Islamia with a singular mission: to bring absolute certainty to chaotic urban environments. We are a collective of engineers, architects, and technologists dedicated to solving the world's most complex resource recovery challenges.
          </p>
          <div className="flex gap-12 border-t border-border-industrial pt-8 mt-12">
            <div>
              <div className="font-mono-data text-[10px] text-text-muted uppercase mb-1">Origin</div>
              <div className="font-label-caps text-on-surface">Jamia Millia Islamia</div>
            </div>
            <div>
              <div className="font-mono-data text-[10px] text-text-muted uppercase mb-1">Domain</div>
              <div className="font-label-caps text-on-surface">Adaptive MSW Architecture</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Roster Section */}
      <section>
        <div className="mb-16 border-t border-border-industrial pt-16 flex items-center justify-between">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2 uppercase">Core Architecture Team</h2>
            <p className="font-mono-data text-xs text-text-muted uppercase tracking-widest">Team Comestro Personnel</p>
          </div>
          <span className="material-symbols-outlined text-4xl text-border-industrial">group_work</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-gutter">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-surface-bright border border-border-industrial rounded p-1 group hover:border-primary transition-colors duration-300">
              <div className="h-56 w-full bg-surface-container-low mb-4 relative overflow-hidden rounded-sm">
                <img 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                  src={member.img} 
                  alt={member.name} 
                />
                <div className="absolute top-2 right-2 bg-surface-bright/90 backdrop-blur px-2 py-1 border border-border-industrial font-mono-data text-[10px] text-text-muted">
                  ID: {member.id.split('-')[1]}
                </div>
              </div>
              <div className="px-3 pb-3">
                <h3 className="font-label-caps text-label-caps text-on-surface uppercase mb-1">{member.name}</h3>
                <p className="font-mono-data text-mono-data text-primary text-xs">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join the Mission (Optional callout) */}
      <section className="mt-32 bg-surface-bright border border-border-industrial p-12 text-center">
        <span className="material-symbols-outlined text-primary mb-4 text-3xl">science</span>
        <h3 className="font-headline-lg text-headline-lg text-on-surface mb-4">DRIVEN BY DATA</h3>
        <p className="font-body-md text-text-muted max-w-2xl mx-auto">
          We don't guess. We measure, adapt, and refine. If you are passionate about applying rigorous engineering to decentralized resource recovery, our mission is just beginning.
        </p>
      </section>
    </div>
  );
}
