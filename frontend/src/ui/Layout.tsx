import { Outlet } from "react-router-dom";
import Nav from "@/ui/Nav";
import Footer from "@/ui/Footer";

export function Layout() {
  return (
    <div className="min-h-dvh bg-neutral-950 text-neutral-100 flex flex-col">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8 flex-1">
        <Outlet /> {/* renders child routes */}
      </main>
      <Footer />
    </div>
  );
}
