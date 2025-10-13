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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
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
          const isItemHovered = hoveredItem === item.id;
          
          return (
            <div key={item.id} className="absolute top-0 left-0">
              <button
                onClick={() => onNavigate(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  activeSection === item.id
                    ? "bg-gradient-primary text-primary-foreground shadow-elegant"
                    : "bg-card/80 backdrop-blur-glass border border-[var(--glass-border)] text-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-elegant"
                }`}
                style={{
                  transform: `translate(${x}px, ${y}px) ${isItemHovered && isHovered ? 'scale(1.2)' : 'scale(1)'}`,
                  zIndex: isItemHovered ? 10 : 1,
                }}
                title={item.label}
              >
                <item.icon className="w-5 h-5" />
              </button>
              
              {/* Hover label */}
              <div 
                className={`absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-300 pointer-events-none ${
                  isItemHovered && isHovered
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-2'
                }`}
                style={{
                  transform: `translate(${x + 64}px, ${y - 24}px)`,
                }}
              >
                <span className="px-3 py-1.5 bg-card/95 backdrop-blur-glass border border-[var(--glass-border)] rounded-lg text-sm font-medium text-foreground shadow-elegant">
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
        
        {/* Center dot */}
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-card/80 backdrop-blur-glass border-2 border-primary flex items-center justify-center pointer-events-none">
          <div className="w-3 h-3 rounded-full bg-gradient-primary animate-pulse" />
        </div>
      </div>
    </nav>
  );
};

export default CircularNav;
