export default function Footer() {
  return (
    <footer className="mt-12 border-t border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-neutral-400 text-center">
        © {new Date().getFullYear()} Kyle Darden
      </div>
    </footer>
  );
}
