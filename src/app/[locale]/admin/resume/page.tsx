"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { FaBriefcase, FaGraduationCap, FaTrash, FaEdit, FaPlus, FaSave, FaTimes, FaUpload } from "react-icons/fa";
import { toast, Toaster } from "@/src/components/ui/toast";
import { useLocale } from "next-intl";

const translations = {
  en: {
    title: "Experience & Education CMS",
    subtitle: "Manage your historical timeline, roles, and school achievements",
    addEntry: "Add New Entry",
    tabExperience: "Work Experience",
    tabEducation: "Education & Credentials",
    editEntry: "Edit Timeline Entry",
    createEntry: "Create New Timeline Entry",
    companyName: "Company Name",
    logoUrl: "Company Logo URL (Optional)",
    roleEn: "Role Title (English)",
    roleVi: "Role Title (Vietnamese)",
    startDate: "Start Date",
    endDate: "End Date",
    isCurrentWork: "I currently work here",
    isCurrentStudy: "I currently study here",
    descEn: "Description (English)",
    descVi: "Description (Vietnamese)",
    eduDescEn: "Description / Specialization (English)",
    eduDescVi: "Description / Specialization (Vietnamese)",
    displayOrder: "Display Order",
    cancel: "Cancel",
    saveChanges: "Save Changes",
    historyExperience: "Work Experience History",
    historyEducation: "Education History",
    schoolNameEn: "School Name (English)",
    schoolNameVi: "School Name (Vietnamese)",
    degreeEn: "Degree / Certificate (English)",
    degreeVi: "Degree / Certificate (Vietnamese)",
    noExperience: "No work experiences found.",
    noEducation: "No education records found.",
    upload: "Upload",
    present: "Present",
  },
  vi: {
    title: "Quản lý Kinh nghiệm & Học vấn",
    subtitle: "Quản lý dòng lịch sử, vai trò và thành tích học tập của bạn",
    addEntry: "Thêm mục mới",
    tabExperience: "Kinh nghiệm làm việc",
    tabEducation: "Học vấn & Bằng cấp",
    editEntry: "Chỉnh sửa mục lịch sử",
    createEntry: "Tạo mục lịch sử mới",
    companyName: "Tên công ty",
    logoUrl: "Đường dẫn Logo công ty (Tùy chọn)",
    roleEn: "Tên vai trò (Tiếng Anh)",
    roleVi: "Tên vai trò (Tiếng Việt)",
    startDate: "Ngày bắt đầu",
    endDate: "Ngày kết thúc",
    isCurrentWork: "Tôi hiện đang làm việc ở đây",
    isCurrentStudy: "Tôi hiện đang học ở đây",
    descEn: "Mô tả công việc (Tiếng Anh)",
    descVi: "Mô tả công việc (Tiếng Việt)",
    eduDescEn: "Mô tả / Chuyên ngành (Tiếng Anh)",
    eduDescVi: "Mô tả / Chuyên ngành (Tiếng Việt)",
    displayOrder: "Thứ tự hiển thị",
    cancel: "Hủy",
    saveChanges: "Lưu thay đổi",
    historyExperience: "Lịch sử kinh nghiệm làm việc",
    historyEducation: "Lịch sử học vấn",
    schoolNameEn: "Tên trường học (Tiếng Anh)",
    schoolNameVi: "Tên trường học (Tiếng Việt)",
    degreeEn: "Bằng cấp / Chứng chỉ (Tiếng Anh)",
    degreeVi: "Bằng cấp / Chứng chỉ (Tiếng Việt)",
    noExperience: "Không tìm thấy kinh nghiệm làm việc nào.",
    noEducation: "Không tìm thấy hồ sơ học vấn nào.",
    upload: "Tải lên",
    present: "Hiện tại",
  }
};

interface Experience {
  id: string;
  company: string;
  logo_url: string;
  role_en: string;
  role_vi: string;
  description_en: string;
  description_vi: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  display_order: number;
}

