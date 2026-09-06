import { useRef, useEffect, useState, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Gauge,
  Settings2,
  X,
  Cpu,
  Zap,
  Recycle,
  Languages,
  ChevronDown,
  Maximize,
  Minimize,
} from "lucide-react";
import {
  MATERIAL_COLORS,
  DESTINATION_LABELS,
  DESTINATION_COLORS,
  STAGE_IDS,
  STAGE_LABELS,
  SCENARIOS,
} from "./types";
import {
  computeComposition,
  computePurity,
  routeMaterial,
  valuePerKg,
  generateAILines,
  computeStageStats,
  computeFinalResult,
  efficiencyFor,
} from "./engine";
import { NODE_INFO_MAP, NODE_INFO_MAP_EN } from "./nodeInfo";
import { UI } from "./i18n";

const CANVAS_W = 1100;
const CANVAS_H = 620;

// Stage positions along main conveyor (x, y)
const STAGE_X = {
  reception: 90,
  "ai-scanner": 200,
  shredder: 310,
  trommel: 420,
  magnetic: 530,
  "non-ferrous": 640,
  "optical-sorter": 750,
  quality: 860,
  routing: 970,
};

const CONVEYOR_Y = 340;
const DESTINATIONS = [
  "plastic-recycling",
  "paper-recovery",
  "metal-recovery",
  "composting",
  "anaerobic-digestion",
  "rdf-fuel",
  "construction",
  "residual-disposal",
];

const DEST_Y = {
  "plastic-recycling": 80,
  "paper-recovery": 120,
  "metal-recovery": 160,
  composting: 200,
  "anaerobic-digestion": 470,
  "rdf-fuel": 510,
  construction: 550,
  "residual-disposal": 590,
};

let particleId = 0;

function makeParticle(material) {
  return {
    id: particleId++,
    material,
    x: 50,
    y: CONVEYOR_Y + (Math.random() - 0.5) * 24,
    stageIndex: 0,
    removed: false,
    scanned: false,
    routed: false,
    finalRouting: false,
    size: 4 + Math.random() * 3,
    speed: 0.8 + Math.random() * 0.4,
    color: MATERIAL_COLORS[material],
  };
}

function buildParticles(p, maxCount = 120) {
  const comp = computeComposition(p);
  const fractions = [
    ["organic", comp.organic],
    ["plastic", comp.plastic],
    ["paper", comp.paper],
    ["ferrous", comp.ferrous],
    ["aluminium", comp.aluminium],
    ["glass", comp.glass],
    ["residual", comp.residual],
  ];
  const total = fractions.reduce((s, [, m]) => s + m, 0);
  const particles = [];
  for (const [mat, mass] of fractions) {
    const count = Math.round((mass / total) * maxCount);
    for (let i = 0; i < count; i++) particles.push(makeParticle(mat));
  }
  return particles;
}

