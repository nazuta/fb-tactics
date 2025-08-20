import React, { useState, useEffect } from "react";
import { FootballField } from "./components/FootballField";
import { FormationSelector } from "./components/FormationSelector";
import { TacticalStageSlider } from "./components/TacticalStageSlider";
import {
  PlayerPosition,
  Formation,
  TacticalStage,
  StagePositions,
  StageModifications,
} from "./types/formation";
import { detectPosition } from "./utils/positionDetection";
import { createCustomFormation, hasFormationBeenModified, getAllFormations, updateCustomFormation } from "./utils/customFormations";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from "./components/ui/sidebar";

export default function App() {
  const [currentStage, setCurrentStage] =
    useState<TacticalStage>("Default");
  const [baseFormation, setBaseFormation] = useState<
    PlayerPosition[]
  >([]);
  const [stageModifications, setStageModifications] =
    useState<StageModifications>({
      Defence: new Set(),
      Default: new Set(),
      Attack: new Set(),
    });
  const [stagePositions, setStagePositions] =
    useState<StagePositions>({
      Defence: [],
      Default: [],
      Attack: [],
    });
  const [currentFormation, setCurrentFormation] =
    useState<string>("4-3-3");
  const [isCurrentFormationModified, setIsCurrentFormationModified] =
    useState<boolean>(false);
  const [highlightedFormation, setHighlightedFormation] =
    useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // Get current players based on selected stage
  const players = stagePositions[currentStage];

  // Helper function to check if current formation is custom
  const isCurrentFormationCustom = () => {
    const allFormations = getAllFormations();
    const currentFormationData = allFormations.find(f => f.name === currentFormation);
    return currentFormationData?.isCustom || false;
  };

  // Check if current formation has been modified
  useEffect(() => {
    setIsCurrentFormationModified(hasFormationBeenModified(stageModifications));
  }, [stageModifications]);

  // Initialize with 4-3-3 formation
  useEffect(() => {
    const defaultFormation: Formation = {
      name: "4-3-3",
      players: [
        {
          id: "1",
          name: "GK",
          number: 1,
          x: 50,
          y: 90,
          position: "Goalkeeper",
        },
        {
          id: "2",
          name: "RB",
          number: 2,
          x: 75,
          y: 75,
          position: "Right Back",
        },
        {
          id: "3",
          name: "CB",
          number: 3,
          x: 60,
          y: 75,
          position: "Centre Back",
        },
        {
          id: "4",
          name: "CB",
          number: 4,
          x: 40,
          y: 75,
          position: "Centre Back",
        },
        {
          id: "5",
          name: "LB",
          number: 5,
          x: 25,
          y: 75,
          position: "Left Back",
        },
        {
          id: "6",
          name: "CDM",
          number: 6,
          x: 50,
          y: 55,
          position: "Defensive Midfielder",
        },
        {
          id: "7",
          name: "CM",
          number: 7,
          x: 65,
          y: 45,
          position: "Central Midfielder",
        },
        {
          id: "8",
          name: "CM",
          number: 8,
          x: 35,
          y: 45,
          position: "Central Midfielder",
        },
        {
          id: "9",
          name: "RW",
          number: 9,
          x: 75,
          y: 25,
          position: "Right Winger",
        },
        {
          id: "10",
          name: "ST",
          number: 10,
          x: 50,
          y: 25,
          position: "Striker",
        },
        {
          id: "11",
          name: "LW",
          number: 11,
          x: 25,
          y: 25,
          position: "Left Winger",
        },
      ],
    };

    setBaseFormation(defaultFormation.players);
    setStagePositions({
      Defence: [...defaultFormation.players],
      Default: [...defaultFormation.players],
      Attack: [...defaultFormation.players],
    });
  }, []);

  // Helper function to get player position for a stage
  const getPlayerPositionForStage = (
    playerId: string,
    stage: TacticalStage,
  ): PlayerPosition => {
    const basePlayer = baseFormation.find(
      (p) => p.id === playerId,
    );
    if (!basePlayer)
      return stagePositions[stage].find(
        (p) => p.id === playerId,
      )!;

    // If player has been modified in this stage, use the modified position
    if (stageModifications[stage].has(playerId)) {
      return stagePositions[stage].find(
        (p) => p.id === playerId,
      )!;
    }

    // Otherwise, use base formation position
    return basePlayer;
  };

  const handlePlayerMove = (
    playerId: string,
    x: number,
    y: number,
  ) => {
    const newPositionData = detectPosition(x, y);
    const currentPlayer = players.find(
      (p) => p.id === playerId,
    );

    if (!currentPlayer) return;

    const oldPosition = currentPlayer.position;
    const newPosition = newPositionData.position;
    const newAbbreviation = newPositionData.abbreviation;

    const updatedPlayerData = {
      x,
      y,
      position: newPosition,
      name: newAbbreviation,
    };

    // Check if this is the first modification to the current formation
    const wasFormationModified = hasFormationBeenModified(stageModifications);
    const isCustomFormation = isCurrentFormationCustom();

    // Calculate the updated stage positions
    const updatedStagePositions = { ...stagePositions };
    
    // Always update the current stage
    updatedStagePositions[currentStage] = stagePositions[currentStage].map((player) =>
      player.id === playerId
        ? { ...player, ...updatedPlayerData }
        : player,
    );

    // If we're moving a player in Default stage, also update Defence and Attack
    // unless those stages already have custom positions for this player
    if (currentStage === "Default") {
      const stagesToUpdate: TacticalStage[] = ["Defence", "Attack"];
      
      stagesToUpdate.forEach((stage) => {
        // Only update if this player hasn't been customized in the target stage
        if (!stageModifications[stage].has(playerId)) {
          updatedStagePositions[stage] = stagePositions[stage].map((player) =>
            player.id === playerId
              ? { ...player, ...updatedPlayerData }
              : player,
          );
        }
      });
    }

    // Calculate updated modifications
    const updatedStageModifications = {
      ...stageModifications,
      [currentStage]: new Set(stageModifications[currentStage]).add(playerId),
    };

    // Update the state
    setStagePositions(updatedStagePositions);
    setStageModifications(updatedStageModifications);

    // Handle custom formation creation or update
    if (!wasFormationModified && !isCustomFormation) {
      // Create new custom formation immediately
      try {
        const customFormation = createCustomFormation(
          currentFormation,
          updatedStagePositions,
          updatedStageModifications
        );
        
        // Switch to the new custom formation
        setCurrentFormation(customFormation.name);
        
        // Highlight the new formation in the sidebar
        setHighlightedFormation(customFormation.name);
        
        // Trigger sidebar refresh
        setRefreshTrigger(prev => prev + 1);
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
          setHighlightedFormation(null);
        }, 3000);
        
        toast.success(`Created ${customFormation.name}`, {
          description: `Based on ${customFormation.basedOn}. Autosave enabled.`,
          duration: 4000,
        });

        // Show autosave notification
        setTimeout(() => {
          toast.info("Autosave active", {
            description: "All changes to custom formations are automatically saved",
            duration: 3000,
          });
        }, 500);
      } catch (error) {
        console.error("Failed to create custom formation:", error);
        toast.error("Failed to create custom formation", {
          description: "Your changes are still saved locally.",
          duration: 3000,
        });
      }
    } else if (isCustomFormation) {
      // Update existing custom formation with the new data immediately
      try {
        const success = updateCustomFormation(currentFormation, updatedStagePositions, updatedStageModifications);
        if (!success) {
          // Only show toast on failure, success is silent for autosave
          toast.error("Failed to save changes", {
            description: "Your changes may not persist when switching formations",
            duration: 3000,
          });
        }
      } catch (error) {
        console.warn("Failed to update custom formation:", error);
      }
    }

    // Show toast notification
    if (currentStage === "Default") {
      const propagatedStages = [];
      if (!stageModifications.Defence.has(playerId)) propagatedStages.push("Defence");
      if (!stageModifications.Attack.has(playerId)) propagatedStages.push("Attack");
      
      if (propagatedStages.length > 0) {
        if (oldPosition !== newPosition) {
          toast.success(
            `#${currentPlayer.number} moved to ${newAbbreviation} (Default + ${propagatedStages.length} other stages)`,
            {
              description: `Position changed from ${oldPosition} to ${newPosition}. Also applied to: ${propagatedStages.join(", ")}`,
              duration: 3000,
            },
          );
        } else {
          toast.info(
            `#${currentPlayer.number} repositioned in Default + ${propagatedStages.length} other stages`,
            {
              description: `Applied to: ${propagatedStages.join(", ")}`,
              duration: 2500,
            },
          );
        }
      } else {
        // Standard notification when no propagation occurs
        if (oldPosition !== newPosition) {
          toast.success(
            `#${currentPlayer.number} moved to ${newAbbreviation} (${currentStage})`,
            {
              description: `Position changed from ${oldPosition} to ${newPosition}`,
              duration: 2500,
            },
          );
        } else {
          toast.info(
            `#${currentPlayer.number} repositioned in ${currentStage} stage`,
            {
              duration: 2000,
            },
          );
        }
      }
    } else {
      // Standard notification for non-Default stages
      if (oldPosition !== newPosition) {
        toast.success(
          `#${currentPlayer.number} moved to ${newAbbreviation} (${currentStage})`,
          {
            description: `Position changed from ${oldPosition} to ${newPosition}`,
            duration: 2500,
          },
        );
      } else {
        toast.info(
          `#${currentPlayer.number} repositioned in ${currentStage} stage`,
          {
            duration: 2000,
          },
        );
      }
    }
  };

  const handlePlayerEdit = (
    playerId: string,
    name: string,
    number: number,
  ) => {
    // Update player in all stages
    setStagePositions((prev) => ({
      Defence: prev.Defence.map((player) =>
        player.id === playerId
          ? { ...player, name, number }
          : player,
      ),
      Default: prev.Default.map((player) =>
        player.id === playerId
          ? { ...player, name, number }
          : player,
      ),
      Attack: prev.Attack.map((player) =>
        player.id === playerId
          ? { ...player, name, number }
          : player,
      ),
    }));

    // Also update base formation
    setBaseFormation((prev) =>
      prev.map((player) =>
        player.id === playerId
          ? { ...player, name, number }
          : player,
      ),
    );
  };

  const handlePlayerReset = (playerId: string) => {
    const basePlayer = baseFormation.find((p) => p.id === playerId);
    if (!basePlayer) return;

    const currentPlayer = players.find((p) => p.id === playerId);
    if (!currentPlayer) return;

    // Reset player position to base formation for current stage
    setStagePositions((prev) => ({
      ...prev,
      [currentStage]: prev[currentStage].map((player) =>
        player.id === playerId
          ? { ...basePlayer }
          : player,
      ),
    }));

    // Remove player from modifications tracking for current stage
    setStageModifications((prev) => {
      const newModifications = new Set(prev[currentStage]);
      newModifications.delete(playerId);
      return {
        ...prev,
        [currentStage]: newModifications,
      };
    });

    // Show toast notification
    toast.success(
      `#${currentPlayer.number} reset to default position`,
      {
        description: `${currentPlayer.name} restored to base ${basePlayer.position} position in ${currentStage} stage`,
        duration: 2500,
      },
    );
  };

  const handleFormationChange = (formation: Formation) => {
    // For custom formations, restore saved stage data if available
    if (formation.isCustom && formation.stagePositions && formation.stageModifications) {
      // Restore stage positions
      setStagePositions({
        Defence: [...formation.stagePositions.Defence],
        Default: [...formation.stagePositions.Default],
        Attack: [...formation.stagePositions.Attack],
      });
      
      // Restore stage modifications (convert arrays back to Sets)
      setStageModifications({
        Defence: new Set(formation.stageModifications.Defence),
        Default: new Set(formation.stageModifications.Default),
        Attack: new Set(formation.stageModifications.Attack),
      });
      
      // Use Default stage as base formation
      setBaseFormation([...formation.stagePositions.Default]);
    } else {
      // For preset formations or custom formations without saved stage data, 
      // reset all modifications and apply formation to all stages
      setBaseFormation(formation.players);
      setStagePositions({
        Defence: [...formation.players],
        Default: [...formation.players],
        Attack: [...formation.players],
      });
      setStageModifications({
        Defence: new Set(),
        Default: new Set(),
        Attack: new Set(),
      });
    }

    setCurrentFormation(formation.name);
    
    toast.success(`Formation changed to ${formation.name}`, {
      description: formation.isCustom 
        ? `Custom formation with saved modifications loaded`
        : "Applied to all tactical stages",
      duration: 2000,
    });
  };

  const handleFormationRenamed = (oldName: string, newName: string) => {
    // Update current formation name if the renamed formation is currently selected
    if (currentFormation === oldName) {
      setCurrentFormation(newName);
    }
  };

  const handleStageChange = (stage: TacticalStage) => {
    setCurrentStage(stage);
    const modificationCount = stageModifications[stage].size;

    toast.info(`Switched to ${stage} stage`, {
      description:
        modificationCount > 0
          ? `${modificationCount} player${modificationCount > 1 ? "s" : ""} modified in this stage`
          : "Using default formation layout",
      duration: 1500,
    });
  };

  return (
    <SidebarProvider className="h-screen bg-gray-100">
      <Sidebar>
        <SidebarHeader className="p-4">
          <h1 className="text-xl font-bold text-gray-900">
            Football Formation Builder
          </h1>
          <p className="text-gray-600 text-xs">
            Create tactical formations across different game stages
          </p>
        </SidebarHeader>
        <SidebarContent className="px-4">
          <FormationSelector
            currentFormation={currentFormation}
            onFormationChange={handleFormationChange}
            isCurrentFormationModified={isCurrentFormationModified}
            highlightedFormation={highlightedFormation}
            onFormationRenamed={handleFormationRenamed}
            refreshTrigger={refreshTrigger}
          />
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="h-screen">
        <div className="flex h-full">
          {/* Main Content */}
          <div className="flex-1 bg-gray-100 overflow-hidden">
            <FootballField
              players={players}
              onPlayerMove={handlePlayerMove}
              onPlayerEdit={handlePlayerEdit}
              onPlayerReset={handlePlayerReset}
            />
          </div>

          {/* Tactical Stage Slider */}
          <div className="flex items-start justify-center border-l bg-background w-24 pt-8">
            <TacticalStageSlider
              currentStage={currentStage}
              onStageChange={handleStageChange}
              stageModifications={stageModifications}
            />
          </div>
        </div>
      </SidebarInset>

      <Toaster />
    </SidebarProvider>
  );
}