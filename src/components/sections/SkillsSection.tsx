import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Skill {
  category: string;
  items: string[];
}

const SkillsSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data } = await supabase
        .from("skills")
        .select("*")
        .order("display_order", { ascending: true });
      if (data) {
        setSkills(data.map(skill => ({
          category: skill.category,
          items: skill.items,
        })));
      }
    };
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-primary bg-clip-text text-transparent">
          Skills & Expertise
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skillGroup, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-glass border border-[var(--glass-border)] p-6 rounded-lg hover:bg-card/80 transition-all duration-500"
            >
              <h3 className="text-2xl font-bold mb-4 text-primary">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-gradient-secondary border border-primary/20 text-foreground hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
