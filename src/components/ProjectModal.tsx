import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

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

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!project) return null;

  const allImages = [
    ...(project.image_url ? [project.image_url] : []),
    ...(project.screenshots || [])
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Image Gallery */}
            {allImages.length > 0 && (
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={allImages[currentImageIndex]}
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setIsFullscreen(true)}
                />
                
                {allImages.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                      {allImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? "bg-primary" : "bg-muted-foreground/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-semibold mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            {project.link && (
              <Button asChild className="flex-1">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Project
                </a>
              </Button>
            )}
            {project.github_link && (
              <Button variant="outline" asChild className="flex-1">
                <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* Fullscreen Image Viewer */}
    {isFullscreen && (
      <div 
        className="fixed inset-0 z-[200] bg-background flex items-center justify-center cursor-pointer"
        onClick={() => setIsFullscreen(false)}
      >
        <img
          src={allImages[currentImageIndex]}
          alt={`${project.title} screenshot ${currentImageIndex + 1}`}
          className="max-w-[95vw] max-h-[95vh] object-contain"
          onClick={() => setIsFullscreen(false)}
        />
        
        {allImages.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-primary" : "bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    )}
    </>
  );
};

export default ProjectModal;
