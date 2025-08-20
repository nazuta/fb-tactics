import React from 'react';

interface FieldMarkingsProps {
  showZones?: boolean;
}

export function FieldMarkings({ showZones = false }: FieldMarkingsProps) {
  return (
    <div className="absolute inset-0">
      {/* Standard field markings - always visible */}
      <div className="absolute inset-0">
        {/* Outer boundary */}
        <div className="absolute inset-2 border-2 border-white"></div>
        
        {/* Center line (horizontal) */}
        <div className="absolute left-2 right-2 top-1/2 h-0.5 bg-white transform -translate-y-0.5"></div>
        
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Penalty areas (top and bottom) */}
        <div className="absolute top-2 left-1/2 w-32 h-16 border-2 border-white border-t-0 transform -translate-x-1/2"></div>
        <div className="absolute bottom-2 left-1/2 w-32 h-16 border-2 border-white border-b-0 transform -translate-x-1/2"></div>
        
        {/* Goal areas (top and bottom) */}
        <div className="absolute top-2 left-1/2 w-16 h-6 border-2 border-white border-t-0 transform -translate-x-1/2"></div>
        <div className="absolute bottom-2 left-1/2 w-16 h-6 border-2 border-white border-b-0 transform -translate-x-1/2"></div>
        
        {/* Goals (top and bottom) */}
        <div className="absolute -top-2 left-1/2 w-12 h-4 bg-white border border-gray-300 transform -translate-x-1/2"></div>
        <div className="absolute -bottom-2 left-1/2 w-12 h-4 bg-white border border-gray-300 transform -translate-x-1/2"></div>
        
        {/* Corner arcs */}
        <div className="absolute top-2 left-2 w-4 h-4 border-2 border-white border-r-0 border-b-0 rounded-tl-full"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-2 border-white border-l-0 border-b-0 rounded-tr-full"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-2 border-white border-r-0 border-t-0 rounded-bl-full"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-2 border-white border-l-0 border-t-0 rounded-br-full"></div>
        
        {/* Penalty spots */}
        <div className="absolute top-12 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2"></div>
        <div className="absolute bottom-12 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2"></div>
      </div>
    </div>
  );
}