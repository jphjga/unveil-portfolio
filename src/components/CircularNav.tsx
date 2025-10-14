import { useState, useEffect, useRef } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(closeTimeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 2000); // 2 second delay before closing
  };

  const handleToggle = () => {
    clearTimeout(closeTimeoutRef.current);
    setIsOpen(!isOpen);
  };

  const handleItemClick = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
  };
  
  return (
    <nav 
      ref={navRef}
      className="fixed left-8 top-1/2 -translate-y-1/2 md:left-8 md:top-1/2 md:-translate-y-1/2 max-md:left-4 max-md:bottom-4 max-md:top-auto max-md:translate-y-0 z-40"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        {navItems.map((item, index) => {
          // Desktop: Semi-circle to the right (180 degrees from -90 to 90)
          const desktopAngle = ((index * 45) - 90) * (Math.PI / 180); // -90°, -45°, 0°, 45°, 90°
          const desktopRadius = isOpen ? 90 : 0;
          
          // Mobile: Semi-circle upward and right (from -180 to 0 degrees)
          const mobileAngle = ((index * 45) - 180) * (Math.PI / 180); // -180°, -135°, -90°, -45°, 0°
          const mobileRadius = isOpen ? 85 : 0;
          
          const x = Math.cos(desktopAngle) * desktopRadius;
          const y = Math.sin(desktopAngle) * desktopRadius;
          
          const mobileX = Math.cos(mobileAngle) * mobileRadius;
          const mobileY = Math.sin(mobileAngle) * mobileRadius;
          const isItemHovered = hoveredItem === item.id;
          
          return (
            <div key={item.id} className="absolute top-0 left-0">
              <button
                onClick={() => handleItemClick(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  activeSection === item.id
                    ? "bg-gradient-primary text-primary-foreground shadow-elegant"
                    : "bg-card/80 backdrop-blur-glass border border-[var(--glass-border)] text-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-elegant"
                }`}
                style={{
                  transform: window.innerWidth < 768 
                    ? `translate(${mobileX}px, ${mobileY}px) ${isItemHovered && isOpen ? 'scale(1.15)' : 'scale(1)'}`
                    : `translate(${x}px, ${y}px) ${isItemHovered && isOpen ? 'scale(1.15)' : 'scale(1)'}`,
                  zIndex: isItemHovered ? 10 : 1,
                }}
                title={item.label}
              >
                <item.icon className="w-5 h-5" />
              </button>
              
              {/* Hover label - Desktop only, positioned to the right */}
              <div 
                className={`absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-300 pointer-events-none hidden md:block ${
                  isItemHovered && isOpen
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
              
              {/* Mobile label - Positioned near icon */}
              <div 
                className={`absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-300 pointer-events-none md:hidden ${
                  isItemHovered && isOpen
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-2'
                }`}
                style={{
                  transform: `translate(${mobileX + 64}px, ${mobileY - 24}px)`,
                }}
              >
                <span className="px-3 py-1.5 bg-card/95 backdrop-blur-glass border border-[var(--glass-border)] rounded-lg text-sm font-medium text-foreground shadow-elegant">
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
        
        {/* Center dot - clickable */}
        <button 
          onClick={handleToggle}
          className="absolute top-0 left-0 w-12 h-12 rounded-full bg-card/80 backdrop-blur-glass border-2 border-primary flex items-center justify-center hover:bg-card transition-all cursor-pointer"
        >
          <div className="w-3 h-3 rounded-full bg-gradient-primary animate-pulse" />
        </button>
      </div>
    </nav>
  );
};

export default CircularNav;
