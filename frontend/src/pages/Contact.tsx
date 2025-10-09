import Button from "@/ui/Button";
import { useState, useEffect } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = (formData: FormData) => {
    const errors: { [key: string]: string } = {};

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name?.trim()) errors.name = "Name is required";
    if (!email?.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Please enter a valid email";
    if (!message?.trim()) errors.message = "Message is required";

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit to FormSubmit
      await fetch("https://formsubmit.co/darden_kyle@hotmail.com", {
        method: "POST",
        body: formData,
      });

      setShowSuccess(true);
      form.reset();
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setFormErrors({ submit: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">
      {/* PAGE HEADER */}
      <section className="text-center">
        <h1 className="text-4xl font-bold">Let's Connect</h1>
      </section>

      {/* 2-COLUMN CONTACT SECTION */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* LEFT COLUMN - Contact Information */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Get In Touch</h2>

            {/* Availability Status */}
            <div className="text-green-400">
              Available for new opportunities
            </div>

            {/* Tagline */}
            <p className="text-slate-300">
              Backend-focused engineer passionate about building scalable,
              efficient systems and learning cutting-edge technologies.
            </p>

            {/* Contact Methods */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-400 mb-1">
                  Best Contact Method
                </p>
                <p className="text-white">
                  LinkedIn for professional inquiries
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400 mb-1">LinkedIn</p>
                <a
                  className="text-white hover:text-blue-400 transition-colors"
                  href="https://www.linkedin.com/in/kyle-darden/"
                >
                  kyle-darden
                </a>
              </div>

              <div>
                <p className="text-sm text-slate-400 mb-1">GitHub</p>
                <a
                  className="text-white hover:text-blue-400 transition-colors"
                  href="https://github.com/dardenkyle"
                >
                  dardenkyle
                </a>
              </div>
            </div>

            {/* Location & Response Time */}
            <div className="pt-4 border-t border-neutral-800">
              <div className="mb-2">
                <p className="text-sm text-slate-400 mb-1">Location</p>
                <p className="text-white">Austin, TX (Central Time)</p>
              </div>
              <p className="text-sm text-slate-400">
                Usually responds within 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Contact Form */}
        <div className="space-y-8">
          {/* Contact Form */}
          <div className="space-y-4 bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold">Send a Message</h2>

            {showSuccess && (
              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4 text-green-400">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* FormSubmit Configuration */}
              <input
                type="hidden"
                name="_subject"
                value="New Portfolio Contact Form Submission"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-slate-300 mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  aria-describedby={formErrors.name ? "name-error" : undefined}
                  className={`w-full px-3 py-2 bg-neutral-900 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                    formErrors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-neutral-700 focus:ring-blue-500"
                  }`}
                  placeholder="Your name"
                />
                {formErrors.name && (
                  <p id="name-error" className="text-red-400 text-sm mt-1">
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-slate-300 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  aria-describedby={
                    formErrors.email ? "email-error" : undefined
                  }
                  className={`w-full px-3 py-2 bg-neutral-900 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                    formErrors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-neutral-700 focus:ring-blue-500"
                  }`}
                  placeholder="your@email.com"
                />
                {formErrors.email && (
                  <p id="email-error" className="text-red-400 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-slate-300 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  aria-describedby={
                    formErrors.message ? "message-error" : undefined
                  }
                  className={`w-full px-3 py-2 bg-neutral-900 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-colors ${
                    formErrors.message
                      ? "border-red-500 focus:ring-red-500"
                      : "border-neutral-700 focus:ring-blue-500"
                  }`}
                  placeholder="Tell me about your project or opportunity..."
                />
                {formErrors.message && (
                  <p id="message-error" className="text-red-400 text-sm mt-1">
                    {formErrors.message}
                  </p>
                )}
              </div>

              {formErrors.submit && (
                <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 text-red-400">
                  {formErrors.submit}
                </div>
              )}

              <Button
                variant="primary"
                className="w-full"
                useGlow
                glowKey="contact-form-submit"
                onClick={() => {}} // Form submission handled by onSubmit
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
