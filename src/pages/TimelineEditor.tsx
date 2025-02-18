import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MoveHorizontal, Undo2, Redo2, Save, Download } from "lucide-react";
import { useStoryStore } from './StoryInput';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TimelineEditor = () => {
  const { scenes, setScenes } = useStoryStore();
  const navigate = useNavigate();

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(scenes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setScenes(items);
  };

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

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="scenes">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="glass p-6 mb-8 min-h-[60vh]"
            >
              {scenes.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <MoveHorizontal className="h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground mt-4">
                    Drag and drop scenes to rearrange your timeline
                  </p>
                </div>
              ) : (
                scenes.map((scene, index) => (
                  <Draggable key={scene.id} draggableId={scene.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 bg-secondary/50 rounded-lg mb-4"
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
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Tools Panel */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Button variant="outline" className="glass">
          Add Branch
        </Button>
        <Button variant="outline" className="glass">
          Create Loop
        </Button>
        <Button variant="outline" className="glass">
          Link Scenes
        </Button>
        <Button 
          variant="outline" 
          className="glass"
          onClick={() => navigate("/export")}
        >
          <Download className="h-4 w-4 mr-2" />
          Export
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
