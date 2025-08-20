export interface PlayerPosition {
  id: string;
  name: string;
  number: number;
  x: number;
  y: number;
  position: string;
}

export interface Formation {
  name: string;
  players: PlayerPosition[];
  isCustom?: boolean;
  basedOn?: string; // Name of the formation this custom formation was based on
  // For custom formations, store complete stage data
  stagePositions?: StagePositions;
  stageModifications?: {
    Defence: string[]; // Array of player IDs (Set converted to array for JSON storage)
    Default: string[];
    Attack: string[];
  };
}

export type TacticalStage = 'Defence' | 'Default' | 'Attack';

export interface StagePositions {
  Defence: PlayerPosition[];
  Default: PlayerPosition[];
  Attack: PlayerPosition[];
}

// Track which players have been modified in each stage
export interface StageModifications {
  Defence: Set<string>; // Set of player IDs that have been modified
  Default: Set<string>;
  Attack: Set<string>;
}

// Interface for managing custom formations
export interface CustomFormationData {
  formations: Formation[];
}