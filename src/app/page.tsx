'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="site-shell">
      <div className={`opening-sequence ${showIntro ? "opening-sequence-visible" : "opening-sequence-hidden"}`}>
        <div className="opening-film-grain" />
        <p className="opening-label">Booting cinematic layer...</p>
        <h1 className="opening-title">ABYSS STUDIOS</h1>
        <p className="opening-subtitle">Press start to descend</p>
      </div>

      <div
        className={`transition-opacity duration-500 ${showIntro ? "opacity-0 pointer-events-none select-none" : "opacity-100"}`}
        aria-hidden={showIntro}
      >
      <section className="cinematic-hero">
        <div className="hero-overlay"></div>
        <div className="hero-noise"></div>
        <div className="hero-orb hero-orb-left" />
        <div className="hero-orb hero-orb-right" />
        <div className="hero-rings" />
        <div className="content-wrap relative z-10 text-center">
          <span className="heading-kicker">Descend Into Depths</span>
          <h1 className="section-title text-5xl md:text-7xl">Abyss Studios</h1>
          <p className="section-subtitle mx-auto max-w-3xl">
            We build atmospheric games with cinematic worldbuilding, interactive storytelling,
            and a dark crimson visual signature.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/games" className="gaming-button">
              Explore Games
            </Link>
            <Link href="/about" className="tag !px-5 !py-3 !text-sm">
              Studio Story
            </Link>
          </div>
          <div className="hero-scroll-cue">Scroll to begin your run</div>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-wrap mb-8">
          <div className="fun-marquee">
            <div className="fun-marquee-track">
              <span>Worldbuilding</span>
              <span>Boss Fights</span>
              <span>Emotional Story Arcs</span>
              <span>Experimental Mechanics</span>
              <span>Stylized Horror</span>
              <span>Worldbuilding</span>
              <span>Boss Fights</span>
              <span>Emotional Story Arcs</span>
            </div>
          </div>
        </div>
        <div className="content-wrap grid gap-6 md:grid-cols-3">
          {[
            { title: "Narrative Design", text: "Layered stories inspired by myth, horror, and speculative fiction." },
            { title: "Cinematic Craft", text: "Every environment is staged like a scene, with intentional rhythm and mood." },
            { title: "Playable Emotion", text: "Gameplay systems that translate tension, wonder, and dread into interaction." },
          ].map((item) => (
            <article key={item.title} className="cinematic-card fun-card">
              <span className="card-spark" />
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-white/75 leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="content-wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="heading-kicker">Featured Projects</span>
              <h2 className="section-title text-4xl md:text-5xl">Current Showcase</h2>
            </div>
            <Link href="/games" className="tag">View full library</Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Tiles & Towers", image: "/images/Tiles.png", brief: "Roll your fate in a strategic puzzle duel." },
              { name: "Mansion of Chaos", image: "/images/moc.png", brief: "A first-person descent into uncanny architecture." },
              { name: "Finite Samsara", image: "/images/Samsara.png", brief: "Break the loop or become part of it forever." },
            ].map((game) => (
              <article key={game.name} className="cinematic-card fun-card p-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                  <Image src={game.image} alt={game.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{game.name}</h3>
                  <p className="mt-2 text-white/75">{game.brief}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-28">
        <div className="content-wrap">
          <div className="cinematic-card text-center py-12">
            <span className="heading-kicker">Join The Abyss</span>
            <h2 className="section-title text-4xl md:text-5xl">Create Strange Worlds With Us</h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              Collaborate with us, pitch your ideas, or apply to the studio.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="gaming-button">Contact Us</Link>
              <Link href="/careers" className="tag !px-5 !py-3 !text-sm">Careers</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </main>
  );
}
