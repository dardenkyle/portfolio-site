import { NavLink } from "react-router-dom";

export default function Nav() {
  const base = "px-3 py-2 rounded hover:bg-neutral-800";
  const cls = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${base} bg-neutral-800` : base;

  return (
    <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <NavLink to="/" className={cls} end>
            Home
          </NavLink>
          <NavLink to="/projects" className={cls}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={cls}>
            Contact
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/dardenkyle"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="p-2 rounded hover:bg-neutral-800"
          >
            <img
              src="public/github.png"
              alt="GitHub"
              width="20"
              height="20"
              className="h-5 w-5"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/kyle-darden/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="p-2 rounded hover:bg-neutral-800"
          >
            <img
              src="public/linkedin.png"
              alt="LinkedIn"
              width="20"
              height="20"
              className="h-5 w-5"
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
