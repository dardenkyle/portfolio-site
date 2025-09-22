export default function Contact() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-14">
      {/* HERO */}
      <section className="mx-auto max-w-3xl text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Kyle Darden — Backend-focused Engineer
        </h1>
        <p className="opacity-80">
          Python • FastAPI • Postgres • Docker • AWS • CI/CD
        </p>
      </section>
      <section className="max-w-xl mx-auto p-6 space-y-2">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p>
          Email:{" "}
          <a className="underline" href="mailto:darden_kyle@hotmail.com">
            darden_kyle@hotmail.com
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a
            className="underline"
            href="https://www.linkedin.com/in/kyle-darden/"
          >
            kyle-darden
          </a>
        </p>
        <p>
          GitHub:{" "}
          <a className="underline" href="https://github.com/dardenkyle">
            dardenkyle
          </a>
        </p>
      </section>
    </main>
  );
}
