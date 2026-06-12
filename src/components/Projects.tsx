"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  slug: string;
  title: string;
  short_description_en: string | null;
  short_description_vi: string | null;
  technologies: string[] | null;
  status: string | null;
  is_featured: boolean | null;
  thumbnail_url: string | null;
}

interface ProjectsProps {
  projects: Project[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
} as const;

const cardVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 }
  }
} as const;

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            {t("projects.title")}
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--foreground)" }}
          >
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No projects found.
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {projects.map((project) => {
              const description =
                locale === "vi"
                  ? project.short_description_vi
                  : project.short_description_en;

              return (
                <motion.div
                  key={project.id || project.slug}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative block rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-colors duration-300"
                >
                  <Link href={`/${locale}/projects/${project.slug}`} className="block">
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <Image
                        src={project.thumbnail_url || "/images/placeholder.png"}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                      {project.is_featured && (
                        <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
                          Featured
                        </span>
                      )}
                      {project.status && (
                        <span className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-xs text-white text-xs font-medium px-3 py-1 rounded-full z-10">
                          {project.status}
                        </span>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      {description && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                          {description}
                        </p>
                      )}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2.5 py-1 rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 self-center">
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
