import { Link } from "react-router-dom";
import { useRandomGlow } from "@/hooks/useRandomGlow";

type ButtonVariant = "primary" | "secondary" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  to?: string;
  onClick?: () => void;
  className?: string;
  useGlow?: boolean;
  glowKey?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  to,
  onClick,
  className = "",
  useGlow = false,
  glowKey = "",
}: ButtonProps) {
  const { handleMouseEnter, handleMouseLeave, getGlowClass } = useRandomGlow();

  // Base styles matching ProjectCard
  const baseStyles =
    "inline-flex items-center justify-center rounded-2xl shadow transition-all duration-100 font-medium";

  // Size variants
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3",
    lg: "px-6 py-4 text-lg",
  };

  // Style variants
  const variants = {
    primary: "text-white",
    secondary: "text-white",
    link: "text-white opacity-80 hover:opacity-100",
  };

  // Combine classes
  const buttonClasses = `
    ${baseStyles} 
    ${sizes[size]} 
    ${variants[variant]} 
    ${useGlow ? getGlowClass(glowKey) : ""} 
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  // Event handlers
  const handleMouseEnterWithGlow = () => {
    if (useGlow && glowKey) {
      handleMouseEnter(glowKey);
    }
  };

  // External link
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        onMouseEnter={handleMouseEnterWithGlow}
        onMouseLeave={useGlow ? handleMouseLeave : undefined}
      >
        {children}
      </a>
    );
  }

  // Internal link
  if (to) {
    return (
      <Link
        to={to}
        className={buttonClasses}
        onMouseEnter={handleMouseEnterWithGlow}
        onMouseLeave={useGlow ? handleMouseLeave : undefined}
      >
        {children}
      </Link>
    );
  }

  // Regular button
  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      onMouseEnter={handleMouseEnterWithGlow}
      onMouseLeave={useGlow ? handleMouseLeave : undefined}
    >
      {children}
    </button>
  );
}
