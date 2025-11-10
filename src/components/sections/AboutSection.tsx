import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [content, setContent] = useState({
    description1: "I'm a passionate developer and designer focused on creating meaningful digital experiences. With a keen eye for detail and a love for clean code, I bring ideas to life through innovative solutions.",
    description2: "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.",
    yearsExperience: 3,
    projectsCompleted: 20,
    clientSatisfaction: 100,
    profileImageUrl: "/profile-pic.jpg",
  });

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from("about_content").select("*").single();
      if (data) {
        setContent({
          description1: data.description_1,
          description2: data.description_2,
          yearsExperience: data.years_experience,
          projectsCompleted: data.projects_completed,
          clientSatisfaction: data.client_satisfaction,
          profileImageUrl: data.profile_image_url || "/profile-pic.jpg",
        });
      }
    };
    fetchContent();
  }, []);

  return (
    <section 
      ref={ref}
      id="about" 
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-primary bg-clip-text text-transparent">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.description1}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.description2}
            </p>
            <div className="flex gap-4 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{content.yearsExperience}+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">{content.projectsCompleted}+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">{content.clientSatisfaction}%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80 rounded-full bg-gradient-primary p-1">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-muted-foreground">
                <img src={content.profileImageUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
