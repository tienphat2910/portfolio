"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { Button } from "@/src/components/ui/button";
import { FaEnvelopeOpen, FaEnvelope, FaArchive, FaTrash, FaInbox, FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";
import { toast } from "@/src/components/ui/toast";

interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string | null; // 'unread', 'read', 'archived'
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"inbox" | "archived">("inbox");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const supabase = createClient() as any;
      
      const baseQuery = supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      const { data, error } = await (filter === "inbox"
        ? baseQuery.in("status", ["unread", "read"])
        : baseQuery.eq("status", "archived"));

      if (error) throw error;
      const typedData = data as ContactMessage[] | null;
      setMessages(typedData || []);
      
      // Auto select the first message if available and none selected
      if (typedData && typedData.length > 0 && !selectedMessage) {
        setSelectedMessage(typedData[0]);
        if (typedData[0].status === "unread") {
          markAsRead(typedData[0].id);
        }
      }
    } catch (err) {
      console.error("Load messages error:", err);
      toast.error("Failed to load messages inbox");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSelectedMessage(null);
    loadMessages();
  }, [filter]);

  const markAsRead = async (id: string) => {
    try {
      const supabase = createClient() as any;
      const { error } = await supabase
        .from("contact_messages")
        .update({ status: "read" })
        .eq("id", id);

      if (error) throw error;
      
      // Update local state quietly
      setMessages(prev =>
        prev.map(msg => (msg.id === id ? { ...msg, status: "read" } : msg))
      );
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  const toggleReadStatus = async (msg: ContactMessage) => {
    const newStatus = msg.status === "unread" ? "read" : "unread";
    try {
      const supabase = createClient() as any;
      const { error } = await supabase
        .from("contact_messages")
        .update({ status: newStatus })
        .eq("id", msg.id);

      if (error) throw error;
      toast.success(newStatus === "read" ? "Marked as read" : "Marked as unread");
      
      // Update local states
      setMessages(prev =>
        prev.map(m => (m.id === msg.id ? { ...m, status: newStatus } : m))
      );
      if (selectedMessage?.id === msg.id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    }
  };

  const archiveMessage = async (id: string) => {
    try {
      const supabase = createClient() as any;
      const { error } = await supabase
        .from("contact_messages")
        .update({ status: "archived" })
        .eq("id", id);

      if (error) throw error;
      toast.success("Message archived");
      
      // Select another message if the archived one was selected
      if (selectedMessage?.id === id) {
        const nextMsg = messages.find(msg => msg.id !== id);
        setSelectedMessage(nextMsg || null);
      }
      
      setMessages(prev => prev.filter(msg => msg.id !== id));
    } catch (err: any) {
      toast.error(err.message || "Failed to archive message");
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message permanently?")) return;

    try {
      const supabase = createClient() as any;
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Message permanently deleted");
      
      if (selectedMessage?.id === id) {
        const nextMsg = messages.find(msg => msg.id !== id);
        setSelectedMessage(nextMsg || null);
      }
      
      setMessages(prev => prev.filter(msg => msg.id !== id));
    } catch (err: any) {
      toast.error(err.message || "Failed to delete message");
    }
  };

  const selectMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (msg.status === "unread") {
      markAsRead(msg.id);
    }
  };

  const formatDateTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Contact Inbox
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Review and manage client contact form submissions
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200/40 dark:border-gray-700/60">
          <button
            onClick={() => setFilter("inbox")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              filter === "inbox"
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <FaInbox size={12} /> Active Inbox
          </button>
          <button
            onClick={() => setFilter("archived")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              filter === "archived"
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <FaArchive size={12} /> Archived
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Messages List (Left Column, Span 1) */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-800 overflow-hidden shadow-xs h-[650px] flex flex-col">
          <div className="p-4 bg-gray-50/50 dark:bg-gray-800/20 border-b border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-gray-700 dark:text-gray-300 text-sm">
              {filter === "inbox" ? "Active Messages" : "Archived Messages"}
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-12 text-sm text-gray-500">
                No messages found.
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => selectMessage(msg)}
                  className={`p-4 cursor-pointer hover:bg-gray-50/70 dark:hover:bg-gray-800/10 transition-colors ${
                    selectedMessage?.id === msg.id
                      ? "bg-blue-50/50 dark:bg-blue-900/10 border-l-4 border-blue-500"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-bold text-sm text-gray-900 dark:text-white truncate max-w-[120px]">
                      {msg.name}
                    </span>
                    <span className="text-[10px] text-gray-400 shrink-0 font-medium">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className={`text-xs mt-1 truncate ${msg.status === "unread" ? "font-bold text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                    {msg.subject || "(No Subject)"}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-1 font-medium">
                    {msg.message}
                  </p>
                  {msg.status === "unread" && (
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Details (Right Column, Span 2) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-800 shadow-xs h-[650px] flex flex-col">
          {selectedMessage ? (
            <div className="p-6 sm:p-8 flex flex-col h-full space-y-6">
              {/* Header Details */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    {selectedMessage.subject || "(No Subject)"}
                  </h2>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 dark:text-white">{selectedMessage.name}</span>
                      <span>&lt;{selectedMessage.email}&gt;</span>
                    </div>
                    {selectedMessage.phone && (
                      <div className="flex items-center gap-1.5">
                        <FaPhoneAlt size={11} className="text-gray-400" />
                        <a href={`tel:${selectedMessage.phone}`} className="hover:underline hover:text-blue-500">
                          {selectedMessage.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <FaCalendarAlt size={12} className="text-gray-400" />
                      <span>{formatDateTime(selectedMessage.created_at)}</span>
                    </div>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleReadStatus(selectedMessage)}
                    className="p-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl transition-all border border-border/10 cursor-pointer"
                    title={selectedMessage.status === "unread" ? "Mark as read" : "Mark as unread"}
                  >
                    {selectedMessage.status === "unread" ? <FaEnvelopeOpen size={14} /> : <FaEnvelope size={14} />}
                  </button>
                  {selectedMessage.status !== "archived" && (
                    <button
                      onClick={() => archiveMessage(selectedMessage.id)}
                      className="p-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-yellow-600 rounded-xl transition-all border border-border/10 cursor-pointer"
                      title="Archive message"
                    >
                      <FaArchive size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="p-2.5 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 text-red-600 rounded-xl transition-all border border-red-200/10 cursor-pointer"
                    title="Delete permanently"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>

              {/* Message Content Body */}
              <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 p-6 rounded-2xl border border-gray-200/40 dark:border-gray-800/80">
                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Reply shortcut helper */}
              <div className="flex justify-end pt-4">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || "Portfolio Contact"}`}
                  className="inline-flex items-center gap-2 py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <FaEnvelope /> Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
              <FaInbox size={48} className="text-gray-300" />
              <p className="text-sm font-semibold">Select a message to view its details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
