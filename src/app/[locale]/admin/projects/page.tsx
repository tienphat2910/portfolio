"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { FaPlus, FaEdit, FaTrash, FaStar, FaLink, FaGithub, FaImage, FaTimes } from "react-icons/fa";
import { toast, Toaster } from "@/src/components/ui/toast";
import { useLocale } from "next-intl";

interface Project {
  id: string;
  slug: string;
  title: string;
  short_description_en: string | null;
  short_description_vi: string | null;
  overview_en: string | null;
  overview_vi: string | null;
  problem_statement_en: string | null;
  problem_statement_vi: string | null;
  solution_en: string | null;
  solution_vi: string | null;
  features_en: string[] | null;
  features_vi: string[] | null;
  responsibilities_en: string[] | null;
  responsibilities_vi: string[] | null;
  development_process_en: string | null;
  development_process_vi: string | null;
  challenges_solutions_en: string | null;
  challenges_solutions_vi: string | null;
  technologies: string[] | null;
  status: string | null;
  is_featured: boolean | null;
  thumbnail_url: string | null;
  live_demo_url: string | null;
  github_url: string | null;
}

interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  caption_en: string | null;
  caption_vi: string | null;
  display_order: number;
}

const translations = {
  en: {
    title: "Projects CMS",
    subtitle: "Create, update, and manage your portfolio projects",
    addProject: "Add Project",
    editProject: "Edit Project: {name}",
    createProject: "Create New Project",
    projectTitle: "Project Title",
    urlSlug: "URL Slug (SEO friendly)",
    auto: "Auto",
    status: "Status",
    statusCompleted: "Completed",
    statusInProgress: "In Progress",
    statusArchived: "Archived",
    featureHomepage: "Feature this project on homepage",
    thumbnailUrl: "Thumbnail URL",
    thumbnailPlaceholder: "Paste direct URL or select file upload",
    uploadImage: "Upload Image",
    liveDemoLink: "Live Demo Link",
    liveDemoPlaceholder: "https://example.com",
    githubRepoLink: "GitHub Repo Link",
    githubRepoPlaceholder: "https://github.com/username/repo",
    technologiesUsed: "Technologies Used (Comma-separated)",
    technologiesPlaceholder: "Next.js, React, TypeScript, Tailwind CSS",
    shortDescEn: "Short Description (English)",
    shortDescVi: "Short Description (Vietnamese)",
    overviewEn: "Overview Details (English)",
    overviewVi: "Overview Details (Vietnamese)",
    problemEn: "The Problem / Need (English)",
    problemVi: "The Problem / Need (Vietnamese)",
    solutionEn: "The Solution (English)",
    solutionVi: "The Solution (Vietnamese)",
    keyFeaturesEn: "Key Features list (One per line, English)",
    keyFeaturesVi: "Key Features list (One per line, Vietnamese)",
    keyFeaturesPlaceholder: "Product customisation\nStripe payment Integration",
    responsibilitiesEn: "Responsibilities (One per line, English)",
    responsibilitiesVi: "Responsibilities (One per line, Vietnamese)",
    responsibilitiesPlaceholder: "Lead architect\nUI implementation",
    devProcessEn: "Development Process (English)",
    devProcessVi: "Development Process (Vietnamese)",
    challengesEn: "Challenges & Solutions (English)",
    challengesVi: "Challenges & Solutions (Vietnamese)",
    
    // Gallery Manager
    galleryTitle: "Screenshot Gallery Manager",
    addGalleryImg: "Add image to gallery",
    imgSourceUrl: "Image Source URL",
    pasteUrlPlaceholder: "Paste image URL or upload file",
    uploadFile: "Upload File",
    imgCaption: "Image Caption (Optional)",
    captionPlaceholder: "Desktop dashboard view",
    addImgButton: "Add Image",
    cancel: "Cancel",
    saveProject: "Save Project",

    // Table List
    colProject: "Project",
    colSlug: "Slug",
    colStatus: "Status",
    colFeatured: "Featured",
    colActions: "Actions",
    noProjects: "No projects found. Click \"Add Project\" to create one.",

    // Alerts / Toasts
    uploadingMsg: "Uploading image to Supabase Storage...",
    thumbnailSuccess: "Thumbnail uploaded successfully!",
    imageSuccess: "Image uploaded successfully!",
    uploadFailed: "Failed to upload file. Please paste URL manually.",
    imageUrlRequired: "Image URL is required",
    cachedImgSuccess: "Cached gallery image. Will save after project is created.",
    galleryImgAdded: "Gallery image added!",
    removeCachedSuccess: "Removed cached image",
    removeGallerySuccess: "Image removed from gallery",
    validationRequired: "Title and Slug are required",
    updateSuccess: "Project updated successfully!",
    createSuccess: "Project created successfully!",
    deleteConfirm: "Are you absolutely sure you want to delete this project? This will also delete all associated gallery images.",
    deleteSuccess: "Project deleted successfully",
    unfeaturedSuccess: "Project un-featured",
    featuredSuccess: "Project featured!",
    loadError: "Failed to load projects list",
    loadImagesError: "Failed to load project gallery images"
  },
  vi: {
    title: "Quản lý Dự án",
    subtitle: "Tạo, cập nhật và quản lý các dự án trong danh mục của bạn",
    addProject: "Thêm dự án",
    editProject: "Chỉnh sửa dự án: {name}",
    createProject: "Tạo dự án mới",
    projectTitle: "Tiêu đề dự án",
    urlSlug: "Slug URL (Thân thiện SEO)",
    auto: "Tự động",
    status: "Trạng thái",
    statusCompleted: "Đã hoàn thành",
    statusInProgress: "Đang thực hiện",
    statusArchived: "Lưu trữ",
    featureHomepage: "Hiển thị dự án này nổi bật trên trang chủ",
    thumbnailUrl: "Đường dẫn ảnh thu nhỏ (Thumbnail)",
    thumbnailPlaceholder: "Dán liên kết trực tiếp hoặc chọn tải lên file",
    uploadImage: "Tải lên hình ảnh",
    liveDemoLink: "Liên kết chạy thử (Live Demo)",
    liveDemoPlaceholder: "https://example.com",
    githubRepoLink: "Liên kết kho mã nguồn GitHub",
    githubRepoPlaceholder: "https://github.com/username/repo",
    technologiesUsed: "Công nghệ sử dụng (Phân tách bằng dấu phẩy)",
    technologiesPlaceholder: "Next.js, React, TypeScript, Tailwind CSS",
    shortDescEn: "Mô tả ngắn (Tiếng Anh)",
    shortDescVi: "Mô tả ngắn (Tiếng Việt)",
    overviewEn: "Chi tiết tổng quan (Tiếng Anh)",
    overviewVi: "Chi tiết tổng quan (Tiếng Việt)",
    problemEn: "Vấn đề / Nhu cầu (Tiếng Anh)",
    problemVi: "Vấn đề / Nhu cầu (Tiếng Việt)",
    solutionEn: "Giải pháp (Tiếng Anh)",
    solutionVi: "Giải pháp (Tiếng Việt)",
    keyFeaturesEn: "Danh sách tính năng chính (Mỗi tính năng một dòng, Tiếng Anh)",
    keyFeaturesVi: "Danh sách tính năng chính (Mỗi tính năng một dòng, Tiếng Việt)",
    keyFeaturesPlaceholder: "Tùy biến sản phẩm\nTích hợp thanh toán Stripe",
    responsibilitiesEn: "Trách nhiệm (Mỗi dòng một trách nhiệm, Tiếng Anh)",
    responsibilitiesVi: "Trách nhiệm (Mỗi dòng một trách nhiệm, Tiếng Việt)",
    responsibilitiesPlaceholder: "Kiến trúc sư trưởng\nTriển khai giao diện",
    devProcessEn: "Quy trình phát triển (Tiếng Anh)",
    devProcessVi: "Quy trình phát triển (Tiếng Việt)",
    challengesEn: "Thử thách & Giải pháp (Tiếng Anh)",
    challengesVi: "Thử thách & Giải pháp (Tiếng Việt)",
    
    // Gallery Manager
    galleryTitle: "Quản lý thư viện ảnh chụp màn hình",
    addGalleryImg: "Thêm hình ảnh vào thư viện",
    imgSourceUrl: "Đường dẫn nguồn ảnh",
    pasteUrlPlaceholder: "Dán URL hình ảnh hoặc tải lên file",
    uploadFile: "Tải lên file",
    imgCaption: "Chú thích hình ảnh (Tùy chọn)",
    captionPlaceholder: "Giao diện bảng điều khiển máy tính",
    addImgButton: "Thêm hình ảnh",
    cancel: "Hủy",
    saveProject: "Lưu dự án",

    // Table List
    colProject: "Dự án",
    colSlug: "Slug",
    colStatus: "Trạng thái",
    colFeatured: "Nổi bật",
    colActions: "Hành động",
    noProjects: "Không tìm thấy dự án nào. Nhấp vào \"Thêm dự án\" để tạo mới.",

    // Alerts / Toasts
    uploadingMsg: "Đang tải ảnh lên Supabase Storage...",
    thumbnailSuccess: "Tải lên ảnh thu nhỏ thành công!",
    imageSuccess: "Tải lên ảnh thành công!",
    uploadFailed: "Tải lên tệp thất bại. Vui lòng dán URL thủ công.",
    imageUrlRequired: "Yêu cầu nhập URL hình ảnh",
    cachedImgSuccess: "Đã lưu tạm ảnh thư viện. Sẽ lưu sau khi dự án được tạo.",
    galleryImgAdded: "Đã thêm hình ảnh thư viện!",
    removeCachedSuccess: "Đã xóa hình ảnh tạm",
    removeGallerySuccess: "Đã xóa ảnh khỏi thư viện",
    validationRequired: "Tiêu đề và Slug là bắt buộc",
    updateSuccess: "Cập nhật dự án thành công!",
    createSuccess: "Tạo dự án thành công!",
    deleteConfirm: "Bạn có chắc chắn muốn xóa dự án này không? Thao tác này cũng sẽ xóa tất cả hình ảnh thư viện liên quan.",
    deleteSuccess: "Xóa dự án thành công",
    unfeaturedSuccess: "Đã hủy nổi bật dự án",
    featuredSuccess: "Đã đặt nổi bật dự án!",
    loadError: "Không thể tải danh sách dự án",
    loadImagesError: "Không thể tải thư viện ảnh của dự án"
  }
};

