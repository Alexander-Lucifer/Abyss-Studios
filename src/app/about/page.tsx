"use client";

import Image from "next/image";
import Footer from "@/components/Footer";

const timeline = [
  { year: "2022", event: "Abyss Studios is conceived as an indie narrative experiment." },
  { year: "2024", event: "Formal operations begin with game jams and prototypes." },
  { year: "2025", event: "Rebrand and flagship project pre-production." },
];

export default function AboutPage() {
  return (
    <main className="site-shell">
      <section className="cinematic-hero min-h-[56vh]">
        <div className="hero-overlay"></div>
        <div className="hero-noise"></div>
        <div className="content-wrap relative z-10 text-center">
          <span className="heading-kicker">About</span>
          <h1 className="section-title text-5xl md:text-6xl">Crimson Observer Studio</h1>
          <p className="section-subtitle mx-auto max-w-3xl">
            We build games as narrative environments: places players enter, feel, and remember.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="/about/life" className="tag">Studio Life</a>
            <a href="/about/team" className="tag">Our Team</a>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-wrap grid gap-6 lg:grid-cols-2">
          <article className="cinematic-card">
            <h2 className="text-3xl font-bold text-white">Vision</h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              We craft emotionally resonant, fiction-first experiences where atmosphere and interactivity
              are inseparable. Our worlds invite players to observe, interpret, and transform.
            </p>
          </article>

          <article className="cinematic-card">
            <h2 className="text-3xl font-bold text-white">Mission</h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              Blend cinematic storytelling, stylized art, and experimental mechanics into games that
              feel intimate, strange, and unforgettable.
            </p>
          </article>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-wrap grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 cinematic-card">
            <span className="heading-kicker">Founder Statement</span>
            <blockquote className="text-white/85 leading-relaxed text-lg">
              "We are observers who build worlds from fragments of memory, fear, and wonder.
              At Abyss Studios, fiction is not escape; it is revelation."
            </blockquote>
            <p className="mt-4 text-white/60">— Suryanshu Mittal, Founder</p>
          </div>
          <div className="lg:col-span-2 cinematic-card p-0 overflow-hidden">
            <div className="relative aspect-[9/16]">
              <Image src="/images/suryanshu.jpeg" alt="Suryanshu Mittal" fill className="object-contain p-8" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-wrap">
          <h2 className="section-title text-4xl md:text-5xl">Studio Timeline</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {timeline.map((item) => (
              <article key={item.year} className="cinematic-card">
                <p className="text-[#ff7f9a] text-sm uppercase tracking-wider">{item.year}</p>
                <p className="mt-2 text-white/80">{item.event}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
