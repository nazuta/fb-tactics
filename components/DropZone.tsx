import React, { useState } from 'react';

interface DropZoneProps {
  children: React.ReactNode;
  onDrop: (playerId: string, x: number, y: number) => void;
  onDragOver?: (x: number, y: number) => void;
}

export function DropZone({ children, onDrop, onDragOver }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const playerId = e.dataTransfer.getData('text/plain');
    if (!playerId) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Keep players within field boundaries
    const boundedX = Math.max(5, Math.min(95, x));
    const boundedY = Math.max(5, Math.min(95, y));
    
    onDrop(playerId, boundedX, boundedY);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (onDragOver) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      const boundedX = Math.max(5, Math.min(95, x));
      const boundedY = Math.max(5, Math.min(95, y));
      
      onDragOver(boundedX, boundedY);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only set dragOver to false if we're leaving the drop zone itself
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  return (
    <div 
      className={`absolute inset-0 transition-colors duration-200 ${
        isDragOver ? 'bg-green-400 bg-opacity-10' : ''
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {children}
      {isDragOver && (
        <div className="absolute inset-4 border-2 border-dashed border-white/50 rounded-lg pointer-events-none" />
      )}
    </div>
  );
}