import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

export default function Home() {
  const threejsContainer = useRef(null);

  useEffect(() => {
    if (!threejsContainer.current) return;
    
    const container = threejsContainer.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x22C55E, 1, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    const particles = new THREE.Group();
    scene.add(particles);
    const geo = new THREE.IcosahedronGeometry(0.05);
    const mat = new THREE.MeshStandardMaterial({ color: 0x22C55E, transparent: true, opacity: 0.4 });
    for (let i = 0; i < 50; i++) {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
      particles.add(mesh);
    }
    camera.position.z = 10;
    
    let animationFrameId;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* Section 1: Hero */}
      <section className="w-full relative min-h-[90vh] flex items-center justify-center pt-8 md:pt-24 pb-16 md:pb-32 px-margin-mobile md:px-margin-desktop overflow-hidden border-b border-border-industrial">
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40">
          <div ref={threejsContainer} style={{ width: '100%', height: '100%' }}></div>
        </div>
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-px h-64 bg-slate-800"></div>
          <div className="absolute top-1/4 left-1/4 h-px w-64 bg-slate-800"></div>
        </div>
        <div className="max-w-360 w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter relative z-10">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-6 border border-border-industrial px-3 py-1 bg-surface-bright self-start">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-mono-data text-label-caps text-text-muted tracking-widest">SYS.STATUS: OPTIMAL</span>
            </div>
            <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-8 max-w-2xl leading-tight">
              ADAPTIVE MSW RESOURCE RECOVERY <br/> & RDF CONDITIONING SYSTEM
            </h1>
            <p className="font-body-md text-text-muted mb-12 max-w-md border-l-2 border-border-industrial pl-4">
              Convert an unpredictable waste stream into predictable, quality-controlled resource streams through modular and adaptive processing.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a href="https://wastechakra-process-ccer.bolt.host/" target="_blank" rel="noopener noreferrer" className="bg-primary-container text-slate-900 font-label-caps text-label-caps px-8 py-4 hover:opacity-90 transition-opacity border border-primary-container inline-flex items-center gap-3">
                <span className="">INITIATE DIAGNOSTIC</span>
                <span className="material-symbols-outlined">analytics</span>
              </a>
              <div className="flex flex-col">
                <span className="font-mono-data text-[10px] text-text-muted uppercase">System ID</span>
                <span className="font-mono-data text-mono-data text-on-surface">BCU-01-ALPHA</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 relative flex items-center justify-center pt-12 lg:pt-0">
            <div className="absolute inset-0 border border-border-industrial hidden lg:block pointer-events-none">
              <div className="absolute -top-1 -left-1 w-2 h-2 border border-slate-400 bg-surface"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 border border-slate-400 bg-surface"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border border-slate-400 bg-surface"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border border-slate-400 bg-surface"></div>
            </div>
            <div className="relative w-full aspect-4/3 bg-surface-bright industrial-border flex items-center justify-center p-2 overflow-hidden shadow-sm">
              <img alt="Adaptive Architecture 3D Render" className="w-full h-full object-cover opacity-90 transition-transform duration-1000 hover:scale-105" src="/images/hero.jpg" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The Problem Summary */}
      <section className="w-full relative py-32 px-margin-mobile md:px-margin-desktop border-b border-border-industrial bg-surface-bright">
        <div className="max-w-360 w-full mx-auto flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">THE WASTE STREAM WON’T STAY THE SAME.</h2>
            <p className="font-mono-data text-mono-data text-text-muted">ANALYZING INPUT FLUCTUATIONS ACROSS 72H CYCLE</p>
          </div>
          <div className="w-full max-w-4xl bg-white industrial-border p-8 relative shadow-sm">
            <div className="absolute top-0 right-0 bg-slate-800 text-white font-label-caps text-[10px] px-2 py-1">
              VARIABILITY INDEX: HIGH
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col border-b md:border-b-0 md:border-r border-border-industrial pb-6 md:pb-0 pr-0 md:pr-6">
                <span className="font-mono-data text-label-caps text-slate-600 mb-2">MOISTURE CONTENT</span>
                <div className="flex items-end gap-2 mb-2">
                  <span className="font-display-lg text-3xl text-on-surface">42-68%</span>
                  <span className="material-symbols-outlined text-secondary-container mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                </div>
                <div className="w-full h-1 bg-slate-100 mt-2 relative">
                  <div className="absolute left-[42%] right-[32%] h-full bg-secondary-container"></div>
                </div>
              </div>
              <div className="flex flex-col border-b md:border-b-0 md:border-r border-border-industrial pb-6 md:pb-0 pr-0 md:pr-6">
                <span className="font-mono-data text-label-caps text-slate-600 mb-2">CALORIFIC VALUE</span>
                <div className="flex items-end gap-2 mb-2">
                  <span className="font-display-lg text-3xl text-on-surface">8-14 MJ/kg</span>
                </div>
                <div className="w-full h-1 bg-slate-100 mt-2 relative">
                  <div className="absolute left-[20%] right-[50%] h-full bg-slate-400"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-mono-data text-label-caps text-slate-600 mb-2">DENSITY VARIATION</span>
                <div className="flex items-end gap-2 mb-2">
                  <span className="font-display-lg text-3xl text-on-surface">±35%</span>
                </div>
                <div className="w-full flex items-center justify-between mt-2 font-mono-data text-[10px] text-text-muted">
                  <span className="">MIN</span>
                  <span className="">-------------</span>
                  <span className="">MAX</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/problem" className="text-primary hover:underline font-label-caps uppercase">View detailed problem statement</Link>
          </div>
        </div>
      </section>
      
      {/* Section 3: Bento Grid */}
      <section className="w-full relative py-32 px-margin-mobile md:px-margin-desktop bg-white">
        <div className="max-w-360 w-full mx-auto">
          <div className="mb-12 flex items-center justify-between border-b border-border-industrial pb-4">
            <h3 className="font-mono-data text-mono-data text-on-surface">MATTER CLASSIFICATION</h3>
            <span className="font-mono-data text-[10px] text-text-muted">GRID.SYS.3</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="bg-surface-bright industrial-border p-6 flex flex-col h-80 relative group hover:bg-white transition-colors">
              <div className="absolute top-4 right-4 font-label-caps text-[10px] text-text-muted group-hover:text-primary-container transition-colors">ID-ORG</div>
              <div className="mb-6 flex items-center justify-center w-12 h-12 rounded border border-border-industrial bg-surface text-slate-600">
                <span className="material-symbols-outlined">compost</span>
              </div>
              <h4 className="font-display-lg text-xl mb-2">ORGANIC MATTERS</h4>
              <p className="font-body-md text-text-muted text-sm grow">Highly variable moisture levels. Requires pre-drying stabilization before core processing.</p>
              <div className="mt-4 pt-4 border-t border-border-industrial flex justify-between items-center">
                <span className="font-mono-data text-label-caps">VOLATILITY</span>
                <div className="flex gap-1">
                  <div className="w-2 h-4 bg-secondary-container opacity-20"></div>
                  <div className="w-2 h-4 bg-secondary-container opacity-60"></div>
                  <div className="w-2 h-4 bg-secondary-container glow-amber"></div>
                </div>
              </div>
            </div>
            <div className="bg-surface-bright industrial-border p-6 flex flex-col h-80 relative group hover:bg-white transition-colors">
              <div className="absolute top-4 right-4 font-label-caps text-[10px] text-text-muted group-hover:text-primary-container transition-colors">ID-SYN</div>
              <div className="mb-6 flex items-center justify-center w-12 h-12 rounded border border-border-industrial bg-surface text-slate-600">
                <span className="material-symbols-outlined">recycling</span>
              </div>
              <h4 className="font-display-lg text-xl mb-2">SYNTHETIC POLYMERS</h4>
              <p className="font-body-md text-text-muted text-sm grow">High calorific potential but introduces complex halogen compounds during thermal breakdown.</p>
              <div className="mt-4 pt-4 border-t border-border-industrial flex justify-between items-center">
                <span className="font-mono-data text-label-caps">STABILITY</span>
                <div className="flex gap-1">
                  <div className="w-2 h-4 bg-primary-container opacity-20"></div>
                  <div className="w-2 h-4 bg-primary-container opacity-60"></div>
                  <div className="w-2 h-4 bg-primary-container glow-green"></div>
                </div>
              </div>
            </div>
            <div className="bg-surface-bright industrial-border p-6 flex flex-col h-80 relative group hover:bg-white transition-colors">
              <div className="absolute top-4 right-4 font-label-caps text-[10px] text-text-muted group-hover:text-primary-container transition-colors">ID-INR</div>
              <div className="mb-6 flex items-center justify-center w-12 h-12 rounded border border-border-industrial bg-surface text-slate-600">
                <span className="material-symbols-outlined">layers</span>
              </div>
              <h4 className="font-display-lg text-xl mb-2">INERT CONTAMINANTS</h4>
              <p className="font-body-md text-text-muted text-sm grow">Glass, metals, and ash residues that bypass conversion and require mechanical separation.</p>
              <div className="mt-4 pt-4 border-t border-border-industrial flex justify-between items-center">
                <span className="font-mono-data text-label-caps">ABRASION RISK</span>
                <div className="flex gap-1">
                  <div className="w-2 h-4 bg-slate-300"></div>
                  <div className="w-2 h-4 bg-slate-400"></div>
                  <div className="w-2 h-4 bg-slate-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 4: Adaptive Pipeline (Redesigned) */}
      <section className="w-full relative py-32 bg-surface-bright border-t border-border-industrial overflow-hidden">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, theme('colors.slate.300') 1px, transparent 1px), linear-gradient(to bottom, theme('colors.slate.300') 1px, transparent 1px)", backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-360 w-full mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="text-center mb-24">
            <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">PROCESS ARCHITECTURE</h2>
            <p className="font-mono-data text-primary uppercase tracking-widest text-sm">Modular Municipal Waste Processing Plant</p>
          </div>
          
          <div className="relative w-full max-w-5xl mx-auto">
            {/* Central glowing vertical axis */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border-industrial transform md:-translate-x-1/2">
               <div className="absolute top-0 left-0 w-full h-1/4 bg-linear-to-b from-transparent via-primary to-transparent animate-[flowDown_4s_linear_infinite]"></div>
            </div>

            <style>{`
              @keyframes flowDown {
                0% { top: -20%; }
                100% { top: 120%; }
              }
            `}</style>
            
            <div className="flex flex-col gap-12 md:gap-0">
              {[
                { id: "01", title: "INPUT & RECEPTION", icon: "move_to_inbox", desc: "Waste In via Conveyor" },
                { id: "02", title: "PRE-SHREDDING & SCREENING", icon: "filter_alt", desc: "Shredder Module & Trommel Screen" },
                { id: "03", title: "MECHANICAL SEPARATION", icon: "call_split", desc: "Magnetic Separator, Ballistic Separator, Star Screen" },
                { id: "04", title: "ADVANCED SENSING & SORTING", icon: "document_scanner", desc: "NIR/Optical & X-Ray Sorters" },
                { id: "05", title: "CONDENSING & BAILING", icon: "compress", desc: "Baler Modules & Compactor Press" },
                { id: "06", title: "COMPOSTING / ORGANIC TREATMENT", icon: "compost", desc: "Bio-reactor, Bio-filter, Maturation bay" },
                { id: "07", title: "REFUSE-DERIVED FUEL (RDF)", icon: "local_fire_department", desc: "Pelletizer & Secondary Shredder" },
                { id: "08", title: "STORAGE & DISPATCH", icon: "local_shipping", desc: "RDF Out, PET Finished Products, Metals" },
              ].map((step, index) => (
                <div key={step.id} className={`relative flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 w-full ${index % 2 === 0 ? 'md:flex-row-reverse text-left md:text-right' : 'text-left'}`}>
                  {/* Timeline Node */}
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-surface-bright border-2 border-primary rounded-full z-20 flex items-center justify-center top-6 md:top-8">
                    <div className="w-1 h-1 bg-primary rounded-full animate-ping"></div>
                  </div>
                  
                  {/* Content Card */}
                  <div className="ml-16 md:ml-0 w-full md:w-1/2 group">
                    <div className="p-6 md:p-8 bg-surface border border-border-industrial rounded hover:border-primary transition-colors duration-300 relative overflow-hidden flex flex-col">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      
                      <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <span className="material-symbols-outlined text-primary text-3xl opacity-80">{step.icon}</span>
                        <span className="font-mono-data text-text-muted text-sm">STEP.{step.id}</span>
                      </div>
                      
                      <h3 className="font-label-caps text-on-surface text-xl mb-2">{step.title}</h3>
                      <p className="font-mono-data text-xs text-text-muted uppercase tracking-wide">{step.desc}</p>
                    </div>
                  </div>
                  
                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-24 text-center relative z-10">
            <Link to="/final" className="group inline-flex items-center gap-2 text-primary hover:text-on-primary-container font-label-caps uppercase transition-colors px-6 py-3 border border-border-industrial hover:border-primary bg-surface rounded">
              See Final Impact
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
