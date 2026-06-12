"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { createClient } from "@/src/lib/supabase/client";
import { FaUser, FaFolder, FaEnvelope, FaSignOutAlt, FaHome, FaSlidersH, FaTools, FaBriefcase } from "react-icons/fa";
import { toast, Toaster } from "@/src/components/ui/toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as string) || "en";
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // If we are on the login page, don't show the sidebar wrapper!
  const isLoginPage = pathname === `/${locale}/admin/login`;

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setAdminEmail(user.email || "Admin");
          setLoading(false);
        } else if (!isLoginPage) {
          router.push(`/${locale}/admin/login`);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching session:", err);
        if (!isLoginPage) {
          router.push(`/${locale}/admin/login`);
        } else {
          setLoading(false);
        }
      }
    };
    fetchSession();
  }, [locale, isLoginPage, router]);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      router.push(`/${locale}`);
      router.refresh();
    } catch (err) {
      console.error("Signout error:", err);
      toast.error("Failed to sign out");
    }
  };

  const t = useTranslations();

  const navItems = [
    {
      name: t("admin.profileSettings"),
      href: `/${locale}/admin`,
      icon: FaUser,
      isActive: pathname === `/${locale}/admin`
    },
    {
      name: t("admin.experienceEducation"),
      href: `/${locale}/admin/resume`,
      icon: FaBriefcase,
      isActive: pathname.startsWith(`/${locale}/admin/resume`)
    },
    {
      name: t("admin.skillsExpertise"),
      href: `/${locale}/admin/skills`,
      icon: FaTools,
      isActive: pathname.startsWith(`/${locale}/admin/skills`)
    },
    {
      name: t("admin.projectsCms"),
      href: `/${locale}/admin/projects`,
      icon: FaFolder,
      isActive: pathname.startsWith(`/${locale}/admin/projects`)
    },
    {
      name: t("admin.contactInbox"),
      href: `/${locale}/admin/messages`,
      icon: FaEnvelope,
      isActive: pathname.startsWith(`/${locale}/admin/messages`)
    }
  ];

  if (loading && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col shrink-0">
        {/* Brand */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <Link href={`/${locale}/admin`} className="flex items-center gap-2">
            <span className="font-extrabold text-lg tracking-wider text-blue-600 dark:text-blue-400">
              {t("admin.cmsPortal")}
            </span>
          </Link>
          <Link
            href={`/${locale}`}
            className="p-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg transition-colors border border-border/10"
            title={t("admin.viewPublicWebsite")}
          >
            <FaHome size={14} />
          </Link>
        </div>

        {/* User Badge */}
        {adminEmail && (
          <div className="px-6 py-4 border-b border-gray-200/50 dark:border-gray-800/50">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{t("admin.signedInAs")}</p>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-200 truncate mt-0.5" title={adminEmail}>
              {adminEmail}
            </p>
          </div>
        )}

        {/* Nav links */}
        <nav className="flex-1 p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  item.isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon size={16} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all cursor-pointer"
          >
            <FaSignOutAlt size={16} />
            <span>{t("admin.signOut")}</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-full bg-grid-pattern">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
}
