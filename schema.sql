-- Portfolio Website CMS Database Schema
-- Run this in your Supabase SQL Editor to set up the tables and policies.

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    position_en TEXT,
    position_vi TEXT,
    bio_en TEXT,
    bio_vi TEXT,
    phone TEXT,
    email TEXT,
    address_en TEXT,
    address_vi TEXT,
    social_github TEXT,
    social_linkedin TEXT,
    social_facebook TEXT,
    social_instagram TEXT,
    resume_url TEXT
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT NOT NULL,
    short_description_en TEXT,
    short_description_vi TEXT,
    overview_en TEXT,
    overview_vi TEXT,
    problem_statement_en TEXT,
    problem_statement_vi TEXT,
    solution_en TEXT,
    solution_vi TEXT,
    features_en TEXT[],
    features_vi TEXT[],
    responsibilities_en TEXT[],
    responsibilities_vi TEXT[],
    development_process_en TEXT,
    development_process_vi TEXT,
    challenges_solutions_en TEXT,
    challenges_solutions_vi TEXT,
    technologies TEXT[],
    status TEXT DEFAULT 'Completed',
    is_featured BOOLEAN DEFAULT FALSE,
    thumbnail_url TEXT,
    live_demo_url TEXT,
    github_url TEXT
);

-- 4. Project Images Table
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption_en TEXT,
    caption_vi TEXT,
    display_order INTEGER DEFAULT 0
);

-- 5. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Frontend', 'Backend', 'Tools', etc.
    level INTEGER DEFAULT 80,
    icon_class TEXT,
    display_order INTEGER DEFAULT 0
);

-- 6. Experiences Table
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT NOT NULL,
    logo_url TEXT,
    role_en TEXT NOT NULL,
    role_vi TEXT NOT NULL,
    description_en TEXT,
    description_vi TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0
);

-- 7. Education Table
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_en TEXT NOT NULL,
    school_vi TEXT NOT NULL,
    degree_en TEXT NOT NULL,
    degree_vi TEXT NOT NULL,
    description_en TEXT,
    description_vi TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0
);

-- 8. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    position_en TEXT,
    position_vi TEXT,
    company TEXT,
    avatar_url TEXT,
    content_en TEXT NOT NULL,
    content_vi TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);

-- 9. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' -- 'unread', 'read', 'archived'
);

-- 10. Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seo_title_en TEXT,
    seo_title_vi TEXT,
    seo_description_en TEXT,
    seo_description_vi TEXT,
    seo_keywords_en TEXT[],
    seo_keywords_vi TEXT[],
    site_url TEXT,
    og_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- 11. Create RLS Policies

-- Public SELECT (Read) Policies
CREATE POLICY "Allow public read on profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read on project_images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Allow public read on skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public read on experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read on education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Allow public read on testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read on settings" ON public.settings FOR SELECT USING (true);

-- Authenticated Admin All (Write) Policies
CREATE POLICY "Allow admin all on profiles" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin all on projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin all on project_images" ON public.project_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin all on skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin all on experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin all on education" ON public.education FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin all on testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin all on settings" ON public.settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Contact Messages Policies
CREATE POLICY "Allow public to insert contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin to manage contact messages" ON public.contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 12. Create Storage Buckets and Policies (Optional but recommended for uploads)
-- Run this block if you want to set up your public storage bucket:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-assets', 'portfolio-assets', true);
-- CREATE POLICY "Allow public read on portfolio-assets" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-assets');
-- CREATE POLICY "Allow admin write on portfolio-assets" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'portfolio-assets');
