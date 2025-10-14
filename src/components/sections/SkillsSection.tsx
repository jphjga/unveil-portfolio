const skills = [
  { category: "Frontend", items: ["HTML","CSS","Javasript","PHP","React","Bootstrap","TypeScript", "Tailwind CSS", "Next.js", "Vue.js"] },
  { category: "Backend", items: [".Net Framework","C#","Kotlin","Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"] },
  { category: "Tools", items: ["Git", "VS Code", "Postman", "Android Studio", "microsoft Visual Studio", "wordpress", "Figma", "Linux"] },
  { category: "Soft Skills", items: ["Problem Solving", "Team Leadership", "Communication", "Agile", "Creativity"] },
];

const SkillsSection = () => {
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
