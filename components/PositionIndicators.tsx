import React from 'react';
import { getFieldZones } from '../utils/positionDetection';

interface PositionIndicatorsProps {
  visible: boolean;
  isDragging?: boolean;
}

export function PositionIndicators({ visible, isDragging = false }: PositionIndicatorsProps) {
  const zones = getFieldZones();

  if (!visible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {zones.map((zone, index) => (
        <div
          key={index}
          className={`absolute rounded-full flex items-center justify-center text-white font-medium transition-all duration-200 ${
            isDragging 
              ? 'w-10 h-10 bg-white/30 border-2 border-white/60 text-sm animate-pulse' 
              : 'w-8 h-8 bg-white/20 border border-white/40 text-xs'
          }`}
          style={{
            left: `${zone.x}%`,
            top: `${zone.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span className="drop-shadow-sm">{zone.abbreviation}</span>
          
          {/* Position name tooltip */}
          {!isDragging && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-gray-900/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {zone.position}
              </div>
            </div>
          )}
          
          {/* Enhanced visibility during drag */}
          {isDragging && (
            <div className="absolute inset-0 bg-white/10 rounded-full border border-white/20"></div>
          )}
        </div>
      ))}
      
      {/* Legend during drag */}
      {isDragging && (
        <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg text-xs">
          <div className="font-medium mb-1">Available Positions</div>
          <div className="text-gray-300">Drop on any circle to assign</div>
        </div>
      )}
    </div>
  );
}