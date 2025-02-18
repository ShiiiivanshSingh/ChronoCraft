import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Clock, Shuffle, GitBranch } from "lucide-react";
import { useStoryStore } from './StoryInput';

const Templates = () => {
  const { scenes, setScenes } = useStoryStore();
  const navigate = useNavigate();

  const applyTemplate = (template) => {
    // Example template application logic
    switch (template.name) {
      case "Memento Style":
        setScenes([...scenes].reverse());
        break;
      case "Pulp Fiction":
        // Randomly reorder scenes while keeping some sequential
        const shuffled = [...scenes].sort(() => Math.random() - 0.5);
        setScenes(shuffled);
        break;
      case "Inception Layers":
        // Group scenes into nested layers
        const layered = scenes.reduce((acc, scene, index) => {
          const layer = Math.floor(index / 3);
          if (!acc[layer]) acc[layer] = [];
          acc[layer].push(scene);
          return acc;
        }, []);
        setScenes(layered.flat());
        break;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Cinematic Structure Templates</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {templates.map((template, index) => (
          <div
            key={template.name}
            className="glass p-6 animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <template.icon className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
            <p className="text-muted-foreground mb-4">{template.description}</p>
            <Button 
              className="w-full"
              onClick={() => applyTemplate(template)}
              disabled={scenes.length === 0}
            >
              Apply Template
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate("/editor")}>
          Back to Editor
        </Button>
        <Button onClick={() => navigate("/analysis")}>
          Analyze Structure
        </Button>
      </div>
    </div>
  );
};

const templates = [
  {
    icon: Clock,
    name: "Memento Style",
    description: "Reverse chronological order with interwoven timelines.",
  },
  {
    icon: Shuffle,
    name: "Pulp Fiction",
    description: "Multiple intersecting storylines with non-linear progression.",
  },
  {
    icon: GitBranch,
    name: "Inception Layers",
    description: "Nested storylines with parallel time progression.",
  },
];

export default Templates;
