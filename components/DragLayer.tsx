import React from 'react';
import { useDragLayer } from 'react-dnd';
import { PlayerPosition } from '../types/formation';

interface DragLayerProps {
  players: PlayerPosition[];
}

export function DragLayer({ players }: DragLayerProps) {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getClientOffset(),
  }));

  if (!isDragging || !currentOffset || !item) {
    return null;
  }

  const player = players.find(p => p.id === item.id);
  if (!player) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div
        style={{
          position: 'absolute',
          left: currentOffset.x,
          top: currentOffset.y,
          transform: 'translate(-50%, -50%)',
        }}
        className="opacity-75"
      >
        <div className="w-12 h-12 bg-blue-600 border-2 border-white rounded-full flex items-center justify-center shadow-2xl">
          <span className="text-white text-xs font-medium">
            {player.number}
          </span>
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
          <span className="text-white text-xs bg-black/50 px-1 rounded whitespace-nowrap">
            {player.name}
          </span>
        </div>
      </div>
    </div>
  );
}