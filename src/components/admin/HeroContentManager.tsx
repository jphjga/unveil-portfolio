import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, X } from "lucide-react";

export const HeroContentManager = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [techTags, setTechTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("hero_content")
        .select("*")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setTitle(data.title || "");
        setSubtitle(data.subtitle || "");
        setTechTags(data.tech_tags || []);
      }
    } catch (error: any) {
      toast({
        title: "Error loading hero content",
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
        .from("hero_content")
        .select("id")
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("hero_content")
          .update({ title, subtitle, tech_tags: techTags })
          .eq("id", existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("hero_content")
          .insert({ title, subtitle, tech_tags: techTags });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Hero content updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error saving hero content",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !techTags.includes(newTag.trim())) {
      setTechTags([...techTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTechTags(techTags.filter((t) => t !== tag));
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
        <CardTitle>Hero Section</CardTitle>
        <CardDescription>Manage the hero section content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your name or main title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Your role or tagline"
          />
        </div>

        <div className="space-y-2">
          <Label>Tech Tags</Label>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTag()}
              placeholder="Add a tech tag"
            />
            <Button onClick={addTag} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {techTags.map((tag) => (
              <div
                key={tag}
                className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2"
              >
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
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
