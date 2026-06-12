import { createClient } from "./server";
import { Database } from "./types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Skill = Database["public"]["Tables"]["skills"]["Row"];
export type Experience = Database["public"]["Tables"]["experiences"]["Row"];
export type Education = Database["public"]["Tables"]["education"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
export type Settings = Database["public"]["Tables"]["settings"]["Row"];

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  testimonials: Testimonial[];
  settings: Settings | null;
}

// Fallback static data in case Supabase is not connected or tables are empty
const getFallbackData = (locale: string): PortfolioData => {
  const isVi = locale === "vi";
  
  const fallbackProfile: Profile = {
    id: "00000000-0000-0000-0000-000000000000",
    updated_at: null,
    name: "Nguyen Tien Phat",
    position_en: "Frontend Developer",
    position_vi: "Lập trình viên Frontend",
    bio_en: "I'm a passionate frontend developer specializing in creating responsive, interactive, and clean user interfaces. With a strong background in Informatics Engineering, I combine design sensibility with technical expertise to build exceptional digital experiences.",
    bio_vi: "Tôi là một nhà phát triển frontend đam mê, chuyên tạo ra các giao diện người dùng đáp ứng, tương tác và sạch sẽ. Với nền tảng vững chắc trong ngành Kỹ thuật Thông tin, tôi kết hợp khả năng thẩm mỹ với chuyên môn kỹ thuật để xây dựng những trải nghiệm số xuất sắc.",
    phone: "+84 376 549 230",
    email: "tienphat29102003@gmail.com",
    address_en: "Ho Chi Minh City, Vietnam",
    address_vi: "Thành phố Hồ Chí Minh, Việt Nam",
    social_github: "https://github.com/tienphat2910",
    social_linkedin: "https://www.linkedin.com/in/tienphat2910/",
    social_facebook: "https://facebook.com/tien.phat29",
    social_instagram: "https://www.instagram.com/_imphat29_/",
    resume_url: "/cv.pdf"
  };

  const fallbackProjects: Project[] = [
    {
      id: "11111111-1111-1111-1111-111111111111",
      slug: "tianlongshop",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      title: "Tianlongshop",
      short_description_en: "A premium e-commerce platform for milk tea brand Tianlong, optimized for delivery and local payments.",
      short_description_vi: "Nền tảng thương mại điện tử cao cấp cho thương hiệu trà sữa Tianlong, tối ưu hóa giao hàng và thanh toán nội địa.",
      overview_en: "Tianlongshop is a customized e-commerce storefront built for a popular milk tea brand. It enables real-time order customisation (sugar levels, toppings, ice level), features an interactive shopping cart, integrates fast local delivery mapping, and secure local checkout portals.",
      overview_vi: "Tianlongshop là một trang thương mại điện tử tùy chỉnh được xây dựng cho thương hiệu trà sữa nổi tiếng. Cho phép tùy chỉnh đơn hàng thời gian thực (lượng đường, topping, đá), giỏ hàng tương tác, bản đồ giao hàng nhanh và cổng thanh toán nội địa bảo mật.",
      problem_statement_en: "The client needed a digital storefront capable of handling rapid order customisation and high concurrent traffic during promotion hours, which standard e-commerce templates couldn't support.",
      problem_statement_vi: "Khách hàng cần một cửa hàng trực tuyến có khả năng xử lý tùy biến đơn hàng nhanh chóng và lượng truy cập đồng thời cao trong các giờ khuyến mãi, điều mà các mẫu e-commerce thông thường không hỗ trợ.",
      solution_en: "We built a customized Next.js App Router client with localized state caching and a server-side engine that handles custom workflows and high load gracefully.",
      solution_vi: "Chúng tôi đã xây dựng client Next.js App Router tùy chỉnh với bộ nhớ cache trạng thái cục bộ và engine phía máy chủ xử lý mượt mà các quy trình làm việc tùy chỉnh và tải trọng cao.",
      features_en: ["Real-time product customisation", "Interactive Cart & dynamic checkout", "VNPay checkout integration", "Instant order SMS confirmation"],
      features_vi: ["Tùy chỉnh sản phẩm thời gian thực", "Giỏ hàng tương tác & thanh toán động", "Tích hợp thanh toán VNPay", "Xác nhận đơn hàng qua SMS tức thì"],
      responsibilities_en: ["Lead Frontend Engineering", "Architecture design", "Checkout flow integration"],
      responsibilities_vi: ["Trưởng nhóm Kỹ thuật Frontend", "Thiết kế kiến trúc", "Tích hợp quy trình thanh toán"],
      development_process_en: "Developed using Agile methodology over 3 months, iteratively gathering feedback on custom topping controls.",
      development_process_vi: "Phát triển bằng phương pháp Agile trong 3 tháng, thu thập phản hồi lặp đi lặp lại về các bảng điều khiển topping tùy chỉnh.",
      challenges_solutions_en: "Integrating the payment gateway with flaky third-party APIs was mitigated by building a resilient webhook retry mechanism.",
      challenges_solutions_vi: "Tích hợp cổng thanh toán với các API bên thứ ba không ổn định được khắc phục bằng cơ chế thử lại webhook bền bỉ.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux Toolkit"],
      status: "Completed",
      is_featured: true,
      thumbnail_url: "/images/tianlong.png",
      live_demo_url: "https://botuoituyetdoi.tianlong.vn/",
      github_url: "https://github.com/tienphat2910"
    },
    {
      id: "22222222-2222-2222-2222-222222222222",
      slug: "explore-vietnam",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      title: "Explore Vietnam",
      short_description_en: "A beautiful localized travel discovery platform showcasing top cultural and tourist destinations in Vietnam.",
      short_description_vi: "Nền tảng khám phá du lịch bản địa hóa tuyệt đẹp giới thiệu các điểm đến văn hóa và du lịch hàng đầu tại Việt Nam.",
      overview_en: "Explore Vietnam is a bilingual travel guide platform designed to guide international and domestic tourists. It features destination guides, interactive location search, route tracking, and review sections.",
      overview_vi: "Explore Vietnam là nền tảng hướng dẫn du lịch song ngữ được thiết kế để hướng dẫn khách du lịch quốc tế và trong nước. Nó có tính năng hướng dẫn điểm đến, tìm kiếm vị trí tương tác, theo dõi tuyến đường và phần đánh giá.",
      problem_statement_en: "Most tourism platforms lacked rich, responsive layouts and local recommendations translated accurately.",
      problem_statement_vi: "Hầu hết các nền tảng du lịch đều thiếu bố cục phong phú, đáp ứng và các khuyến nghị địa phương được dịch chính xác.",
      solution_en: "Implemented a Next.js localized router with high-resolution imagery and dynamic maps to drive tourist engagement.",
      solution_vi: "Đã triển khai một bộ định tuyến bản địa hóa Next.js với hình ảnh độ phân giải cao và bản đồ động để tăng mức độ tương tác của khách du lịch.",
      features_en: ["Bilingual support (EN/VI)", "Interactive destination maps", "Itinerary planner", "Weather API widgets"],
      features_vi: ["Hỗ trợ song ngữ (EN/VI)", "Bản đồ điểm đến tương tác", "Lập kế hoạch hành trình", "Widget API thời tiết"],
      responsibilities_en: ["Frontend developer", "UI translation pipeline", "Map API integration"],
      responsibilities_vi: ["Lập trình viên Frontend", "Đường ống dịch UI", "Tích hợp Map API"],
      development_process_en: "Built using Tailwind CSS for clean spacing, focusing on optimal core web vitals.",
      development_process_vi: "Được xây dựng bằng Tailwind CSS để có khoảng cách sạch sẽ, tập trung vào tối ưu hóa core web vitals.",
      challenges_solutions_en: "Image loading performance was optimized using Next.js Image component and modern WebP formats, yielding 95+ lighthouse scores.",
      challenges_solutions_vi: "Hiệu suất tải hình ảnh đã được tối ưu hóa bằng Next.js Image component và các định dạng WebP hiện đại, mang lại điểm số lighthouse 95+.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      status: "Completed",
      is_featured: true,
      thumbnail_url: "/images/explore-vietnam.png",
      live_demo_url: "https://explorevietnam.vercel.app/en",
      github_url: "https://github.com/tienphat2910"
    }
  ];

  const fallbackSkills: Skill[] = [
    { id: "s1", name: "React", category: "Frontend", level: 90, icon_class: "bx bxl-react", display_order: 1 },
    { id: "s2", name: "Next.js", category: "Frontend", level: 85, icon_class: "devicon-nextjs-plain", display_order: 2 },
    { id: "s3", name: "JavaScript", category: "Frontend", level: 90, icon_class: "bx bxl-javascript", display_order: 3 },
    { id: "s4", name: "TypeScript", category: "Frontend", level: 85, icon_class: "bx bxl-typescript", display_order: 4 },
    { id: "s5", name: "Tailwind CSS", category: "Frontend", level: 90, icon_class: "bx bxl-tailwind-css", display_order: 5 },
    { id: "s6", name: "Node.js", category: "Backend", level: 75, icon_class: "bx bxl-nodejs", display_order: 6 }
  ];

  const fallbackExperiences: Experience[] = [
    {
      id: "e1",
      company: "Software Company",
      logo_url: null,
      role_en: "Frontend Developer Intern",
      role_vi: "Thực tập sinh Lập trình Frontend",
      description_en: "Assisted in building responsive react UI pages, bug fixing, and integrating RESTful endpoints.",
      description_vi: "Hỗ trợ xây dựng các trang UI react đáp ứng, sửa lỗi và tích hợp các điểm cuối RESTful.",
      start_date: "2024-01-01",
      end_date: "2024-06-01",
      is_current: false,
      display_order: 1
    }
  ];

  const fallbackEducation: Education[] = [
    {
      id: "edu1",
      school_en: "University of Technology",
      school_vi: "Trường Đại học Công nghệ",
      degree_en: "Bachelor of Software Engineering",
      degree_vi: "Cử nhân Kỹ thuật Phần mềm",
      description_en: "Studied core software principles, web technologies, and database design.",
      description_vi: "Học các nguyên lý phần mềm cốt lõi, công nghệ web và thiết kế cơ sở dữ liệu.",
      start_date: "2021-09-01",
      end_date: "2025-06-01",
      is_current: true,
      display_order: 1
    }
  ];

  return {
    profile: fallbackProfile,
    projects: fallbackProjects,
    skills: fallbackSkills,
    experiences: fallbackExperiences,
    education: fallbackEducation,
    testimonials: [],
    settings: null
  };
};

