"use client";

import Image from "next/image";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations('About');

  const timeline = [
    { year: "2022", event: t('timeline2022') },
    { year: "2024", event: t('timeline2024') },
    { year: "2025", event: t('timeline2025') },
  ];

  return (
    <main className="site-shell">
      {/* Hero Section */}
      <section className="cinematic-hero min-h-[56vh]">
        <div className="hero-overlay"></div>
        <div className="hero-noise"></div>
        <div className="content-wrap relative z-10 text-center">
          <span className="heading-kicker">{t('heroKicker')}</span>
          <h1 className="section-title text-5xl md:text-6xl">Abyss Studios</h1>
          <p className="section-subtitle mx-auto max-w-3xl">
            {t('heroSubtitle')}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="/about/life" className="tag">{t('studioLife')}</a>
            <a href="/about/team" className="tag">{t('ourTeam')}</a>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="section-shell">
        <div className="content-wrap grid gap-6 lg:grid-cols-2">
          <article className="cinematic-card">
            <h2 className="text-3xl font-bold text-white">{t('vision')}</h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              {t('visionText')}
            </p>
          </article>

          <article className="cinematic-card">
            <h2 className="text-3xl font-bold text-white">{t('mission')}</h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              {t('missionText')}
            </p>
          </article>
        </div>
      </section>

      {/* Founder Section - Kojima Productions Inspired Layout */}
      <section className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
        <div className="content-wrap relative z-20">
          
          {/* Relative grid container to allow absolute breakout on mobile wrappers */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[550px] lg:min-h-0">
            
            {/* Left Side Typography - z-20 to ensure text scales above the portrait background watermarking on mobile */}
            <div className="relative z-20 lg:col-span-7 flex flex-col justify-center">
              <span className="heading-kicker mb-6 tracking-[0.25em] text-[#ff7f9a] text-xs uppercase font-semibold block">
                {t('founderKicker')}
              </span>
              
              <div className="text-white/90 font-light tracking-wide text-lg md:text-xl leading-[1.8] space-y-6 max-w-2xl">
                <p>
                  {t('founderText1')}
                </p>
                <p>
                  {t('founderText2')}
                </p>
                <p>
                  {t('founderText3')}
                </p>
              </div>
              
              <p className="mt-10 text-[#ff7f9a] font-medium tracking-widest text-sm uppercase">
                {t('founderSig')}
              </p>
            </div>

            {/* Right Side Portrait - Fades cleanly behind layout on mobile, snaps beside text on desktop */}
            <div className="absolute inset-0 z-10 lg:relative lg:inset-auto lg:col-span-5 w-full h-full lg:h-[650px]">
              <div 
                className="relative w-full h-full opacity-20 lg:opacity-65 transition-opacity duration-500 lg:hover:opacity-80"
                style={{
                  WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%), linear-gradient(to right, transparent 0%, black 30%)',
                  maskImage: 'linear-gradient(to top, transparent 0%, black 20%), linear-gradient(to right, transparent 0%, black 30%)',
                  WebkitMaskComposite: 'source-in',
                  maskComposite: 'intersect'
                }}
              >
                <Image 
                  src="/images/NOBGfounder.png"
                  alt="Suryanshu Mittal - Founder"
                  fill
                  className="object-contain object-center lg:object-right-bottom select-none transform -scale-x-100"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-shell">
        <div className="content-wrap">
          <h2 className="section-title text-4xl md:text-5xl">{t('timelineTitle')}</h2>
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