import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus, Pencil, Trash2, X } from "lucide-react";

interface Skill {
  id: string;
  category: string;
  items: string[];
  display_order: number;
}

export const SkillsManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const { toast } = useToast();

  const [category, setCategory] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setSkills(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading skills",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCategory("");
    setItems([]);
    setNewItem("");
    setDisplayOrder(0);
    setEditingSkill(null);
  };

  const openEditDialog = (skill: Skill) => {
    setEditingSkill(skill);
    setCategory(skill.category);
    setItems(skill.items || []);
    setDisplayOrder(skill.display_order);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!category.trim() || items.length === 0) {
      toast({
        title: "Validation Error",
        description: "Category and at least one skill item are required",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        category,
        items,
        display_order: displayOrder,
      };

      if (editingSkill) {
        const { error } = await supabase
          .from("skills")
          .update(payload)
          .eq("id", editingSkill.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("skills").insert(payload);
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Skill category ${editingSkill ? "updated" : "created"} successfully`,
      });

      fetchSkills();
      setDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast({
        title: "Error saving skill",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill category?")) return;

    try {
      const { error } = await supabase.from("skills").delete().eq("id", id);
      if (error) throw error;

      toast({
        title: "Success",
        description: "Skill category deleted successfully",
      });

      fetchSkills();
    } catch (error: any) {
      toast({
        title: "Error deleting skill",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const addItem = () => {
    if (newItem.trim() && !items.includes(newItem.trim())) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  const removeItem = (item: string) => {
    setItems(items.filter((i) => i !== item));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Manage your skill categories</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Skill Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingSkill ? "Edit Skill Category" : "Add New Skill Category"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="skill-cat">Category *</Label>
                  <Input
                    id="skill-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Frontend, Backend, Tools"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Skills *</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addItem()}
                      placeholder="Add a skill"
                    />
                    <Button onClick={addItem} size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {items.map((item) => (
                      <div
                        key={item}
                        className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2"
                      >
                        {item}
                        <button onClick={() => removeItem(item)} className="hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skill-order">Display Order</Label>
                  <Input
                    id="skill-order"
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                  />
                </div>

                <Button onClick={handleSave} className="w-full">
                  {editingSkill ? "Update Category" : "Create Category"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : skills.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No skills yet. Add your first skill category!</p>
        ) : (
          <div className="space-y-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-semibold">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skill.items.map((item) => (
                      <span key={item} className="text-xs bg-secondary px-2 py-1 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openEditDialog(skill)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(skill.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
