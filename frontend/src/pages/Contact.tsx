export default function Contact() {
  return (
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
  );
}
