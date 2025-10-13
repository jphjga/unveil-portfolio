import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

const projects = [
  {
    title: "Project One",
    description: "A revolutionary web application that solves real-world problems with elegant design.",
    tech: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "Project Two",
    description: "Mobile-first platform connecting users through shared interests and experiences.",
    tech: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    title: "Project Three",
    description: "AI-powered tool that streamlines workflows and boosts productivity.",
    tech: ["Python", "TensorFlow", "React"],
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-primary bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group bg-card/50 backdrop-blur-glass border-[var(--glass-border)] p-6 hover:bg-card/80 transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <div className="aspect-video bg-gradient-secondary rounded-lg mb-4 flex items-center justify-center text-muted-foreground">
                [Screenshot]
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all">
                <span>View Project</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
