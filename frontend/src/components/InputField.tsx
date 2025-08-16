import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  clearable?: boolean;
}

const sizeClasses = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:border-indigo-500",
  outlined: "border border-gray-400 dark:border-gray-600 focus:border-indigo-600",
  ghost: "border-b border-gray-400 dark:border-gray-600 focus:border-indigo-500 bg-transparent",
};

export const InputField: React.FC<InputFieldProps> = ({
  value = "",
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="w-full flex flex-col gap-2">
      {label && <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">{label}</label>}
      <motion.div whileFocus={{ scale: 1.02 }} className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-xl outline-none transition-all duration-300 shadow-sm
            ${sizeClasses[size]} ${variantClasses[variant]}
            ${invalid ? "border-red-500 bg-red-50 dark:bg-red-900/30" : ""}
            ${disabled ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed" : ""}
            focus:ring-2 focus:ring-indigo-400 focus:shadow-lg`}
        />
        {clearable && value && (
          <button
            type="button"
            onClick={() => onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
          >
            {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        )}
      </motion.div>
      <AnimatePresence>
        {helperText && !invalid && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </motion.span>
        )}
        {invalid && errorMessage && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-red-500"
          >
            {errorMessage}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};