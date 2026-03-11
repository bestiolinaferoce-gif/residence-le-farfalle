"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "whatsapp" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variantClasses = {
  primary: [
    "bg-amber-500 hover:bg-amber-400",
    "text-stone-900 font-semibold",
    "shadow-md shadow-amber-500/20",
    "hover:shadow-lg hover:shadow-amber-500/30",
    "hover:scale-[1.02] hover:-translate-y-0.5",
    "active:scale-[0.98]",
    "transition-all duration-200 ease-out",
    "rounded-xl",
  ].join(" "),
  secondary: [
    "bg-white border border-stone-200",
    "text-stone-800 font-semibold",
    "hover:bg-stone-50 hover:border-stone-300",
    "hover:scale-[1.02] hover:-translate-y-0.5",
    "transition-all duration-200 ease-out",
    "rounded-xl shadow-sm",
  ].join(" "),
  ghost: [
    "bg-transparent text-stone-700",
    "hover:bg-stone-100",
    "transition-all duration-150",
    "rounded-lg",
  ].join(" "),
  outline: [
    "border border-white/30 bg-white/10",
    "text-white font-semibold",
    "hover:bg-white/20 hover:border-white/50",
    "transition-all duration-200",
    "rounded-xl",
  ].join(" "),
  whatsapp: [
    "bg-gradient-to-r from-[#25D366] to-[#128C7E]",
    "text-white font-semibold",
    "shadow-md shadow-green-500/20",
    "hover:shadow-lg hover:scale-[1.02]",
    "transition-all duration-200",
    "rounded-xl",
  ].join(" "),
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-3.5 text-base",
  xl: "px-10 py-5 text-lg",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      icon,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
