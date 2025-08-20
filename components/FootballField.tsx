import React, { useState } from 'react';
import { Player } from './Player';
import { FieldMarkings } from './FieldMarkings';
import { DropZone } from './DropZone';
import { PlayerPosition } from '../types/formation';
import { detectPosition } from '../utils/positionDetection';

interface FootballFieldProps {
  players: PlayerPosition[];
  onPlayerMove: (playerId: string, x: number, y: number) => void;
  onPlayerEdit: (playerId: string, name: string, number: number) => void;
  onPlayerReset: (playerId: string) => void;
}

export function FootballField({ players, onPlayerMove, onPlayerEdit, onPlayerReset }: FootballFieldProps) {
  const [draggedPlayerId, setDraggedPlayerId] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);

  const handleDrop = (playerId: string, x: number, y: number) => {
    onPlayerMove(playerId, x, y);
    setDraggedPlayerId(null);
    setDragPosition(null);
  };

  const handleDragStart = (playerId: string) => {
    setDraggedPlayerId(playerId);
  };

  const handleDragOver = (x: number, y: number) => {
    if (draggedPlayerId) {
      setDragPosition({ x, y });
    }
  };

  const draggedPlayer = draggedPlayerId ? players.find(p => p.id === draggedPlayerId) : null;
  const previewPosition = dragPosition ? detectPosition(dragPosition.x, dragPosition.y) : null;

  return (
    <div 
      className="relative w-full h-full bg-green-600 rounded-lg overflow-hidden shadow-lg" 
      style={{ aspectRatio: '1/1.4' }}
    >
      {/* Standard field markings without zone highlighting */}
      <FieldMarkings showZones={false} />
      
      <DropZone 
        onDrop={handleDrop} 
        onDragOver={handleDragOver}
      >
        {players.map((player) => (
          <Player
            key={player.id}
            player={player}
            isDragging={draggedPlayerId === player.id}
            onEdit={onPlayerEdit}
            onReset={onPlayerReset}
            onDragStart={handleDragStart}
          />
        ))}
      </DropZone>
      
      {/* Position preview during dragging */}
      {draggedPlayerId && dragPosition && previewPosition && (
        <div className="absolute top-4 left-4 bg-black/90 text-white px-4 py-3 rounded-lg text-sm z-50 shadow-lg">
          <div className="font-medium mb-1">
            {draggedPlayer?.name} (#{draggedPlayer?.number})
          </div>
          <div className="text-xs text-gray-300 mb-1">
            Current: {draggedPlayer?.position}
          </div>
          <div className="text-xs text-green-300 font-medium">
            New: {previewPosition.position} ({previewPosition.abbreviation})
          </div>
        </div>
      )}
      
      {/* Dragging indicator */}
      {draggedPlayerId && (
        <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Repositioning Player
          </div>
        </div>
      )}
    </div>
  );
}