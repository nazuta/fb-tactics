import { Formation, PlayerPosition, StagePositions, CustomFormationData } from '../types/formation';

const CUSTOM_FORMATIONS_KEY = 'football-formations-custom';

// Load custom formations from localStorage
export function loadCustomFormations(): CustomFormationData {
  try {
    const stored = localStorage.getItem(CUSTOM_FORMATIONS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Handle legacy data structure that had nextCustomNumber
      return {
        formations: parsed.formations || [],
      };
    }
  } catch (error) {
    console.warn('Failed to load custom formations:', error);
  }
  
  return {
    formations: [],
  };
}

// Save custom formations to localStorage
export function saveCustomFormations(data: CustomFormationData): void {
  try {
    localStorage.setItem(CUSTOM_FORMATIONS_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save custom formations:', error);
  }
}

// Generate the next custom formation name using sequential numbering starting from 1
export function getNextCustomFormationName(): string {
  const data = loadCustomFormations();
  const existingNumbers = data.formations.map(formation => {
    const match = formation.name.match(/Custom Formation #(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  });
  
  // Find the first available number starting from 1
  let nextNumber = 1;
  while (existingNumbers.includes(nextNumber)) {
    nextNumber++;
  }
  
  return `Custom Formation #${nextNumber}`;
}

// Create a new custom formation based on current stage positions
export function createCustomFormation(
  baseFormationName: string,
  stagePositions: StagePositions,
  stageModifications?: { Defence: Set<string>; Default: Set<string>; Attack: Set<string> }
): Formation {
  const data = loadCustomFormations();
  const customName = getNextCustomFormationName();
  
  // Convert Set to Array for JSON serialization
  const modificationsArray = stageModifications ? {
    Defence: Array.from(stageModifications.Defence),
    Default: Array.from(stageModifications.Default),
    Attack: Array.from(stageModifications.Attack),
  } : undefined;
  
  // Use the Default stage as the base for the custom formation
  const customFormation: Formation = {
    name: customName,
    players: [...stagePositions.Default],
    isCustom: true,
    basedOn: baseFormationName,
    stagePositions: {
      Defence: [...stagePositions.Defence],
      Default: [...stagePositions.Default],
      Attack: [...stagePositions.Attack],
    },
    stageModifications: modificationsArray,
  };
  
  // Add to custom formations
  data.formations.push(customFormation);
  
  // Save to localStorage
  saveCustomFormations(data);
  
  return customFormation;
}

// Get all formations (preset + custom)
export function getAllFormations(): Formation[] {
  const presetFormations: Formation[] = [
    {
      name: '4-4-2',
      players: [
        { id: '1', name: 'GK', number: 1, x: 50, y: 90, position: 'Goalkeeper' },
        { id: '2', name: 'RB', number: 2, x: 75, y: 75, position: 'Right Back' },
        { id: '3', name: 'CB', number: 3, x: 60, y: 75, position: 'Centre Back' },
        { id: '4', name: 'CB', number: 4, x: 40, y: 75, position: 'Centre Back' },
        { id: '5', name: 'LB', number: 5, x: 25, y: 75, position: 'Left Back' },
        { id: '6', name: 'RM', number: 6, x: 75, y: 50, position: 'Right Midfielder' },
        { id: '7', name: 'CM', number: 7, x: 60, y: 50, position: 'Central Midfielder' },
        { id: '8', name: 'CM', number: 8, x: 40, y: 50, position: 'Central Midfielder' },
        { id: '9', name: 'LM', number: 9, x: 25, y: 50, position: 'Left Midfielder' },
        { id: '10', name: 'ST', number: 10, x: 60, y: 25, position: 'Striker' },
        { id: '11', name: 'ST', number: 11, x: 40, y: 25, position: 'Striker' },
      ]
    },
    {
      name: '4-3-3',
      players: [
        { id: '1', name: 'GK', number: 1, x: 50, y: 90, position: 'Goalkeeper' },
        { id: '2', name: 'RB', number: 2, x: 75, y: 75, position: 'Right Back' },
        { id: '3', name: 'CB', number: 3, x: 60, y: 75, position: 'Centre Back' },
        { id: '4', name: 'CB', number: 4, x: 40, y: 75, position: 'Centre Back' },
        { id: '5', name: 'LB', number: 5, x: 25, y: 75, position: 'Left Back' },
        { id: '6', name: 'CDM', number: 6, x: 50, y: 55, position: 'Defensive Midfielder' },
        { id: '7', name: 'CM', number: 7, x: 65, y: 45, position: 'Central Midfielder' },
        { id: '8', name: 'CM', number: 8, x: 35, y: 45, position: 'Central Midfielder' },
        { id: '9', name: 'RW', number: 9, x: 75, y: 25, position: 'Right Winger' },
        { id: '10', name: 'ST', number: 10, x: 50, y: 25, position: 'Striker' },
        { id: '11', name: 'LW', number: 11, x: 25, y: 25, position: 'Left Winger' },
      ]
    },
    {
      name: '3-5-2',
      players: [
        { id: '1', name: 'GK', number: 1, x: 50, y: 90, position: 'Goalkeeper' },
        { id: '2', name: 'CB', number: 2, x: 65, y: 75, position: 'Centre Back' },
        { id: '3', name: 'CB', number: 3, x: 50, y: 75, position: 'Centre Back' },
        { id: '4', name: 'CB', number: 4, x: 35, y: 75, position: 'Centre Back' },
        { id: '5', name: 'RWB', number: 5, x: 80, y: 55, position: 'Right Wing Back' },
        { id: '6', name: 'CM', number: 6, x: 60, y: 55, position: 'Central Midfielder' },
        { id: '7', name: 'CM', number: 7, x: 50, y: 55, position: 'Central Midfielder' },
        { id: '8', name: 'CM', number: 8, x: 40, y: 55, position: 'Central Midfielder' },
        { id: '9', name: 'LWB', number: 9, x: 20, y: 55, position: 'Left Wing Back' },
        { id: '10', name: 'ST', number: 10, x: 55, y: 25, position: 'Striker' },
        { id: '11', name: 'ST', number: 11, x: 45, y: 25, position: 'Striker' },
      ]
    },
    {
      name: '4-2-3-1',
      players: [
        { id: '1', name: 'GK', number: 1, x: 50, y: 90, position: 'Goalkeeper' },
        { id: '2', name: 'RB', number: 2, x: 75, y: 75, position: 'Right Back' },
        { id: '3', name: 'CB', number: 3, x: 60, y: 75, position: 'Centre Back' },
        { id: '4', name: 'CB', number: 4, x: 40, y: 75, position: 'Centre Back' },
        { id: '5', name: 'LB', number: 5, x: 25, y: 75, position: 'Left Back' },
        { id: '6', name: 'CDM', number: 6, x: 60, y: 60, position: 'Defensive Midfielder' },
        { id: '7', name: 'CDM', number: 7, x: 40, y: 60, position: 'Defensive Midfielder' },
        { id: '8', name: 'RW', number: 8, x: 75, y: 40, position: 'Right Winger' },
        { id: '9', name: 'CAM', number: 9, x: 50, y: 40, position: 'Central Attacking Midfielder' },
        { id: '10', name: 'LW', number: 10, x: 25, y: 40, position: 'Left Winger' },
        { id: '11', name: 'ST', number: 11, x: 50, y: 20, position: 'Striker' },
      ]
    }
  ];

  const customData = loadCustomFormations();
  return [...presetFormations, ...customData.formations];
}

// Check if a formation has been modified (has any stage modifications)
export function hasFormationBeenModified(
  stageModifications: { Defence: Set<string>; Default: Set<string>; Attack: Set<string> }
): boolean {
  return stageModifications.Defence.size > 0 || 
         stageModifications.Default.size > 0 || 
         stageModifications.Attack.size > 0;
}

// Delete a custom formation
export function deleteCustomFormation(formationName: string): void {
  const data = loadCustomFormations();
  data.formations = data.formations.filter(f => f.name !== formationName);
  saveCustomFormations(data);
}

// Update an existing custom formation with current stage data
export function updateCustomFormation(
  formationName: string,
  stagePositions: StagePositions,
  stageModifications: { Defence: Set<string>; Default: Set<string>; Attack: Set<string> }
): boolean {
  const data = loadCustomFormations();
  
  // Find the formation to update
  const formationIndex = data.formations.findIndex(f => f.name === formationName);
  if (formationIndex === -1) {
    return false; // Formation not found
  }

  // Convert Set to Array for JSON serialization
  const modificationsArray = {
    Defence: Array.from(stageModifications.Defence),
    Default: Array.from(stageModifications.Default),
    Attack: Array.from(stageModifications.Attack),
  };

  // Update the formation with current stage data
  data.formations[formationIndex] = {
    ...data.formations[formationIndex],
    players: [...stagePositions.Default], // Keep Default as main players
    stagePositions: {
      Defence: [...stagePositions.Defence],
      Default: [...stagePositions.Default],
      Attack: [...stagePositions.Attack],
    },
    stageModifications: modificationsArray,
  };

  saveCustomFormations(data);
  return true;
}

// Rename a custom formation
export function renameCustomFormation(oldName: string, newName: string): boolean {
  if (!newName.trim()) {
    return false; // Invalid name
  }

  const data = loadCustomFormations();
  const allFormations = getAllFormations();
  
  // Check if new name already exists (case-insensitive)
  const nameExists = allFormations.some(f => 
    f.name.toLowerCase() === newName.trim().toLowerCase() && f.name !== oldName
  );
  
  if (nameExists) {
    return false; // Name already exists
  }

  // Find and update the formation
  const formationIndex = data.formations.findIndex(f => f.name === oldName);
  if (formationIndex === -1) {
    return false; // Formation not found
  }

  data.formations[formationIndex].name = newName.trim();
  saveCustomFormations(data);
  return true;
}