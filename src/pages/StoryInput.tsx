
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowRight } from "lucide-react";

interface Scene {
  id: string;
  title: string;
  description: string;
  characters: string[];
}

const StoryInput = () => {
  const navigate = useNavigate();
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [newScene, setNewScene] = useState({
    title: "",
    description: "",
    characters: "",
  });

  const addScene = () => {
    if (newScene.title && newScene.description) {
      setScenes([
        ...scenes,
        {
          id: crypto.randomUUID(),
          title: newScene.title,
          description: newScene.description,
          characters: newScene.characters.split(",").map((c) => c.trim()),
        },
      ]);
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
          <Button onClick={addScene} className="w-full">
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
              className="p-4 bg-secondary/50 rounded-lg animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
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
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
        <Button
          onClick={() => navigate("/editor")}
          disabled={scenes.length === 0}
          className="group"
        >
          Continue to Editor
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default StoryInput;
