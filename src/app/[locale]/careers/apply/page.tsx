'use client';

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import CountryCodeSelector from "@/components/CountryCodeSelector";
import { useTranslations } from "next-intl";

const CONTACT_EMAIL = "contactus@abyssstudios.site";

export default function ApplyPage() {
  const t = useTranslations('Careers');
  
  const openings = [
    t('designerTitle'),
    t('pitchTitle'),
  ];

  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const selectedRole = openings[selectedRoleIndex];

  // Sync selected role index if translation updates
  useEffect(() => {
    if (selectedRoleIndex >= openings.length) {
      setSelectedRoleIndex(0);
    }
  }, [openings, selectedRoleIndex]);

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
      const emailFormData = new FormData();
      emailFormData.append('name', formData.name);
      emailFormData.append('email', formData.email);
      emailFormData.append('phone', `${formData.countryCode} ${formData.phone}`);
      emailFormData.append('portfolio', formData.portfolio);
      emailFormData.append('experience', formData.experience);
      emailFormData.append('message', formData.message);
      emailFormData.append('role', selectedRole);
      emailFormData.append('resume', resumeFile);

      const response = await fetch("/api/sendApplication", {
        method: "POST",
        body: emailFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit application");
      }

      setResult({ type: "ok", message: "Application submitted successfully" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+91",
        portfolio: "",
        experience: "",
        message: "",
      });
      setResumeFile(null);
      // Reset file input
      const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Error submitting application:', error);
      
      // Check if standard submission failed to trigger mailto fallback
      if (error instanceof Error && error.message.includes("Failed to submit")) {
        const subject = encodeURIComponent(`Application: ${selectedRole} - ${formData.name}`);
        const body = encodeURIComponent(
`Application Details:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.countryCode} ${formData.phone}
Role: ${selectedRole}
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
          <span className="heading-kicker">{t('applyKicker')}</span>
          <h1 className="section-title text-5xl md:text-6xl">{t('applyTitle')}</h1>
          <p className="section-subtitle mx-auto max-w-3xl">
            {t('applySubtitle')}
          </p>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-wrap grid gap-6 lg:grid-cols-5">
          <div className="cinematic-card lg:col-span-2">
            <h2 className="text-2xl font-bold text-white">{t('openPositions')}</h2>
            <div className="mt-4 flex flex-col gap-3">
              {openings.map((role, idx) => (
                <button
                  key={role}
                  onClick={() => setSelectedRoleIndex(idx)}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    selectedRoleIndex === idx
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
              {t('fillForm')}
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
                  placeholder={t('fullName')}
                  required
                  className="rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white outline-none focus:border-[#ff7f9a]"
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('emailAddress')}
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
                  placeholder={t('phoneNumber')}
                  className="flex-1 rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white outline-none focus:border-[#ff7f9a]"
                />
              </div>

              <input
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder={t('portfolioUrl')}
                className="rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white outline-none focus:border-[#ff7f9a]"
              />

              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white outline-none focus:border-[#ff7f9a]"
              >
                <option value="">{t('selectExperience')}</option>
                <option value="Junior">{t('expJunior')}</option>
                <option value="Mid">{t('expMid')}</option>
                <option value="Senior">{t('expSenior')}</option>
                <option value="Student">{t('expStudent')}</option>
              </select>

              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder={t('coverLetter')}
                required
                className="w-full rounded-xl border border-[#dc143c]/30 bg-black/50 px-4 py-3 text-white outline-none focus:border-[#ff7f9a]"
              />

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  {t('resumeUpload')}
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
                {isSubmitting ? t('submitting') : t('submitApp')}
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
