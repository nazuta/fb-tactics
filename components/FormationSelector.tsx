import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Formation } from '../types/formation';
import { getAllFormations, deleteCustomFormation, renameCustomFormation } from '../utils/customFormations';
import { Trash2, Edit3, Check, X, Star } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

interface FormationSelectorProps {
  currentFormation: string;
  onFormationChange: (formation: Formation) => void;
  isCurrentFormationModified?: boolean;
  highlightedFormation?: string;
  onFormationRenamed?: (oldName: string, newName: string) => void;
  refreshTrigger?: number;
}

export function FormationSelector({ 
  currentFormation, 
  onFormationChange,
  isCurrentFormationModified = false,
  highlightedFormation,
  onFormationRenamed,
  refreshTrigger = 0
}: FormationSelectorProps) {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [editingFormation, setEditingFormation] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>('');

  // Load formations on component mount and when localStorage changes
  const loadFormations = () => {
    const allFormations = getAllFormations();
    setFormations(allFormations);
  };

  useEffect(() => {
    loadFormations();
    
    // Listen for storage changes to update when custom formations are added
    const handleStorageChange = () => loadFormations();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Refresh formations when refreshTrigger changes
  useEffect(() => {
    if (refreshTrigger > 0) {
      loadFormations();
    }
  }, [refreshTrigger]);

  const handleDeleteCustomFormation = (formationName: string) => {
    try {
      deleteCustomFormation(formationName);
      loadFormations();
      toast.success("Formation deleted", {
        description: `"${formationName}" has been removed`,
        duration: 2000,
      });
    } catch (error) {
      toast.error("Failed to delete formation", {
        description: "Please try again",
        duration: 3000,
      });
    }
  };

  const handleStartEdit = (formation: Formation, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setEditingFormation(formation.name);
    setEditingName(formation.name);
  };

  const handleSaveEdit = () => {
    if (!editingFormation || !editingName.trim()) {
      handleCancelEdit();
      return;
    }

    const trimmedName = editingName.trim();
    if (trimmedName === editingFormation) {
      handleCancelEdit();
      return;
    }

    const success = renameCustomFormation(editingFormation, trimmedName);
    
    if (success) {
      onFormationRenamed?.(editingFormation, trimmedName);
      loadFormations();
      toast.success("Formation renamed", {
        description: `Now called "${trimmedName}"`,
        duration: 2000,
      });
    } else {
      toast.error("Cannot rename formation", {
        description: "Name already exists or is invalid",
        duration: 3000,
      });
    }

    setEditingFormation(null);
    setEditingName('');
  };

  const handleCancelEdit = () => {
    setEditingFormation(null);
    setEditingName('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  const handleCardClick = (formation: Formation) => {
    if (editingFormation) return; // Don't select while editing
    
    // For custom formations, always load the latest data from localStorage
    if (formation.isCustom) {
      const latestFormations = getAllFormations();
      const latestFormation = latestFormations.find(f => f.name === formation.name);
      if (latestFormation) {
        onFormationChange(latestFormation);
      } else {
        // Formation was deleted, reload the list
        loadFormations();
      }
    } else {
      onFormationChange(formation);
    }
  };

  const presetFormations = formations.filter(f => !f.isCustom);
  const customFormations = formations.filter(f => f.isCustom);

  return (
    <div className="space-y-6">


      {/* Preset Formations */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Preset Formations</h3>
        <div className="grid grid-cols-2 gap-2">
          {presetFormations.map((formation) => (
            <Button
              key={formation.name}
              onClick={() => onFormationChange(formation)}
              variant={currentFormation === formation.name ? "default" : "outline"}
              className="h-auto py-2"
              size="sm"
            >
              {formation.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Custom Formations */}
      {customFormations.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Custom Formations</h3>
          <div className="space-y-2">
            {customFormations.map((formation) => {
              const isHighlighted = highlightedFormation === formation.name;
              const isEditing = editingFormation === formation.name;
              const isCurrent = currentFormation === formation.name;
              
              return (
                <Card 
                  key={formation.name}
                  onClick={() => handleCardClick(formation)}
                  className={`transition-all duration-300 cursor-pointer ${
                    isHighlighted 
                      ? 'border-green-300 bg-green-50 shadow-md' 
                      : isCurrent 
                        ? 'border-primary bg-primary/5 shadow-sm' 
                        : 'border-border hover:border-primary/50 hover:shadow-sm'
                  } ${isEditing ? 'cursor-default' : ''}`}
                >
                  <CardContent className="p-3">
                    {isEditing ? (
                      /* Edit Mode */
                      <div className="space-y-3">
                        <Input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={handleKeyPress}
                          className="text-sm"
                          placeholder="Formation name"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveEdit}
                            size="sm"
                            className="flex-1 h-8"
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Save
                          </Button>
                          <Button
                            onClick={handleCancelEdit}
                            variant="outline"
                            size="sm"
                            className="flex-1 h-8"
                          >
                            <X className="w-3 h-3 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      /* Display Mode */
                      <div className="space-y-2">
                        {/* Formation Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            {isCurrent && (
                              <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-1 inline-block">
                                Active
                              </span>
                            )}
                            <div className="flex items-center gap-2">
                              {isCurrent && <Star className="w-3 h-3 fill-primary text-primary" />}
                              <span className="font-medium text-sm">{formation.name}</span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              onClick={(e) => handleStartEdit(formation, e)}
                              variant="ghost"
                              size="sm"
                              className="w-7 h-7 p-0 hover:bg-blue-100"
                              title="Rename formation"
                            >
                              <Edit3 className="w-3 h-3" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  onClick={(e) => e.stopPropagation()}
                                  variant="ghost"
                                  size="sm"
                                  className="w-7 h-7 p-0 hover:bg-red-100 hover:text-red-600"
                                  title="Delete formation"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Custom Formation</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{formation.name}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDeleteCustomFormation(formation.name)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>

                        {/* Formation Details */}
                        {formation.basedOn && (
                          <p className="text-xs text-muted-foreground">
                            Based on {formation.basedOn}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State for Custom Formations */}
      {customFormations.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              No custom formations yet
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Modify any formation to create your first custom formation
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}