export default function WasteChakraSimulation() {
  const canvasRef = useRef(null);
  const [params, setParams] = useState(SCENARIOS["Normal Waste"]);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [particles, setParticles] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [aiLines, setAILines] = useState([]);
  const [stageStats, setStageStats] = useState([]);
  const [finalResult, setFinalResult] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [language, setLanguage] = useState("en");
  const [langOpen, setLangOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const langRef = useRef(null);
  const animRef = useRef(0);
  const demoTimer = useRef(null);
  const paramsRef = useRef(params);
  const speedRef = useRef(speed);
  const runningRef = useRef(running);
  const hoverIdRef = useRef(null);
  paramsRef.current = params;
  speedRef.current = speed;
  runningRef.current = running;

  useEffect(() => {
    hoverIdRef.current = hoverInfo?.id ?? null;
  }, [hoverInfo?.id]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setDemoMode(false);
    if (demoTimer.current) clearTimeout(demoTimer.current);
    setParticles([]);
    setAILines([]);
    setStageStats([]);
    setFinalResult(null);
    setSelectedNode(null);
    setShowAI(false);
  }, []);

  const run = useCallback(() => {
    if (particles.length === 0) {
      const ps = buildParticles(paramsRef.current);
      setParticles(ps);
      setAILines(generateAILines(paramsRef.current));
      setStageStats(computeStageStats(paramsRef.current));
      setFinalResult(computeFinalResult(paramsRef.current));
    }
    setRunning(true);
  }, [particles.length]);

  const pause = useCallback(() => setRunning(false), []);

  const runDemo = useCallback(() => {
    reset();
    const ps = buildParticles(paramsRef.current);
    setParticles(ps);
    setAILines(generateAILines(paramsRef.current));
    setStageStats(computeStageStats(paramsRef.current));
    setFinalResult(computeFinalResult(paramsRef.current));
    setRunning(true);
    setDemoMode(true);
    setShowAI(true);
    demoTimer.current = setTimeout(() => {
      setRunning(false);
      setDemoMode(false);
    }, 60000);
  }, [reset]);

  useEffect(() => {
    return () => {
      if (demoTimer.current) clearTimeout(demoTimer.current);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_W * dpr;
    canvas.height = CANVAS_H * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    canvas.style.aspectRatio = `${CANVAS_W} / ${CANVAS_H}`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let ps = particles;
    let lastTime = performance.now();

    const draw = (now) => {
      const dt = Math.min(50, now - lastTime) / 16.67;
      lastTime = now;
      const p = paramsRef.current;
      const sp = speedRef.current;
      const isRunning = runningRef.current;
      const hoverId = hoverIdRef.current;

      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      drawBackground(ctx);
      drawConveyor(ctx, selectedNode, hoverId);
      drawStages(ctx, selectedNode, hoverId);
      drawDestinations(ctx);

      if (isRunning && ps.length > 0) {
        ps = updateParticles(ps, p, sp * dt);
        setParticles(ps.slice());
      }

      drawParticles(ctx, ps);

      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [particles.length === 0, selectedNode]); // eslint-disable-line

  const updateParam = (key, val) => {
    setParams((prev) => ({ ...prev, [key]: val }));
  };

  const applyScenario = (name) => {
    setParams(SCENARIOS[name]);
    reset();
  };

  const activeNodeId = hoverInfo?.id || selectedNode;
  const infoMap = language === "en" ? NODE_INFO_MAP_EN : NODE_INFO_MAP;
  const activeNodeInfo = activeNodeId ? infoMap[activeNodeId] : null;
  const selectedStageInfo = stageStats.find((s) => s.id === activeNodeId);
  const t = UI[language];
  const selectLang = (lang) => {
    setLanguage(lang);
    setLangOpen(false);
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-surface text-on-surface"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(34,197,94,0.06), transparent 60%)",
      }}
    >

      <div className="max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Main simulation */}
        <div>
          <div className="rounded-2xl border border-border-industrial bg-surface-bright p-4 blueprint-shadow">
            <div ref={containerRef} className="relative w-full overflow-hidden rounded-xl bg-surface">
              <canvas
                ref={canvasRef}
                onClick={(e) => handleCanvasClick(e, canvasRef.current, setSelectedNode)}
                onMouseMove={(e) => handleCanvasHover(e, canvasRef.current, setHoverInfo)}
                onMouseLeave={() => setHoverInfo(null)}
                className="cursor-pointer block w-full h-auto"
              />

              {/* Top Controls */}
              <div className="absolute top-3 right-3 z-40 flex items-center gap-2">
                {/* Fullscreen Toggle */}
                <button
                  onClick={toggleFullscreen}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-bright/95 backdrop-blur border border-border-industrial text-text-muted shadow-sm hover:text-primary hover:border-primary/40 transition-colors"
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>

                {/* Language selector */}
                <div ref={langRef} className="relative">
                  <button
                    onClick={() => setLangOpen((o) => !o)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-bright/95 backdrop-blur border border-border-industrial text-xs font-medium text-on-surface shadow-sm hover:border-primary/40 transition-colors"
                  >
                    <Languages className="w-3.5 h-3.5 text-primary" />
                    {t.langLabel}
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-text-muted transition-transform ${langOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {langOpen && (
                    <div className="absolute right-0 mt-1.5 w-32 rounded-lg border border-border-industrial bg-surface-bright shadow-xl overflow-hidden">
                      <button
                        onClick={() => selectLang("en")}
                        className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-primary/5 transition-colors ${
                          language === "en" ? "text-primary bg-primary/5" : "text-on-surface"
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => selectLang("hi")}
                        className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-primary/5 transition-colors ${
                          language === "hi" ? "text-primary bg-primary/5" : "text-on-surface"
                        }`}
                      >
                        हिन्दी
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Hover Tooltip Card */}
              {hoverInfo && infoMap[hoverInfo.id] && (
                <div
                  className="absolute z-30 pointer-events-none transition-all duration-150 ease-out transform"
                  style={{
                    left: `${hoverInfo.percentX}%`,
                    top: `${hoverInfo.percentY}%`,
                    transform:
                      hoverInfo.percentX > 75
                        ? hoverInfo.percentY > 70
                          ? "translate(-105%, -100%)"
                          : "translate(-105%, -45%)"
                        : hoverInfo.percentX < 20
                        ? "translate(5%, -110%)"
                        : hoverInfo.percentY > 70
                        ? "translate(-50%, -70%)"
                        : "translate(-50%, -115%)",
                  }}
                >
                  <div className="w-72 md:w-84 p-3.5 rounded-xl border border-primary/40 bg-surface-bright shadow-2xl backdrop-blur-md text-on-surface ring-1 ring-primary/20">
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border ${
                          infoMap[hoverInfo.id].tagColor
                        }`}
                      >
                        {infoMap[hoverInfo.id].tag}
                      </span>
                      <span className="text-[10px] text-text-muted font-mono">
                        {t.category(infoMap[hoverInfo.id].category)}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-on-surface mb-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                      {infoMap[hoverInfo.id].name}
                    </h4>

                    {/* User requested short message box */}
                    <div className="mt-1.5 p-2 rounded-lg bg-primary/5 border border-primary/20 text-xs text-on-surface leading-relaxed font-medium">
                      💡 {infoMap[hoverInfo.id].shortDesc}
                    </div>

                    <div className="mt-2 pt-2 border-t border-border-industrial flex items-center justify-between text-[11px] text-text-muted font-mono">
                      <span>{t.flow}</span>
                      <span className="text-on-surface truncate max-w-[200px]">
                        {infoMap[hoverInfo.id].inputOutput}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-4 rounded-2xl border border-border-industrial bg-surface-bright p-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={run}
                disabled={running}
                className="btn-industrial btn-industrial--primary"
              >
                <Play className="w-4 h-4" /> {t.run}
              </button>
              <button
                onClick={pause}
                disabled={!running}
                className="btn-industrial btn-industrial--secondary"
              >
                <Pause className="w-4 h-4" /> {t.pause}
              </button>
              <button
                onClick={reset}
                className="btn-industrial btn-industrial--neutral"
              >
                <RotateCcw className="w-4 h-4" /> {t.reset}
              </button>
              <button
                onClick={runDemo}
                className={`btn-industrial ${demoMode ? "btn-industrial--primary" : "btn-industrial--neutral"}`}
              >
                <Zap className="w-4 h-4" /> {t.demo}
              </button>
              <div className="flex items-center gap-2 ml-auto">
                <Gauge className="w-4 h-4 text-text-muted" />
                <input
                  type="range"
                  min={0.5}
                  max={3}
                  step={0.5}
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-32 waste-slider"
                  style={{ background: `linear-gradient(to right, #006e2f ${((speed - 0.5) / 2.5) * 100}%, #e2e8f0 ${((speed - 0.5) / 2.5) * 100}%)` }}
                />
                <span className="text-xs text-text-muted w-10 font-mono-data">{speed}x</span>
              </div>
            </div>
          </div>

          {/* Final results */}
          {finalResult && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
              <ResultCard label={t.input} value={`${finalResult.input} kg`} color="text-slate-700" />
              <ResultCard label={t.recovered} value={`${finalResult.recovered} kg`} color="text-emerald-600" />
              <ResultCard label={t.residual} value={`${finalResult.residual} kg`} color="text-amber-600" />
              <ResultCard label={t.diversion} value={`${finalResult.diversion}%`} color="text-primary" />
              <ResultCard label={t.recoveredValue} value={`₹${finalResult.recoveredValue.toLocaleString("en-IN")}`} color="text-teal-700" />
            </div>
          )}

          {demoMode && finalResult && (
            <div className="mt-4 text-center py-6 rounded-2xl border border-primary/40 bg-gradient-to-r from-primary/10 to-teal-200/30">
              <p className="text-2xl font-bold tracking-wider text-primary">{t.bannerTitle}</p>
              <p className="text-sm text-text-muted mt-1">{t.bannerSub(finalResult.diversion)}</p>
            </div>
          )}
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          {/* Machine / Node Information Inspector */}
          {activeNodeInfo ? (
            <div className="rounded-2xl border border-primary/40 bg-surface-bright p-4 shadow-lg shadow-primary/10">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${activeNodeInfo.tagColor}`}>
                  {activeNodeInfo.tag}
                </span>
                <button
                  onClick={() => {
                    setSelectedNode(null);
                    setHoverInfo(null);
                  }}
                  className="text-text-muted hover:text-on-surface"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-bold text-base text-on-surface mb-1">{activeNodeInfo.name}</h3>

              <div className="p-2.5 rounded-xl bg-primary/5 border border-primary/20 text-xs text-on-surface leading-relaxed font-medium mb-3">
                💡 {activeNodeInfo.shortDesc}
              </div>

              <div className="space-y-2 text-xs text-on-surface">
                <div>
                  <p className="text-text-muted font-semibold mb-0.5">{t.details}</p>
                  <p className="text-on-surface leading-normal">{activeNodeInfo.detailedDesc}</p>
                </div>

                <div className="pt-2 border-t border-border-industrial">
                  <p className="text-text-muted font-semibold mb-0.5">{t.technology}</p>
                  <p className="font-mono text-primary text-[11px]">{activeNodeInfo.techSpecs}</p>
                </div>

                {activeNodeInfo.targetMaterials && (
                  <div className="pt-2 border-t border-border-industrial">
                    <p className="text-text-muted font-semibold mb-1">{t.targetMaterials}</p>
                    <div className="flex flex-wrap gap-1">
                      {activeNodeInfo.targetMaterials.map((mat, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-primary/5 border border-border-industrial text-[10px] text-on-surface-variant">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedStageInfo && (
                  <div className="pt-2 border-t border-border-industrial space-y-1.5 text-sm">
                    <InfoRow label={t.liveInput} value={`${selectedStageInfo.input} kg`} />
                    <InfoRow label={t.liveRecovered} value={`${selectedStageInfo.recovered} kg`} />
                    <InfoRow label={t.efficiency} value={`${selectedStageInfo.efficiency}%`} />
                    <InfoRow label={t.status} value={running ? t.running : t.idle} valueColor={running ? "text-primary" : "text-text-muted"} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-border-industrial bg-surface-bright p-4">
              <div className="flex items-center gap-2 mb-2">
                <Settings2 className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-sm">{t.hoverTitle}</h3>
              </div>
              <p className="text-xs text-text-muted mb-3">
                {t.hoverDesc}
              </p>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                {STAGE_IDS.map((id) => (
                  <button
                    key={id}
                    onClick={() => setSelectedNode(id)}
                    className="btn-industrial btn-industrial--neutral btn-industrial--small justify-start text-left truncate"
                  >
                    • {STAGE_LABELS[id]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AI Panel */}
          {showAI && aiLines.length > 0 && (
            <div className="rounded-2xl border border-primary/20 bg-surface-bright p-4">
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-sm">{t.aiPanel}</h3>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {aiLines.map((line, i) => (
                  <div key={i} className="text-xs border border-border-industrial rounded-lg p-2.5 bg-surface">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-on-surface">{line.material}</span>
                      <span className="text-primary font-mono">{line.confidence}%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-text-muted">
                      <span>{t.purity} <span className="text-on-surface">{line.purity}%</span></span>
                      <span>{t.contam} <span className="text-on-surface">{line.contamination}%</span></span>
                      <span>{t.recovery} <span className="text-on-surface">{line.recoverability}</span></span>
                      <span>{t.value} <span className="text-on-surface">₹{line.valuePerKg}/kg</span></span>
                    </div>
                    <div className="mt-1.5 text-primary">→ {DESTINATION_LABELS[line.destination]}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Parameters */}
          <div className="rounded-2xl border border-border-industrial bg-surface-bright p-4">
            <h3 className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-3">{t.params}</h3>
            <div className="space-y-3">
              <ParamSlider label={t.totalWaste} value={params.totalWaste} min={200} max={2000} step={100} unit="kg" onChange={(v) => updateParam("totalWaste", v)} />
              <ParamSlider label={t.moisture} value={params.moisture} min={0} max={100} step={5} unit="%" onChange={(v) => updateParam("moisture", v)} />
              <ParamSlider label={t.contamination} value={params.contamination} min={0} max={100} step={5} unit="%" onChange={(v) => updateParam("contamination", v)} />
              <ParamSlider label={t.organicFraction} value={params.organicFraction} min={0} max={80} step={5} unit="%" onChange={(v) => updateParam("organicFraction", v)} />
              <ParamSlider label={t.plasticFraction} value={params.plasticFraction} min={0} max={50} step={2} unit="%" onChange={(v) => updateParam("plasticFraction", v)} />
              <ParamSlider label={t.metalFraction} value={params.metalFraction} min={0} max={30} step={2} unit="%" onChange={(v) => updateParam("metalFraction", v)} />
            </div>
          </div>

          {/* Scenarios */}
          <div className="rounded-2xl border border-border-industrial bg-surface-bright p-4">
            <h3 className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-3">{t.scenarios}</h3>
            <div className="space-y-2">
              {Object.keys(SCENARIOS).map((name) => (
                <button
                  key={name}
                  onClick={() => applyScenario(name)}
                  className="btn-industrial btn-industrial--neutral btn-industrial--small w-full text-left justify-start"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// === Drawing helpers ===

function drawBackground(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
  grad.addColorStop(0, "#f8fafc");
  grad.addColorStop(1, "#eef2f7");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Grid
  ctx.strokeStyle = "rgba(100,116,139,0.18)";
  ctx.lineWidth = 1;
  for (let x = 0; x < CANVAS_W; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, CANVAS_H);
    ctx.stroke();
  }
  for (let y = 0; y < CANVAS_H; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(CANVAS_W, y);
    ctx.stroke();
  }
}

function drawConveyor(ctx, selectedId, hoverId) {
  // Main conveyor belt
  ctx.fillStyle = "#e2e8f0";
  ctx.fillRect(40, CONVEYOR_Y - 20, 960, 40);
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 2;
  ctx.strokeRect(40, CONVEYOR_Y - 20, 960, 40);

  // Belt texture lines
  ctx.strokeStyle = "rgba(148,163,184,0.6)";
  ctx.lineWidth = 1;
  for (let x = 50; x < 1000; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, CONVEYOR_Y - 18);
    ctx.lineTo(x, CONVEYOR_Y + 18);
    ctx.stroke();
  }

  // Destination bins
  DESTINATIONS.forEach((d) => {
    const y = DEST_Y[d];
    const isHovered = hoverId === d;
    const isSelected = selectedId === d;
    drawBin(ctx, 1010, y, DESTINATION_COLORS[d], DESTINATION_LABELS[d], isHovered, isSelected);
    // Pipe from routing to bin
    ctx.strokeStyle = isHovered || isSelected ? DESTINATION_COLORS[d] : DESTINATION_COLORS[d] + "80";
    ctx.lineWidth = isHovered || isSelected ? 4 : 3;
    ctx.beginPath();
    ctx.moveTo(970, CONVEYOR_Y);
    ctx.lineTo(1010, y);
    ctx.stroke();
  });
}

function drawBin(
  ctx,
  x,
  y,
  color,
  label,
  isHovered = false,
  isSelected = false
) {
  ctx.save();
  if (isHovered || isSelected) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;
  }
  ctx.fillStyle = isSelected ? "#ffffff" : "#f8fafc";
  roundRect(ctx, x, y - 16, 80, 32, 4);
  ctx.fill();
  ctx.strokeStyle = isHovered || isSelected ? "#ffffff" : color;
  ctx.lineWidth = isHovered || isSelected ? 3 : 2;
  ctx.stroke();
  ctx.restore();

  // Inner fill level
  ctx.fillStyle = color + "35";
  ctx.fillRect(x + 2, y - 2, 76, 16);

  // Label
  ctx.fillStyle = isHovered || isSelected ? "#ffffff" : color;
  ctx.font = isHovered || isSelected ? "bold 8.5px sans-serif" : "8px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label.length > 18 ? label.slice(0, 16) + "…" : label, x + 40, y + 6);
}

function drawStages(ctx, selected, hover) {
  for (const id of STAGE_IDS) {
    const x = STAGE_X[id];
    const y = CONVEYOR_Y;
    const isSelected = selected === id;
    if (hover === id && !isSelected) {
      ctx.save();
      ctx.shadowColor = "rgba(34,197,94,0.9)";
      ctx.shadowBlur = 14;
      ctx.strokeStyle = "rgba(34,197,94,0.6)";
      ctx.lineWidth = 2;
      roundRect(ctx, x - 40, y - 47, 80, 94, 8);
      ctx.stroke();
      ctx.restore();
    }
    drawMachine(ctx, id, x, y, isSelected);
  }

  // Flow arrows between stages
  ctx.fillStyle = "#94a3b8";
  for (let i = 0; i < STAGE_IDS.length - 1; i++) {
    const x1 = STAGE_X[STAGE_IDS[i]] + 38;
    const x2 = STAGE_X[STAGE_IDS[i + 1]] - 38;
    const mid = (x1 + x2) / 2;
    ctx.beginPath();
    ctx.moveTo(mid - 4, CONVEYOR_Y - 25);
    ctx.lineTo(mid + 4, CONVEYOR_Y - 25);
    ctx.lineTo(mid, CONVEYOR_Y - 31);
    ctx.fill();
  }
}

function drawMachine(ctx, id, cx, cy, sel) {
  const w = 76;
  const h = 90;
  const x = cx - w / 2;
  const y = cy - h / 2;
  const labelColor = sel ? "#ffffff" : "#64748b";

  // Drop shadow for pseudo-3D lift
  ctx.save();
  ctx.shadowColor = "rgba(15,23,42,0.18)";
  ctx.shadowBlur = sel ? 18 : 10;
  ctx.shadowOffsetY = 6;

  // Body with vertical gradient
  const bodyGrad = ctx.createLinearGradient(x, y, x, y + h);
  if (sel) {
    bodyGrad.addColorStop(0, "#22c55e");
    bodyGrad.addColorStop(1, "#15803d");
  } else {
    bodyGrad.addColorStop(0, "#e2e8f0");
    bodyGrad.addColorStop(1, "#cbd5e1");
  }
  ctx.fillStyle = bodyGrad;
  ctx.strokeStyle = sel ? "#15803d" : "#94a3b8";
  ctx.lineWidth = sel ? 3 : 2;
  roundRect(ctx, x, y, w, h, 6);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Bolt/rivet details
  ctx.fillStyle = "rgba(100,116,139,0.6)";
  for (const [dx, dy] of [
    [6, 6],
    [w - 6, 6],
    [6, h - 6],
    [w - 6, h - 6],
  ]) {
    ctx.beginPath();
    ctx.arc(x + dx, y + dy, 1.3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Top label bar
  ctx.fillStyle = sel ? "#16a34a" : "#64748b";
  roundRect(ctx, x, y, w, 14, 6);
  ctx.fill();
  ctx.fillStyle = labelColor;
  ctx.font = "bold 7px sans-serif";
  ctx.textAlign = "center";
  const shortLabel = STAGE_LABELS[id].split(/[/\s]/).slice(0, 2).join(" ");
  ctx.fillText(shortLabel, cx, y + 9);

  // Machine-specific details
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, x + 4, y + 16, w - 8, h - 20, 4);
  ctx.clip();
  const innerGrad = ctx.createLinearGradient(x, y + 16, x, y + h - 4);
  innerGrad.addColorStop(0, "rgba(15,23,42,0.08)");
  innerGrad.addColorStop(0.15, "rgba(15,23,42,0)");
  ctx.fillStyle = innerGrad;
  ctx.fillRect(x + 4, y + 16, w - 8, h - 20);

  switch (id) {
    case "reception":
      drawHopper(ctx, cx, y + 50);
      break;
    case "ai-scanner":
      drawScanner(ctx, cx, y + 50);
      break;
    case "shredder":
      drawShredder(ctx, cx, y + 50);
      break;
    case "trommel":
      drawTrommel(ctx, cx, y + 50);
      break;
    case "magnetic":
      drawMagneticSep(ctx, cx, y + 50);
      break;
    case "non-ferrous":
      drawEddyCurrent(ctx, cx, y + 50);
      break;
    case "optical-sorter":
      drawOpticalSorter(ctx, cx, y + 50);
      break;
    case "quality":
      drawQualitySensor(ctx, cx, y + 50);
      break;
    case "routing":
      drawRoutingEngine(ctx, cx, y + 50);
      break;
  }
  ctx.restore();

  // Collection chute
  if (
    id === "magnetic" ||
    id === "non-ferrous" ||
    id === "optical-sorter" ||
    id === "quality" ||
    id === "trommel"
  ) {
    drawCollectionChute(ctx, cx, cy + 55);
  }
}

function drawHopper(ctx, cx, cy) {
  ctx.fillStyle = "#64748b";
  ctx.beginPath();
  ctx.moveTo(cx - 26, cy - 18);
  ctx.lineTo(cx + 26, cy - 18);
  ctx.lineTo(cx + 14, cy + 8);
  ctx.lineTo(cx - 14, cy + 8);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = "#65a30d";
  ctx.beginPath();
  ctx.arc(cx - 10, cy - 10, 4, 0, Math.PI * 2);
  ctx.arc(cx + 8, cy - 12, 3, 0, Math.PI * 2);
  ctx.arc(cx + 2, cy - 6, 3.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawScanner(ctx, cx, cy) {
  ctx.strokeStyle = "#0ea5e9";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx - 22, cy - 18);
  ctx.lineTo(cx - 22, cy + 12);
  ctx.moveTo(cx + 22, cy - 18);
  ctx.lineTo(cx + 22, cy + 12);
  ctx.stroke();
  const beamY = cy - 14 + Math.sin(Date.now() * 0.003) * 24;
  ctx.strokeStyle = "#0ea5e9";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - 22, beamY);
  ctx.lineTo(cx + 22, beamY);
  ctx.stroke();
  ctx.fillStyle = "#0ea5e9";
  ctx.beginPath();
  ctx.arc(cx, cy - 18, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#082f49";
  ctx.beginPath();
  ctx.arc(cx, cy - 18, 3, 0, Math.PI * 2);
  ctx.fill();
}

function drawShredder(ctx, cx, cy) {
  const rot = Date.now() * 0.005;
  for (const dx of [-10, 10]) {
    ctx.fillStyle = "#475569";
    ctx.beginPath();
    ctx.arc(cx + dx, cy, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    for (let i = 0; i < 6; i++) {
      const a = rot + (i * Math.PI) / 3;
      ctx.strokeStyle = "#f1f5f9";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx + dx + Math.cos(a) * 4, cy + Math.sin(a) * 4);
      ctx.lineTo(cx + dx + Math.cos(a) * 10, cy + Math.sin(a) * 10);
      ctx.stroke();
    }
  }
}

function drawTrommel(ctx, cx, cy) {
  const rot = Date.now() * 0.002;
  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(cx, cy, 28, 14, 0, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = -2; i <= 2; i++) {
    const px = cx + i * 10 + Math.sin(rot + i) * 2;
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(px, cy - 10);
    ctx.lineTo(px, cy + 10);
    ctx.stroke();
  }
  ctx.fillStyle = "#fbbf24";
  ctx.beginPath();
  ctx.arc(cx + 24, cy, 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawMagneticSep(ctx, cx, cy) {
  ctx.fillStyle = "#dc2626";
  roundRect(ctx, cx - 24, cy - 18, 48, 8, 2);
  ctx.fill();
  ctx.strokeStyle = "#ef4444";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.strokeStyle = "rgba(239,68,68,0.4)";
  ctx.lineWidth = 1;
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.moveTo(cx + i * 8, cy - 10);
    ctx.lineTo(cx + i * 8, cy + 6);
    ctx.stroke();
  }
  ctx.fillStyle = "#fff";
  ctx.font = "bold 6px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("N", cx - 18, cy - 12);
  ctx.fillText("S", cx + 18, cy - 12);
}

function drawEddyCurrent(ctx, cx, cy) {
  const rot = Date.now() * 0.006;
  ctx.fillStyle = "#334155";
  ctx.beginPath();
  ctx.arc(cx, cy, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  for (let i = 0; i < 4; i++) {
    const a = rot + (i * Math.PI) / 2;
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * 3, cy + Math.sin(a) * 3);
    ctx.lineTo(cx + Math.cos(a) * 11, cy + Math.sin(a) * 11);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(251,191,36,0.5)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx + 16, cy, 5, -Math.PI / 2, Math.PI / 2);
  ctx.stroke();
}

function drawOpticalSorter(ctx, cx, cy) {
  ctx.fillStyle = "#0c4a6e";
  roundRect(ctx, cx - 16, cy - 18, 32, 8, 2);
  ctx.fill();
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3, 2]);
  ctx.beginPath();
  ctx.moveTo(cx, cy - 10);
  ctx.lineTo(cx, cy + 8);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#64748b";
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.arc(cx + i * 8, cy + 12, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  if (Math.sin(Date.now() * 0.008) > 0.5) {
    ctx.strokeStyle = "rgba(56,189,248,0.7)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx, cy + 14);
    ctx.lineTo(cx, cy + 20);
    ctx.stroke();
  }
}

function drawQualitySensor(ctx, cx, cy) {
  ctx.fillStyle = "#334155";
  roundRect(ctx, cx - 22, cy - 14, 44, 28, 4);
  ctx.fill();
  ctx.strokeStyle = "#16a34a";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = "#052e16";
  roundRect(ctx, cx - 16, cy - 10, 32, 12, 2);
  ctx.fill();
  ctx.fillStyle = "#4ade80";
  ctx.font = "6px monospace";
  ctx.textAlign = "center";
  ctx.fillText("SCAN", cx, cy - 2);
  ctx.strokeStyle = "#4ade80";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i < 32; i++) {
    const wx = cx - 16 + i;
    const wy = cy + 8 + Math.sin(Date.now() * 0.005 + i * 0.5) * 3;
    if (i === 0) ctx.moveTo(wx, wy);
    else ctx.lineTo(wx, wy);
  }
  ctx.stroke();
}

function drawRoutingEngine(ctx, cx, cy) {
  ctx.fillStyle = "#0c4a6e";
  ctx.beginPath();
  ctx.arc(cx, cy, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.strokeStyle = "rgba(56,189,248,0.7)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * 14, cy + Math.sin(a) * 14);
    ctx.lineTo(cx + Math.cos(a) * 22, cy + Math.sin(a) * 22);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * 22, cy + Math.sin(a) * 22, 2, 0, Math.PI * 2);
    ctx.stroke();
  }
  const pulse = (Math.sin(Date.now() * 0.004) + 1) / 2;
  ctx.fillStyle = `rgba(56,189,248,${0.3 + pulse * 0.4})`;
  ctx.beginPath();
  ctx.arc(cx, cy, 6 + pulse * 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 7px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("AI", cx, cy + 2);
}

function drawCollectionChute(ctx, cx, cy) {
  ctx.fillStyle = "#475569";
  ctx.beginPath();
  ctx.moveTo(cx - 20, cy);
  ctx.lineTo(cx + 20, cy);
  ctx.lineTo(cx + 12, cy + 14);
  ctx.lineTo(cx - 12, cy + 14);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = "#334155";
  roundRect(ctx, cx - 16, cy + 14, 32, 16, 2);
  ctx.fill();
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = "#e2e8f0";
  ctx.font = "6px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("RECOVERED", cx, cy + 25);
}

function drawDestinations(ctx) {
  ctx.fillStyle = "#64748b";
  ctx.font = "bold 10px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("END PATHWAYS", 1010, 50);
}

function drawParticles(ctx, ps) {
  for (const p of ps) {
    if (p.removed) continue;
    drawWasteItem(ctx, p);
  }
}

function shadeColor(hex, factor) {
  const h = hex.replace("#", "");
  const r = Math.round(parseInt(h.substring(0, 2), 16) * factor);
  const g = Math.round(parseInt(h.substring(2, 4), 16) * factor);
  const b = Math.round(parseInt(h.substring(4, 6), 16) * factor);
  return `rgb(${Math.min(255, r)},${Math.min(255, g)},${Math.min(255, b)})`;
}

function drawWasteItem(ctx, p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate((p.id % 7) * 0.35 + Math.sin(p.x * 0.02 + p.id) * 0.15);

  ctx.save();
  ctx.translate(0, p.size * 0.9);
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.beginPath();
  ctx.ellipse(0, 0, p.size * 0.9, p.size * 0.32, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const dirt = 0.72 + ((p.id * 37) % 28) / 100;
  ctx.fillStyle = shadeColor(p.color, dirt);
  ctx.strokeStyle = shadeColor(p.color, dirt * 0.6);
  ctx.lineWidth = 0.6;

  switch (p.material) {
    case "plastic":
      ctx.beginPath();
      ctx.moveTo(-p.size, -p.size * 0.6);
      ctx.lineTo(-p.size * 0.3, -p.size);
      ctx.lineTo(p.size * 0.3, -p.size);
      ctx.lineTo(p.size, -p.size * 0.6);
      ctx.lineTo(p.size, p.size);
      ctx.lineTo(-p.size, p.size);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    case "paper":
      ctx.beginPath();
      ctx.moveTo(-p.size, -p.size);
      ctx.lineTo(p.size * 0.7, -p.size * 0.8);
      ctx.lineTo(p.size, p.size * 0.6);
      ctx.lineTo(-p.size * 0.5, p.size);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    case "ferrous":
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-p.size, 0);
      ctx.lineTo(p.size, 0);
      ctx.stroke();
      break;
    case "aluminium":
      ctx.beginPath();
      ctx.rect(-p.size * 0.7, -p.size, p.size * 1.4, p.size * 2);
      ctx.fill();
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 0.5;
      ctx.stroke();
      break;
    case "glass":
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.lineTo(p.size, p.size * 0.5);
      ctx.lineTo(-p.size, p.size * 0.8);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#0284c7";
      ctx.lineWidth = 0.5;
      ctx.stroke();
      break;
    case "organic":
      ctx.beginPath();
      const pts = 6;
      for (let i = 0; i < pts; i++) {
        const a = (i / pts) * Math.PI * 2;
        const r = p.size * (0.7 + Math.sin(i * 1.7) * 0.3);
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgba(41,37,36,0.4)";
      ctx.beginPath();
      ctx.arc(p.size * 0.2, -p.size * 0.1, p.size * 0.18, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "residual":
    default:
      ctx.beginPath();
      ctx.moveTo(-p.size, -p.size * 0.5);
      ctx.lineTo(p.size * 0.5, -p.size);
      ctx.lineTo(p.size, 0);
      ctx.lineTo(p.size * 0.3, p.size);
      ctx.lineTo(-p.size * 0.7, p.size * 0.7);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#57534e";
      ctx.lineWidth = 0.5;
      ctx.stroke();
      break;
  }
  ctx.restore();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function updateParticles(ps, p, dt) {
  const updated = [];
  for (const part of ps) {
    if (part.removed) {
      updated.push(part);
      continue;
    }
    let np = { ...part };

    if (np.routed && !np.finalRouting && np.destination) {
      const stageX = STAGE_X[STAGE_IDS[np.stageIndex]] ?? 970;
      const chuteY = CONVEYOR_Y + 75;
      const dx = stageX - np.x;
      const dy = chuteY - np.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 4) {
        np.removed = true;
      } else {
        np.x += (dx / dist) * 1.5 * dt;
        np.y += (dy / dist) * 2.5 * dt;
      }
      updated.push(np);
      continue;
    }

    if (np.routed && np.finalRouting && np.destination) {
      const targetX = 1010;
      const targetY = DEST_Y[np.destination];
      const dx = targetX - np.x;
      const dy = targetY - np.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 5) {
        np.removed = true;
      } else {
        np.x += (dx / dist) * 2 * dt;
        np.y += (dy / dist) * 2 * dt;
      }
      updated.push(np);
      continue;
    }

    const stageId = STAGE_IDS[np.stageIndex];
    const stageX = STAGE_X[stageId];
    np.x += np.speed * dt;

    if (np.x >= stageX) {
      const result = processAtStage(np, stageId, p);
      np = result.particle;
      if (result.splitOff) {
        np.x = stageX + (Math.random() - 0.5) * 20;
        np.y += 3 * dt;
        updated.push(np);
        continue;
      }
      if (np.stageIndex < STAGE_IDS.length - 1) {
        np.stageIndex++;
      } else {
        if (!np.routed) {
          const purity = computePurity(np.material, p);
          const cont = 100 - purity;
          np.destination = routeMaterial(np.material, purity, cont, p.moisture);
          np.routed = true;
          np.finalRouting = true;
        }
      }
    }

    np.y += (CONVEYOR_Y + Math.sin(np.x * 0.05) * 8 - np.y) * 0.05;
    updated.push(np);
  }
  return updated;
}

function processAtStage(part, stageId, p) {
  const eff = efficiencyFor(stageId, p);
  let np = { ...part };
  let split = false;

  switch (stageId) {
    case "ai-scanner":
      np.scanned = true;
      break;
    case "magnetic":
      if (np.material === "ferrous" && Math.random() < eff) {
        np.destination = "metal-recovery";
        np.routed = true;
        split = true;
      }
      break;
    case "non-ferrous":
      if (np.material === "aluminium" && Math.random() < eff) {
        np.destination = "metal-recovery";
        np.routed = true;
        split = true;
      }
      break;
    case "optical-sorter":
      if ((np.material === "plastic" || np.material === "paper") && Math.random() < eff) {
        const purity = computePurity(np.material, p);
        const cont = 100 - purity;
        np.destination = routeMaterial(np.material, purity, cont, p.moisture);
        np.routed = true;
        split = true;
      }
      break;
    case "quality":
      if (np.material === "glass" && Math.random() < eff) {
        np.destination = "construction";
        np.routed = true;
        split = true;
      }
      break;
    case "trommel":
      if (np.material === "organic" && Math.random() < 0.15) {
        np.destination = "composting";
        np.routed = true;
        split = true;
      }
      break;
  }

  return { particle: np, splitOff: split };
}

function handleCanvasClick(e, canvas, setSelected) {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const scaleX = CANVAS_W / rect.width;
  const scaleY = CANVAS_H / rect.height;
  const cx = (e.clientX - rect.left) * scaleX;
  const cy = (e.clientY - rect.top) * scaleY;

  // Check Stages
  for (const id of STAGE_IDS) {
    const x = STAGE_X[id];
    const y = CONVEYOR_Y;
    if (Math.abs(cx - x) <= 40 && Math.abs(cy - y) <= 48) {
      setSelected(id);
      return;
    }
  }

  // Check Destinations
  for (const d of DESTINATIONS) {
    const binY = DEST_Y[d];
    if (cx >= 1000 && cx <= 1095 && Math.abs(cy - binY) <= 18) {
      setSelected(d);
      return;
    }
  }

  setSelected(null);
}

function handleCanvasHover(e, canvas, setHover) {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const relX = e.clientX - rect.left;
  const relY = e.clientY - rect.top;
  const scaleX = CANVAS_W / rect.width;
  const scaleY = CANVAS_H / rect.height;
  const cx = relX * scaleX;
  const cy = relY * scaleY;

  // Check Stages
  for (const id of STAGE_IDS) {
    const x = STAGE_X[id];
    const y = CONVEYOR_Y;
    if (Math.abs(cx - x) <= 40 && Math.abs(cy - y) <= 48) {
      setHover({
        id,
        type: "stage",
        canvasX: x,
        canvasY: y,
        percentX: (x / CANVAS_W) * 100,
        percentY: (y / CANVAS_H) * 100,
      });
      return;
    }
  }

  // Check Destinations
  for (const d of DESTINATIONS) {
    const binY = DEST_Y[d];
    if (cx >= 1000 && cx <= 1095 && Math.abs(cy - binY) <= 18) {
      setHover({
        id: d,
        type: "destination",
        canvasX: 1050,
        canvasY: binY,
        percentX: (1050 / CANVAS_W) * 100,
        percentY: (binY / CANVAS_H) * 100,
      });
      return;
    }
  }

  setHover(null);
}

function ResultCard({ label, value, color }) {
  return (
    <div className="rounded-xl border border-border-industrial bg-surface-bright p-3 text-center">
      <p className="font-mono-data text-label-caps text-text-muted uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}

function InfoRow({ label, value, valueColor }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-text-muted">{label}</span>
      <span className={`font-mono-data font-medium ${valueColor ?? "text-on-surface"}`}>{value}</span>
    </div>
  );
}

function ParamSlider({ label, value, min, max, step, unit, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-text-muted">{label}</span>
        <span className="text-on-surface font-mono-data">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full waste-slider"
        style={{ background: `linear-gradient(to right, #006e2f ${pct}%, #e2e8f0 ${pct}%)` }}
      />
    </div>
  );
}
