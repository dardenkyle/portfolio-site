import { Link } from "react-router-dom";
import { useRandomGlow } from "@/hooks/useRandomGlow";
import {
  trackCTAClick,
  trackDownload,
  trackExternalLink,
  trackInternalNavigation,
} from "@/utils/analytics";

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
  // Analytics props
  trackingLabel?: string; // Custom label for analytics
  trackingCategory?: string; // Custom category for CTAs
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
  trackingLabel,
  trackingCategory,
}: ButtonProps) {
  if (href && to) {
    throw new Error(
      "Button component cannot have both 'href' and 'to' props at the same time."
    );
  }
  const { handleMouseEnter, handleMouseLeave, getGlowClass } = useRandomGlow();

  // Get current page path safely
  const getCurrentPage = () => {
    try {
      return window.location.pathname;
    } catch {
      return "/";
    }
  };

  // Helper to get button text for analytics
  const getButtonText = () => {
    if (trackingLabel) return trackingLabel;
    if (typeof children === "string") return children;
    return "Button"; // fallback
  };

  // Helper to determine if this is a download link
  const isDownloadLink = (url: string) => {
    return (
      url.includes(".pdf") ||
      url.includes("/download") ||
      url.includes("resume")
    );
  };

  // Helper to track clicks based on button type
  const handleClick = () => {
    const buttonText = getButtonText();
    const currentPage = getCurrentPage();

    if (href) {
      // External link or download
      if (isDownloadLink(href)) {
        const fileName = href.split("/").pop() || "unknown";
        const fileType = fileName.split(".").pop()?.toUpperCase() || "FILE";
        trackDownload(fileName, fileType, currentPage);
      } else {
        // External link (GitHub, LinkedIn, etc.)
        const linkType = href.includes("github")
          ? "social"
          : href.includes("linkedin")
          ? "social"
          : href.includes("http")
          ? "project"
          : "other";
        trackExternalLink(href, buttonText, linkType);
      }
    } else if (to) {
      // Internal navigation
      trackInternalNavigation(currentPage, to, "button_click");
      trackCTAClick(buttonText, currentPage, { destination: to });
    } else {
      // Regular button click
      trackCTAClick(buttonText, currentPage, {
        category: trackingCategory || "button_action",
      });
    }

    // Call original onClick if provided
    if (onClick) {
      onClick();
    }
  };

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
        onClick={handleClick}
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
        onClick={handleClick}
      >
        {children}
      </Link>
    );
  }

  // Regular button
  return (
    <button
      onClick={handleClick}
      className={buttonClasses}
      onMouseEnter={handleMouseEnterWithGlow}
      onMouseLeave={useGlow ? handleMouseLeave : undefined}
    >
      {children}
    </button>
  );
}