interface Education {
  id: string;
  school_en: string;
  school_vi: string;
  degree_en: string;
  degree_vi: string;
  description_en: string;
  description_vi: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  display_order: number;
}

export default function AdminResumePage() {
  const locale = useLocale();
  const t = translations[locale === "vi" ? "vi" : "en"];

  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [logoUploading, setLogoUploading] = useState(false);

  // Lists
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educationList, setEducationList] = useState<Education[]>([]);

  // Form Dialog States
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Unified Form States
  const [expForm, setExpForm] = useState({
    company: "",
    logo_url: "",
    role_en: "",
    role_vi: "",
    description_en: "",
    description_vi: "",
    start_date: "",
    end_date: "",
    is_current: false,
    display_order: 0
  });

  const [eduForm, setEduForm] = useState({
    school_en: "",
    school_vi: "",
    degree_en: "",
    degree_vi: "",
    description_en: "",
    description_vi: "",
    start_date: "",
    end_date: "",
    is_current: false,
    display_order: 0
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const supabase = createClient() as any;
      const [expRes, eduRes] = await Promise.all([
        supabase.from("experiences").select("*").order("display_order", { ascending: true }),
        supabase.from("education").select("*").order("display_order", { ascending: true })
      ]);

      if (expRes.error) throw expRes.error;
      if (eduRes.error) throw eduRes.error;

      setExperiences(expRes.data || []);
      setEducationList(eduRes.data || []);
    } catch (err: any) {
      console.error("Fetch resume data error:", err);
      toast.error("Failed to load resume history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Logo Upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoUploading(true);
    try {
      const supabase = createClient();
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = `logos/${timestamp}-${safeName}`;

      const { error } = await supabase.storage
        .from("portfolio-assets")
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from("portfolio-assets")
        .getPublicUrl(filePath);

      setExpForm(prev => ({ ...prev, logo_url: publicUrl }));
      toast.success("Company logo uploaded successfully!");
    } catch (err: any) {
      console.error("Logo upload error:", err);
      toast.error(err.message || "Failed to upload logo. Ensure public 'portfolio-assets' bucket exists.");
    } finally {
      setLogoUploading(false);
    }
  };

  // Add/Edit trigger
  const handleAddNew = () => {
    setEditingId(null);
    if (activeTab === "experience") {
      setExpForm({
        company: "",
        logo_url: "",
        role_en: "",
        role_vi: "",
        description_en: "",
        description_vi: "",
        start_date: "",
        end_date: "",
        is_current: false,
        display_order: experiences.length > 0 ? Math.max(...experiences.map(e => e.display_order)) + 10 : 10
      });
    } else {
      setEduForm({
        school_en: "",
        school_vi: "",
        degree_en: "",
        degree_vi: "",
        description_en: "",
        description_vi: "",
        start_date: "",
        end_date: "",
        is_current: false,
        display_order: educationList.length > 0 ? Math.max(...educationList.map(e => e.display_order)) + 10 : 10
      });
    }
    setIsEditing(true);
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    if (activeTab === "experience") {
      const exp = item as Experience;
      setExpForm({
        company: exp.company,
        logo_url: exp.logo_url || "",
        role_en: exp.role_en,
        role_vi: exp.role_vi,
        description_en: exp.description_en || "",
        description_vi: exp.description_vi || "",
        start_date: exp.start_date || "",
        end_date: exp.end_date || "",
        is_current: exp.is_current || false,
        display_order: exp.display_order || 0
      });
    } else {
      const edu = item as Education;
      setEduForm({
        school_en: edu.school_en,
        school_vi: edu.school_vi,
        degree_en: edu.degree_en,
        degree_vi: edu.degree_vi,
        description_en: edu.description_en || "",
        description_vi: edu.description_vi || "",
        start_date: edu.start_date || "",
        end_date: edu.end_date || "",
        is_current: edu.is_current || false,
        display_order: edu.display_order || 0
      });
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  // Submit Experience or Education
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const supabase = createClient() as any;

      if (activeTab === "experience") {
        const payload = {
          company: expForm.company,
          logo_url: expForm.logo_url || null,
          role_en: expForm.role_en,
          role_vi: expForm.role_vi,
          description_en: expForm.description_en || null,
          description_vi: expForm.description_vi || null,
          start_date: expForm.start_date,
          end_date: expForm.is_current ? null : (expForm.end_date || null),
          is_current: expForm.is_current,
          display_order: Number(expForm.display_order)
        };

        if (editingId) {
          const { error } = await supabase.from("experiences").update(payload).eq("id", editingId);
          if (error) throw error;
          toast.success("Work experience updated!");
        } else {
          const { error } = await supabase.from("experiences").insert(payload);
          if (error) throw error;
          toast.success("Work experience added!");
        }
      } else {
        const payload = {
          school_en: eduForm.school_en,
          school_vi: eduForm.school_vi,
          degree_en: eduForm.degree_en,
          degree_vi: eduForm.degree_vi,
          description_en: eduForm.description_en || null,
          description_vi: eduForm.description_vi || null,
          start_date: eduForm.start_date,
          end_date: eduForm.is_current ? null : (eduForm.end_date || null),
          is_current: eduForm.is_current,
          display_order: Number(eduForm.display_order)
        };

        if (editingId) {
          const { error } = await supabase.from("education").update(payload).eq("id", editingId);
          if (error) throw error;
          toast.success("Education entry updated!");
        } else {
          const { error } = await supabase.from("education").insert(payload);
          if (error) throw error;
          toast.success("Education entry added!");
        }
      }

      setIsEditing(false);
      setEditingId(null);
      fetchData();
    } catch (err: any) {
      console.error("Submit error:", err);
      toast.error(err.message || "Failed to save details");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    setDeletingId(id);
    try {
      const supabase = createClient() as any;
      const table = activeTab === "experience" ? "experiences" : "education";
      const { error } = await supabase.from(table).delete().eq("id", id);

      if (error) throw error;
      toast.success("Deleted successfully!");
      fetchData();
    } catch (err: any) {
      console.error("Delete error:", err);
      toast.error("Failed to delete entry");
    } finally {
      setDeletingId(null);
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {t.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t.subtitle}
          </p>
        </div>
        {!isEditing && (
          <Button onClick={handleAddNew} className="flex items-center gap-2 self-start sm:self-center">
            <FaPlus size={14} />
            <span>{t.addEntry}</span>
          </Button>
        )}
      </div>

      {/* Tabs Menu */}
      {!isEditing && (
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab("experience")}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all cursor-pointer ${
              activeTab === "experience"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-white"
            }`}
          >
            <FaBriefcase size={14} />
            <span>{t.tabExperience}</span>
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all cursor-pointer ${
              activeTab === "education"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-white"
            }`}
          >
            <FaGraduationCap size={14} />
            <span>{t.tabEducation}</span>
          </button>
        </div>
      )}

      {/* Editing Form */}
      {isEditing && (
        <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-gray-200/50 dark:border-gray-800 space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-blue-600"></div>
          <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {editingId ? t.editEntry : t.createEntry}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              <FaTimes size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === "experience" ? (
              // EXPERIENCE FORM FIELDS
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={t.companyName}
                    value={expForm.company}
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    required
                  />

                  {/* Logo Upload */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {t.logoUrl}
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={expForm.logo_url}
                        onChange={(e) => setExpForm({ ...expForm, logo_url: e.target.value })}
                        placeholder="/images/logo.png"
                        className="flex-grow w-full px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-hidden transition-all"
                      />
                      <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-xs transition-colors shrink-0 flex items-center justify-center min-w-[90px] h-[46px] select-none">
                        {logoUploading ? "..." : t.upload}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={t.roleEn}
                    value={expForm.role_en}
                    onChange={(e) => setExpForm({ ...expForm, role_en: e.target.value })}
                    required
                  />
                  <Input
                    label={t.roleVi}
                    value={expForm.role_vi}
                    onChange={(e) => setExpForm({ ...expForm, role_vi: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                  <Input
                    label={t.startDate}
                    type="date"
                    value={expForm.start_date}
                    onChange={(e) => setExpForm({ ...expForm, start_date: e.target.value })}
                    required
                  />
                  <Input
                    label={t.endDate}
                    type="date"
                    value={expForm.end_date}
                    onChange={(e) => setExpForm({ ...expForm, end_date: e.target.value })}
                    disabled={expForm.is_current}
                    required={!expForm.is_current}
                  />
                  <label className="flex items-center gap-2 pb-3.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={expForm.is_current}
                      onChange={(e) => setExpForm({ ...expForm, is_current: e.target.checked })}
                      className="w-4.5 h-4.5 text-blue-600 border-gray-300 rounded-md focus:ring-blue-500"
                    />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {t.isCurrentWork}
                    </span>
                  </label>
                </div>

                <Textarea
                  label={t.descEn}
                  rows={4}
                  value={expForm.description_en}
                  onChange={(e) => setExpForm({ ...expForm, description_en: e.target.value })}
                  placeholder="Key contributions and achievements..."
                />
                <Textarea
                  label={t.descVi}
                  rows={4}
                  value={expForm.description_vi}
                  onChange={(e) => setExpForm({ ...expForm, description_vi: e.target.value })}
                  placeholder="Những đóng góp và thành tích chính..."
                />

                <div className="w-full sm:w-48">
                  <Input
                    label={t.displayOrder}
                    type="number"
                    value={expForm.display_order}
                    onChange={(e) => setExpForm({ ...expForm, display_order: Number(e.target.value) })}
                    required
                  />
                </div>
              </>
            ) : (
              // EDUCATION FORM FIELDS
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={t.schoolNameEn}
                    value={eduForm.school_en}
                    onChange={(e) => setEduForm({ ...eduForm, school_en: e.target.value })}
                    required
                  />
                  <Input
                    label={t.schoolNameVi}
                    value={eduForm.school_vi}
                    onChange={(e) => setEduForm({ ...eduForm, school_vi: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={t.degreeEn}
                    value={eduForm.degree_en}
                    onChange={(e) => setEduForm({ ...eduForm, degree_en: e.target.value })}
                    required
                  />
                  <Input
                    label={t.degreeVi}
                    value={eduForm.degree_vi}
                    onChange={(e) => setEduForm({ ...eduForm, degree_vi: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                  <Input
                    label={t.startDate}
                    type="date"
                    value={eduForm.start_date}
                    onChange={(e) => setEduForm({ ...eduForm, start_date: e.target.value })}
                    required
                  />
                  <Input
                    label={t.endDate}
                    type="date"
                    value={eduForm.end_date}
                    onChange={(e) => setEduForm({ ...eduForm, end_date: e.target.value })}
                    disabled={eduForm.is_current}
                    required={!eduForm.is_current}
                  />
                  <label className="flex items-center gap-2 pb-3.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={eduForm.is_current}
                      onChange={(e) => setEduForm({ ...eduForm, is_current: e.target.checked })}
                      className="w-4.5 h-4.5 text-blue-600 border-gray-300 rounded-md focus:ring-blue-500"
                    />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {t.isCurrentStudy}
                    </span>
                  </label>
                </div>

                <Textarea
                  label={t.eduDescEn}
                  rows={4}
                  value={eduForm.description_en}
                  onChange={(e) => setEduForm({ ...eduForm, description_en: e.target.value })}
                  placeholder="GPA, key courses, research projects..."
                />
                <Textarea
                  label={t.eduDescVi}
                  rows={4}
                  value={eduForm.description_vi}
                  onChange={(e) => setEduForm({ ...eduForm, description_vi: e.target.value })}
                  placeholder="Điểm số, các môn chính, dự án nghiên cứu..."
                />

                <div className="w-full sm:w-48">
                  <Input
                    label={t.displayOrder}
                    type="number"
                    value={eduForm.display_order}
                    onChange={(e) => setEduForm({ ...eduForm, display_order: Number(e.target.value) })}
                    required
                  />
                </div>
              </>
            )}

            {/* Form Footer Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              <Button type="button" variant="secondary" onClick={handleCancel}>
                {t.cancel}
              </Button>
              <Button type="submit" isLoading={saving} className="flex items-center gap-2">
                <FaSave size={14} />
                <span>{t.saveChanges}</span>
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Lists Section */}
      {!isEditing && (
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
            {activeTab === "experience" ? (
              <>
                <FaBriefcase className="text-blue-500 text-xl" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.historyExperience}</h2>
              </>
            ) : (
              <>
                <FaGraduationCap className="text-blue-500 text-xl" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.historyEducation}</h2>
              </>
            )}
          </div>

          {activeTab === "experience" ? (
            /* EXPERIENCE LIST */
            <div className="space-y-6">
              {experiences.length === 0 ? (
                <p className="text-sm text-gray-400 italic py-4">{t.noExperience}</p>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="py-5 flex flex-col md:flex-row md:items-start justify-between gap-6 group">
                      <div className="flex items-start gap-4 min-w-0">
                        {exp.logo_url ? (
                          <img
                            src={exp.logo_url}
                            alt={exp.company}
                            className="w-12 h-12 rounded-xl object-contain border border-gray-100 dark:border-gray-800 shrink-0 bg-white"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 shrink-0 flex items-center justify-center text-gray-400 text-xs font-bold uppercase">
                            {exp.company.substring(0, 2)}
                          </div>
                        )}
                        <div className="min-w-0 space-y-1">
                          <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                            {exp.role_en} / {exp.role_vi}
                          </h3>
                          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                            {exp.company}
                          </p>
                          <p className="text-xs text-gray-400">
                            {exp.start_date} &rarr; {exp.is_current ? t.present : exp.end_date}
                          </p>
                          {exp.description_en && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed max-w-3xl line-clamp-2">
                              {exp.description_en}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 self-end md:self-start shrink-0 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(exp)}
                          className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all cursor-pointer"
                          title="Edit Entry"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(exp.id)}
                          disabled={deletingId === exp.id}
                          className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all cursor-pointer"
                          title="Delete Entry"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* EDUCATION LIST */
            <div className="space-y-6">
              {educationList.length === 0 ? (
                <p className="text-sm text-gray-400 italic py-4">{t.noEducation}</p>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {educationList.map((edu) => (
                    <div key={edu.id} className="py-5 flex flex-col md:flex-row md:items-start justify-between gap-6 group">
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 shrink-0 flex items-center justify-center text-blue-500 text-lg">
                          <FaGraduationCap />
                        </div>
                        <div className="min-w-0 space-y-1">
                          <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                            {edu.degree_en} / {edu.degree_vi}
                          </h3>
                          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                            {edu.school_en} / {edu.school_vi}
                          </p>
                          <p className="text-xs text-gray-400">
                            {edu.start_date} &rarr; {edu.is_current ? t.present : edu.end_date}
                          </p>
                          {edu.description_en && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed max-w-3xl line-clamp-2">
                              {edu.description_en}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 self-end md:self-start shrink-0 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(edu)}
                          className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all cursor-pointer"
                          title="Edit Entry"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(edu.id)}
                          disabled={deletingId === edu.id}
                          className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all cursor-pointer"
                          title="Delete Entry"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <Toaster />
    </div>
  );
}
