export interface FieldZone {
  x: number;
  y: number;
  position: string;
  abbreviation: string;
}

export function detectPosition(x: number, y: number): { position: string; abbreviation: string } {
  // Goalkeeper zone (very back)
  if (y > 85) {
    return { position: 'Goalkeeper', abbreviation: 'GK' };
  }
  
  // Defender zone (back third: 65-85%)
  if (y > 65 && y <= 85) {
    if (x < 25) {
      return { position: 'Left Back', abbreviation: 'LB' };
    } else if (x > 75) {
      return { position: 'Right Back', abbreviation: 'RB' };
    } else {
      return { position: 'Centre Back', abbreviation: 'CB' };
    }
  }
  
  // Defensive midfielder zone (upper middle: 55-65%)
  if (y > 55 && y <= 65) {
    if (x < 30) {
      return { position: 'Left Wing Back', abbreviation: 'LWB' };
    } else if (x > 70) {
      return { position: 'Right Wing Back', abbreviation: 'RWB' };
    } else {
      return { position: 'Defensive Midfielder', abbreviation: 'CDM' };
    }
  }
  
  // Central midfielder zone (middle: 40-55%)
  if (y > 40 && y <= 55) {
    if (x < 30) {
      return { position: 'Left Midfielder', abbreviation: 'LM' };
    } else if (x > 70) {
      return { position: 'Right Midfielder', abbreviation: 'RM' };
    } else {
      return { position: 'Central Midfielder', abbreviation: 'CM' };
    }
  }
  
  // Attacking midfielder zone (upper attack: 25-40%)
  if (y > 25 && y <= 40) {
    if (x < 25) {
      return { position: 'Left Winger', abbreviation: 'LW' };
    } else if (x > 75) {
      return { position: 'Right Winger', abbreviation: 'RW' };
    } else {
      return { position: 'Central Attacking Midfielder', abbreviation: 'CAM' };
    }
  }
  
  // Striker zone (front third: 0-25%)
  if (y <= 25) {
    if (x < 35 || x > 65) {
      return { position: 'Striker', abbreviation: 'ST' };
    } else {
      return { position: 'Striker', abbreviation: 'ST' };
    }
  }
  
  // Default fallback
  return { position: 'Central Midfielder', abbreviation: 'CM' };
}

export function getFieldZones(): FieldZone[] {
  return [
    // Goalkeeper zone
    { x: 50, y: 90, position: 'Goalkeeper', abbreviation: 'GK' },
    
    // Defender zones
    { x: 25, y: 75, position: 'Left Back', abbreviation: 'LB' },
    { x: 40, y: 75, position: 'Centre Back', abbreviation: 'CB' },
    { x: 60, y: 75, position: 'Centre Back', abbreviation: 'CB' },
    { x: 75, y: 75, position: 'Right Back', abbreviation: 'RB' },
    
    // Defensive midfielder zones
    { x: 20, y: 60, position: 'Left Wing Back', abbreviation: 'LWB' },
    { x: 50, y: 60, position: 'Defensive Midfielder', abbreviation: 'CDM' },
    { x: 80, y: 60, position: 'Right Wing Back', abbreviation: 'RWB' },
    
    // Central midfielder zones
    { x: 25, y: 47, position: 'Left Midfielder', abbreviation: 'LM' },
    { x: 40, y: 47, position: 'Central Midfielder', abbreviation: 'CM' },
    { x: 60, y: 47, position: 'Central Midfielder', abbreviation: 'CM' },
    { x: 75, y: 47, position: 'Right Midfielder', abbreviation: 'RM' },
    
    // Attacking midfielder zones
    { x: 25, y: 32, position: 'Left Winger', abbreviation: 'LW' },
    { x: 50, y: 32, position: 'Central Attacking Midfielder', abbreviation: 'CAM' },
    { x: 75, y: 32, position: 'Right Winger', abbreviation: 'RW' },
    
    // Striker zones
    { x: 40, y: 18, position: 'Striker', abbreviation: 'ST' },
    { x: 60, y: 18, position: 'Striker', abbreviation: 'ST' },
  ];
}