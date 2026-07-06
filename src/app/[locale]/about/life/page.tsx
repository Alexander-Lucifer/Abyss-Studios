"use client";

import Image from "next/image";
import Footer from "@/components/Footer";

const culture = [
  {
    title: "Creative Freedom",
    description: "Every team member has ownership over their craft. We encourage experimentation and bold creative choices.",
    icon: "🎨"
  },
  {
    title: "Work-Life Harmony",
    description: "We believe sustainable creativity comes from balance. Flexible hours and remote options when needed.",
    icon: "⚖️"
  },
  {
    title: "Learning Culture",
    description: "Weekly game jams, skill-sharing sessions, and access to industry conferences and workshops.",
    icon: "📚"
  },
  {
    title: "Collaborative Spirit",
    description: "Cross-disciplinary collaboration is in our DNA. Artists, coders, and designers work as one unit.",
    icon: "🤝"
  }
];

const perks = [
  "Flexible working hours",
  "Remote work options",
  "Creative development budget",
  "Industry conference access",
  "Game jam Fridays",
  "Skill-sharing workshops",
  "Health and wellness support",
  "Studio game library access"
];

export default function LifePage() {
  return (
    <main className="site-shell">
      <section className="cinematic-hero min-h-[56vh]">
        <div className="hero-overlay"></div>
        <div className="hero-noise"></div>
        <div className="content-wrap relative z-10 text-center">
          <span className="heading-kicker">Studio Life</span>
          <h1 className="section-title text-5xl md:text-6xl">Life at Abyss Studios</h1>
          <p className="section-subtitle mx-auto max-world-3xl">
            Where creativity meets community. Experience our unique studio culture built around 
            collaboration, experimentation, and passion for game development.
          </p>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-wrap">
          <div className="mb-8">
            <span className="heading-kicker">Our Culture</span>
            <h2 className="section-title text-4xl md:text-5xl">How We Work</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {culture.map((item) => (
              <article key={item.title} className="cinematic-card">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    <p className="mt-3 text-white/75 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-wrap">
          <div className="mb-8">
            <span className="heading-kicker">Benefits</span>
            <h2 className="section-title text-4xl md:text-5xl">Studio Perks</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {perks.map((perk) => (
              <article key={perk} className="cinematic-card">
                <p className="text-white/85">{perk}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-wrap">
          <div className="cinematic-card">
            <h2 className="text-3xl font-bold text-white">Join Our Community</h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              We're always looking for passionate creators who want to build something extraordinary. 
              Whether you're a seasoned developer or just starting your journey, there's a place for you at Abyss.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/careers" className="gaming-button">View Open Roles</a>
              <a href="/contact" className="tag">Get in Touch</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
