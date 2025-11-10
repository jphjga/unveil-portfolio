import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import ImageUpload from "./ImageUpload";

export const AboutContentManager = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [yearsExperience, setYearsExperience] = useState(0);
  const [projectsCompleted, setProjectsCompleted] = useState(0);
  const [clientSatisfaction, setClientSatisfaction] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("about_content")
        .select("*")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setDescription1(data.description_1 || "");
        setDescription2(data.description_2 || "");
        setProfileImageUrl(data.profile_image_url || "");
        setYearsExperience(data.years_experience || 0);
        setProjectsCompleted(data.projects_completed || 0);
        setClientSatisfaction(data.client_satisfaction || 0);
      }
    } catch (error: any) {
      toast({
        title: "Error loading about content",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: existing } = await supabase
        .from("about_content")
        .select("id")
        .maybeSingle();

      const payload = {
        description_1: description1,
        description_2: description2,
        profile_image_url: profileImageUrl || null,
        years_experience: yearsExperience,
        projects_completed: projectsCompleted,
        client_satisfaction: clientSatisfaction,
      };

      if (existing) {
        const { error } = await supabase
          .from("about_content")
          .update(payload)
          .eq("id", existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("about_content")
          .insert(payload);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "About content updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error saving about content",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Section</CardTitle>
        <CardDescription>Manage the about section content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="desc1">Description 1</Label>
          <Textarea
            id="desc1"
            value={description1}
            onChange={(e) => setDescription1(e.target.value)}
            placeholder="First paragraph about yourself"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="desc2">Description 2</Label>
          <Textarea
            id="desc2"
            value={description2}
            onChange={(e) => setDescription2(e.target.value)}
            placeholder="Second paragraph about yourself"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>Profile Image</Label>
          <ImageUpload
            currentImageUrl={profileImageUrl}
            onImageUploaded={setProfileImageUrl}
            folder="profile"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="years">Years Experience</Label>
            <Input
              id="years"
              type="number"
              value={yearsExperience}
              onChange={(e) => setYearsExperience(parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projects">Projects Completed</Label>
            <Input
              id="projects"
              type="number"
              value={projectsCompleted}
              onChange={(e) => setProjectsCompleted(parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="satisfaction">Client Satisfaction %</Label>
            <Input
              id="satisfaction"
              type="number"
              value={clientSatisfaction}
              onChange={(e) => setClientSatisfaction(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};
