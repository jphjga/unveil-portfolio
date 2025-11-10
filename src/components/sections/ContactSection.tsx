import { useState, useEffect } from "react";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [contactInfo, setContactInfo] = useState({
    email: "y0njengajoseph+portfolio@gmail.com",
    github_url: "https://github.com/jphjga",
    linkedin_url: "https://linkedin.com/in/joseph-jp",
    twitter_url: "https://twitter.com/JPHJGA",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchContactInfo = async () => {
      const { data } = await supabase.from("contact_info").select("*").single();
      if (data) {
        setContactInfo({
          email: data.email,
          github_url: data.github_url || "",
          linkedin_url: data.linkedin_url || "",
          twitter_url: data.twitter_url || "",
        });
      }
    };
    fetchContactInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_messages").insert([formData]);

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Let's Connect
        </h2>
        <p className="text-xl text-muted-foreground mb-12">
          Have a project in mind or just want to chat? I'd love to hear from you.
        </p>
        
        <div className="flex justify-center gap-6 mb-12">
          {contactInfo.email && (
            <a
              href={`mailto:${contactInfo.email}`}
              className="w-16 h-16 rounded-full bg-card/50 backdrop-blur-glass border border-[var(--glass-border)] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-110"
            >
              <Mail className="w-6 h-6" />
            </a>
          )}
          {contactInfo.github_url && (
            <a
              href={contactInfo.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full bg-card/50 backdrop-blur-glass border border-[var(--glass-border)] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </a>
          )}
          {contactInfo.linkedin_url && (
            <a
              href={contactInfo.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full bg-card/50 backdrop-blur-glass border border-[var(--glass-border)] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          )}
          {contactInfo.twitter_url && (
            <a
              href={contactInfo.twitter_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full bg-card/50 backdrop-blur-glass border border-[var(--glass-border)] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-110"
            >
              <Twitter className="w-6 h-6" />
            </a>
          )}
        </div>

        <div className="bg-card/50 backdrop-blur-glass border border-[var(--glass-border)] p-8 rounded-2xl max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">Send me a message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-background/50"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-background/50"
            />
            <Textarea
              placeholder="Your Message"
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="bg-background/50 resize-none"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
