export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          name: string
          position_en: string | null
          position_vi: string | null
          bio_en: string | null
          bio_vi: string | null
          phone: string | null
          email: string | null
          address_en: string | null
          address_vi: string | null
          social_github: string | null
          social_linkedin: string | null
          social_facebook: string | null
          social_instagram: string | null
          resume_url: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          name: string
          position_en?: string | null
          position_vi?: string | null
          bio_en?: string | null
          bio_vi?: string | null
          phone?: string | null
          email?: string | null
          address_en?: string | null
          address_vi?: string | null
          social_github?: string | null
          social_linkedin?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          resume_url?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          name?: string
          position_en?: string | null
          position_vi?: string | null
          bio_en?: string | null
          bio_vi?: string | null
          phone?: string | null
          email?: string | null
          address_en?: string | null
          address_vi?: string | null
          social_github?: string | null
          social_linkedin?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          resume_url?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          slug: string
          created_at: string | null
          updated_at: string | null
          title: string
          short_description_en: string | null
          short_description_vi: string | null
          overview_en: string | null
          overview_vi: string | null
          problem_statement_en: string | null
          problem_statement_vi: string | null
          solution_en: string | null
          solution_vi: string | null
          features_en: string[] | null
          features_vi: string[] | null
          responsibilities_en: string[] | null
          responsibilities_vi: string[] | null
          development_process_en: string | null
          development_process_vi: string | null
          challenges_solutions_en: string | null
          challenges_solutions_vi: string | null
          technologies: string[] | null
          status: string | null
          is_featured: boolean | null
          thumbnail_url: string | null
          live_demo_url: string | null
          github_url: string | null
        }
        Insert: {
          id?: string
          slug: string
          created_at?: string | null
          updated_at?: string | null
          title: string
          short_description_en?: string | null
          short_description_vi?: string | null
          overview_en?: string | null
          overview_vi?: string | null
          problem_statement_en?: string | null
          problem_statement_vi?: string | null
          solution_en?: string | null
          solution_vi?: string | null
          features_en?: string[] | null
          features_vi?: string[] | null
          responsibilities_en?: string[] | null
          responsibilities_vi?: string[] | null
          development_process_en?: string | null
          development_process_vi?: string | null
          challenges_solutions_en?: string | null
          challenges_solutions_vi?: string | null
          technologies?: string[] | null
          status?: string | null
          is_featured?: boolean | null
          thumbnail_url?: string | null
          live_demo_url?: string | null
          github_url?: string | null
        }
        Update: {
          id?: string
          slug?: string
          created_at?: string | null
          updated_at?: string | null
          title?: string
          short_description_en?: string | null
          short_description_vi?: string | null
          overview_en?: string | null
          overview_vi?: string | null
          problem_statement_en?: string | null
          problem_statement_vi?: string | null
          solution_en?: string | null
          solution_vi?: string | null
          features_en?: string[] | null
          features_vi?: string[] | null
          responsibilities_en?: string[] | null
          responsibilities_vi?: string[] | null
          development_process_en?: string | null
          development_process_vi?: string | null
          challenges_solutions_en?: string | null
          challenges_solutions_vi?: string | null
          technologies?: string[] | null
          status?: string | null
          is_featured?: boolean | null
          thumbnail_url?: string | null
          live_demo_url?: string | null
          github_url?: string | null
        }
      }
      project_images: {
        Row: {
          id: string
          project_id: string
          image_url: string
          caption_en: string | null
          caption_vi: string | null
          display_order: number | null
        }
        Insert: {
          id?: string
          project_id: string
          image_url: string
          caption_en?: string | null
          caption_vi?: string | null
          display_order?: number | null
        }
        Update: {
          id?: string
          project_id?: string
          image_url?: string
          caption_en?: string | null
          caption_vi?: string | null
          display_order?: number | null
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string
          level: number | null
          icon_class: string | null
          display_order: number | null
        }
        Insert: {
          id?: string
          name: string
          category: string
          level?: number | null
          icon_class?: string | null
          display_order?: number | null
        }
        Update: {
          id?: string
          name?: string
          category?: string
          level?: number | null
          icon_class?: string | null
          display_order?: number | null
        }
      }
      experiences: {
        Row: {
          id: string
          company: string
          logo_url: string | null
          role_en: string
          role_vi: string
          description_en: string | null
          description_vi: string | null
          start_date: string
          end_date: string | null
          is_current: boolean | null
          display_order: number | null
        }
        Insert: {
          id?: string
          company: string
          logo_url?: string | null
          role_en: string
          role_vi: string
          description_en?: string | null
          description_vi?: string | null
          start_date: string
          end_date?: string | null
          is_current?: boolean | null
          display_order?: number | null
        }
        Update: {
          id?: string
          company?: string
          logo_url?: string | null
          role_en?: string
          role_vi?: string
          description_en?: string | null
          description_vi?: string | null
          start_date?: string
          end_date?: string | null
          is_current?: boolean | null
          display_order?: number | null
        }
      }
      education: {
        Row: {
          id: string
          school_en: string
          school_vi: string
          degree_en: string
          degree_vi: string
          description_en: string | null
          description_vi: string | null
          start_date: string
          end_date: string | null
          is_current: boolean | null
          display_order: number | null
        }
        Insert: {
          id?: string
          school_en: string
          school_vi: string
          degree_en: string
          degree_vi: string
          description_en?: string | null
          description_vi?: string | null
          start_date: string
          end_date?: string | null
          is_current?: boolean | null
          display_order?: number | null
        }
        Update: {
          id?: string
          school_en?: string
          school_vi?: string
          degree_en?: string
          degree_vi?: string
          description_en?: string | null
          description_vi?: string | null
          start_date?: string
          end_date?: string | null
          is_current?: boolean | null
          display_order?: number | null
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          position_en: string | null
          position_vi: string | null
          company: string | null
          avatar_url: string | null
          content_en: string
          content_vi: string
          display_order: number | null
        }
        Insert: {
          id?: string
          name: string
          position_en?: string | null
          position_vi?: string | null
          company?: string | null
          avatar_url?: string | null
          content_en: string
          content_vi: string
          display_order?: number | null
        }
        Update: {
          id?: string
          name?: string
          position_en?: string | null
          position_vi?: string | null
          company?: string | null
          avatar_url?: string | null
          content_en?: string
          content_vi?: string
          display_order?: number | null
        }
      }
      contact_messages: {
        Row: {
          id: string
          created_at: string | null
          name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          status: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          name: string
          email: string
          phone?: string | null
          subject?: string | null
          message: string
          status?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          name?: string
          email?: string
          phone?: string | null
          subject?: string | null
          message?: string
          status?: string | null
        }
      }
      settings: {
        Row: {
          id: string
          seo_title_en: string | null
          seo_title_vi: string | null
          seo_description_en: string | null
          seo_description_vi: string | null
          seo_keywords_en: string[] | null
          seo_keywords_vi: string[] | null
          site_url: string | null
          og_image_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          seo_title_en?: string | null
          seo_title_vi?: string | null
          seo_description_en?: string | null
          seo_description_vi?: string | null
          seo_keywords_en?: string[] | null
          seo_keywords_vi?: string[] | null
          site_url?: string | null
          og_image_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          seo_title_en?: string | null
          seo_title_vi?: string | null
          seo_description_en?: string | null
          seo_description_vi?: string | null
          seo_keywords_en?: string[] | null
          seo_keywords_vi?: string[] | null
          site_url?: string | null
          og_image_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
