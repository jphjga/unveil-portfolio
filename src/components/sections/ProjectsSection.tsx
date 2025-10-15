import { ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Pharmacy Inventory Management System",
    description: "A comprehensive inventory management system designed to streamline pharmacy operations, track medication stock, and manage supplies efficiently.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    link: "https://joseph-pharmacare.netlify.app/auth",
    github: "https://github.com/jphjga/pill-guardian-plus",
    image: "/dashboard.png", // Image from public folder
  },
  {
    title: "My Reserve",
    description: "A versatile reservation platform for businesses like hotels, restaurants, and clubs, allowing customers to seamlessly book services and purchase tickets online.",
    tech: ["Next.js", "shadcn-ui", "Vercel"],
    link: "https://my-reserve-kenya.vercel.app/",
    github: "https://github.com/jphjga/my-reserve-kenya",
    image: "/myreserve.png", // Image from public folder
  },
  // Add more projects here in the future
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
              {/* Project Image */}
              <div className="relative aspect-video bg-gradient-secondary overflow-hidden">
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
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