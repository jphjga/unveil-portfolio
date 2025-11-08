import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setEmail(session.user.email);
      }
    });
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You've been successfully logged out.",
      });
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Manage your portfolio content</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{email}</span>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
            <Button onClick={() => navigate("/")} variant="secondary">
              View Portfolio
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
            <h3 className="text-xl font-semibold mb-2">Hero Section</h3>
            <p className="text-muted-foreground mb-4">Update your introduction and tagline</p>
            <Button variant="outline" className="w-full">Edit Hero</Button>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
            <h3 className="text-xl font-semibold mb-2">About</h3>
            <p className="text-muted-foreground mb-4">Manage your about section content</p>
            <Button variant="outline" className="w-full">Edit About</Button>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
            <h3 className="text-xl font-semibold mb-2">Projects</h3>
            <p className="text-muted-foreground mb-4">Add, edit, or remove projects</p>
            <Button variant="outline" className="w-full">Manage Projects</Button>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
            <h3 className="text-xl font-semibold mb-2">Skills</h3>
            <p className="text-muted-foreground mb-4">Update your skills and expertise</p>
            <Button variant="outline" className="w-full">Edit Skills</Button>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
            <h3 className="text-xl font-semibold mb-2">Contact Info</h3>
            <p className="text-muted-foreground mb-4">Update contact details</p>
            <Button variant="outline" className="w-full">Edit Contact</Button>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
            <h3 className="text-xl font-semibold mb-2">Messages</h3>
            <p className="text-muted-foreground mb-4">View contact form submissions</p>
            <Button variant="outline" className="w-full">View Messages</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
