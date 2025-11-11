import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ProjectModal from "@/components/ProjectModal";

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  link?: string;
  github_link?: string;
  image_url?: string;
  screenshots?: string[];
}

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });
      if (data) {
        setProjects(data);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section 
      ref={ref}
      id="projects" 
      className={`min-h-screen flex items-center justify-center px-6 py-20 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
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
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={`Screenshot of ${project.title}`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="gap-2"
                    onClick={() => handleViewProject(project)}
                  >
                    View Details
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
                  {project.tech_stack.map((tech, i) => (
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

        <ProjectModal
          project={selectedProject}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;