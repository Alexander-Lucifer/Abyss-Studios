'use client';

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function MansionOfChaosPage() {
  return (
    <main className="site-shell">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/moc.png"
            alt="Mansion of Chaos Hero"
            fill
            priority
            className="object-cover object-center opacity-40 blur-[2px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient(circle at center, rgba(105, 66, 255, 0.15) 0%, transparent 65%)" />
        </div>

        <div className="content-wrap relative z-10 text-center">
          <span className="heading-kicker">Psychological Thriller</span>
          <h1 className="section-title text-5xl md:text-7xl">Mansion of Chaos</h1>
          <p className="section-subtitle mx-auto max-w-3xl mb-8">
            Step into a shifting, uncanny architecture where corridors mutate, memories decay, and paths fold back on themselves.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://the-abyss-games.itch.io/mansion-of-chaos"
              target="_blank"
              rel="noopener noreferrer"
              className="gaming-button"
            >
              Play on itch.io
            </a>
            <Link href="/games" className="tag !px-5 !py-3 !text-sm">
              All Creations
            </Link>
          </div>
        </div>
      </section>

      {/* Game Details Section */}
      <section className="section-shell">
        <div className="content-wrap grid gap-12 lg:grid-cols-12 items-start">
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-l-4 border-[#dc143c] pl-4">
              <span className="text-xs uppercase tracking-widest text-[#ff7f9a] font-bold">The Experience</span>
              <h2 className="text-3xl font-black text-white mt-1">Shifting Corridor Horror</h2>
            </div>
            
            <p className="text-white/80 leading-relaxed font-light text-lg">
              *Mansion of Chaos* is an atmospheric first-person thriller set inside a mansion whose layouts shift behind your back. The player's journey is not defined by raw jump scares, but by persistent architectural dread and psychological tension.
            </p>

            <p className="text-white/70 leading-relaxed font-light">
              Navigate uncanny hallways, investigate cryptic puzzles, and discover the lore behind the building's shifting geometry. Every step forward challenges your sense of layout and direction, demanding that you map the corridors using sound, visuals, and landmarks.
            </p>

            <div className="grid gap-6 md:grid-cols-2 pt-6">
              <div className="cinematic-card">
                <span className="text-2xl mb-2 block">👁️</span>
                <h3 className="text-lg font-bold text-white mb-2">Uncanny Staging</h3>
                <p className="text-white/70 text-sm font-light">Experience rooms that change layouts seamlessly when you look away, altering paths in real time.</p>
              </div>
              <div className="cinematic-card">
                <span className="text-2xl mb-2 block">🎧</span>
                <h3 className="text-lg font-bold text-white mb-2">Ambient Soundscapes</h3>
                <p className="text-white/70 text-sm font-light">Utilize sound cues and responsive audio tracks to orient yourself in shifting spaces.</p>
              </div>
            </div>
          </div>

          {/* Specifications Sidebar */}
          <aside className="lg:col-span-5 cinematic-card space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white border-b border-[#dc143c]/20 pb-3">Project Specs</h3>
            </div>
            
            <div className="space-y-4 text-sm font-light">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/60">Status</span>
                <span className="text-white font-medium">Released (Game Jam)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/60">Genre</span>
                <span className="text-white font-medium">Exploration, Horror, Thriller</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/60">Platforms</span>
                <span className="text-white font-medium">Windows</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/60">Lead Developer</span>
                <span className="text-white font-medium">Suryanshu Mittal</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-white/60">Art & Assets</span>
                <span className="text-white font-medium">Daksh Kaushik</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#dc143c]/20">
              <h4 className="text-xs uppercase tracking-widest text-[#ff7f9a] font-bold mb-3">System Requirements</h4>
              <ul className="text-xs text-white/60 space-y-1">
                <li>• OS: Windows 10 (64-bit)</li>
                <li>• Processor: Intel Core i5 / AMD Ryzen 5</li>
                <li>• Memory: 8 GB RAM</li>
                <li>• Graphics: GTX 1050 / RX 560</li>
                <li>• Storage: 500 MB available space</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
