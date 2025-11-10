import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAnimations } from "@/contexts/AnimationContext";

const AnimationToggle = () => {
  const { animationsEnabled, toggleAnimations } = useAnimations();

  return (
    <div className="fixed bottom-6 right-6 z-40 bg-card/90 backdrop-blur-sm border border-border p-4 rounded-lg shadow-lg">
      <div className="flex items-center gap-3">
        <Switch
          id="animations"
          checked={animationsEnabled}
          onCheckedChange={toggleAnimations}
        />
        <Label htmlFor="animations" className="cursor-pointer text-sm">
          Enable Animations
        </Label>
      </div>
    </div>
  );
};

export default AnimationToggle;
