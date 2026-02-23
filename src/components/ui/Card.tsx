"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "soft" | "medium" | "hard";
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, padding = "md", shadow = "soft", className, children, ...props }, ref) => {
    const paddingStyles = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const shadowStyles = {
      none: "",
      soft: "shadow-soft",
      medium: "shadow-medium",
      hard: "shadow-hard",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-white rounded-xl border border-neutral-200 transition-all duration-300",
          paddingStyles[padding],
          shadowStyles[shadow],
          hover && "hover:shadow-medium hover:-translate-y-1 cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
