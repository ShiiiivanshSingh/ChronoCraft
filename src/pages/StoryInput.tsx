import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowRight, ArrowLeft, Download, Trash2 } from "lucide-react";
import { Scene } from "@/types/story";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoryStore {
  scenes: Scene[];
  setScenes: (scenes: Scene[]) => void;
  addScene: (scene: Scene) => void;
  deleteScene: (id: string) => void;
}

export const useStoryStore = create<StoryStore>()(
  persist(
    (set) => ({
      scenes: [],
      setScenes: (scenes) => set({ scenes }),
      addScene: (scene) => set((state) => ({ 
        scenes: [...state.scenes, scene] 
      })),
      deleteScene: (id) => set((state) => ({
        scenes: state.scenes.filter(scene => scene.id !== id)
      })),
    }),
    {
      name: 'story-storage',
    }
  )
);

const StoryInput = () => {
  const { scenes, addScene, deleteScene } = useStoryStore();
  const navigate = useNavigate();
  const [newScene, setNewScene] = useState({
    title: "",
    description: "",
    characters: "",
  });

  const handleAddScene = () => {
    if (newScene.title && newScene.description) {
      addScene({
        id: crypto.randomUUID(),
        title: newScene.title,
        description: newScene.description,
        characters: newScene.characters.split(",").map((c) => c.trim()),
        lastModified: new Date(),
      });
      setNewScene({ title: "", description: "", characters: "" });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Create Your Story Timeline</h1>
      
      {/* Scene Input Form */}
      <div className="glass p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Scene</h2>
        <div className="space-y-4">
          <Input
            placeholder="Scene Title"
            value={newScene.title}
            onChange={(e) => setNewScene({ ...newScene, title: e.target.value })}
          />
          <Input
            placeholder="Scene Description"
            value={newScene.description}
            onChange={(e) => setNewScene({ ...newScene, description: e.target.value })}
          />
          <Input
            placeholder="Characters (comma-separated)"
            value={newScene.characters}
            onChange={(e) => setNewScene({ ...newScene, characters: e.target.value })}
          />
          <Button onClick={handleAddScene} className="w-full">
            <Plus className="mr-2" /> Add Scene
          </Button>
        </div>
      </div>

      {/* Timeline Preview */}
      <div className="glass p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Timeline Preview</h2>
        <div className="space-y-4">
          {scenes.map((scene, index) => (
            <div
              key={scene.id}
              className="p-4 bg-secondary/50 rounded-lg animate-fade-up relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => deleteScene(scene.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
              <h3 className="font-semibold">{scene.title}</h3>
              <p className="text-muted-foreground">{scene.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {scene.characters.map((character) => (
                  <span
                    key={character}
                    className="px-2 py-1 bg-accent/10 text-accent rounded-full text-sm"
                  >
                    {character}
                  </span>
                ))}
              </div>
              {scene.lastModified && (
                <div className="text-xs text-muted-foreground mt-2">
                  Last modified: {new Date(scene.lastModified).toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex gap-4">
          <Button 
            variant="outline"
            onClick={() => navigate("/export")}
            disabled={scenes.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button 
            onClick={() => navigate("/editor")}
            disabled={scenes.length === 0}
          >
            Continue to Editor <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoryInput;
