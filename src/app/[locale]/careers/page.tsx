'use client';

import Link from "next/link";
import Footer from "@/components/Footer";

const openings = [
  {
    title: "Game Designer (Systems & Narrative)",
    type: "Full-time",
    location: "Delhi / Remote Hybrid",
    desc: "Design mechanical puzzles, pacing curves, and systems for atmospheric game worlds. Translate raw tension, wonder, and narrative-rich lore into player actions.",
  },
  {
    title: "General Pitch (Creative Audition)",
    type: "Project-based",
    location: "Remote",
    desc: "Are you a sound designer, technical artist, writer, or designer who doesn't fit standard roles? Send us your best work and pitch us how you create atmospheric worlds.",
  },
];

export default function CareersPage() {
  return (
    <main className="site-shell">
      <section className="cinematic-hero min-h-[54vh]">
        <div className="hero-overlay"></div>
        <div className="hero-noise"></div>
        <div className="content-wrap relative z-10 text-center">
          <span className="heading-kicker">Careers</span>
          <h1 className="section-title text-5xl md:text-6xl">Build Worlds With Us</h1>
          <p className="section-subtitle mx-auto max-w-3xl">
            We are looking for artists, storytellers, and systems thinkers who care about atmosphere.
          </p>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-wrap grid gap-6 md:grid-cols-3">
          {[
            "Creative ownership over your discipline",
            "Direct collaboration across design, art, and code",
            "A studio culture built around experimentation",
          ].map((item) => (
            <article key={item} className="cinematic-card">
              <p className="text-white/85">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="content-wrap">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="section-title text-4xl md:text-5xl">Open Roles</h2>
            <Link href="/careers/apply" className="gaming-button">Apply Now</Link>
          </div>
          <div className="grid gap-5">
            {openings.map((job) => (
              <article key={job.title} className="cinematic-card">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{job.title}</h3>
                    <p className="mt-2 text-white/70">{job.desc}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="tag">{job.type}</span>
                    <span className="tag">{job.location}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
