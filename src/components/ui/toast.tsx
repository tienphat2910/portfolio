"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle, FaTimes, FaSpinner } from "react-icons/fa";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "loading" | "default";
  title?: string;
  message: string;
  duration?: number;
}

let toastCount = 0;
const listeners = new Set<(toasts: ToastMessage[]) => void>();
let globalToasts: ToastMessage[] = [];
const activeTimers = new Map<string, NodeJS.Timeout>();

const updateListeners = () => {
  listeners.forEach((listener) => listener([...globalToasts]));
};

export const toast = {
  custom: (
    message: string,
    options?: { id?: string; type?: "success" | "error" | "loading" | "default"; title?: string; duration?: number }
  ) => {
    const type = options?.type ?? "default";
    const duration = options?.duration ?? (type === "loading" ? Infinity : 4000);
    const id = options?.id ?? `toast-${toastCount++}`;

    // Clear existing timer if updating a toast
    if (activeTimers.has(id)) {
      clearTimeout(activeTimers.get(id)!);
      activeTimers.delete(id);
    }

    const existingIndex = globalToasts.findIndex((t) => t.id === id);

    if (existingIndex > -1) {
      globalToasts[existingIndex] = {
        id,
        type,
        title: options?.title ?? globalToasts[existingIndex].title,
        message,
        duration
      };
    } else {
      globalToasts.push({
        id,
        type,
        title: options?.title,
        message,
        duration
      });
    }

    updateListeners();

    if (duration !== Infinity) {
      const timer = setTimeout(() => {
        toast.dismiss(id);
      }, duration);
      activeTimers.set(id, timer);
    }

    return id;
  },
  success: (message: string, options?: { id?: string; title?: string; duration?: number }) => {
    return toast.custom(message, { ...options, type: "success" });
  },
  error: (message: string, options?: { id?: string; title?: string; duration?: number }) => {
    return toast.custom(message, { ...options, type: "error" });
  },
  loading: (message: string, options?: { id?: string; title?: string }) => {
    return toast.custom(message, { ...options, type: "loading" });
  },
  dismiss: (id: string) => {
    if (activeTimers.has(id)) {
      clearTimeout(activeTimers.get(id)!);
      activeTimers.delete(id);
    }
    globalToasts = globalToasts.filter((t) => t.id !== id);
    updateListeners();
  }
};

export const Toaster: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const listener = (newToasts: ToastMessage[]) => {
      setToasts(newToasts);
    };
    listeners.add(listener);
    setToasts([...globalToasts]);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
            layout
            className="pointer-events-auto w-full bg-white/95 dark:bg-gray-900/95 border border-gray-200/70 dark:border-gray-800 shadow-xl rounded-2xl p-4 flex gap-3 items-start select-none backdrop-blur-md"
          >
            {t.type === "success" && (
              <FaCheckCircle className="text-emerald-500 shrink-0 mt-0.5 text-lg" />
            )}
            {t.type === "error" && (
              <FaExclamationCircle className="text-red-500 shrink-0 mt-0.5 text-lg" />
            )}
            {t.type === "loading" && (
              <FaSpinner className="text-blue-500 shrink-0 mt-0.5 text-lg animate-spin" />
            )}

            <div className="flex-1 min-w-0">
              {t.title && (
                <h5 className="text-sm font-extrabold text-gray-900 dark:text-white leading-tight">
                  {t.title}
                </h5>
              )}
              <p className="text-xs text-gray-600 dark:text-gray-300 font-semibold leading-relaxed mt-0.5">
                {t.message}
              </p>
            </div>

            <button
              onClick={() => toast.dismiss(t.id)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg transition-colors cursor-pointer"
            >
              <FaTimes size={12} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