export default function AdminProjectsPage() {
  const locale = useLocale();
  const t = translations[locale === "vi" ? "vi" : "en"];

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // Gallery management state
  const [projectImages, setProjectImages] = useState<ProjectImage[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageCaption, setNewImageCaption] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form Fields State
  const [form, setForm] = useState({
    title: "",
    slug: "",
    status: "Completed",
    is_featured: false,
    thumbnail_url: "",
    live_demo_url: "",
    github_url: "",
    short_description_en: "",
    short_description_vi: "",
    overview_en: "",
    overview_vi: "",
    problem_statement_en: "",
    problem_statement_vi: "",
    solution_en: "",
    solution_vi: "",
    technologies: "",
    features_en: "",
    features_vi: "",
    responsibilities_en: "",
    responsibilities_vi: "",
    development_process_en: "",
    development_process_vi: "",
    challenges_solutions_en: "",
    challenges_solutions_vi: ""
  });

  const loadProjects = async () => {
    try {
      const supabase = createClient() as any;
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error("Load projects error:", err);
      toast.error(t.loadError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreate = () => {
    setEditingProject(null);
    setProjectImages([]);
    setForm({
      title: "",
      slug: "",
      status: "Completed",
      is_featured: false,
      thumbnail_url: "",
      live_demo_url: "",
      github_url: "",
      short_description_en: "",
      short_description_vi: "",
      overview_en: "",
      overview_vi: "",
      problem_statement_en: "",
      problem_statement_vi: "",
      solution_en: "",
      solution_vi: "",
      technologies: "",
      features_en: "",
      features_vi: "",
      responsibilities_en: "",
      responsibilities_vi: "",
      development_process_en: "",
      development_process_vi: "",
      challenges_solutions_en: "",
      challenges_solutions_vi: ""
    });
    setIsEditorOpen(true);
  };

  const openEdit = async (project: Project) => {
    setEditingProject(project);
    setForm({
      title: project.title || "",
      slug: project.slug || "",
      status: project.status || "Completed",
      is_featured: !!project.is_featured,
      thumbnail_url: project.thumbnail_url || "",
      live_demo_url: project.live_demo_url || "",
      github_url: project.github_url || "",
      short_description_en: project.short_description_en || "",
      short_description_vi: project.short_description_vi || "",
      overview_en: project.overview_en || "",
      overview_vi: project.overview_vi || "",
      problem_statement_en: project.problem_statement_en || "",
      problem_statement_vi: project.problem_statement_vi || "",
      solution_en: project.solution_en || "",
      solution_vi: project.solution_vi || "",
      technologies: project.technologies ? project.technologies.join(", ") : "",
      features_en: project.features_en ? project.features_en.join("\n") : "",
      features_vi: project.features_vi ? project.features_vi.join("\n") : "",
      responsibilities_en: project.responsibilities_en ? project.responsibilities_en.join("\n") : "",
      responsibilities_vi: project.responsibilities_vi ? project.responsibilities_vi.join("\n") : "",
      development_process_en: project.development_process_en || "",
      development_process_vi: project.development_process_vi || "",
      challenges_solutions_en: project.challenges_solutions_en || "",
      challenges_solutions_vi: project.challenges_solutions_vi || ""
    });

    // Fetch images for this project
    try {
      const supabase = createClient() as any;
      const { data, error } = await supabase
        .from("project_images")
        .select("*")
        .eq("project_id", project.id)
        .order("display_order", { ascending: true });

      if (error) throw error;
      setProjectImages(data || []);
    } catch (err) {
      console.error("Load images error:", err);
      toast.error(t.loadImagesError);
    }

    setIsEditorOpen(true);
  };

  const handleSlugAuto = () => {
    const auto = form.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setForm(prev => ({ ...prev, slug: auto }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isThumbnail: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const loadingToast = toast.loading(t.uploadingMsg);

    try {
      const supabase = createClient() as any;
      
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { data, error } = await supabase.storage
        .from("portfolio-assets")
        .upload(filePath, file);

      if (error) {
        console.warn("Storage upload failed, please ensure 'portfolio-assets' bucket is created in Supabase console:", error);
        throw new Error(error.message || "Upload failed.");
      }

      const { data: { publicUrl } } = supabase.storage
        .from("portfolio-assets")
        .getPublicUrl(filePath);

      if (isThumbnail) {
        setForm(prev => ({ ...prev, thumbnail_url: publicUrl }));
        toast.success(t.thumbnailSuccess, { id: loadingToast });
      } else {
        setNewImageUrl(publicUrl);
        toast.success(t.imageSuccess, { id: loadingToast });
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      toast.error(t.uploadFailed, { id: loadingToast });
    } finally {
      setUploadingImage(false);
    }
  };

  const addGalleryImage = async () => {
    if (!newImageUrl.trim()) {
      toast.error(t.imageUrlRequired);
      return;
    }

    if (!editingProject) {
      // If creating a project, cache in local state and insert after project creation
      const tempId = `temp_${Date.now()}`;
      setProjectImages(prev => [
        ...prev,
        {
          id: tempId,
          project_id: "",
          image_url: newImageUrl,
          caption_en: newImageCaption,
          caption_vi: newImageCaption,
          display_order: prev.length
        }
      ]);
      setNewImageUrl("");
      setNewImageCaption("");
      toast.success(t.cachedImgSuccess);
      return;
    }

    try {
      const supabase = createClient() as any;
      const { data, error } = await supabase
        .from("project_images")
        .insert([
          {
            project_id: editingProject.id,
            image_url: newImageUrl,
            caption_en: newImageCaption,
            caption_vi: newImageCaption,
            display_order: projectImages.length
          }
        ])
        .select()
        .single();

      if (error) throw error;
      setProjectImages(prev => [...prev, data as ProjectImage]);
      setNewImageUrl("");
      setNewImageCaption("");
      toast.success(t.galleryImgAdded);
    } catch (err: any) {
      console.error("Add image error:", err);
      toast.error(err.message || t.uploadFailed);
    }
  };

  const removeGalleryImage = async (imgId: string) => {
    if (imgId.startsWith("temp_")) {
      setProjectImages(prev => prev.filter(img => img.id !== imgId));
      toast.success(t.removeCachedSuccess);
      return;
    }

    try {
      const supabase = createClient() as any;
      const { error } = await supabase
        .from("project_images")
        .delete()
        .eq("id", imgId);

      if (error) throw error;
      setProjectImages(prev => prev.filter(img => img.id !== imgId));
      toast.success(t.removeGallerySuccess);
    } catch (err: any) {
      console.error("Delete image error:", err);
      toast.error(err.message || t.uploadFailed);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.slug.trim()) {
      toast.error(t.validationRequired);
      return;
    }

    const cleanTech = form.technologies
      .split(",")
      .map(t => t.trim())
      .filter(t => t !== "");

    const cleanFeaturesEn = form.features_en.split("\n").map(f => f.trim()).filter(f => f !== "");
    const cleanFeaturesVi = form.features_vi.split("\n").map(f => f.trim()).filter(f => f !== "");
    const cleanRespEn = form.responsibilities_en.split("\n").map(r => r.trim()).filter(r => r !== "");
    const cleanRespVi = form.responsibilities_vi.split("\n").map(r => r.trim()).filter(r => r !== "");

    const payload = {
      title: form.title,
      slug: form.slug,
      status: form.status,
      is_featured: form.is_featured,
      thumbnail_url: form.thumbnail_url,
      live_demo_url: form.live_demo_url,
      github_url: form.github_url,
      short_description_en: form.short_description_en,
      short_description_vi: form.short_description_vi,
      overview_en: form.overview_en,
      overview_vi: form.overview_vi,
      problem_statement_en: form.problem_statement_en,
      problem_statement_vi: form.problem_statement_vi,
      solution_en: form.solution_en,
      solution_vi: form.solution_vi,
      technologies: cleanTech,
      features_en: cleanFeaturesEn,
      features_vi: cleanFeaturesVi,
      responsibilities_en: cleanRespEn,
      responsibilities_vi: cleanRespVi,
      development_process_en: form.development_process_en,
      development_process_vi: form.development_process_vi,
      challenges_solutions_en: form.challenges_solutions_en,
      challenges_solutions_vi: form.challenges_solutions_vi
    };

    setLoading(true);

    try {
      const supabase = createClient() as any;
      if (editingProject) {
        // UPDATE
        const { error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", editingProject.id);

        if (error) throw error;
        toast.success(t.updateSuccess);
      } else {
        // CREATE
        const { data, error } = await supabase
          .from("projects")
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        
        // If there were cached images, insert them now
        if (data && projectImages.length > 0) {
          const bulkImages = projectImages.map((img, idx) => ({
            project_id: data.id,
            image_url: img.image_url,
            caption_en: img.caption_en,
            caption_vi: img.caption_vi,
            display_order: idx
          }));
          await supabase.from("project_images").insert(bulkImages);
        }

        toast.success(t.createSuccess);
      }

      setIsEditorOpen(false);
      loadProjects();
    } catch (err: any) {
      console.error("Save project error:", err);
      toast.error(err.message || t.uploadFailed);
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm(t.deleteConfirm)) return;

    setLoading(true);

    try {
      const supabase = createClient() as any;
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) throw error;
      toast.success(t.deleteSuccess);
      loadProjects();
    } catch (err: any) {
      console.error("Delete project error:", err);
      toast.error(err.message || t.uploadFailed);
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      const supabase = createClient() as any;
      const { error } = await supabase
        .from("projects")
        .update({ is_featured: !project.is_featured })
        .eq("id", project.id);

      if (error) throw error;
      toast.success(project.is_featured ? t.unfeaturedSuccess : t.featuredSuccess);
      loadProjects();
    } catch (err: any) {
      console.error("Toggle featured error:", err);
      toast.error(err.message || t.uploadFailed);
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
    <div className="space-y-6">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {t.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t.subtitle}
          </p>
        </div>
        {!isEditorOpen && (
          <Button onClick={openCreate} className="gap-2">
            <FaPlus /> {t.addProject}
          </Button>
        )}
      </div>

      {isEditorOpen ? (
        /* Editor Panel */
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-200/60 dark:border-gray-800 space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {editingProject ? t.editProject.replace("{name}", editingProject.title) : t.createProject}
            </h2>
            <Button variant="ghost" onClick={() => setIsEditorOpen(false)} className="p-2">
              <FaTimes size={18} />
            </Button>
          </div>

          <form onSubmit={handleSaveProject} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label={t.projectTitle}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                onBlur={handleSlugAuto}
                required
              />
              <div className="flex items-end gap-2">
                <Input
                  label={t.urlSlug}
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  required
                />
                <Button type="button" variant="secondary" onClick={handleSlugAuto} className="mb-0.5">
                  {t.auto}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                  {t.status}
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="Completed">{t.statusCompleted}</option>
                  <option value="In Progress">{t.statusInProgress}</option>
                  <option value="Archived">{t.statusArchived}</option>
                </select>
              </div>
              <div className="sm:col-span-2 flex items-center h-full pt-6">
                <label className="flex items-center gap-3 cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  {t.featureHomepage}
                </label>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
              <div className="sm:col-span-2">
                <Input
                  label={t.thumbnailUrl}
                  value={form.thumbnail_url}
                  onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
                  placeholder={t.thumbnailPlaceholder}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                  {t.uploadImage}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, true)}
                  disabled={uploadingImage}
                  className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer disabled:opacity-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label={t.liveDemoLink}
                value={form.live_demo_url}
                onChange={(e) => setForm({ ...form, live_demo_url: e.target.value })}
                placeholder={t.liveDemoPlaceholder}
              />
              <Input
                label={t.githubRepoLink}
                value={form.github_url}
                onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                placeholder={t.githubRepoPlaceholder}
              />
            </div>

            <Input
              label={t.technologiesUsed}
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              placeholder={t.technologiesPlaceholder}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Textarea
                label={t.shortDescEn}
                rows={3}
                value={form.short_description_en}
                onChange={(e) => setForm({ ...form, short_description_en: e.target.value })}
              />
              <Textarea
                label={t.shortDescVi}
                rows={3}
                value={form.short_description_vi}
                onChange={(e) => setForm({ ...form, short_description_vi: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Textarea
                label={t.overviewEn}
                rows={4}
                value={form.overview_en}
                onChange={(e) => setForm({ ...form, overview_en: e.target.value })}
              />
              <Textarea
                label={t.overviewVi}
                rows={4}
                value={form.overview_vi}
                onChange={(e) => setForm({ ...form, overview_vi: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Textarea
                label={t.problemEn}
                rows={3}
                value={form.problem_statement_en}
                onChange={(e) => setForm({ ...form, problem_statement_en: e.target.value })}
              />
              <Textarea
                label={t.problemVi}
                rows={3}
                value={form.problem_statement_vi}
                onChange={(e) => setForm({ ...form, problem_statement_vi: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Textarea
                label={t.solutionEn}
                rows={3}
                value={form.solution_en}
                onChange={(e) => setForm({ ...form, solution_en: e.target.value })}
              />
              <Textarea
                label={t.solutionVi}
                rows={3}
                value={form.solution_vi}
                onChange={(e) => setForm({ ...form, solution_vi: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Textarea
                label={t.keyFeaturesEn}
                rows={3}
                value={form.features_en}
                onChange={(e) => setForm({ ...form, features_en: e.target.value })}
                placeholder={t.keyFeaturesPlaceholder}
              />
              <Textarea
                label={t.keyFeaturesVi}
                rows={3}
                value={form.features_vi}
                onChange={(e) => setForm({ ...form, features_vi: e.target.value })}
                placeholder={t.keyFeaturesPlaceholder}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Textarea
                label={t.responsibilitiesEn}
                rows={3}
                value={form.responsibilities_en}
                onChange={(e) => setForm({ ...form, responsibilities_en: e.target.value })}
                placeholder={t.responsibilitiesPlaceholder}
              />
              <Textarea
                label={t.responsibilitiesVi}
                rows={3}
                value={form.responsibilities_vi}
                onChange={(e) => setForm({ ...form, responsibilities_vi: e.target.value })}
                placeholder={t.responsibilitiesPlaceholder}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Textarea
                label={t.devProcessEn}
                rows={3}
                value={form.development_process_en}
                onChange={(e) => setForm({ ...form, development_process_en: e.target.value })}
              />
              <Textarea
                label={t.devProcessVi}
                rows={3}
                value={form.development_process_vi}
                onChange={(e) => setForm({ ...form, development_process_vi: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Textarea
                label={t.challengesEn}
                rows={3}
                value={form.challenges_solutions_en}
                onChange={(e) => setForm({ ...form, challenges_solutions_en: e.target.value })}
              />
              <Textarea
                label={t.challengesVi}
                rows={3}
                value={form.challenges_solutions_vi}
                onChange={(e) => setForm({ ...form, challenges_solutions_vi: e.target.value })}
              />
            </div>

            {/* Gallery Image Manager */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FaImage className="text-blue-500" /> {t.galleryTitle}
              </h3>

              {/* Existing Gallery List */}
              {projectImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {projectImages.map((img) => (
                    <div key={img.id} className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xs group">
                      <img src={img.image_url} alt="Gallery" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(img.id)}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                        title={t.galleryImgAdded}
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add image form */}
              <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-200/50 dark:border-gray-800/80 space-y-4">
                <h4 className="text-sm font-bold text-gray-800 dark:text-white">{t.addGalleryImg}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
                  <div className="sm:col-span-2">
                    <Input
                      label={t.imgSourceUrl}
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder={t.pasteUrlPlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      {t.uploadFile}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, false)}
                      disabled={uploadingImage}
                      className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex gap-4 items-end justify-between">
                  <div className="flex-1">
                    <Input
                      label={t.imgCaption}
                      value={newImageCaption}
                      onChange={(e) => setNewImageCaption(e.target.value)}
                      placeholder={t.captionPlaceholder}
                    />
                  </div>
                  <Button type="button" variant="secondary" onClick={addGalleryImage} disabled={uploadingImage}>
                    {t.addImgButton}
                  </Button>
                </div>
              </div>
            </div>

            {/* Form Footer */}
            <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-800 pt-6">
              <Button type="button" variant="outline" onClick={() => setIsEditorOpen(false)}>
                {t.cancel}
              </Button>
              <Button type="submit">
                {t.saveProject}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        /* Project List Table */
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/60 dark:border-gray-800 overflow-hidden shadow-xs">
          {projects.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {t.noProjects}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/55 dark:bg-gray-800/40">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {t.colProject}
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {t.colSlug}
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {t.colStatus}
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {t.colFeatured}
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">
                      {t.colActions}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="relative w-12 h-8 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-850 shrink-0 border border-border/10">
                          <img
                            src={project.thumbnail_url || "/images/placeholder.png"}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white truncate max-w-[200px]">
                          {project.title}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {project.slug}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          project.status === "Completed"
                            ? "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400"
                            : project.status === "In Progress"
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                            : "bg-gray-50 dark:bg-gray-800/40 text-gray-700 dark:text-gray-400"
                        }`}>
                          {project.status === "Completed" ? t.statusCompleted : project.status === "In Progress" ? t.statusInProgress : t.statusArchived}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleFeatured(project)}
                          className={`p-2 rounded-xl transition-all cursor-pointer ${
                            project.is_featured
                              ? "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-500"
                              : "text-gray-300 dark:text-gray-700 hover:text-yellow-500"
                          }`}
                          title={project.is_featured ? "Remove featured flag" : "Set as featured project"}
                        >
                          <FaStar size={16} />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => openEdit(project)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-xl transition-colors cursor-pointer"
                          title="Edit project"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors cursor-pointer"
                          title="Delete project"
                        >
                          <FaTrash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      <Toaster />
    </div>
  );
}
