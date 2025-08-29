import { NavLink } from "react-router-dom";

export default function Nav() {
  const base = "px-3 py-2 rounded hover:bg-neutral-800";
  const cls = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${base} bg-neutral-800` : base;

  return (
    <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3">
        <NavLink to="/" className={cls} end>
          Home
        </NavLink>
        <NavLink to="/projects" className={cls}>
          Projects
        </NavLink>
        <NavLink to="/contact" className={cls}>
          Contact
        </NavLink>
      </nav>
    </header>
  );
}
