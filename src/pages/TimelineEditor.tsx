import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MoveHorizontal, Undo2, Redo2, Save, Download, GitBranch, RotateCcw, Link2 } from "lucide-react";
import { useStoryStore } from './StoryInput';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Scene } from "@/types/story";

const TimelineEditor = () => {
  const { scenes, setScenes } = useStoryStore();
  const navigate = useNavigate();
  const [selectedScene, setSelectedScene] = useState<string | null>(null);
  const [mode, setMode] = useState<'normal' | 'branch' | 'loop' | 'link'>('normal');

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(scenes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setScenes(items);
  };

  const handleSceneClick = (sceneId: string) => {
    if (mode === 'normal') {
      setSelectedScene(sceneId);
      return;
    }

    const updatedScenes = scenes.map(scene => {
      if (scene.id === sceneId) {
        switch (mode) {
          case 'branch':
            if (selectedScene && selectedScene !== sceneId) {
              return {
                ...scene,
                branchTo: [...(scene.branchTo || []), selectedScene]
              };
            }
            break;
          case 'loop':
            return {
              ...scene,
              isLoop: !scene.isLoop
            };
          case 'link':
            if (selectedScene && selectedScene !== sceneId) {
              return {
                ...scene,
                linkedScenes: [...(scene.linkedScenes || []), selectedScene]
              };
            }
            break;
        }
      }
      return scene;
    });

    setScenes(updatedScenes);
    setSelectedScene(null);
    setMode('normal');
  };

  const getSceneStyle = (scene: Scene) => {
    let className = "p-4 bg-secondary/50 rounded-lg mb-4 ";
    
    if (selectedScene === scene.id) {
      className += "ring-2 ring-accent ";
    }
    if (scene.isLoop) {
      className += "border-l-4 border-green-500 ";
    }
    if (scene.branchTo?.length) {
      className += "border-r-4 border-blue-500 ";
    }
    if (scene.linkedScenes?.length) {
      className += "border-b-4 border-purple-500 ";
    }

    return className;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Timeline Editor</h1>
        
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
                <div className="flex flex-col items-center justify-center h-full">
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
                        className={getSceneStyle(scene)}
                        onClick={() => handleSceneClick(scene.id)}
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
                        {/* Show connections */}
                        {(scene.branchTo?.length || scene.linkedScenes?.length || scene.isLoop) && (
                          <div className="mt-2 text-sm text-muted-foreground">
                            {scene.branchTo?.length > 0 && (
                              <div>Branches to: {scene.branchTo.join(', ')}</div>
                            )}
                            {scene.linkedScenes?.length > 0 && (
                              <div>Linked with: {scene.linkedScenes.join(', ')}</div>
                            )}
                            {scene.isLoop && <div>Loops back</div>}
                          </div>
                        )}
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
        <Button 
          variant={mode === 'branch' ? 'default' : 'outline'} 
          className="glass"
          onClick={() => setMode(mode === 'branch' ? 'normal' : 'branch')}
        >
          <GitBranch className="h-4 w-4 mr-2" />
          {mode === 'branch' ? 'Select Target' : 'Add Branch'}
        </Button>
        <Button 
          variant={mode === 'loop' ? 'default' : 'outline'} 
          className="glass"
          onClick={() => setMode(mode === 'loop' ? 'normal' : 'loop')}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Create Loop
        </Button>
        <Button 
          variant={mode === 'link' ? 'default' : 'outline'} 
          className="glass"
          onClick={() => setMode(mode === 'link' ? 'normal' : 'link')}
        >
          <Link2 className="h-4 w-4 mr-2" />
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
