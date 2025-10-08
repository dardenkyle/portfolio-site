import { useState } from "react";
import { getRandomShadowColor } from "@/utils/colors";

export function useRandomGlow() {
  const [glowColors, setGlowColors] = useState<Record<string, string>>({});
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMouseEnter = (key: string) => {
    setGlowColors((prev) => ({
      ...prev,
      [key]: getRandomShadowColor(),
    }));
    setHoveredItem(key);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const getGlowClass = (key: string) => {
    const isHovered = hoveredItem === key;
    return isHovered ? `shadow-lg ${glowColors[key] || ""}` : "";
  };

  const getStoredColor = (key: string) => {
    return glowColors[key] || null;
  };

  return {
    handleMouseEnter,
    handleMouseLeave,
    getGlowClass,
    getStoredColor,
  };
}
