import { Metadata } from "next";
import { getProjectDetail, getProjectImages, getPortfolioData } from "../../../../lib/supabase/service";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCheck } from "react-icons/fa";
import { headers } from "next/headers";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectDetail(slug);

  if (!project) {
    return {
      title: "Project Not Found"
    };
  }

  return {
    title: `${project.title} - Phat Nguyen Project Details`,
    description: project.short_description_en || `Details and development process for ${project.title}`,
    openGraph: {
      title: `${project.title} | Portfolio`,
      description: project.short_description_en || "",
      images: project.thumbnail_url ? [{ url: project.thumbnail_url }] : []
    }
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = await getProjectDetail(slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Project Not Found</h1>
          <p className="text-muted-foreground">The project you are looking for does not exist.</p>
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            <FaArrowLeft /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isVi = locale === "vi";
  const images = await getProjectImages(project.id);
  
  // Fetch related projects
  const portfolioData = await getPortfolioData(locale);
  const relatedProjects = portfolioData.projects
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  const overview = isVi ? project.overview_vi : project.overview_en;
  const problem = isVi ? project.problem_statement_vi : project.problem_statement_en;
  const solution = isVi ? project.solution_vi : project.solution_en;
  const processText = isVi ? project.development_process_vi : project.development_process_en;
  const challengesText = isVi ? project.challenges_solutions_vi : project.challenges_solutions_en;
  
  const features = isVi ? project.features_vi : project.features_en;
  const responsibilities = isVi ? project.responsibilities_vi : project.responsibilities_en;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] sm:h-[50vh] w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-40">
          <Image
            src={project.thumbnail_url || "/images/placeholder.png"}
            alt={project.title}
            fill
            className="object-cover blur-sm scale-105"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        
        {/* Navigation Bar inside Detail */}
        <div className="absolute top-24 left-6 z-20">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 px-4 py-2 bg-background/80 hover:bg-background backdrop-blur-xs text-foreground text-sm font-semibold rounded-xl shadow-md border border-border/10 transition-all cursor-pointer hover:scale-105"
          >
            <FaArrowLeft className="text-xs" /> {isVi ? "Về trang chủ" : "Back to Home"}
          </Link>
        </div>

        {/* Hero Title */}
        <div className="absolute bottom-10 left-0 w-full z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {project.status || "Completed"}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white mt-3 drop-shadow-md">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Side: Detail Contents */}
        <div className="lg:col-span-2 space-y-12">
          {/* Overview */}
          {overview && (
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold border-b border-border pb-2">
                {isVi ? "Tổng quan dự án" : "Project Overview"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base whitespace-pre-line">
                {overview}
              </p>
            </section>
          )}

          {/* Problem Statement */}
          {problem && (
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold border-b border-border pb-2 text-red-600 dark:text-red-400">
                {isVi ? "Vấn đề đặt ra" : "The Problem"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base whitespace-pre-line">
                {problem}
              </p>
            </section>
          )}

          {/* Solution */}
          {solution && (
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold border-b border-border pb-2 text-green-600 dark:text-green-400">
                {isVi ? "Giải pháp & Kết quả" : "The Solution"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base whitespace-pre-line">
                {solution}
              </p>
            </section>
          )}

          {/* Key Features & Responsibilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features && features.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl border border-border/40">
                <h3 className="text-xl font-bold mb-4">{isVi ? "Tính năng chính" : "Key Features"}</h3>
                <ul className="space-y-3">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <FaCheck className="text-green-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {responsibilities && responsibilities.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl border border-border/40">
                <h3 className="text-xl font-bold mb-4">{isVi ? "Trách nhiệm chính" : "Responsibilities"}</h3>
                <ul className="space-y-3">
                  {responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <FaCheck className="text-blue-500 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Screenshot Gallery */}
          {images.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold border-b border-border pb-2">
                {isVi ? "Thư viện hình ảnh" : "Screenshots Gallery"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((img) => (
                  <div key={img.id} className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-border/30 bg-gray-100 dark:bg-gray-900 group">
                    <Image
                      src={img.image_url}
                      alt={isVi ? img.caption_vi || "" : img.caption_en || ""}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {(isVi ? img.caption_vi : img.caption_en) && (
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-xs p-3 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        {isVi ? img.caption_vi : img.caption_en}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Development Process */}
          {processText && (
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold border-b border-border pb-2">
                {isVi ? "Quy trình phát triển" : "Development Process"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base whitespace-pre-line">
                {processText}
              </p>
            </section>
          )}

          {/* Challenges & Solutions */}
          {challengesText && (
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold border-b border-border pb-2">
                {isVi ? "Thách thức & Giải pháp" : "Challenges & Solutions"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base whitespace-pre-line">
                {challengesText}
              </p>
            </section>
          )}
        </div>

        {/* Right Side: Metadata / Sidebar */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">
              {isVi ? "Thông tin dự án" : "Project Info"}
            </h3>

            {/* Links */}
            <div className="space-y-3">
              {project.live_demo_url && (
                <a
                  href={project.live_demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md hover:scale-[1.02] cursor-pointer"
                >
                  <FaExternalLinkAlt size={14} /> {isVi ? "Xem Demo Trực Tiếp" : "View Live Demo"}
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl font-bold transition-all border border-border/10 cursor-pointer"
                >
                  <FaGithub size={18} /> {isVi ? "Mã nguồn GitHub" : "GitHub Repository"}
                </a>
              )}
            </div>

            {/* Tech Stack used */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  {isVi ? "Công nghệ sử dụng" : "Technologies"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-lg border border-border/40 font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {isVi ? "Dự án liên quan" : "Related Projects"}
              </h3>
              <div className="space-y-4">
                {relatedProjects.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/${locale}/projects/${rel.slug}`}
                    className="flex gap-4 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-border/40 hover:border-blue-500/50 hover:shadow-lg transition-all group block"
                  >
                    <div className="relative w-20 aspect-video rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-900">
                      <Image
                        src={rel.thumbnail_url || "/images/placeholder.png"}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                        {isVi ? rel.short_description_vi : rel.short_description_en}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
