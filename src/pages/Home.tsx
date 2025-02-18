import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - Takes up full viewport */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4">
        <h1 className="text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Story Structure Builder
        </h1>
        <p className="text-xl text-muted-foreground text-center max-w-2xl mb-8">
          Create, arrange, and visualize your story's timeline with our intuitive drag-and-drop interface.
        </p>
        <Button 
          size="lg" 
          onClick={() => navigate("/story-input")}
          className="group text-lg"
        >
          Start Building
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Features Section - Below the fold */}
      <div className="container mx-auto py-24 px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Scene Management</h3>
            <p className="text-muted-foreground">
              Easily create and organize your story's scenes with our intuitive interface.
            </p>
          </div>
          <div className="glass p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Timeline Editor</h3>
            <p className="text-muted-foreground">
              Drag and drop scenes to experiment with different narrative structures.
            </p>
          </div>
          <div className="glass p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Story Templates</h3>
            <p className="text-muted-foreground">
              Apply proven narrative structures with pre-built templates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 