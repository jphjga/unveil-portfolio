import { useState } from "react";
import { Home, User, Briefcase, Code, Mail } from "lucide-react";

interface CircularNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "projects", icon: Briefcase, label: "Projects" },
  { id: "skills", icon: Code, label: "Skills" },
  { id: "contact", icon: Mail, label: "Contact" },
];

const CircularNav = ({ activeSection, onNavigate }: CircularNavProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <nav 
      className="fixed left-8 top-1/2 -translate-y-1/2 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {navItems.map((item, index) => {
          const angle = (index * 72 - 90) * (Math.PI / 180); // 360/5 = 72 degrees
          const radius = isHovered ? 80 : 0;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`absolute top-0 left-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                activeSection === item.id
                  ? "bg-gradient-primary text-primary-foreground"
                  : "bg-card/80 backdrop-blur-glass border border-[var(--glass-border)] text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              title={item.label}
            >
              <item.icon className="w-5 h-5" />
            </button>
          );
        })}
        
        {/* Center dot */}
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-card/80 backdrop-blur-glass border-2 border-primary flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-gradient-primary animate-pulse" />
        </div>
      </div>
    </nav>
  );
};

export default CircularNav;
