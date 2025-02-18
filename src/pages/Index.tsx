import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Layout,
  Wand2,
  PlayCircle,
  CheckCircle2,
  Zap,
  Sparkles,
  Code2,
  Users,
  Github,
  Twitter,
  Mail,
  Heart,
  Linkedin,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="section-padding flex flex-col items-center justify-center h-screen">
        <div className="animate-fade-down text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex justify-center w-full">
            <span className="px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
              Transform Your Stories
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-mont">
            Craft Timeless Stories <br></br>
            
            <span className="text-gradient mt-4">Break Time Itself</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Turn your linear plot into a cinematic masterpiece. Upload, rearrange, and
            preview your story with our intuitive timeline editor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="hover-lift group"
              onClick={() => navigate("/story-input")}
            >
              Start Your Timeline
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="hover-lift"
              onClick={() => navigate("/templates")}
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding min-h-screen bg-secondary/50 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mont">
            Powerful Features for Storytellers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass p-6 hover-lift animate-fade-up cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate("/editor")}
              >
                <feature.icon className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2 font-mont">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mont">
            Transform Your Story in Three Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center animate-fade-up cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  const routes = ["/story-input", "/editor", "/export"];
                  navigate(routes[index]);
                }}
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-accent">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 font-mont">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="section-padding bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mont">
                Craft Your Story Like Never Before
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-3 cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => navigate("/editor")}
                  >
                    <CheckCircle2 className="h-6 w-6 text-accent shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1 font-mont">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div 
              className="glass p-6 aspect-video flex items-center justify-center cursor-pointer animate-fade-up"
              onClick={() => navigate("/templates")}
            >
              <PlayCircle className="w-16 h-16 text-accent" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding bg-secondary/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mont">
            Choose Your Creative Journey
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className="glass p-8 flex flex-col animate-fade-up w-full max-w-sm mx-auto"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-semibold mb-2 font-mont text-center">{plan.name}</h3>
                <p className="text-muted-foreground mb-4 text-center">{plan.description}</p>
                <div className="text-3xl font-bold mb-6 text-center">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 justify-center">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlighted ? "default" : "outline"}
                  className="mt-auto hover-lift w-full"
                  onClick={() => navigate("/story-input")}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mont">
            Your Story Isn't Linear—Why Should Your Tools Be?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of writers and filmmakers who are crafting the next generation
            of non-linear narratives.
          </p>
          <Button 
            size="lg" 
            className="hover-lift"
            onClick={() => navigate("/story-input")}
          >
            Start Bending Time Today
          </Button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="section-padding bg-secondary/10 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 font-mont">ChronoCraft</h3>
              <p className="text-muted-foreground text-sm">
                Crafting non-linear narratives made simple.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4 font-mont">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Button variant="link" onClick={() => navigate("/story-input")}>
                    Get Started
                  </Button>
                </li>
                <li>
                  <Button variant="link" onClick={() => navigate("/templates")}>
                    Templates
                  </Button>
                </li>
                <li>
                  <Button variant="link" onClick={() => navigate("/editor")}>
                    Editor
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 font-mont">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Button variant="link" onClick={() => window.open("https://github.com/ShiiiivanshSingh/chronocraft", "_blank")}>
                    Documentation
                  </Button>
                </li>
                <li>
                  <Button variant="link" onClick={() => window.open("https://github.com/ShiiiivanshSingh/chronocraft/issues", "_blank")}>
                    Report Bug
                  </Button>
                </li>
                <li>
                  <Button variant="link" onClick={() => window.open("https://github.com/ShiiiivanshSingh/chronocraft/issues", "_blank")}>
                    Request Feature
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 font-mont">Connect</h3>
              <div className="flex space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => window.open("https://github.com/ShiiiivanshSingh", "_blank")}
                >
                  <Github className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => window.open("https://www.linkedin.com/in/shivansh-pratap-singh-23b3b92b1", "_blank")}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => window.open("https://x.com/de_mirage_fan", "_blank")}
                >
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© 2025 ChronoCraft. :) </p>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              Made with <Heart className="h-4 w-4 text-red-500" /> by Shivansh Pratap Singh
            </div>
          </div>
        </div>
      </footer>
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

const steps = [
  {
    title: "Upload Your Story",
    description:
      "Import your linear narrative or create one from scratch using our intuitive editor.",
  },
  {
    title: "Break & Rearrange",
    description:
      "Split your story into segments and drag them into a non-linear structure.",
  },
  {
    title: "Preview & Export",
    description:
      "See how your audience will experience the story and export in various formats.",
  },
];

const benefits = [
  {
    title: "Professional Templates",
    description: "Start with pre-built structures inspired by iconic films.",
  },
  {
    title: "Real-time Collaboration",
    description: "Work with your team in real-time with live updates.",
  },
  {
    title: "Advanced Analytics",
    description: "Track pacing, engagement, and story coherence.",
  },
];

const testimonials = [
  {
    quote: "Finally, a tool that thinks like a director!",
    author: "Sarah Chen",
    title: "Indie Filmmaker",
  },
  {
    quote: "Transformed my linear story into a masterpiece.",
    author: "David Rodriguez",
    title: "Screenwriter",
  },
  {
    quote: "The perfect tool for non-linear storytelling.",
    author: "Michelle Park",
    title: "Novel Writer",
  },
];

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "Free To Use",
    features: [
      "1 Active Project",
      "Basic Templates",
      "Export to PDF",
      "Community Support",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    description: "Coming Soon",
    price: "Coming Soon",
    features: [
      "Unlimited Projects",
      "Advanced Templates",
      "Team Collaboration",
      "Priority Support",
    ],
    highlighted: true,
  }
];

export default Index;
