"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { FaTrash, FaEdit, FaPlus, FaSave, FaTimes, FaLayerGroup, FaSearch, FaCheck } from "react-icons/fa";
import { toast, Toaster } from "@/src/components/ui/toast";
import { useLocale } from "next-intl";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon_class: string;
  display_order: number;
}

import { POPULAR_ICONS } from "@/src/lib/constants/icons";

const translations = {
  en: {
    title: "Skills & Expertise CMS",
    subtitle: "Manage your technical skillsets, proficiency levels, and select brand icons to showcase on your site",
    addSkill: "Add New Skill",
    editSkill: "Edit Skill Details",
    createSkill: "Create New Skill",
    skillName: "Skill Name",
    skillNamePlaceholder: "e.g. React, Docker, Python",
    category: "Category",
    proficiency: "Proficiency Level (%)",
    selectIcon: "Select Icon",
    searchIcons: "Search icons (e.g. React)...",
    noIcons: "No matching technology icons found.",
    customClass: "Or enter custom class if not listed above",
    displayOrder: "Display Order",
    cancel: "Cancel",
    saveSkill: "Save Skill",
    noSkills: "No skills in this category yet.",
    categories: {
      "Frontend": "Frontend",
      "Backend": "Backend",
      "Database": "Database",
      "Tools & Others": "Tools & Others"
    },
    confirmDelete: "Are you sure you want to delete this skill?",
    fetchError: "Failed to load skills list",
    validationError: "Name and Category are required",
    updateSuccess: "Skill updated successfully",
    addSuccess: "New skill added successfully",
    saveError: "Failed to save skill details",
    deleteSuccess: "Skill deleted successfully",
    deleteError: "Failed to delete skill"
  },
  vi: {
    title: "Quản lý Kỹ năng & Chuyên môn",
    subtitle: "Quản lý các bộ kỹ năng kỹ thuật, mức độ thành thạo và chọn các biểu tượng để hiển thị trên trang web của bạn",
    addSkill: "Thêm kỹ năng mới",
    editSkill: "Chỉnh sửa thông tin kỹ năng",
    createSkill: "Tạo kỹ năng mới",
    skillName: "Tên kỹ năng",
    skillNamePlaceholder: "Ví dụ: React, Docker, Python",
    category: "Danh mục",
    proficiency: "Mức độ thành thạo (%)",
    selectIcon: "Chọn biểu tượng",
    searchIcons: "Tìm kiếm biểu tượng (ví dụ: React)...",
    noIcons: "Không tìm thấy biểu tượng công nghệ phù hợp.",
    customClass: "Hoặc nhập lớp CSS tùy chỉnh nếu không có trong danh sách trên",
    displayOrder: "Thứ tự hiển thị",
    cancel: "Hủy",
    saveSkill: "Lưu kỹ năng",
    noSkills: "Chưa có kỹ năng nào trong danh mục này.",
    categories: {
      "Frontend": "Frontend",
      "Backend": "Backend",
      "Database": "Cơ sở dữ liệu",
      "Tools & Others": "Công cụ & Khác"
    },
    confirmDelete: "Bạn có chắc chắn muốn xóa kỹ năng này không?",
    fetchError: "Không thể tải danh sách kỹ năng",
    validationError: "Tên và Danh mục là bắt buộc",
    updateSuccess: "Cập nhật kỹ năng thành công",
    addSuccess: "Thêm kỹ năng mới thành công",
    saveError: "Không thể lưu thông tin kỹ năng",
    deleteSuccess: "Xóa kỹ năng thành công",
    deleteError: "Không thể xóa kỹ năng"
  }
};

