import React from "react";

type BadgeVariant = "primary" | "success" | "warning" | "info";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-[#14a1c8]/10 text-[#14a1c8]",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  info: "bg-blue-100 text-blue-700",
};

export default function Badge({
  children,
  variant = "primary",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-full inline-flex items-center ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
