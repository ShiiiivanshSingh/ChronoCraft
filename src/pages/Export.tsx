
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileDown, Share2, Link } from "lucide-react";

const Export = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Export & Share</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Export Options */}
        <div className="glass p-6">
          <h2 className="text-2xl font-semibold mb-4">Export Options</h2>
          <div className="space-y-4">
            {exportOptions.map((option, index) => (
              <Button
                key={option.name}
                variant="outline"
                className="w-full justify-start"
              >
                <option.icon className="mr-2 h-4 w-4" />
                {option.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Share Options */}
        <div className="glass p-6">
          <h2 className="text-2xl font-semibold mb-4">Share & Collaborate</h2>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Share2 className="mr-2 h-4 w-4" />
              Invite Collaborators
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Link className="mr-2 h-4 w-4" />
              Copy Sharing Link
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate("/analysis")}>
          Back to Analysis
        </Button>
        <Button onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

const exportOptions = [
  {
    icon: FileDown,
    name: "Export as PDF",
  },
  {
    icon: FileDown,
    name: "Export as Visual Map",
  },
  {
    icon: FileDown,
    name: "Export for Final Draft",
  },
];

export default Export;
