import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./types";

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signOut: async () => ({ error: null }),
        signInWithPassword: async () => ({ 
          data: { user: null, session: null }, 
          error: new Error("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your env variables.") 
        })
      },
      from: () => ({
        select: () => ({
          order: () => Promise.resolve({ data: [], error: null }),
          eq: () => ({
            maybeSingle: () => Promise.resolve({ data: null, error: null }),
            order: () => Promise.resolve({ data: [], error: null })
          })
        }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => ({
          eq: () => Promise.resolve({ data: null, error: null })
        }),
        delete: () => ({
          eq: () => Promise.resolve({ data: null, error: null })
        })
      }),
      storage: {
        from: () => ({
          upload: async () => ({ data: null, error: new Error("Supabase is not configured.") }),
          getPublicUrl: () => ({ data: { publicUrl: "" } })
        })
      }
    } as any;
  }

  return createBrowserClient<Database>(url, anonKey);
};
