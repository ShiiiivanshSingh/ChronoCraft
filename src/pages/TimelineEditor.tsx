
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MoveHorizontal, Undo2, Redo2, Save } from "lucide-react";

const TimelineEditor = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Timeline Editor</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Redo2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Save className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Timeline Canvas */}
      <div className="glass p-6 mb-8 min-h-[60vh]">
        <div className="flex items-center justify-center h-full">
          <MoveHorizontal className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground mt-4">
            Drag and drop scenes to rearrange your timeline
          </p>
        </div>
      </div>

      {/* Tools Panel */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Button variant="outline" className="glass">
          Add Branch
        </Button>
        <Button variant="outline" className="glass">
          Create Loop
        </Button>
        <Button variant="outline" className="glass">
          Link Scenes
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate("/story-input")}>
          Back to Story Input
        </Button>
        <Button onClick={() => navigate("/templates")}>
          Apply Templates
        </Button>
      </div>
    </div>
  );
};

export default TimelineEditor;
