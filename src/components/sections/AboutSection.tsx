const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-primary bg-clip-text text-transparent">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate developer and designer focused on creating meaningful digital experiences. 
              With a keen eye for detail and a love for clean code, I bring ideas to life through 
              innovative solutions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
              projects, or sharing knowledge with the developer community.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">50+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">100%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80 rounded-full bg-gradient-primary p-1">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-muted-foreground">
              <img src="src/assets/profile-pic.jpg" alt="Joseph" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
