"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import CountryCodeSelector from "@/components/CountryCodeSelector";

function ContactForm() {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    inquiryType: "general",
    serviceType: "",
    budget: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const typeParam = searchParams?.get("type");
    if (typeParam === "services") {
      setFormData((prev) => ({ 
        ...prev, 
        inquiryType: "services", 
        subject: "Service Inquiry" 
      }));
    }
  }, [searchParams]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: "ok" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+91",
        inquiryType: "general",
        serviceType: "",
        budget: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      // Fallback to mailto if server fails
      console.log("Server sending failed, falling back to mailto:", error);
      const subject = encodeURIComponent(formData.subject || "Collaboration Signal");
      
      let bodyText = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.countryCode} ${formData.phone}\nInquiry Type: ${formData.inquiryType}`;
      if (formData.inquiryType === "services") {
        bodyText += `\nService Type: ${formData.serviceType}\nBudget Level: ${formData.budget}`;
      }
      bodyText += `\n\nMessage:\n${formData.message}`;
      
      const body = encodeURIComponent(bodyText);
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

      <div className="mt-4 flex gap-2">
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

      {/* Inquiry Type Select */}
      <div className="mt-4">
        <select
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white outline-none focus:border-[#ff7f9a]"
        >
          <option value="general">General Signal / Feedback</option>
          <option value="services">Request a Service (Game Dev / Art / Narrative)</option>
          <option value="partnership">Business & Co-Development Partnership</option>
        </select>
      </div>

      {/* Service-specific Conditional Fields */}
      {formData.inquiryType === "services" && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
            className="rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white outline-none focus:border-[#ff7f9a]"
          >
            <option value="">Select Service Area</option>
            <option value="game-dev">Full Game Engineering</option>
            <option value="animation">3D modeling / Rigging / Animation</option>
            <option value="design">Narrative & Quest / System Balancing</option>
            <option value="prototype">Co-Development or Prototyping</option>
          </select>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            className="rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white outline-none focus:border-[#ff7f9a]"
          >
            <option value="">Estimated Budget Range</option>
            <option value="under-5k">Under $5,000</option>
            <option value="5k-20k">$5,000 - $20,000</option>
            <option value="20k-50k">$20,000 - $50,000</option>
            <option value="50k-plus">$50,000+</option>
          </select>
        </div>
      )}

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
        {isSubmitting ? "Sending Signal..." : "Send Message"}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <main className="site-shell">
      <section className="cinematic-hero min-h-[52vh]">
        <div className="hero-overlay"></div>
        <div className="hero-noise"></div>
        <div className="content-wrap relative z-10 text-center">
          <span className="heading-kicker">Contact</span>
          <h1 className="section-title text-5xl md:text-6xl">Signal The Abyss</h1>
          <p className="section-subtitle mx-auto max-w-3xl">
            Collaborations, partnerships, press, or request our development services.
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

          <Suspense fallback={
            <div className="cinematic-card lg:col-span-3 flex items-center justify-center min-h-[400px]">
              <span className="text-white/60 uppercase tracking-widest text-sm animate-pulse">Loading System...</span>
            </div>
          }>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  );
}
