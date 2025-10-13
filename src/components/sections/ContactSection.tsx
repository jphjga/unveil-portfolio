import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
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
          <a
            href="mailto:your.email@example.com"
            className="w-16 h-16 rounded-full bg-card/50 backdrop-blur-glass border border-[var(--glass-border)] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-110"
          >
            <Mail className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-full bg-card/50 backdrop-blur-glass border border-[var(--glass-border)] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-110"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-full bg-card/50 backdrop-blur-glass border border-[var(--glass-border)] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-110"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-full bg-card/50 backdrop-blur-glass border border-[var(--glass-border)] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-110"
          >
            <Twitter className="w-6 h-6" />
          </a>
        </div>

        <div className="bg-card/50 backdrop-blur-glass border border-[var(--glass-border)] p-8 rounded-2xl max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">Send me a message</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary outline-none transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary outline-none transition-colors"
            />
            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary outline-none transition-colors resize-none"
            />
            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
