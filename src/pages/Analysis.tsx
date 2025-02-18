
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LineChart, Zap, AlertTriangle } from "lucide-react";

const Analysis = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Plot Analysis & Suggestions</h1>

      {/* Analysis Dashboard */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Pacing Analysis */}
        <div className="glass p-6">
          <h2 className="text-2xl font-semibold mb-4">Story Pacing</h2>
          <div className="aspect-video bg-secondary/50 rounded-lg flex items-center justify-center">
            <LineChart className="h-12 w-12 text-accent" />
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="glass p-6">
          <h2 className="text-2xl font-semibold mb-4">AI Suggestions</h2>
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <suggestion.icon className="h-5 w-5 text-accent shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">{suggestion.title}</h3>
                  <p className="text-muted-foreground">{suggestion.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate("/templates")}>
          Back to Templates
        </Button>
        <Button onClick={() => navigate("/export")}>
          Export Story
        </Button>
      </div>
    </div>
  );
};

const suggestions = [
  {
    icon: Zap,
    title: "Add Tension",
    description: "Consider adding a conflict scene between Acts 2 and 3.",
  },
  {
    icon: AlertTriangle,
    title: "Pacing Issue",
    description: "The middle section might be too slow. Try adding more action.",
  },
];

export default Analysis;
