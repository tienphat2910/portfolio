"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { FaUserEdit, FaGlobe, FaFolderOpen, FaInbox, FaCogs } from "react-icons/fa";
import { toast } from "@/src/components/ui/toast";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [seoLoading, setSeoLoading] = useState(false);

  // Stats State
  const [stats, setStats] = useState({
    unreadMessages: 0,
    totalProjects: 0,
    totalSkills: 0
  });

  // Profile Form State
  const [profile, setProfile] = useState({
    name: "",
    positionEn: "",
    positionVi: "",
    bioEn: "",
    bioVi: "",
    phone: "",
    email: "",
    addressEn: "",
    addressVi: "",
    github: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    resumeUrl: ""
  });

  // SEO settings Form State
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [seo, setSeo] = useState({
    seoTitleEn: "",
    seoTitleVi: "",
    seoDescriptionEn: "",
    seoDescriptionVi: "",
    siteUrl: "",
    ogImageUrl: ""
  });

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const supabase = createClient() as any;
        
        // Fetch session user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch parallel stats & info
        const [
          profileRes,
          settingsRes,
          projectsCount,
          skillsCount,
          messagesCount
        ] = await Promise.all([
          supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
          supabase.from("settings").select("*").maybeSingle(),
          supabase.from("projects").select("id", { count: "exact", head: true }),
          supabase.from("skills").select("id", { count: "exact", head: true }),
          supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "unread")
        ]);

        // Map stats
        setStats({
          unreadMessages: messagesCount.count || 0,
          totalProjects: projectsCount.count || 0,
          totalSkills: skillsCount.count || 0
        });

        // Map profile
        if (profileRes.data) {
          const p = profileRes.data;
          setProfile({
            name: p.name || "",
            positionEn: p.position_en || "",
            positionVi: p.position_vi || "",
            bioEn: p.bio_en || "",
            bioVi: p.bio_vi || "",
            phone: p.phone || "",
            email: p.email || "",
            addressEn: p.address_en || "",
            addressVi: p.address_vi || "",
            github: p.social_github || "",
            linkedin: p.social_linkedin || "",
            facebook: p.social_facebook || "",
            instagram: p.social_instagram || "",
            resumeUrl: p.resume_url || ""
          });
        } else {
          // Preset with user email if profile is new
          setProfile(prev => ({ ...prev, email: user.email || "" }));
        }

        // Map settings
        if (settingsRes.data) {
          const s = settingsRes.data;
          setSettingsId(s.id);
          setSeo({
            seoTitleEn: s.seo_title_en || "",
            seoTitleVi: s.seo_title_vi || "",
            seoDescriptionEn: s.seo_description_en || "",
            seoDescriptionVi: s.seo_description_vi || "",
            siteUrl: s.site_url || "",
            ogImageUrl: s.og_image_url || ""
          });
        }
      } catch (error) {
        console.error("Dashboard load error:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);

    try {
      const supabase = createClient() as any;
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error("No active user session");
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          name: profile.name,
          position_en: profile.positionEn,
          position_vi: profile.positionVi,
          bio_en: profile.bioEn,
          bio_vi: profile.bioVi,
          phone: profile.phone,
          email: profile.email,
          address_en: profile.addressEn,
          address_vi: profile.addressVi,
          social_github: profile.github,
          social_linkedin: profile.linkedin,
          social_facebook: profile.facebook,
          social_instagram: profile.instagram,
          resume_url: profile.resumeUrl,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      console.error("Profile save error:", err);
      toast.error(err.message || "Failed to update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSeoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSeoLoading(true);

    try {
      const supabase = createClient() as any;
      const { error, data } = await supabase
        .from("settings")
        .upsert({
          id: settingsId || undefined,
          seo_title_en: seo.seoTitleEn,
          seo_title_vi: seo.seoTitleVi,
          seo_description_en: seo.seoDescriptionEn,
          seo_description_vi: seo.seoDescriptionVi,
          site_url: seo.siteUrl,
          og_image_url: seo.ogImageUrl,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setSettingsId(data.id);
      }
      toast.success("SEO settings saved successfully!");
    } catch (err: any) {
      console.error("SEO save error:", err);
      toast.error(err.message || "Failed to save SEO settings");
    } finally {
      setSeoLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <svg className="animate-spin h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Overview & Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your personal biography details, links, and SEO configuration
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Messages */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-800 flex items-center gap-4">
          <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-xl">
            <FaInbox size={22} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Unread Messages</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white mt-0.5">{stats.unreadMessages}</p>
          </div>
        </div>
        
        {/* Projects */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-800 flex items-center gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-xl">
            <FaFolderOpen size={22} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Total Projects</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white mt-0.5">{stats.totalProjects}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-800 flex items-center gap-4">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-xl">
            <FaGlobe size={22} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Total Skills</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white mt-0.5">{stats.totalSkills}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Profile Form (Left Column, Span 2) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-gray-200/50 dark:border-gray-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
            <FaUserEdit className="text-xl text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Personal Biography Info</h2>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
              <Input
                label="Resume/CV PDF URL"
                value={profile.resumeUrl}
                onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                placeholder="/cv.pdf or external url"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Position Title (English)"
                value={profile.positionEn}
                onChange={(e) => setProfile({ ...profile, positionEn: e.target.value })}
                required
              />
              <Input
                label="Position Title (Vietnamese)"
                value={profile.positionVi}
                onChange={(e) => setProfile({ ...profile, positionVi: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Contact Email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
              />
              <Input
                label="Contact Phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Address/Location (English)"
                value={profile.addressEn}
                onChange={(e) => setProfile({ ...profile, addressEn: e.target.value })}
                required
              />
              <Input
                label="Address/Location (Vietnamese)"
                value={profile.addressVi}
                onChange={(e) => setProfile({ ...profile, addressVi: e.target.value })}
                required
              />
            </div>

            <Textarea
              label="Bio/Intro (English)"
              rows={4}
              value={profile.bioEn}
              onChange={(e) => setProfile({ ...profile, bioEn: e.target.value })}
              required
            />

            <Textarea
              label="Bio/Intro (Vietnamese)"
              rows={4}
              value={profile.bioVi}
              onChange={(e) => setProfile({ ...profile, bioVi: e.target.value })}
              required
            />

            <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Social Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="GitHub Profile URL"
                  value={profile.github}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                  placeholder="https://github.com/username"
                />
                <Input
                  label="LinkedIn Profile URL"
                  value={profile.linkedin}
                  onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                />
                <Input
                  label="Facebook Profile URL"
                  value={profile.facebook}
                  onChange={(e) => setProfile({ ...profile, facebook: e.target.value })}
                  placeholder="https://facebook.com/username"
                />
                <Input
                  label="Instagram Profile URL"
                  value={profile.instagram}
                  onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                  placeholder="https://instagram.com/username"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" isLoading={profileLoading}>
                Save Profile
              </Button>
            </div>
          </form>
        </div>

        {/* SEO settings Form (Right Column, Span 1) */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200/50 dark:border-gray-800 space-y-6 h-fit">
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
            <FaCogs className="text-xl text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">SEO configurations</h2>
          </div>

          <form onSubmit={handleSeoSubmit} className="space-y-6">
            <Input
              label="SEO Title (English)"
              value={seo.seoTitleEn}
              onChange={(e) => setSeo({ ...seo, seoTitleEn: e.target.value })}
              required
            />
            <Input
              label="SEO Title (Vietnamese)"
              value={seo.seoTitleVi}
              onChange={(e) => setSeo({ ...seo, seoTitleVi: e.target.value })}
              required
            />

            <Textarea
              label="SEO Description (English)"
              rows={3}
              value={seo.seoDescriptionEn}
              onChange={(e) => setSeo({ ...seo, seoDescriptionEn: e.target.value })}
              required
            />
            <Textarea
              label="SEO Description (Vietnamese)"
              rows={3}
              value={seo.seoDescriptionVi}
              onChange={(e) => setSeo({ ...seo, seoDescriptionVi: e.target.value })}
              required
            />

            <Input
              label="Production Site URL"
              value={seo.siteUrl}
              onChange={(e) => setSeo({ ...seo, siteUrl: e.target.value })}
              placeholder="https://phatnguyen.vercel.app"
              required
            />

            <Input
              label="OG Cover Image URL"
              value={seo.ogImageUrl}
              onChange={(e) => setSeo({ ...seo, ogImageUrl: e.target.value })}
              placeholder="/images/og-image.png"
            />

            <div className="flex justify-end pt-4">
              <Button type="submit" variant="primary" className="w-full" isLoading={seoLoading}>
                Save SEO Settings
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
