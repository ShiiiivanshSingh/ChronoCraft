import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Clock, Shuffle, GitBranch, LucideIcon, Download, ArrowLeft, ArrowRight } from "lucide-react";
import { useStoryStore } from './StoryInput';

// Define the Scene type here to match what's used in StoryInput
interface Scene {
  id: string;
  title: string;
  description: string;
  characters: string[];
  // Add any other properties from your StoryInput
}

interface Template {
  icon: LucideIcon;  // Replace 'any' with LucideIcon type
  name: string;
  description: string;
  apply: (scenes: Scene[]) => Scene[];
}

const Templates = () => {
  const { scenes, setScenes } = useStoryStore();
  const navigate = useNavigate();

  const applyTemplate = (template: Template) => {
    // Preserve all scene properties while reordering
    const newScenes = template.apply([...scenes].map(scene => ({
      ...scene,
      // Ensure all required properties are maintained
    })));
    setScenes(newScenes);
    navigate("/editor");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Cinematic Structure Templates</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-5xl mx-auto">
        {templates.map((template, index) => (
          <div
            key={template.name}
            className="glass p-6 animate-fade-up hover:scale-105 transition-transform"
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
              {scenes.length === 0 ? "Add scenes first" : "Apply Template"}
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-between max-w-5xl mx-auto">
        <Button variant="outline" onClick={() => navigate("/story-input")}>
          Add More Scenes
        </Button>
        <Button onClick={() => navigate("/editor")}>
          Go to Editor
        </Button>
      </div>
    </div>
  );
};

const templates: Template[] = [
  {
    icon: Clock,
    name: "Memento Style",
    description: "Reverse chronological order with interwoven timelines.",
    apply: (scenes: Scene[]) => {
      const forward = [...scenes].filter((_, i) => i % 2 === 0);
      const backward = [...scenes].filter((_, i) => i % 2 === 1).reverse();
      return [...backward, ...forward];
    }
  },
  {
    icon: Shuffle,
    name: "Pulp Fiction",
    description: "Multiple intersecting storylines with non-linear progression.",
    apply: (scenes: Scene[]) => {
      // Create three interweaving storylines
      const storylines = [[], [], []];
      scenes.forEach((scene, i) => {
        storylines[i % 3].push(scene);
      });
      
      // Shuffle each storyline independently
      storylines.forEach(storyline => {
        for (let i = storyline.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [storyline[i], storyline[j]] = [storyline[j], storyline[i]];
        }
      });
      
      return storylines.flat();
    }
  },
  {
    icon: GitBranch,
    name: "Inception Layers",
    description: "Nested storylines with parallel time progression.",
    apply: (scenes: Scene[]) => {
      // Create nested dream layers
      const layers = Math.ceil(scenes.length / 3);
      const restructured = [];
      
      for (let depth = 0; depth < layers; depth++) {
        // Add entry point to each layer
        restructured.push(...scenes.slice(depth * 3, depth * 3 + 1));
        
        // Add parallel scenes from other layers
        for (let layer = 0; layer < depth; layer++) {
          const sceneIndex = layer * 3 + 1 + depth;
          if (sceneIndex < scenes.length) {
            restructured.push(scenes[sceneIndex]);
          }
        }
      }
      
      return restructured;
    }
  },
];

export default Templates;