export default function AdminSkillsPage() {
  const locale = useLocale();
  const t = translations[locale === "vi" ? "vi" : "en"];

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    level: 80,
    icon_class: "",
    display_order: 0
  });

  const [iconSearch, setIconSearch] = useState("");

  const categories = ["Frontend", "Backend", "Database", "Tools & Others"];

  // Fetch Skills
  const fetchSkills = async () => {
    try {
      const supabase = createClient() as any;
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("display_order", { ascending: true })
        .order("category", { ascending: true });

      if (error) throw error;
      setSkills(data || []);
    } catch (err: any) {
      console.error("Error fetching skills:", err);
      toast.error(t.fetchError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon_class: skill.icon_class || "",
      display_order: skill.display_order || 0
    });
    setIconSearch("");
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      name: "",
      category: "Frontend",
      level: 80,
      icon_class: "",
      display_order: skills.length > 0 ? Math.max(...skills.map(s => s.display_order || 0)) + 10 : 10
    });
    setIconSearch("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category.trim()) {
      toast.error(t.validationError);
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient() as any;
      
      if (editingId) {
        // Update
        const { error } = await supabase
          .from("skills")
          .update({
            name: formData.name,
            category: formData.category,
            level: Number(formData.level),
            icon_class: formData.icon_class,
            display_order: Number(formData.display_order)
          })
          .eq("id", editingId);

        if (error) throw error;
        toast.success(t.updateSuccess);
      } else {
        // Create
        const { error } = await supabase
          .from("skills")
          .insert({
            name: formData.name,
            category: formData.category,
            level: Number(formData.level),
            icon_class: formData.icon_class,
            display_order: Number(formData.display_order)
          });

        if (error) throw error;
        toast.success(t.addSuccess);
      }

      setIsEditing(false);
      setEditingId(null);
      fetchSkills();
    } catch (err: any) {
      console.error("Save error:", err);
      toast.error(err.message || t.saveError);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;

    setDeletingId(id);
    try {
      const supabase = createClient() as any;
      const { error } = await supabase
        .from("skills")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success(t.deleteSuccess);
      fetchSkills();
    } catch (err: any) {
      console.error("Delete error:", err);
      toast.error(t.deleteError);
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered popular icons
  const filteredIcons = POPULAR_ICONS.filter((icon) =>
    icon.name.toLowerCase().includes(iconSearch.toLowerCase())
  );

  const selectIcon = (iconClass: string, iconName: string) => {
    setFormData((prev) => ({
      ...prev,
      icon_class: iconClass,
      name: prev.name ? prev.name : iconName // Auto-populate name if empty
    }));
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
      {/* Title Header */}
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
            <span>{t.addSkill}</span>
          </Button>
        )}
      </div>

      {/* Editing Form Section */}
      {isEditing && (
        <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-gray-200/50 dark:border-gray-800 space-y-6 shadow-xl relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-blue-600"></div>
          <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {editingId ? t.editSkill : t.createSkill}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              <FaTimes size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Top Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label={t.skillName}
                placeholder={t.skillNamePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <div className="w-full space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {t.category}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-hidden transition-all"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {t.categories[cat as keyof typeof t.categories] || cat}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label={t.proficiency}
                type="number"
                min="0"
                max="100"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                required
              />
            </div>

            {/* Icon Selection Helper */}
            <div className="space-y-3 border border-gray-100 dark:border-gray-800/80 p-5 rounded-2xl bg-gray-50/50 dark:bg-gray-950/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t.selectIcon}
                  </div>
                  {formData.icon_class && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-semibold">
                      {formData.icon_class.startsWith("/") || formData.icon_class.includes(".svg") ? (
                        <img src={formData.icon_class} alt="icon" className="w-4 h-4 object-contain" />
                      ) : (
                        <i className={`${formData.icon_class} text-sm`} />
                      )}
                      <span>{formData.icon_class}</span>
                    </div>
                  )}
                </div>
                
                {/* Icon Search */}
                <div className="relative w-full sm:w-64">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaSearch size={12} />
                  </span>
                  <input
                    type="text"
                    placeholder={t.searchIcons}
                    value={iconSearch}
                    onChange={(e) => setIconSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-hidden transition-all"
                  />
                </div>
              </div>

              {/* Grid Layout of Clickable Icons */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-52 overflow-y-auto p-2 border border-gray-200/40 dark:border-gray-800/40 rounded-xl bg-white dark:bg-gray-900/50 scrollbar-thin">
                {filteredIcons.map((icon) => {
                  const isSelected = formData.icon_class === icon.class;
                  return (
                    <button
                      key={icon.class}
                      type="button"
                      onClick={() => selectIcon(icon.class, icon.name)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer group hover:scale-105 ${
                        isSelected
                          ? "bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400 shadow-xs"
                          : "bg-gray-50/50 dark:bg-gray-800/30 border-gray-200/50 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {icon.class.startsWith("/") || icon.class.includes(".svg") ? (
                        <img src={icon.class} alt={icon.name} className="w-8 h-8 object-contain group-hover:scale-110 transition-transform" />
                      ) : (
                        <i className={`${icon.class} text-2xl group-hover:scale-110 transition-transform`} />
                      )}
                      <span className="text-[10px] font-semibold mt-2 truncate w-full text-center">
                        {icon.name}
                      </span>
                      {isSelected && (
                        <span className="absolute top-1 right-1 text-[8px] bg-blue-500 text-white rounded-full p-0.5">
                          <FaCheck size={6} />
                        </span>
                      )}
                    </button>
                  );
                })}
                {filteredIcons.length === 0 && (
                  <div className="col-span-full py-8 text-center text-xs text-gray-400 dark:text-gray-500 italic">
                    {t.noIcons}
                  </div>
                )}
              </div>

              {/* Custom Class field as fallback */}
              <div className="pt-2">
                <Input
                  label={t.customClass}
                  placeholder="e.g. devicon-nodejs-plain"
                  value={formData.icon_class}
                  onChange={(e) => setFormData({ ...formData, icon_class: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>

            {/* Display Order & Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="w-full sm:w-48">
                <Input
                  label={t.displayOrder}
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="flex gap-3 self-end sm:self-center">
                <Button type="button" variant="secondary" onClick={handleCancel}>
                  {t.cancel}
                </Button>
                <Button type="submit" isLoading={saving} className="flex items-center gap-2">
                  <FaSave size={14} />
                  <span>{t.saveSkill}</span>
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {categories.map((category) => {
          const catSkills = skills.filter((s) => s.category === category);
          return (
            <div
              key={category}
              className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200/50 dark:border-gray-800 space-y-4"
            >
              <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
                <FaLayerGroup className="text-blue-500" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t.categories[category as keyof typeof t.categories] || category} ({catSkills.length})
                </h2>
              </div>

              {catSkills.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500 py-4 italic">
                  {t.noSkills}
                </p>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {catSkills.map((skill) => (
                    <div key={skill.id} className="py-4 flex items-center justify-between gap-4 group">
                      <div className="flex items-center gap-3 min-w-0">
                        {skill.icon_class ? (
                          <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700 shrink-0">
                            {skill.icon_class.startsWith("/") || skill.icon_class.includes(".svg") ? (
                              <img src={skill.icon_class} alt={skill.name} className="w-6 h-6 object-contain" />
                            ) : (
                              <i className={`${skill.icon_class} text-xl`} />
                            )}
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-gray-700 shrink-0 text-xs font-bold uppercase">
                            {skill.name.substring(0, 2)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {skill.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-md font-mono">
                              Order: {skill.display_order}
                            </span>
                            <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md font-semibold">
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(skill)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all cursor-pointer"
                          title="Edit Skill"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(skill.id)}
                          disabled={deletingId === skill.id}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all cursor-pointer"
                          title="Delete Skill"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Toaster />
    </div>
  );
}
