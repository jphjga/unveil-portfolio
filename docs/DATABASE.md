# Database Documentation

This document provides a comprehensive overview of the database structure, including table schemas, relationships, Row Level Security (RLS) policies, functions, and storage configuration.

## Table of Contents

1. [Overview](#overview)
2. [Enums](#enums)
3. [Tables](#tables)
4. [Functions](#functions)
5. [Storage Buckets](#storage-buckets)
6. [Complete SQL Schema](#complete-sql-schema)

---

## Overview

This portfolio application uses a PostgreSQL database (via Lovable Cloud) with the following tables:

| Table | Purpose |
|-------|---------|
| `about_content` | Stores "About Me" section content |
| `contact_info` | Stores contact information and social links |
| `contact_messages` | Stores messages submitted via contact form |
| `hero_content` | Stores hero section title, subtitle, and tech tags |
| `projects` | Stores portfolio project details |
| `skills` | Stores skill categories and items |
| `user_roles` | Stores user role assignments for admin access |
| `welcome_content` | Stores welcome screen name and tagline |

---

## Enums

### `app_role`

Used to define user roles in the application.

```sql
CREATE TYPE public.app_role AS ENUM ('admin', 'viewer');
```

| Value | Description |
|-------|-------------|
| `admin` | Full administrative access to manage content |
| `viewer` | Read-only access (future use) |

---

## Tables

### 1. `about_content`

Stores the content for the "About Me" section of the portfolio.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `description_1` | TEXT | No | - | First paragraph of about description |
| `description_2` | TEXT | No | - | Second paragraph of about description |
| `profile_image_url` | TEXT | Yes | `NULL` | URL to profile image |
| `years_experience` | INTEGER | No | `0` | Years of professional experience |
| `projects_completed` | INTEGER | No | `0` | Number of projects completed |
| `client_satisfaction` | INTEGER | No | `100` | Client satisfaction percentage |
| `updated_at` | TIMESTAMPTZ | No | `now()` | Last update timestamp |

---

### 2. `contact_info`

Stores contact information and social media links.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `email` | TEXT | No | - | Contact email address |
| `linkedin_url` | TEXT | Yes | `NULL` | LinkedIn profile URL |
| `github_url` | TEXT | Yes | `NULL` | GitHub profile URL |
| `twitter_url` | TEXT | Yes | `NULL` | Twitter/X profile URL |
| `updated_at` | TIMESTAMPTZ | No | `now()` | Last update timestamp |

---

### 3. `contact_messages`

Stores messages submitted through the contact form.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `name` | TEXT | No | - | Sender's name |
| `email` | TEXT | No | - | Sender's email address |
| `message` | TEXT | No | - | Message content |
| `is_read` | BOOLEAN | No | `false` | Whether message has been read |
| `created_at` | TIMESTAMPTZ | No | `now()` | Message submission timestamp |

---

### 4. `hero_content`

Stores the hero section content displayed on the main page.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `title` | TEXT | No | - | Main hero title |
| `subtitle` | TEXT | No | - | Hero subtitle/description |
| `tech_tags` | TEXT[] | No | `'{}'::text[]` | Array of technology tags |
| `updated_at` | TIMESTAMPTZ | No | `now()` | Last update timestamp |

---

### 5. `projects`

Stores portfolio project information.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `title` | TEXT | No | - | Project title |
| `description` | TEXT | No | - | Project description |
| `image_url` | TEXT | Yes | `NULL` | Main project image URL |
| `link` | TEXT | Yes | `NULL` | Live project URL |
| `github_link` | TEXT | Yes | `NULL` | GitHub repository URL |
| `tech_stack` | TEXT[] | No | `'{}'::text[]` | Array of technologies used |
| `screenshots` | TEXT[] | Yes | `NULL` | Array of screenshot URLs |
| `is_published` | BOOLEAN | No | `true` | Whether project is visible |
| `display_order` | INTEGER | No | `0` | Order for display sorting |
| `created_at` | TIMESTAMPTZ | No | `now()` | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | No | `now()` | Last update timestamp |

---

### 6. `skills`

Stores skill categories and their items.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `category` | TEXT | No | - | Skill category name |
| `items` | TEXT[] | No | `'{}'::text[]` | Array of skills in category |
| `display_order` | INTEGER | No | `0` | Order for display sorting |
| `updated_at` | TIMESTAMPTZ | No | `now()` | Last update timestamp |

---

### 7. `user_roles`

Stores user role assignments for authentication and authorization.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `user_id` | UUID | No | - | Reference to auth.users |
| `role` | app_role | No | - | User's role (admin/viewer) |
| `created_at` | TIMESTAMPTZ | No | `now()` | Creation timestamp |

**Constraints:**
- `UNIQUE (user_id, role)` - Prevents duplicate role assignments

---

### 8. `welcome_content`

Stores the welcome screen content.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | `gen_random_uuid()` | Primary key |
| `name` | TEXT | No | - | Display name |
| `tagline` | TEXT | No | - | Welcome tagline/description |
| `updated_at` | TIMESTAMPTZ | No | `now()` | Last update timestamp |

---

## Functions

### `has_role(_user_id UUID, _role app_role)`

A security definer function to check if a user has a specific role. This function is used in RLS policies to prevent infinite recursion.

```sql
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
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
```

**Usage in RLS policies:**
```sql
-- Example: Check if current user is admin
public.has_role(auth.uid(), 'admin')
```

---

## Storage Buckets

### `portfolio-images`

Stores all portfolio-related images including project screenshots and profile pictures.

| Property | Value |
|----------|-------|
| Bucket ID | `portfolio-images` |
| Public | `true` |

---

## Complete SQL Schema

Below is the complete SQL to recreate the entire database schema:

```sql
-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE public.app_role AS ENUM ('admin', 'viewer');

-- =====================================================
-- TABLES
-- =====================================================

-- About Content Table
CREATE TABLE public.about_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  description_1 TEXT NOT NULL,
  description_2 TEXT NOT NULL,
  profile_image_url TEXT,
  years_experience INTEGER NOT NULL DEFAULT 0,
  projects_completed INTEGER NOT NULL DEFAULT 0,
  client_satisfaction INTEGER NOT NULL DEFAULT 100,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Contact Info Table
CREATE TABLE public.contact_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  linkedin_url TEXT,
  github_url TEXT,
  twitter_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Contact Messages Table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Hero Content Table
CREATE TABLE public.hero_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  tech_tags TEXT[] NOT NULL DEFAULT '{}'::text[],
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Projects Table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  link TEXT,
  github_link TEXT,
  tech_stack TEXT[] NOT NULL DEFAULT '{}'::text[],
  screenshots TEXT[],
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Skills Table
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  items TEXT[] NOT NULL DEFAULT '{}'::text[],
  display_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User Roles Table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Welcome Content Table
CREATE TABLE public.welcome_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
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
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.welcome_content ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES - PUBLIC READ ACCESS
-- =====================================================
-- These tables are publicly readable (portfolio content)

-- About Content - Public Read
CREATE POLICY "Anyone can view about content"
ON public.about_content FOR SELECT
USING (true);

-- Contact Info - Public Read
CREATE POLICY "Anyone can view contact info"
ON public.contact_info FOR SELECT
USING (true);

-- Hero Content - Public Read
CREATE POLICY "Anyone can view hero content"
ON public.hero_content FOR SELECT
USING (true);

-- Projects - Public Read (only published)
CREATE POLICY "Anyone can view published projects"
ON public.projects FOR SELECT
USING (is_published = true);

-- Skills - Public Read
CREATE POLICY "Anyone can view skills"
ON public.skills FOR SELECT
USING (true);

-- Welcome Content - Public Read
CREATE POLICY "Anyone can view welcome content"
ON public.welcome_content FOR SELECT
USING (true);

-- =====================================================
-- RLS POLICIES - CONTACT MESSAGES
-- =====================================================

-- Anyone can submit a contact message
CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages FOR INSERT
WITH CHECK (true);

-- Only admins can view messages
CREATE POLICY "Admins can view all messages"
ON public.contact_messages FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update messages (mark as read)
CREATE POLICY "Admins can update messages"
ON public.contact_messages FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete messages
CREATE POLICY "Admins can delete messages"
ON public.contact_messages FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- RLS POLICIES - ADMIN WRITE ACCESS
-- =====================================================
-- Only admins can modify content tables

-- About Content - Admin Write
CREATE POLICY "Admins can insert about content"
ON public.about_content FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update about content"
ON public.about_content FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete about content"
ON public.about_content FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Contact Info - Admin Write
CREATE POLICY "Admins can insert contact info"
ON public.contact_info FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact info"
ON public.contact_info FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contact info"
ON public.contact_info FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Hero Content - Admin Write
CREATE POLICY "Admins can insert hero content"
ON public.hero_content FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update hero content"
ON public.hero_content FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete hero content"
ON public.hero_content FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Projects - Admin Full Access
CREATE POLICY "Admins can view all projects"
ON public.projects FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert projects"
ON public.projects FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update projects"
ON public.projects FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete projects"
ON public.projects FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Skills - Admin Write
CREATE POLICY "Admins can insert skills"
ON public.skills FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update skills"
ON public.skills FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete skills"
ON public.skills FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Welcome Content - Admin Write
CREATE POLICY "Admins can insert welcome content"
ON public.welcome_content FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update welcome content"
ON public.welcome_content FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete welcome content"
ON public.welcome_content FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- RLS POLICIES - USER ROLES
-- =====================================================

-- Only admins can view roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Users can view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- =====================================================
-- STORAGE BUCKET
-- =====================================================

-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true);

-- Storage Policies
CREATE POLICY "Anyone can view portfolio images"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');

CREATE POLICY "Admins can upload portfolio images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio-images' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update portfolio images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'portfolio-images' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete portfolio images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'portfolio-images' 
  AND public.has_role(auth.uid(), 'admin')
);

-- =====================================================
-- INITIAL ADMIN SETUP
-- =====================================================
-- After creating a user via Supabase Auth, run this to make them admin:
-- INSERT INTO public.user_roles (user_id, role)
-- VALUES ('YOUR_USER_UUID_HERE', 'admin');
```

---

## Security Notes

1. **RLS is enabled on all tables** - No direct database access without passing through policies
2. **Admin verification uses `has_role()` function** - Prevents RLS recursion issues
3. **Public content is read-only** - Visitors can only view portfolio content
4. **Contact messages** - Anyone can submit, only admins can read/manage
5. **No signup functionality** - Only existing admin can log in (configured at app level)
6. **Storage is public read** - Images are viewable by anyone, but only admins can upload/modify

---

## Maintenance

### Adding a New Admin User

```sql
-- First, create user via Auth (or have them sign up if enabled)
-- Then assign admin role:
INSERT INTO public.user_roles (user_id, role)
VALUES ('user-uuid-here', 'admin');
```

### Viewing Current Admins

```sql
SELECT ur.*, au.email
FROM public.user_roles ur
JOIN auth.users au ON ur.user_id = au.id
WHERE ur.role = 'admin';
```

### Revoking Admin Access

```sql
DELETE FROM public.user_roles
WHERE user_id = 'user-uuid-here' AND role = 'admin';
```
