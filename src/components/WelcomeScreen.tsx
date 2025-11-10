import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onEnter: () => void;
}

const WelcomeScreen = ({ onEnter }: WelcomeScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-secondary">
      <div className="text-center px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Hello, I'm Joseph
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12">
          Software Developer • Web Developer • Problem Solver
        </p>
        
        <Button 
          onClick={onEnter}
          variant="outline"
          size="lg"
          className="group bg-card/50 border-[var(--glass-border)] hover:bg-primary hover:text-primary-foreground"
        >
          <span>Enter Portfolio</span>
          <ChevronDown className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
