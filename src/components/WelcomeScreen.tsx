import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onEnter: () => void;
}

const WelcomeScreen = ({ onEnter }: WelcomeScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-secondary">
      <div className="text-center px-6 animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Hello, I'm [Your Name]
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Creative Developer • Designer • Problem Solver
        </p>
        
        <Button 
          onClick={onEnter}
          variant="outline"
          size="lg"
          className="group bg-card/50 backdrop-blur-glass border-[var(--glass-border)] hover:bg-primary hover:text-primary-foreground transition-all duration-500 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <span>Enter Portfolio</span>
          <ChevronDown className="ml-2 h-5 w-5 animate-float" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
