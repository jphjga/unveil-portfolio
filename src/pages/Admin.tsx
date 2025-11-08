import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeroContentManager } from "@/components/admin/HeroContentManager";
import { AboutContentManager } from "@/components/admin/AboutContentManager";
import { ProjectsManager } from "@/components/admin/ProjectsManager";
import { SkillsManager } from "@/components/admin/SkillsManager";
import { ContactInfoManager } from "@/components/admin/ContactInfoManager";
import { MessagesInbox } from "@/components/admin/MessagesInbox";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/")} variant="outline">
              View Portfolio
            </Button>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="hero">
              <HeroContentManager />
            </TabsContent>

            <TabsContent value="about">
              <AboutContentManager />
            </TabsContent>

            <TabsContent value="projects">
              <ProjectsManager />
            </TabsContent>

            <TabsContent value="skills">
              <SkillsManager />
            </TabsContent>

            <TabsContent value="contact">
              <ContactInfoManager />
            </TabsContent>

            <TabsContent value="messages">
              <MessagesInbox />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
