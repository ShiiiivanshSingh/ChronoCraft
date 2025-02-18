import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import StoryInput from "./pages/StoryInput";
import TimelineEditor from "./pages/TimelineEditor";
import Templates from "./pages/Templates";
import Analysis from "./pages/Analysis";
import Export from "./pages/Export";
import NotFound from "./pages/NotFound";
import Background from "./components/Background";
import ExportStory from "./pages/ExportStory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Background />
        <div className="relative z-10">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/story-input" element={<StoryInput />} />
              <Route path="/editor" element={<TimelineEditor />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/export" element={<ExportStory />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
