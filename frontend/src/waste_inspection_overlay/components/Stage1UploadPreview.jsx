import React from 'react';
import Icon from "../../components/AppIcons";

export default function Stage1UploadPreview({
  imageFile,
  imagePreviewUrl,
  onStartProcessing,
  isProcessing,
  onReupload,
  onUseDemoSample,
  onOpenKeyModal,
  isKeyConfigured,
}) {
  const fileSizeMb = imageFile ? (imageFile.size / (1024 * 1024)).toFixed(2) : '1.02';
  const fileName = imageFile?.name || (imagePreviewUrl?.includes('problem') ? 'municipal_waste_sample.jpg' : 'waste_stream_input.jpg');

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 md:p-6 select-none">
      {/* 1. Header Information */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-container-high pb-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded-full bg-forest text-secondary-container text-[11px] font-bold tracking-wider uppercase">
            Stage 01
          </span>
          <h2 className="text-base md:text-lg font-bold text-primary tracking-tight">
            Waste Ingestion & Staging
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {onUseDemoSample && (
            <button
              onClick={onUseDemoSample}
              disabled={isProcessing}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-surface-container-highest bg-surface-container-low hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors cursor-pointer"
            >
              <Icon name="science" className="w-3.5 h-3.5 text-secondary" />
              <span>Load Sample</span>
            </button>
          )}

          <button
            onClick={onReupload}
            disabled={isProcessing}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl border border-surface-container-highest bg-white hover:bg-surface-container-low text-primary text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Icon name="refresh" className="w-3.5 h-3.5 text-forest" />
            <span>Select Another Image</span>
          </button>
        </div>
      </div>

      {/* 2. Main Content Viewport */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8 items-center py-4 min-h-0">
        
        {/* Left: Uploaded Image Preview Frame */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center h-full max-h-[52vh]">
          <div className="relative w-full max-w-xl h-full max-h-[48vh] rounded-2xl overflow-hidden border border-surface-container-high bg-slate-900 shadow-md flex items-center justify-center group">
            
            {/* Live Buffer Watermark Badge */}
            <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-[11px] text-emerald-400 font-semibold shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>CAMERA FEED #01 • LIVE BUFFER</span>
            </div>

            {/* Viewport content */}
            {imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt="Ingested waste feed"
                className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.01]"
              />
            ) : (
              <div className="text-center p-8 text-slate-400 flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-3">
                  <Icon name="photo_camera" className="w-7 h-7 text-slate-400" />
                </div>
                <p className="text-sm font-semibold text-white mb-1">No Image Ingested</p>
                <p className="text-xs text-slate-400 mb-4 max-w-xs">
                  Upload an image of solid municipal waste to initiate the optical classification and sorting pipeline.
                </p>
                <button
                  onClick={onReupload}
                  className="px-4 py-2 rounded-xl bg-secondary-container text-primary font-bold text-xs cursor-pointer hover:bg-secondary-fixed-dim transition-all"
                >
                  Upload Waste Image
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Technical Inspector Panel & Action */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-4">
          
          {/* Specification Card */}
          <div className="p-5 rounded-2xl border border-surface-container-high bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-3 mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-primary tracking-wide uppercase">
                <Icon name="memory" className="w-4 h-4 text-forest" />
                <span>Pipeline Specification</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-primary text-[11px] font-extrabold tracking-wide">
                READY
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-surface-container-high">
                <span className="text-on-surface-variant font-medium">File Payload:</span>
                <span className="text-primary font-bold truncate max-w-50" title={fileName}>
                  {fileName}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-surface-container-high">
                <span className="text-on-surface-variant font-medium">Payload Size:</span>
                <span className="text-primary font-bold">{fileSizeMb} MB</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-surface-container-high">
                <span className="text-on-surface-variant font-medium">Conveyor Nodes:</span>
                <span className="text-primary font-bold">9 Automated Physical Stages</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-surface-container-high">
                <span className="text-on-surface-variant font-medium">Vision Engine:</span>
                {onOpenKeyModal ? (
                  <button
                    onClick={onOpenKeyModal}
                    type="button"
                    className="inline-flex items-center gap-1.5 text-forest font-bold hover:underline cursor-pointer"
                  >
                    <Icon name={isKeyConfigured ? "stars" : "memory"} className="w-3.5 h-3.5 text-forest" />
                    <span>{isKeyConfigured ? "Gemini 1.5/2.0 Vision (Active)" : "Real Optical Spatial AI"}</span>
                  </button>
                ) : (
                  <span className="text-forest font-bold">Real Optical Vision AI</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5 pt-1">
                <span className="text-on-surface-variant font-medium">Target Streams:</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Recyclables
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    RDF Fuel
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-800 border border-green-200 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                    Organic
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    Landfill
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="w-full">
            <button
              onClick={onStartProcessing}
              disabled={isProcessing || (!imageFile && !imagePreviewUrl)}
              className="w-full py-4 px-6 rounded-2xl bg-primary hover:bg-forest text-white font-bold text-sm md:text-base tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>INITIALIZING INGESTION PIPELINE...</span>
                </>
              ) : !imageFile && !imagePreviewUrl ? (
                <>
                  <Icon name="photo_camera" className="w-5 h-5 text-secondary-container" />
                  <span>SELECT AN IMAGE OR LOAD SAMPLE</span>
                </>
              ) : (
                <>
                  <Icon name="stars" className="w-5 h-5 text-secondary-container" />
                  <span>PROCESS THE IMAGE</span>
                  <Icon name="arrow_forward" className="w-5 h-5 text-white/80 ml-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Status Bar */}
      <div className="text-on-surface-variant text-[11px] font-medium border-t border-surface-container-high pt-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Icon name="sensors" className="w-4 h-4 text-emerald-600" />
          <span>WasteChakra Industrial AI • Circular Recovery Architecture</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>SYSTEM READY</span>
        </div>
      </div>
    </div>
  );
}
