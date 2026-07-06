'use client';

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function FiniteSamsaraPage() {
  return (
    <main className="site-shell">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Samsara.png"
            alt="Finite Samsara Hero"
            fill
            priority
            className="object-cover object-center opacity-40 blur-[2px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient(circle at center, rgba(220, 20, 60, 0.15) 0%, transparent 65%)" />
        </div>

        <div className="content-wrap relative z-10 text-center">
          <span className="heading-kicker">Puzzle Investigation</span>
          <h1 className="section-title text-5xl md:text-7xl">Finite Samsara</h1>
          <p className="section-subtitle mx-auto max-w-3xl mb-8">
            Break the loop or become part of it forever. Investigate a cursed environment, analyze details, and solve the crypt.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://abyss-studios.itch.io/finite-samsara"
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
              <span className="text-xs uppercase tracking-widest text-[#ff7f9a] font-bold">The Cycle</span>
              <h2 className="text-3xl font-black text-white mt-1">First-Person Loop Investigation</h2>
            </div>
            
            <p className="text-white/80 leading-relaxed font-light text-lg">
              *Finite Samsara* traps you in a repeating sequence of rooms. To escape, you must examine minor environmental discrepancies and solve cryptographic lock combinations. Every loop resets the world, but your information is persistent.
            </p>

            <p className="text-white/70 leading-relaxed font-light">
              Built on narrative exploration, the game features a dark visual tone and puzzle-driven progression. Pay attention to changes in lighting, wall markings, and object positions between runs to bypass locking mechanisms.
            </p>

            <div className="grid gap-6 md:grid-cols-2 pt-6">
              <div className="cinematic-card">
                <span className="text-2xl mb-2 block">⏳</span>
                <h3 className="text-lg font-bold text-white mb-2">Loop Dynamics</h3>
                <p className="text-white/70 text-sm font-light">Use your memory of past runs to decipher codes. The environment mutates with each transition cycle.</p>
              </div>
              <div className="cinematic-card">
                <span className="text-2xl mb-2 block">🗝️</span>
                <h3 className="text-lg font-bold text-white mb-2">Cryptographic Keys</h3>
                <p className="text-white/70 text-sm font-light">Solve physical puzzles and lock coordinates hidden within structural layers of the level design.</p>
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
                <span className="text-white font-medium">First-Person, Puzzle, Horror</span>
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
                <span className="text-white/60">Art & assets</span>
                <span className="text-white font-medium">Daksh Kaushik</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#dc143c]/20">
              <h4 className="text-xs uppercase tracking-widest text-[#ff7f9a] font-bold mb-3">System Requirements</h4>
              <ul className="text-xs text-white/60 space-y-1">
                <li>• OS: Windows 10 (64-bit)</li>
                <li>• Processor: Dual-Core CPU</li>
                <li>• Memory: 4 GB RAM</li>
                <li>• Graphics: NVIDIA GeForce GTX 960</li>
                <li>• Storage: 400 MB available space</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
