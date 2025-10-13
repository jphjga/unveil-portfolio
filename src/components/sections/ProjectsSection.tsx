import { ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory management, secure payment processing, and advanced analytics dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "#",
    github: "#",
  },
  {
    title: "AI Content Generator",
    description: "Machine learning-powered content creation tool that generates high-quality marketing copy and social media posts.",
    tech: ["Python", "TensorFlow", "React", "FastAPI"],
    link: "#",
    github: "#",
  },
  {
    title: "Task Management App",
    description: "Collaborative project management platform with real-time updates, team chat, and productivity analytics.",
    tech: ["Next.js", "PostgreSQL", "WebSocket", "Tailwind"],
    link: "#",
    github: "#",
  },
  {
    title: "Weather Forecast Dashboard",
    description: "Interactive weather application with beautiful visualizations, location-based forecasts, and severe weather alerts.",
    tech: ["Vue.js", "OpenWeather API", "Chart.js"],
    link: "#",
    github: "#",
  },
  {
    title: "Social Media Analytics",
    description: "Comprehensive analytics platform for tracking social media performance across multiple channels with AI insights.",
    tech: ["React", "D3.js", "Express", "Redis"],
    link: "#",
    github: "#",
  },
  {
    title: "Portfolio Builder",
    description: "Drag-and-drop portfolio website builder with customizable templates and one-click deployment.",
    tech: ["TypeScript", "React", "Supabase", "Vercel"],
    link: "#",
    github: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my recent work, featuring innovative solutions and creative implementations
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group bg-card/50 backdrop-blur-glass border-[var(--glass-border)] overflow-hidden hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-elegant"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image Placeholder */}
              <div className="relative aspect-video bg-gradient-secondary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary-glow/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary/20">{index + 1}</span>
                </div>
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="gap-2"
                    asChild
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      View
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
