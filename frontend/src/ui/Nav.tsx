import { NavLink } from "react-router-dom";
import { useState } from "react";
import { getRandomHoverColor } from "@/utils/colors";

export default function Nav() {
  const [glowColors, setGlowColors] = useState<Record<string, string>>({});
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const handleMouseEnter = (key: string) => {
    setGlowColors((prev) => ({
      ...prev,
      [key]: getRandomHoverColor(),
    }));
    setHoveredLink(key);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const base = "px-3 py-2 rounded transition-all duration-300";
  const cls = ({ isActive }: { isActive: boolean }, key: string) => {
    const isHovered = hoveredLink === key;
    const glowClass = isHovered ? `shadow-lg ${glowColors[key] || ""}` : "";

    return isActive ? `${base} ${glowClass}` : `${base} ${glowClass}`;
  };

  return (
    <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            className={(props) => cls(props, "home")}
            onMouseEnter={() => handleMouseEnter("home")}
            onMouseLeave={handleMouseLeave}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className={(props) => cls(props, "projects")}
            onMouseEnter={() => handleMouseEnter("projects")}
            onMouseLeave={handleMouseLeave}
          >
            Projects
          </NavLink>
          <NavLink
            to="/contact"
            className={(props) => cls(props, "contact")}
            onMouseEnter={() => handleMouseEnter("contact")}
            onMouseLeave={handleMouseLeave}
          >
            Contact
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          {/* ...existing social links... */}
        </div>
      </nav>
    </header>
  );
}
