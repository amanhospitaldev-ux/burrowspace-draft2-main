import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useRef, useEffect, type FormEvent } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { submitContact, type ContactFormData } from "@/lib/api-utils";
import logoIcon from "@/assets/logo-icon.png";

export const Route = createFileRoute("/contactus")({
  head: () => ({
    meta: [
      { title: "Contact Us — BurrowSpace" },
      { name: "description", content: "Get in touch with BurrowSpace. We're real humans who reply fast." },
      { property: "og:title", content: "Contact Us — BurrowSpace" },
      { property: "og:description", content: "Have questions? Want a demo? Reach out to BurrowSpace." },
    ],
  }),
  component: ContactUsPage,
});

const contactInfo = [
  { icon: "✉", label: "Email us", value: "burrowspacellp@gmail.com" },
  // { icon: "💬", label: "Discord", value: "Burrowspace" },
  // { icon: "✈", label: "Telegram", value: "@burrowspace" },
  // { icon: "𝕏", label: "Twitter / X", value: "@burrowspace" },
];

function ContactUsPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});

  // Calculate rotation based on focused field position relative to mascot
  const getMascotStyle = () => {
    if (!focusedField || !fieldRefs.current[focusedField] || !formCardRef.current) {
      // Idle state: gentle breathing animation
      return {
        transform: "rotate(0deg) scale(1)",
        transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      };
    }
    const fieldEl = fieldRefs.current[focusedField]!;
    const cardRect = formCardRef.current.getBoundingClientRect();
    const fieldRect = fieldEl.getBoundingClientRect();
    // Mascot sits to the left of the card, calculate vertical angle toward field
    const fieldCenterY = fieldRect.top + fieldRect.height / 2;
    const mascotCenterY = cardRect.top + 60; // mascot is near top-left
    const deltaY = fieldCenterY - mascotCenterY;
    const rotation = Math.max(-15, Math.min(15, deltaY * 0.08));
    return {
      transform: `rotate(${rotation}deg) scale(1.05)`,
      transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    };
  };

  const registerRef = (name: string) => (el: HTMLElement | null) => {
    fieldRefs.current[name] = el;
  };

  const handleFocus = (name: string) => () => setFocusedField(name);
  const handleBlur = () => setFocusedField(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitState === "submitting") return;

    const missingField = Object.entries(formData).find(([, value]) => !value.trim());
    if (missingField) {
      setSubmitError("Please complete every field before sending your message.");
      setSubmitState("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitError("Please enter a valid email address.");
      setSubmitState("error");
      return;
    }

    setSubmitState("submitting");
    setSubmitError(null);

    try {
      await submitContact(formData);
      setSubmitState("success");
      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setSubmitState("error");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[oklch(0.08_0.02_260)]">
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-20 lg:px-16">
          {/* Header */}
          <p className="text-xs font-semibold tracking-[0.35em] text-brand">CONTACT</p>
          <p className="mt-6 max-w-md text-base text-white/60 leading-relaxed">
            Have questions? Want a demo? Or just want to say hi — we're real humans who reply fast.
          </p>

          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            {/* Left: Contact info */}
            <div className="flex flex-col gap-8">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-white/50">{item.label}</p>
                    <p className="text-sm font-semibold text-white">{item.value}</p>
                  </div>
                </div>
              ))}

              {/* Response time badge */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs font-semibold tracking-wider text-brand">Average response time</p>
                <p className="mt-2 font-heading text-3xl font-black text-white">2 business days</p>
                <p className="mt-1 text-xs text-white/50">during business hours</p>
              </div>
            </div>

            {/* Right: Form with mascot */}
            <div className="relative">

              <div ref={formCardRef} className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {submitState === "success" && (
                    <Alert className="border-brand/40 bg-brand/10 text-brand">
                      <AlertTitle>Message received</AlertTitle>
                      <AlertDescription>
                        Thanks! We’ll respond to your message within 2 business days.
                      </AlertDescription>
                    </Alert>
                  )}
                  {submitState === "error" && submitError && (
                    <Alert variant="destructive">
                      <AlertTitle>Submission failed</AlertTitle>
                      <AlertDescription>{submitError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-xs text-white/60">First name</label>
                      <input
                        ref={registerRef("firstName")}
                        onFocus={handleFocus("firstName")}
                        onBlur={handleBlur}
                        type="text"
                        placeholder="Arjun"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-brand/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-white/60">Last name</label>
                      <input
                        ref={registerRef("lastName")}
                        onFocus={handleFocus("lastName")}
                        onBlur={handleBlur}
                        type="text"
                        placeholder="Sharma"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-brand/50 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs text-white/60">Email address</label>
                    <input
                      ref={registerRef("email")}
                      onFocus={handleFocus("email")}
                      onBlur={handleBlur}
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-brand/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs text-white/60">Subject</label>
                    <select
                      ref={registerRef("subject") as any}
                      onFocus={handleFocus("subject")}
                      onBlur={handleBlur}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-[oklch(0.08_0.02_260)] px-4 py-3 text-sm text-white/60 focus:border-brand/50 focus:outline-none"
                    >
                      <option value="">Choose a topic...</option>
                      <option value="general">General Inquiry</option>
                      <option value="demo">Request a Demo</option>
                      <option value="partnership">Partnership</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs text-white/60">Message</label>
                    <textarea
                      ref={registerRef("message") as any}
                      onFocus={handleFocus("message")}
                      onBlur={handleBlur}
                      rows={4}
                      placeholder="Tell us what's on your mind..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full resize-none rounded-lg border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-brand/50 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitState === "submitting"}
                    className="mt-2 w-full rounded-lg bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitState === "submitting"
                      ? "Sending…"
                      : submitState === "success"
                      ? "Sent!"
                      : "Send message →"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
