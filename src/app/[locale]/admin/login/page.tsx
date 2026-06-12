"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { toast, Toaster } from "@/src/components/ui/toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email and Password are required");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast.error(error.message || "Failed to log in");
      } else {
        toast.success("Welcome back, Admin!");
        router.push(`/${locale}/admin`);
        router.refresh();
      }
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 bg-grid-pattern">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-2xl p-8 space-y-8 relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-blue-600 to-emerald-500"></div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Admin Panel
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sign in to manage your portfolio CMS
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />

          <Button
            type="submit"
            className="w-full py-3"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>

        <div className="text-center">
          <Link
            href={`/${locale}`}
            className="text-xs font-semibold text-blue-600 hover:text-blue-500 transition-colors"
          >
            ← Back to Public Website
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

// Inline fallback Link component since we didn't import next/link
import Link from "next/link";
