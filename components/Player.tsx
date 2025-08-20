import React, { useState } from 'react';
import { PlayerPosition } from '../types/formation';
import { Input } from './ui/input';
import { Edit2, RotateCcw } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from './ui/context-menu';

interface PlayerProps {
  player: PlayerPosition;
  isDragging: boolean;
  onEdit: (playerId: string, name: string, number: number) => void;
  onReset: (playerId: string) => void;
  onDragStart: (playerId: string) => void;
}

export function Player({ player, isDragging, onEdit, onReset, onDragStart }: PlayerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(player.name);
  const [editNumber, setEditNumber] = useState(player.number.toString());

  const handleSave = () => {
    onEdit(player.id, editName, parseInt(editNumber) || player.number);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditName(player.name);
      setEditNumber(player.number.toString());
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', player.id);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(player.id);
  };

  const handleDragEnd = () => {
    // Reset any drag-related state if needed
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDragging) {
      setIsEditing(true);
    }
  };

  const handleReset = () => {
    onReset(player.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          draggable={!isEditing}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDoubleClick={handleDoubleClick}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 select-none ${
            isDragging ? 'opacity-50 scale-110 z-50' : 'opacity-100 cursor-move hover:scale-105'
          } ${
            isEditing ? 'cursor-default' : ''
          }`}
          style={{
            left: `${player.x}%`,
            top: `${player.y}%`,
          }}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 border-2 ${
            isDragging 
              ? 'bg-orange-600 border-white shadow-2xl' 
              : 'bg-blue-600 border-white hover:shadow-xl'
          }`}>
            {isEditing ? (
              <Input
                value={editNumber}
                onChange={(e) => setEditNumber(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyPress}
                className="w-8 h-8 text-center text-white bg-transparent border-none text-xs p-0"
                autoFocus
              />
            ) : (
              <span className="text-white text-xs font-medium pointer-events-none">
                {player.number}
              </span>
            )}
          </div>
          
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
            {isEditing ? (
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyPress}
                className="w-16 h-6 text-center text-xs bg-white/90 border border-gray-300 rounded"
              />
            ) : (
              <span className={`text-white text-xs px-1 rounded whitespace-nowrap pointer-events-none ${
                isDragging 
                  ? 'bg-orange-600/80 font-medium'
                  : 'bg-black/50'
              }`}>
                {player.name}
              </span>
            )}
          </div>
        </div>
      </ContextMenuTrigger>
      
      <ContextMenuContent className="w-48">
        <ContextMenuItem onClick={handleEdit} className="flex items-center gap-2">
          <Edit2 className="w-4 h-4" />
          Edit Player
        </ContextMenuItem>
        <ContextMenuItem onClick={handleReset} className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset to Default Position
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}