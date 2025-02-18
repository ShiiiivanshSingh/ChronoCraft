
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

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

      {/* How It Works Section */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Transform Your Story in Three Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-accent">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Craft Your Story Like Never Before
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-3"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle2 className="h-6 w-6 text-accent shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass p-6 aspect-video flex items-center justify-center animate-fade-up">
              <PlayCircle className="w-16 h-16 text-accent" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Loved by Storytellers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.author}
                className="glass p-6 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-lg mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Choose Your Creative Journey
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className="glass p-6 flex flex-col animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="text-3xl font-bold mb-6">${plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlighted ? "default" : "outline"}
                  className="mt-auto hover-lift"
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
    name: "Storyteller",
    description: "Perfect for individual creators",
    price: "15",
    features: [
      "3 Active Projects",
      "Basic Templates",
      "Export to PDF",
      "Email Support",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    description: "For serious writers and filmmakers",
    price: "39",
    features: [
      "Unlimited Projects",
      "Advanced Templates",
      "Team Collaboration",
      "Priority Support",
    ],
    highlighted: true,
  },
  {
    name: "Studio",
    description: "For teams and production houses",
    price: "99",
    features: [
      "Everything in Pro",
      "Custom Templates",
      "API Access",
      "Dedicated Support",
    ],
    highlighted: false,
  },
];

export default Index;
