import React from 'react';
import { TacticalStage } from '../types/formation';

interface TacticalStageSliderProps {
  currentStage: TacticalStage;
  onStageChange: (stage: TacticalStage) => void;
  stageModifications: {
    Defence: Set<string>;
    Default: Set<string>;
    Attack: Set<string>;
  };
}

const STAGES: TacticalStage[] = ['Attack', 'Default', 'Defence'];

const STAGE_COLORS = {
  Attack: 'bg-red-500',
  Default: 'bg-blue-500', 
  Defence: 'bg-green-500'
};

export function TacticalStageSlider({ currentStage, onStageChange, stageModifications }: TacticalStageSliderProps) {
  return (
    <div className="flex flex-col items-center space-y-6 py-4">
      {STAGES.map((stage) => {
        const isActive = stage === currentStage;
        
        return (
          <button
            key={stage}
            onClick={() => onStageChange(stage)}
            className={`relative flex flex-col items-center gap-2 px-2 py-3 rounded-lg transition-all duration-200 ${
              isActive 
                ? 'bg-accent text-accent-foreground shadow-sm' 
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {/* Stage indicator */}
            <div 
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                isActive 
                  ? `${STAGE_COLORS[stage]} shadow-md`
                  : 'bg-border'
              }`}
            />
            
            {/* Stage name */}
            <span className="text-xs font-medium text-center">
              {stage}
            </span>
          </button>
        );
      })}
    </div>
  );
}