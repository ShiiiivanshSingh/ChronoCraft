import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useStoryStore } from './StoryInput';
import { Download, FileJson, FileText, Film, ArrowLeft } from "lucide-react";
import { Scene } from "@/types/story";

interface ExportFormat {
  icon: typeof FileText;
  name: string;
  description: string;
  action: (scenes: Scene[]) => void;
}

const ExportStory = () => {
  const { scenes } = useStoryStore();
  const navigate = useNavigate();

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportFormats: ExportFormat[] = [
    {
      icon: FileText,
      name: "Screenplay Format",
      description: "Export as a properly formatted screenplay (.txt)",
      action: (scenes) => {
        const content = scenes.map(scene => (
          `Scene: ${scene.title}\n` +
          `Location: ${scene.metadata?.location || 'Unknown'}\n` +
          `Time: ${scene.metadata?.timeOfDay || 'Unknown'}\n\n` +
          `Characters: ${scene.characters.join(', ')}\n\n` +
          `${scene.description}\n\n` +
          `${scene.notes ? `Notes: ${scene.notes}\n` : ''}` +
          `-------------------\n\n`
        )).join('');
        
        downloadFile(content, 'screenplay.txt', 'text/plain');
      }
    },
    {
      icon: FileJson,
      name: "JSON Export",
      description: "Export all story data as JSON",
      action: (scenes) => {
        const content = JSON.stringify(scenes, null, 2);
        downloadFile(content, 'story-data.json', 'application/json');
      }
    },
    {
      icon: Film,
      name: "Timeline View",
      description: "Export as a visual timeline document",
      action: (scenes) => {
        const content = scenes.map((scene, index) => (
          `${index + 1}. ${scene.title}\n` +
          `   Duration: ${scene.metadata?.duration || 'Unknown'} minutes\n` +
          `   Connects to: ${scene.linkedScenes?.join(', ') || 'None'}\n` +
          `   Branches: ${scene.branchTo?.join(', ') || 'None'}\n` +
          `   Loop: ${scene.isLoop ? 'Yes' : 'No'}\n\n`
        )).join('');
        
        downloadFile(content, 'timeline.txt', 'text/plain');
      }
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/editor')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Editor
        </Button>

        <h1 className="text-4xl font-bold mb-4">Export Your Story</h1>
        <p className="text-muted-foreground mb-8">
          Choose your preferred export format to share or archive your story.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {exportFormats.map((format) => (
            <div
              key={format.name}
              className="glass p-6 hover:scale-105 transition-transform"
            >
              <format.icon className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">{format.name}</h3>
              <p className="text-muted-foreground mb-4">{format.description}</p>
              <Button 
                className="w-full"
                onClick={() => format.action(scenes)}
                disabled={scenes.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          ))}
        </div>

        {scenes.length === 0 && (
          <div className="text-center text-muted-foreground">
            No scenes to export. Add some scenes first!
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportStory; 