export const getPortfolioData = async (locale: string): Promise<PortfolioData> => {
  // Check if credentials exist
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase environment variables are missing. Falling back to local data.");
    return getFallbackData(locale);
  }

  try {
    const supabase = await createClient();

    // Fetch in parallel for speed
    const [
      profileResult,
      projectsResult,
      skillsResult,
      experiencesResult,
      educationResult,
      testimonialsResult,
      settingsResult
    ] = await Promise.all([
      supabase.from("profiles").select("*").maybeSingle(),
      supabase.from("projects").select("*").order("is_featured", { ascending: false }).order("created_at", { ascending: false }),
      supabase.from("skills").select("*").order("display_order", { ascending: true }),
      supabase.from("experiences").select("*").order("display_order", { ascending: true }),
      supabase.from("education").select("*").order("display_order", { ascending: true }),
      supabase.from("testimonials").select("*").order("display_order", { ascending: true }),
      supabase.from("settings").select("*").maybeSingle()
    ]);

    const fallback = getFallbackData(locale);

    // If profile table has no rows, fallback profile data
    const profile = profileResult.data ? (profileResult.data as Profile) : fallback.profile;
    
    // If projects table has no rows, fallback projects
    const projects = projectsResult.data && projectsResult.data.length > 0
      ? (projectsResult.data as Project[])
      : fallback.projects;

    const skills = skillsResult.data && skillsResult.data.length > 0
      ? (skillsResult.data as Skill[])
      : fallback.skills;

    const experiences = experiencesResult.data && experiencesResult.data.length > 0
      ? (experiencesResult.data as Experience[])
      : fallback.experiences;

    const education = educationResult.data && educationResult.data.length > 0
      ? (educationResult.data as Education[])
      : fallback.education;

    const testimonials = testimonialsResult.data
      ? (testimonialsResult.data as Testimonial[])
      : [];

    const settings = settingsResult.data ? (settingsResult.data as Settings) : null;

    return {
      profile,
      projects,
      skills,
      experiences,
      education,
      testimonials,
      settings
    };
  } catch (error) {
    console.error("Failed to fetch data from Supabase, returning fallback data:", error);
    return getFallbackData(locale);
  }
};

export const getProjectDetail = async (slug: string): Promise<Project | null> => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Return fallback project if slug matches
    const fallback = getFallbackData("en");
    return fallback.projects.find(p => p.slug === slug) || null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    if (data) return data as Project;

    // Fallback if not found in db but exists in fallback
    const fallback = getFallbackData("en");
    return fallback.projects.find(p => p.slug === slug) || null;
  } catch (error) {
    console.error(`Failed to fetch project detail for slug ${slug}:`, error);
    const fallback = getFallbackData("en");
    return fallback.projects.find(p => p.slug === slug) || null;
  }
};

export const getProjectImages = async (projectId: string): Promise<Database["public"]["Tables"]["project_images"]["Row"][]> => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("project_images")
      .select("*")
      .eq("project_id", projectId)
      .order("display_order", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Failed to fetch images for project ${projectId}:`, error);
    return [];
  }
};
