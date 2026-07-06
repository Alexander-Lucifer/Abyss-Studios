'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const t = useTranslations('Home');

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="site-shell">
      <div className={`opening-sequence ${showIntro ? "opening-sequence-visible" : "opening-sequence-hidden"}`}>
        <div className="opening-film-grain" />
        <p className="opening-label">{t('booting')}</p>
        <h1 className="opening-title">ABYSS STUDIOS</h1>
        <p className="opening-subtitle">{t('pressStart')}</p>
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
          <span className="heading-kicker">{t('heroKicker')}</span>
          <h1 className="section-title text-5xl md:text-7xl">Abyss Studios</h1>
          <p className="section-subtitle mx-auto max-w-3xl">
            {t('heroSubtitle')}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/games" className="gaming-button">
              {t('exploreGames')}
            </Link>
            <Link href="/about" className="tag !px-5 !py-3 !text-sm">
              {t('studioStory')}
            </Link>
          </div>
          <div className="hero-scroll-cue">{t('scrollCue')}</div>
        </div>
      </section>
      <section className="section-shell">
        <div className="content-wrap mb-8">
          <div className="fun-marquee">
            <div className="fun-marquee-track">
              <div className="fun-marquee-group">
                <span>Worldbuilding</span>
                <span>Boss Fights</span>
                <span>Emotional Story Arcs</span>
                <span>Experimental Mechanics</span>
                <span>Stylized Horror</span>
              </div>
              <div className="fun-marquee-group">
                <span>Worldbuilding</span>
                <span>Boss Fights</span>
                <span>Emotional Story Arcs</span>
                <span>Experimental Mechanics</span>
                <span>Stylized Horror</span>
              </div>
            </div>
          </div>
        </div>
        <div className="content-wrap grid gap-6 md:grid-cols-3">
          {[
            { title: t('narrativeTitle'), text: t('narrativeDesc') },
            { title: t('cinematicTitle'), text: t('cinematicDesc') },
            { title: t('playableTitle'), text: t('playableDesc') },
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
              <span className="heading-kicker">{t('featuredKicker')}</span>
              <h2 className="section-title text-4xl md:text-5xl">{t('featuredTitle')}</h2>
            </div>
            <Link href="/games" className="tag">{t('viewLibrary')}</Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Tiles & Towers", image: "/images/Tiles.png", brief: t('tilesBrief') },
              { name: "Mansion of Chaos", image: "/images/moc.png", brief: t('mansionBrief') },
              { name: "Finite Samsara", image: "/images/Samsara.png", brief: t('samsaraBrief') },
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
            <span className="heading-kicker">{t('ctaKicker')}</span>
            <h2 className="section-title text-4xl md:text-5xl">{t('ctaTitle')}</h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              {t('ctaDesc')}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/services" className="gaming-button">{t('exploreServices')}</Link>
              <Link href="/contact?type=services" className="tag !px-5 !py-3 !text-sm">{t('requestQuote')}</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </main>
  );
}
