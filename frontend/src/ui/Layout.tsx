import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <header>
        <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>

      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
