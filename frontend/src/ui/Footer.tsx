import Button from "./Button";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";

  // Show only copyright on contact page
  if (isContactPage) {
    return (
      <footer className="mt-8">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-neutral-400 text-center">
          © {new Date().getFullYear()} Kyle Darden
        </div>
      </footer>
    );
  }

  // Show full CTA footer on all other pages
  return (
    <footer className="mt-8">
      {/* CTA Section */}
      <div className="mx-auto max-w-5xl px-6 py-6">
        <div className="text-center p-4">
          <h3 className="text-2xl font-bold text-white mb-4">
            Interested in working together?
          </h3>
          <p className="text-slate-300 mb-6">
            I'm always excited to take on new challenges and learn emerging
            technologies.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              to="/projects"
              variant="secondary"
              useGlow
              glowKey="footer-projects"
            >
              View My Projects
            </Button>
            <Button
              href="/DARDEN_BACKEND_v2.pdf"
              variant="secondary"
              useGlow
              glowKey="footer-resume"
            >
              Download Resume
            </Button>
            <Button
              to="/contact"
              variant="secondary"
              useGlow
              glowKey="footer-contact"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-neutral-400 text-center">
        © {new Date().getFullYear()} Kyle Darden
      </div>
    </footer>
  );
}
