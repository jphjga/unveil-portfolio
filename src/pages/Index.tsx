import { useState, useEffect } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import CircularNav from "@/components/CircularNav";
import LazySection from "@/components/LazySection";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";
import portfolioBg from "@/assets/portfolio-bg.jpg";

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const handleEnter = () => {
    setIsRevealing(true);
    setTimeout(() => {
      setShowWelcome(false);
      setIsRevealing(false);
    }, 1000);
  };

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    if (!showWelcome) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [showWelcome]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${portfolioBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      {/* Welcome Screen */}
      {showWelcome && (
        <div className="fixed inset-0 z-50">
          <WelcomeScreen onEnter={handleEnter} />
        </div>
      )}

      {/* Main Content */}
      {!showWelcome && (
        <>
          <CircularNav activeSection={activeSection} onNavigate={handleNavigate} />
          
          <div className="relative z-10">
            <HeroSection />
            <LazySection>
              <AboutSection />
            </LazySection>
            <LazySection>
              <ProjectsSection />
            </LazySection>
            <LazySection>
              <SkillsSection />
            </LazySection>
            <LazySection>
              <ContactSection />
            </LazySection>
          </div>

          {/* Footer */}
          <footer className="relative z-10 py-8 text-center border-t border-border">
            <p className="text-muted-foreground">
              © 2024 JPJGA. Built with React & Tailwind CSS
            </p>
          </footer>
        </>
      )}
    </div>
  );
};

export default Index;
