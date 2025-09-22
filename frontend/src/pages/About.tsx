import Button from "@/ui/Button";

export default function About() {
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

      {/* ABOUT */}
      <section className="space-y-3">
        <header className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">About</h2>
        </header>
        <p className="opacity-80 max-w-6xl mx-auto">
          I’m a backend engineer with a strong focus on building scalable,
          resilient, and data-driven systems. My core stack is Python, FastAPI,
          and PostgreSQL, and I’ve worked across the full backend lifecycle—from
          designing efficient APIs and orchestrating data workflows to
          implementing CI/CD pipelines that ensure reliable deployments. My
          experience spans ETL pipelines processing 176M+ records, SaaS
          platforms with per-service migrations, and automation setups that
          support modern development at scale. I care deeply about clarity in
          design and documentation, making sure architectural decisions and
          trade-offs are transparent and maintainable over the long term.
        </p>
        <p className="opacity-80 max-w-6xl mx-auto">
          My academic background reflects the same balance of rigor and
          curiosity. I earned my Bachelor’s degree in Physics from The
          University of Texas at Austin in 2022, which gave me a strong
          foundation in problem-solving and quantitative thinking. To build on
          that, I completed a post-graduate program in Artificial Intelligence
          and Machine Learning at McCombs School of Business in 2024, where I
          expanded my technical perspective to include data science and applied
          machine learning.
        </p>
        <p className="opacity-80 max-w-6xl mx-auto">
          I’m now looking for opportunities as a Backend Engineer
          (Python/FastAPI/SQL, AWS) in Austin or remote, where I can contribute
          to teams tackling complex engineering challenges, particularly those
          involving data-heavy backends, API architecture, and system
          reliability. My goal is to bring a mix of engineering discipline,
          adaptability, and curiosity to projects that demand long-term
          scalability and thoughtful technical choices.
        </p>
        <p className="opacity-80 max-w-6xl mx-auto">
          Outside of work, I’m passionate about gaming, reading, music, and
          fitness. Whether diving into immersive game worlds, exploring new
          books (non-fiction), discovering fresh music, or pushing myself in the
          gym, I find that these pursuits keep me energized, creative, and
          balanced—qualities I bring back into my engineering work.
        </p>
      </section>

      {/* CONTACT CTA */}
      <section className="rounded-2xl border border-white/15 p-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            Have a question or opportunity?
          </h3>
        </div>
        <Button to="/contact" variant="primary" useGlow glowKey="contact-cta">
          Get in touch
        </Button>
      </section>
    </main>
  );
}
