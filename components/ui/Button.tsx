// components/ui/button.tsx
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "lg" | "sm";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      default: "bg-purple-600 text-white hover:bg-purple-700",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    };
    
    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      lg: "h-12 px-8 py-3 text-base",
      sm: "h-8 px-3 py-1 text-xs",
    };
    
    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };