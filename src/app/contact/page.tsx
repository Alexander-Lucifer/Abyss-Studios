"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import CountryCodeSelector from "@/components/CountryCodeSelector";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: "ok" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult({ type: null, message: "" });
    
    // Try server-side sending first
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to send message.");
      }
      setResult({ type: "ok", message: "Message sent. We will get back to you shortly." });
      setFormData({ name: "", email: "", phone: "", countryCode: "+91", subject: "", message: "" });
    } catch (error) {
      // Fallback to mailto if server fails
      console.log("Server sending failed, falling back to mailto:", error);
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.countryCode} ${formData.phone}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:contactus@abyssstudios.site?subject=${subject}&body=${body}`;
      setResult({ 
        type: "ok", 
        message: "Opening your email client. Please send the message from there." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="site-shell">
      <section className="cinematic-hero min-h-[52vh]">
        <div className="hero-overlay"></div>
        <div className="hero-noise"></div>
        <div className="content-wrap relative z-10 text-center">
          <span className="heading-kicker">Contact</span>
          <h1 className="section-title text-5xl md:text-6xl">Signal The Abyss</h1>
          <p className="section-subtitle mx-auto max-w-3xl">
            Collaborations, partnerships, press, or simply a message from another observer.
          </p>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-wrap grid gap-6 lg:grid-cols-5">
          <aside className="cinematic-card lg:col-span-2">
            <h2 className="text-2xl font-bold text-white">Studio Contacts</h2>
            <div className="mt-5 space-y-4 text-white/75">
              <p><span className="text-white font-semibold">Email:</span> contactus@abyssstudios.site</p>
              <p><span className="text-white font-semibold">Location:</span> Delhi, India</p>
              <p><span className="text-white font-semibold">Social:</span> @theabyssstudios</p>
            </div>
            <div className="mt-8">
              <h3 className="text-sm uppercase tracking-[0.16em] text-white/70">Response Window</h3>
              <p className="mt-2 text-white/75">Usually within 2-4 business days.</p>
            </div>
          </aside>

          <form onSubmit={handleSubmit} className="cinematic-card lg:col-span-3">
            <h2 className="text-2xl font-bold text-white">Send Message</h2>

            {result.type && (
              <div
                className={`mt-5 rounded-lg border px-4 py-3 text-sm ${
                  result.type === "ok"
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                    : "border-red-500/40 bg-red-500/10 text-red-300"
                }`}
              >
                {result.message}
              </div>
            )}

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white outline-none focus:border-[#ff7f9a]"
              />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white outline-none focus:border-[#ff7f9a]"
              />
            </div>

            <div className="flex gap-2">
              <CountryCodeSelector
                value={formData.countryCode}
                onChange={(value) => setFormData(prev => ({ ...prev, countryCode: value }))}
                className="w-32"
              />
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="flex-1 rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white outline-none focus:border-[#ff7f9a]"
              />
            </div>

            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="mt-4 w-full rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white outline-none focus:border-[#ff7f9a]"
            />
            <textarea
              name="message"
              rows={7}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you're building, feeling, or imagining..."
              required
              className="mt-4 w-full rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white outline-none focus:border-[#ff7f9a]"
            />

            <button type="submit" disabled={isSubmitting} className="gaming-button mt-6 w-full">
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
