"use client";

import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function LifePage() {
  const t = useTranslations('AboutLife');

  const culture = [
    {
      title: t('culture1Title'),
      description: t('culture1Desc'),
      icon: "🎨"
    },
    {
      title: t('culture2Title'),
      description: t('culture2Desc'),
      icon: "⚖️"
    },
    {
      title: t('culture3Title'),
      description: t('culture3Desc'),
      icon: "📚"
    },
    {
      title: t('culture4Title'),
      description: t('culture4Desc'),
      icon: "🤝"
    }
  ];

  const perks = [
    t('perk1'),
    t('perk2'),
    t('perk3'),
    t('perk4'),
    t('perk5'),
    t('perk6'),
    t('perk7'),
    t('perk8')
  ];

  return (
    <main className="site-shell">
      <section className="cinematic-hero min-h-[56vh]">
        <div className="hero-overlay"></div>
        <div className="hero-noise"></div>
        <div className="content-wrap relative z-10 text-center">
          <span className="heading-kicker">{t('heroKicker')}</span>
          <h1 className="section-title text-5xl md:text-6xl">{t('heroTitle')}</h1>
          <p className="section-subtitle mx-auto max-w-3xl">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-wrap">
          <div className="mb-8">
            <span className="heading-kicker">{t('cultureKicker')}</span>
            <h2 className="section-title text-4xl md:text-5xl">{t('cultureTitle')}</h2>
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
            <span className="heading-kicker">{t('perksKicker')}</span>
            <h2 className="section-title text-4xl md:text-5xl">{t('perksTitle')}</h2>
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
            <h2 className="text-3xl font-bold text-white">{t('joinTitle')}</h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              {t('joinText')}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/careers" className="gaming-button">{t('viewRoles')}</a>
              <a href="/contact" className="tag">{t('getInTouch')}</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
