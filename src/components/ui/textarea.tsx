import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full px-4 py-3 text-sm rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-hidden transition-all resize-none ${
            error
              ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
