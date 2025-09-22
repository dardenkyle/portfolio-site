import { NavLink } from "react-router-dom";
import { useRandomGlow } from "@/hooks/useRandomGlow";

export default function Nav() {
  const { handleMouseEnter, handleMouseLeave, getGlowClass } = useRandomGlow();

  const base = "px-3 py-2 rounded transition-all duration-300";
  const cls = ({ isActive }: { isActive: boolean }, key: string) => {
    const glowClass = getGlowClass(key);
    const activeClass = isActive ? "shadow-lg shadow-blue-500/20" : "";

    return `${base} ${glowClass} ${activeClass}`;
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
            to="/about"
            className={(props) => cls(props, "about")}
            onMouseEnter={() => handleMouseEnter("about")}
            onMouseLeave={handleMouseLeave}
          >
            About
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
          <a
            href="https://github.com/dardenkyle"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded transition-all duration-300 ${getGlowClass(
              "github"
            )}`}
            onMouseEnter={() => handleMouseEnter("github")}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/github.png" alt="GitHub" className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/kyle-darden"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded transition-all duration-300 ${getGlowClass(
              "linkedin"
            )}`}
            onMouseEnter={() => handleMouseEnter("linkedin")}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
          </a>
        </div>
      </nav>
    </header>
  );
}
