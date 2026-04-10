import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant: ButtonVariant;
  size: ButtonSize;
  children: React.ReactNode;
  className?: string;
  href?: string;
}

type ButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: string;
  };

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#14a1c8] text-white hover:bg-[#107f9e]",
  secondary: "bg-[#242728] text-white hover:bg-[#303436]",
  outline:
    "border-2 border-[#14a1c8] text-[#14a1c8] hover:bg-[#14a1c8]/10",
  ghost: "text-[#303436] hover:bg-black/5",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3 text-lg",
};

const baseClasses =
  "rounded-lg font-semibold transition-colors inline-flex items-center justify-center";

export function Button({
  variant,
  size,
  children,
  className = "",
  href,
  ...rest
}: ButtonProps) {
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
