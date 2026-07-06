'use client';

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

const YOUTUBE_ID = "dQw4w9WgXcQ";

export default function FiniteSamsaraPage() {
  const t = useTranslations('FiniteSamsara');
  const tg = useTranslations('Games');
  const [showTrailer, setShowTrailer] = useState(false);

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
          <span className="heading-kicker">{t('kicker')}</span>
          <h1 className="section-title text-5xl md:text-7xl">Finite Samsara</h1>
          <p className="section-subtitle mx-auto max-w-3xl mb-8">
            {t('subtitle')}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://abyss-studios.itch.io/finite-samsara"
              target="_blank"
              rel="noopener noreferrer"
              className="gaming-button"
            >
              {tg('playOnItch')}
            </a>
            <Link href="/games" className="tag !px-5 !py-3 !text-sm">
              {tg('allCreations')}
            </Link>
          </div>
        </div>
      </section>

      {/* Video Showcase Section (Inline Integration like Kojima Productions) */}
      <section className="border-t border-b border-[#dc143c]/15 bg-black/30 py-16">
        <div className="content-wrap max-w-4xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#dc143c]/20 bg-black shadow-2xl">
            {!showTrailer ? (
              <div 
                className="relative w-full h-full group cursor-pointer" 
                onClick={() => setShowTrailer(true)}
              >
                <Image
                  src="/images/Samsara.png"
                  alt="Watch Trailer Placeholder"
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="h-16 w-16 rounded-full border border-[#dc143c]/60 bg-black/60 backdrop-blur-md flex items-center justify-center text-white text-lg group-hover:scale-110 group-hover:bg-[#dc143c] group-hover:border-[#ff7f9a] transition-all duration-300 shadow-lg shadow-[#dc143c]/20">
                    ▶
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#ffd99c] font-bold font-mono select-none">
                    {tg('watchTrailer')}
                  </span>
                </div>
              </div>
            ) : (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&enablejsapi=1&playsinline=1`}
                title="Game Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            )}
          </div>
        </div>
      </section>

      {/* Game Details Section */}
      <section className="section-shell">
        <div className="content-wrap grid gap-12 lg:grid-cols-12 items-start">
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-l-4 border-[#dc143c] pl-4">
              <span className="text-xs uppercase tracking-widest text-[#ff7f9a] font-bold">{t('premiseKicker')}</span>
              <h2 className="text-3xl font-black text-white mt-1">{t('premiseTitle')}</h2>
            </div>
            
            <p className="text-white/80 leading-relaxed font-light text-lg">
              {t('premiseText1')}
            </p>

            <p className="text-white/70 leading-relaxed font-light">
              {t('premiseText2')}
            </p>

            <div className="grid gap-6 md:grid-cols-2 pt-6">
              <div className="cinematic-card">
                <span className="text-2xl mb-2 block">⏳</span>
                <h3 className="text-lg font-bold text-white mb-2">{t('feature1Title')}</h3>
                <p className="text-white/70 text-sm font-light">{t('feature1Text')}</p>
              </div>
              <div className="cinematic-card">
                <span className="text-2xl mb-2 block">🗝️</span>
                <h3 className="text-lg font-bold text-white mb-2">{t('feature2Title')}</h3>
                <p className="text-white/70 text-sm font-light">{t('feature2Text')}</p>
              </div>
            </div>
          </div>

          {/* Specifications Sidebar */}
          <aside className="lg:col-span-5 cinematic-card space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white border-b border-[#dc143c]/20 pb-3">{t('specsTitle')}</h3>
            </div>
            
            <div className="space-y-4 text-sm font-light">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/60">{t('statusKey')}</span>
                <span className="text-white font-medium">{t('statusVal')}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/60">{t('genreKey')}</span>
                <span className="text-white font-medium">{t('genreVal')}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/60">{t('platformsKey')}</span>
                <span className="text-white font-medium">Windows</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/60">{t('devKey')}</span>
                <span className="text-white font-medium">Suryanshu Mittal</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-white/60">{t('artKey')}</span>
                <span className="text-white font-medium">Daksh Kaushik</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#dc143c]/20">
              <h4 className="text-xs uppercase tracking-widest text-[#ff7f9a] font-bold mb-3">{t('reqTitle')}</h4>
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
