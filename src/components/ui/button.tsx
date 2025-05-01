import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",
          // Variant styles
          variant === "default" && "bg-blue-600 text-white hover:bg-blue-700",
          variant === "outline" && "border border-slate-600 bg-transparent hover:bg-slate-700 hover:text-white",
          variant === "ghost" && "bg-transparent hover:bg-slate-700 hover:text-white",
          variant === "link" && "bg-transparent text-slate-300 underline-offset-4 hover:underline",
          // Size styles
          size === "default" && "h-9 px-4 py-2",
          size === "sm" && "h-8 px-3 py-1 text-xs",
          size === "lg" && "h-10 px-8 text-base",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button"; 