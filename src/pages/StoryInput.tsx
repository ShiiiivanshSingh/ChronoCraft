import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowRight, ArrowLeft, Download, Trash2, Edit2 } from "lucide-react";
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
  const { scenes, addScene, deleteScene, setScenes } = useStoryStore();
  const navigate = useNavigate();
  const [newScene, setNewScene] = useState({
    title: "",
    description: "",
    characters: "",
  });
  const [editingScene, setEditingScene] = useState<Scene | null>(null);

  const handleAddScene = () => {
    if (newScene.title && newScene.description) {
      const now = new Date();
      addScene({
        id: crypto.randomUUID(),
        title: newScene.title,
        description: newScene.description,
        characters: newScene.characters.split(",").map((c) => c.trim()),
        plotNumber: scenes.length + 1,
        createdAt: now,
        lastModified: now,
      });
      setNewScene({ title: "", description: "", characters: "" });
    }
  };

  const handleEditScene = (scene: Scene) => {
    setEditingScene(scene);
    setNewScene({
      title: scene.title,
      description: scene.description,
      characters: scene.characters.join(", "),
    });
  };

  const handleUpdateScene = () => {
    if (editingScene && newScene.title && newScene.description) {
      const updatedScenes = scenes.map(scene => 
        scene.id === editingScene.id 
          ? {
              ...scene,
              title: newScene.title,
              description: newScene.description,
              characters: newScene.characters.split(",").map((c) => c.trim()),
              lastModified: new Date(),
            }
          : scene
      );
      setScenes(updatedScenes);
      setEditingScene(null);
      setNewScene({ title: "", description: "", characters: "" });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Create Your Story Timeline</h1>
      
      {/* Scene Input Form */}
      <div className="glass p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {editingScene ? 'Edit Scene' : 'Add New Scene'}
        </h2>
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
          {editingScene ? (
            <div className="flex gap-2">
              <Button onClick={handleUpdateScene} className="flex-1">
                Update Scene
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setEditingScene(null);
                  setNewScene({ title: "", description: "", characters: "" });
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={handleAddScene} className="w-full">
              <Plus className="mr-2" /> Add Scene
            </Button>
          )}
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
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditScene(scene)}
                  className="h-8 w-8"
                  disabled={!!editingScene}
                >
                  <Edit2 className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteScene(scene.id)}
                  className="h-8 w-8"
                  disabled={!!editingScene}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
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
              <div className="text-xs text-muted-foreground mt-2 flex justify-between">
                <span>Created: {new Date(scene.createdAt).toLocaleString()}</span>
                <span>Modified: {new Date(scene.lastModified).toLocaleString()}</span>
              </div>
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
