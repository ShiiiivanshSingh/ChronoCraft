
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Layout, Wand2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding flex flex-col items-center justify-center min-h-[80vh] text-center">
        <div className="animate-fade-down">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
            Transform Your Stories
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Craft Timeless Stories—
            <span className="text-gradient">Break Time Itself</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Turn your linear plot into a cinematic masterpiece. Upload, rearrange, and
            preview your story with our intuitive timeline editor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="hover-lift group">
              Start Your Timeline
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="hover-lift">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Powerful Features for Storytellers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass p-6 hover-lift animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Story Isn't Linear—Why Should Your Tools Be?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of writers and filmmakers who are crafting the next generation
            of non-linear narratives.
          </p>
          <Button size="lg" className="hover-lift">
            Start Bending Time Today
          </Button>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: Layout,
    title: "Visual Timeline Editor",
    description:
      "Drag and drop story elements to create complex, non-linear narratives with ease.",
  },
  {
    icon: Wand2,
    title: "AI-Powered Analysis",
    description:
      "Get intelligent suggestions for plot structure and pacing improvements.",
  },
  {
    icon: Clock,
    title: "Time-Bending Templates",
    description:
      "Choose from pre-built non-linear structures inspired by iconic films.",
  },
];

export default Index;
