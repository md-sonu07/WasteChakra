import React from 'react';
import { useNavigate } from 'react-router-dom';
import WasteInspectionOverlay from '../waste_inspection_overlay/WasteInspectionOverlay';

/**
 * WasteChakraSimulation
 * Full-screen responsive 3-stage AI Waste Ingestion, Conveyor Simulation, and Routing Matrix.
 */
export default function WasteChakraSimulation() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-surface text-on-surface p-1 sm:p-3 md:p-6 flex flex-col antialiased">
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col relative h-full">
        <WasteInspectionOverlay 
          isOpen={true} 
          onClose={() => navigate('/')} 
        />
      </div>
    </div>
  );
}
