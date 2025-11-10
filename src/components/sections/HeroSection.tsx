import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [content, setContent] = useState({
    title: "Building Digital Experiences",
    subtitle: "Transforming ideas into elegant, functional solutions through code and design",
    techTags: ["React", "TypeScript", "UI/UX"],
  });

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from("hero_content").select("*").single();
      if (data) {
        setContent({
          title: data.title,
          subtitle: data.subtitle,
          techTags: data.tech_tags,
        });
      }
    };
    fetchContent();
  }, []);

  return (
    <section 
      ref={ref}
      id="hero" 
      className={`min-h-screen flex items-center justify-center px-6 transition-opacity duration-700 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
      }}
    >
      <div className="max-w-4xl text-center animate-fade-in-up">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
          {content.title}
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          {content.subtitle}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          {content.techTags.map((tag, index) => (
            <div
              key={index}
              className="px-6 py-3 rounded-full bg-card/50 backdrop-blur-glass border border-[var(--glass-border)]"
            >
              <span className="text-foreground">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
