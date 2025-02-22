import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Clock, Shuffle, GitBranch, LucideIcon, Download, ArrowLeft, ArrowRight } from "lucide-react";
import { useStoryStore } from './StoryInput';
import { Scene } from "@/types/story";

interface Template {
  icon: LucideIcon;  
  name: string;
  description: string;
  image: string;
  apply: (scenes: Scene[]) => Scene[];
}



const Templates = () => {
  const { scenes, setScenes } = useStoryStore();
  const navigate = useNavigate();

  const applyTemplate = (template: Template) => {
    const newScenes = template.apply([...scenes].map(scene => ({
      ...scene,
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
            className="glass p-6 animate-fade-up hover:scale-105 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative w-full aspect-[2/3] mb-4 rounded-lg overflow-hidden">
              <img 
                src={template.image} 
                alt={template.name}
                className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
            <p className="text-muted-foreground mb-4 whitespace-pre-line leading-relaxed">{template.description}</p>
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
    description: "• Splits your story into two parallel timelines\n• Even-numbered scenes play in normal order\n• Odd-numbered scenes play in reverse\n• Creates tension as timelines move in opposite directions\n• Perfect for mysteries and revelations",
    image: "https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    apply: (scenes: Scene[]) => {
      const forward = [...scenes].filter((_, i) => i % 2 === 0);
      const backward = [...scenes].filter((_, i) => i % 2 === 1).reverse();
      return [...backward, ...forward].map(scene => ({
        ...scene,
      }));
    }
  },
  {
    icon: Shuffle,
    name: "Pulp Fiction",
    description: "• Divides scenes into three storylines\n • Each storyline is shuffled separately\n• Stories weave together randomly\n• Creates unexpected connections\n• Best for multiple character perspectives",
    image: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    apply: (scenes: Scene[]) => {
      const storylines = [[], [], []];
      scenes.forEach((scene, i) => {
        storylines[i % 3].push(scene);
      });
      
      storylines.forEach(storyline => {
        for (let i = storyline.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [storyline[i], storyline[j]] = [storyline[j], storyline[i]];
        }
      });
      
      return storylines.flat().map(scene => ({
        ...scene,
      }));
    }
  },
  {
    icon: GitBranch,
    name: "Inception Layers",
    description: "• Organizes scenes into nested layers\n• Each layer runs at different speeds\n• Deeper layers are more complex adding a unique twist to the story\n• Stories connect across layers with each other\n• Ideal for nested realities or dreams",
    image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    apply: (scenes: Scene[]) => {
      const layers = Math.ceil(scenes.length / 3);
      const restructured = [];
      
      for (let depth = 0; depth < layers; depth++) {
        restructured.push(...scenes.slice(depth * 3, depth * 3 + 1));
        for (let layer = 0; layer < depth; layer++) {
          const sceneIndex = layer * 3 + 1 + depth;
          if (sceneIndex < scenes.length) {
            restructured.push(scenes[sceneIndex]);
          }
        }
      }
      
      return restructured.map(scene => ({
        ...scene,
      }));
    }
  },
 
];

export default Templates;
