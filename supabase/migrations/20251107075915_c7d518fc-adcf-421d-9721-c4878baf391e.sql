-- =====================================================
-- Phase 1: Create Enum and User Roles System
-- =====================================================

-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'viewer');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- =====================================================
-- Phase 2: Create Content Tables
-- =====================================================

-- Hero Content Table
CREATE TABLE public.hero_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  tech_tags TEXT[] NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;

-- About Content Table
CREATE TABLE public.about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description_1 TEXT NOT NULL,
  description_2 TEXT NOT NULL,
  years_experience INTEGER NOT NULL DEFAULT 0,
  projects_completed INTEGER NOT NULL DEFAULT 0,
  client_satisfaction INTEGER NOT NULL DEFAULT 0,
  profile_image_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

-- Projects Table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  link TEXT,
  github_link TEXT,
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Skills Table
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  items TEXT[] NOT NULL DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Contact Info Table
CREATE TABLE public.contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

-- Contact Messages Table
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Welcome Content Table
CREATE TABLE public.welcome_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.welcome_content ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- Phase 3: Create RLS Policies
-- =====================================================

-- Hero Content Policies
CREATE POLICY "Anyone can view hero content"
  ON public.hero_content FOR SELECT
  USING (true);

CREATE POLICY "Only admins can update hero content"
  ON public.hero_content FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert hero content"
  ON public.hero_content FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- About Content Policies
CREATE POLICY "Anyone can view about content"
  ON public.about_content FOR SELECT
  USING (true);

CREATE POLICY "Only admins can update about content"
  ON public.about_content FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert about content"
  ON public.about_content FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Projects Policies
CREATE POLICY "Anyone can view published projects"
  ON public.projects FOR SELECT
  USING (is_published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete projects"
  ON public.projects FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Skills Policies
CREATE POLICY "Anyone can view skills"
  ON public.skills FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert skills"
  ON public.skills FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update skills"
  ON public.skills FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete skills"
  ON public.skills FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Contact Info Policies
CREATE POLICY "Anyone can view contact info"
  ON public.contact_info FOR SELECT
  USING (true);

CREATE POLICY "Only admins can update contact info"
  ON public.contact_info FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert contact info"
  ON public.contact_info FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Contact Messages Policies
CREATE POLICY "Anyone can insert contact messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admins can view contact messages"
  ON public.contact_messages FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update contact messages"
  ON public.contact_messages FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete contact messages"
  ON public.contact_messages FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Welcome Content Policies
CREATE POLICY "Anyone can view welcome content"
  ON public.welcome_content FOR SELECT
  USING (true);

CREATE POLICY "Only admins can update welcome content"
  ON public.welcome_content FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert welcome content"
  ON public.welcome_content FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- Phase 4: Create Storage Bucket and Policies
-- =====================================================

-- Create portfolio-images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true);

-- Storage Policies for portfolio-images
CREATE POLICY "Anyone can view portfolio images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-images');

CREATE POLICY "Only admins can upload portfolio images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'portfolio-images' AND
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Only admins can update portfolio images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'portfolio-images' AND
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Only admins can delete portfolio images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'portfolio-images' AND
    public.has_role(auth.uid(), 'admin')
  );

-- =====================================================
-- Phase 5: Seed Initial Data
-- =====================================================

-- Seed Hero Content
INSERT INTO public.hero_content (title, subtitle, tech_tags)
VALUES (
  'Building Digital Experiences',
  'Transforming ideas into elegant, functional solutions through code and design',
  ARRAY['React', 'TypeScript', 'UI/UX']
);

-- Seed About Content
INSERT INTO public.about_content (
  description_1,
  description_2,
  years_experience,
  projects_completed,
  client_satisfaction,
  profile_image_url
)
VALUES (
  'Passionate developer with a keen eye for creating seamless user experiences. I specialize in building modern web applications that combine aesthetic design with robust functionality.',
  'When I''m not coding, you''ll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.',
  3,
  50,
  100,
  '/profile-pic.jpg'
);

-- Seed Projects
INSERT INTO public.projects (title, description, tech_stack, link, github_link, image_url, display_order, is_published)
VALUES
(
  'Pharmacy Inventory Management System',
  'A comprehensive inventory management system designed to streamline pharmacy operations, track medication stock, and manage supplies efficiently.',
  ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  'https://joseph-pharmacare.netlify.app/',
  'https://github.com/jphjga/pill-guardian-plus',
  'https://joseph-pharmacare.netlify.app//dashboard.png',
  1,
  true
),
(
  'My Reserve',
  'A modern online table reservation system that simplifies restaurant booking management with an intuitive interface.',
  ARRAY['Next.js', 'shadcn-ui', 'Vercel'],
  'https://my-reserve-kenya.vercel.app/',
  'https://github.com/jphjga/my-reserve-kenya',
  'https://my-reserve-kenya.vercel.app//myreserve.png',
  2,
  true
);

-- Seed Skills
INSERT INTO public.skills (category, items, display_order)
VALUES
('Frontend', ARRAY['HTML','CSS','Javasript','PHP','React','Bootstrap','TypeScript', 'Tailwind CSS', 'Next.js', 'Vue.js'], 1),
('Backend', ARRAY['.Net Framework','C#','Kotlin','Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs'], 2),
('Tools', ARRAY['Git', 'VS Code', 'Postman', 'Android Studio', 'microsoft Visual Studio', 'wordpress', 'Figma', 'Linux'], 3),
('Soft Skills', ARRAY['Problem Solving', 'Team Leadership', 'Communication', 'Agile', 'Creativity'], 4);

-- Seed Contact Info (update with your actual info)
INSERT INTO public.contact_info (email, github_url, linkedin_url, twitter_url)
VALUES (
  'your.email@example.com',
  'https://github.com/yourusername',
  'https://linkedin.com/in/yourusername',
  'https://twitter.com/yourusername'
);

-- Seed Welcome Content
INSERT INTO public.welcome_content (name, tagline)
VALUES (
  'Joseph',
  'Full Stack Developer'
);

-- =====================================================
-- Phase 6: Create Update Timestamp Triggers
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables with updated_at
CREATE TRIGGER update_hero_content_updated_at
  BEFORE UPDATE ON public.hero_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_about_content_updated_at
  BEFORE UPDATE ON public.about_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON public.skills
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at
  BEFORE UPDATE ON public.contact_info
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_welcome_content_updated_at
  BEFORE UPDATE ON public.welcome_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();