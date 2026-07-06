'use client';

import { useState } from "react";
import Footer from "@/components/Footer";
import CountryCodeSelector from "@/components/CountryCodeSelector";

const CONTACT_EMAIL = "contactus@abyssstudios.site";

const openings = [
  "Game Designer (Systems & Narrative)",
  "General Pitch (Creative Audition)",
];

export default function ApplyPage() {
  const [selectedRole, setSelectedRole] = useState(openings[0]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    portfolio: "",
    experience: "",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: "ok" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type (PDF, DOC, DOCX)
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        setResult({ type: "error", message: "Please upload a PDF, DOC, or DOCX file" });
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setResult({ type: "error", message: "File size must be less than 5MB" });
        return;
      }
      setResumeFile(file);
      setResult({ type: null, message: "" });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!resumeFile) {
      setResult({ type: "error", message: "Please upload your resume" });
      return;
    }

    setIsSubmitting(true);
    setResult({ type: null, message: "" });
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('position', selectedRole);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('portfolio', formData.portfolio);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('resume', resumeFile);

      const response = await fetch('/api/sendApplication', {
        method: 'POST',
        body: formDataToSend,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application');
      }
      
      setResult({ type: "ok", message: "Application submitted successfully! We'll be in touch soon." });
      setFormData({ name: "", email: "", phone: "", countryCode: "+91", portfolio: "", experience: "", message: "" });
      setResumeFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      // Check if it's a fallback scenario
      const errorData = error instanceof Error && error.message.includes('fallback') 
        ? { fallback: true } 
        : {};
      
      if (errorData.fallback) {
        // Create mailto link with all form data
        const subject = encodeURIComponent(`Application for ${selectedRole}`);
        const body = encodeURIComponent(
          `Position: ${selectedRole}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.countryCode} ${formData.phone}
Portfolio: ${formData.portfolio}
Experience: ${formData.experience}

Cover Letter:
${formData.message}

---
Note: Resume/CV should be attached separately to this email.`
        );
        window.location.href = `mailto:contactus@abyssstudios.site?subject=${subject}&body=${body}`;
        setResult({ 
          type: "ok", 
          message: "Opening your email client. Please attach your resume and send the application." 
        });
      } else {
        setResult({
          type: "error",
          message: error instanceof Error ? error.message : "Failed to submit application",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="site-shell">
      <section className="cinematic-hero min-h-[48vh]">
        <div className="hero-overlay"></div>
        <div className="hero-noise"></div>
        <div className="content-wrap relative z-10 text-center">
          <span className="heading-kicker">Applications</span>
          <h1 className="section-title text-5xl md:text-6xl">Step Into The Studio</h1>
          <p className="section-subtitle mx-auto max-w-3xl">
            Choose your role, review expectations, and send your application directly.
          </p>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-wrap grid gap-6 lg:grid-cols-5">
          <div className="cinematic-card lg:col-span-2">
            <h2 className="text-2xl font-bold text-white">Open Positions</h2>
            <div className="mt-4 flex flex-col gap-3">
              {openings.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    selectedRole === role
                      ? "border-[#ff7f9a] bg-[#dc143c]/20 text-white"
                      : "border-[#dc143c]/25 bg-black/40 text-white/80 hover:border-[#dc143c]/45"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="cinematic-card lg:col-span-3">
            <h2 className="text-3xl font-bold text-white">{selectedRole}</h2>
            <p className="mt-3 text-white/75">
              Fill out the form below to apply for this position. Include your portfolio/resume and a brief introduction.
            </p>
            
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

            <div className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white outline-none focus:border-[#ff7f9a]"
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
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
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="Portfolio URL"
                className="rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white outline-none focus:border-[#ff7f9a]"
              />

              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white outline-none focus:border-[#ff7f9a]"
              >
                <option value="">Select Experience Level</option>
                <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                <option value="Mid Level (2-5 years)">Mid Level (2-5 years)</option>
                <option value="Senior Level (5-10 years)">Senior Level (5-10 years)</option>
                <option value="Lead/Principal (10+ years)">Lead/Principal (10+ years)</option>
              </select>

              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us why you're interested in this role and what makes you a great fit..."
                required
                className="w-full rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white outline-none focus:border-[#ff7f9a]"
              />

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Resume/CV (PDF, DOC, DOCX - Max 5MB)
                </label>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="w-full rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#dc143c]/20 file:text-white hover:file:bg-[#dc143c]/30"
                />
                {resumeFile && (
                  <p className="mt-2 text-sm text-white/60">Selected: {resumeFile.name}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="gaming-button w-full"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>

            <div className="mt-8 grid gap-3 text-white/80 text-sm">
              <p>• Show work that demonstrates your strongest craft decisions.</p>
              <p>• Mention tools and pipelines you are most comfortable with.</p>
              <p>• Share one game, film, or book that influences your design instincts.</p>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
