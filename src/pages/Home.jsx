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
      <section className="w-full relative min-h-[90vh] flex items-center justify-center pt-24 pb-32 px-margin-mobile md:px-margin-desktop overflow-hidden border-b border-border-industrial">
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40">
          <div ref={threejsContainer} style={{ width: '100%', height: '100%' }}></div>
        </div>
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-px h-64 bg-slate-800"></div>
          <div className="absolute top-1/4 left-1/4 h-px w-64 bg-slate-800"></div>
        </div>
        <div className="max-w-360 w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter relative z-10">
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-12 lg:pt-0">
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
              <Link to="/system" className="bg-primary-container text-slate-900 font-label-caps text-label-caps px-8 py-4 hover:opacity-90 transition-opacity border border-primary-container inline-flex items-center gap-3">
                <span className="">INITIATE DIAGNOSTIC</span>
                <span className="material-symbols-outlined">analytics</span>
              </Link>
              <div className="flex flex-col">
                <span className="font-mono-data text-[10px] text-text-muted uppercase">System ID</span>
                <span className="font-mono-data text-mono-data text-on-surface">BCU-01-ALPHA</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 relative order-1 lg:order-2 flex items-center justify-center">
            <div className="absolute inset-0 border border-border-industrial m-4 hidden lg:block pointer-events-none">
              <div className="absolute -top-1 -left-1 w-2 h-2 border border-slate-400 bg-surface"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 border border-slate-400 bg-surface"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border border-slate-400 bg-surface"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border border-slate-400 bg-surface"></div>
            </div>
            <div className="relative w-full aspect-4/3 bg-surface-bright industrial-border flex items-center justify-center p-8 overflow-hidden shadow-sm">
              <img alt="Adaptive Architecture 3D Render" className="w-full h-full object-cover opacity-90 transition-transform duration-1000 hover:scale-105" src="/images/hero.jpg" />
              <div className="absolute top-4 right-4 text-right bg-surface-bright/80 p-2 backdrop-blur">
                <div className="font-mono-data text-label-caps text-text-muted">TARGET CALORIFIC VALUE</div>
                <div className="font-mono-data text-body-md text-on-surface">~18 MJ/kg</div>
              </div>
              <div className="absolute bottom-4 left-4 bg-surface-bright/80 p-2 backdrop-blur">
                <div className="font-mono-data text-label-caps text-text-muted">TARGET MOISTURE</div>
                <div className="font-mono-data text-body-md text-on-surface">&lt;15%</div>
              </div>
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
      
      {/* Section 4: Adaptive Narrative */}
      <section className="w-full relative py-32 px-margin-mobile md:px-margin-desktop bg-surface border-t border-border-industrial overflow-hidden">
        <div className="max-w-360 w-full mx-auto">
          <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-center mb-24">PROCESS ARCHITECTURE</h2>
          
          <div className="relative w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 mt-12 px-4 md:px-12">
            <style>{`
              @keyframes dataFlow {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(400%); }
              }
              .animate-data-flow {
                animation: dataFlow 3s linear infinite;
              }
            `}</style>
            
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-px bg-border-industrial -z-10 transform -translate-y-1/2 overflow-hidden">
               <div className="absolute top-0 left-0 h-full w-1/4 bg-linear-to-r from-transparent via-primary to-transparent animate-data-flow"></div>
            </div>

            {/* Step 1 */}
            <div className="group bg-surface-bright border border-border-industrial p-8 w-full md:w-72 flex flex-col items-center text-center relative z-10 hover:border-primary transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-full border border-border-industrial bg-surface flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary transition-all duration-300">
                <span className="material-symbols-outlined text-2xl">input</span>
              </div>
              <h3 className="font-label-caps text-lg mb-2 text-on-surface">RAW MSW INPUT</h3>
              <p className="font-mono-data text-xs text-text-muted uppercase">HETEROGENEOUS MIX</p>
              
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 bg-surface border border-border-industrial rotate-45 group-hover:border-primary group-hover:bg-primary/10 transition-colors"></div>
            </div>
            
            {/* Step 2 */}
            <div className="group bg-surface-bright border-2 border-primary-container p-8 w-full md:w-80 flex flex-col items-center text-center relative z-10 shadow-[0_0_30px_rgba(34,197,94,0.1)] transform md:scale-110 hover:scale-[1.12] transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary-container to-primary"></div>
              <div className="w-20 h-20 rounded-full bg-primary-container/20 border border-primary-container text-primary-container flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 rounded-full border border-primary-container animate-ping opacity-20"></div>
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
              </div>
              <h3 className="font-label-caps text-xl mb-2 text-on-surface">BIO-CYCLE UNIT</h3>
              <p className="font-mono-data text-xs text-primary-container uppercase">ADAPTIVE STABILIZATION</p>
            </div>
            
            {/* Step 3 */}
            <div className="group bg-surface-bright border border-border-industrial p-8 w-full md:w-72 flex flex-col items-center text-center relative z-10 hover:border-secondary-container transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-full border border-border-industrial bg-surface flex items-center justify-center mb-6 group-hover:bg-secondary-container/10 group-hover:text-secondary-container group-hover:border-secondary-container transition-all duration-300">
                <span className="material-symbols-outlined text-2xl">output</span>
              </div>
              <h3 className="font-label-caps text-lg mb-2 text-on-surface">RECOVERED RESOURCES</h3>
              <p className="font-mono-data text-xs text-text-muted uppercase">HOMOGENIZED YIELD</p>
              
              <div className="hidden md:block absolute top-1/2 -left-3 transform -translate-y-1/2 w-6 h-6 bg-surface border border-border-industrial rotate-45 group-hover:border-secondary-container group-hover:bg-secondary-container/10 transition-colors"></div>
            </div>
          </div>
          
          <div className="mt-24 text-center">
            <Link to="/final" className="group inline-flex items-center gap-2 text-primary hover:text-primary-container font-label-caps uppercase transition-colors">
              See Final Impact CTA
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
