const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl text-center animate-fade-in-up">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
          Building Digital Experiences
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Transforming ideas into elegant, functional solutions through code and design
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <div className="px-6 py-3 rounded-full bg-card/50 backdrop-blur-glass border border-[var(--glass-border)]">
            <span className="text-foreground">React</span>
          </div>
          <div className="px-6 py-3 rounded-full bg-card/50 backdrop-blur-glass border border-[var(--glass-border)]">
            <span className="text-foreground">TypeScript</span>
          </div>
          <div className="px-6 py-3 rounded-full bg-card/50 backdrop-blur-glass border border-[var(--glass-border)]">
            <span className="text-foreground">UI/UX</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
