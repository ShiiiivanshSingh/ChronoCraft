export interface Scene {
  id: string;
  title: string;
  description: string;
  characters: string[];
  plotNumber: number;  // Add this to track original order
  branchTo?: string[];      // IDs of scenes this branches to
  isLoop?: boolean;         // Whether this scene loops back
  linkedScenes?: string[];  // IDs of scenes this is linked with
  metadata?: {
    duration?: number;      // Estimated duration in minutes
    location?: string;      // Scene location
    timeOfDay?: string;     // Time of day the scene takes place
    mood?: string;         // Emotional tone of the scene
  };
  notes?: string;          // Additional notes about the scene
  version?: number;        // Version number for tracking changes
  createdAt: Date;      // When the scene was first created
  lastModified: Date;   // When the scene was last modified
}