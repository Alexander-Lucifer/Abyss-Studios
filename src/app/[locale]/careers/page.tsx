'use client';

import { Link } from "@/i18n/routing";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function CareersPage() {
  const t = useTranslations('Careers');

  const openings = [
    {
      title: t('designerTitle'),
      type: t('designerType'),
      location: t('designerLocation'),
      desc: t('designerDesc'),
    },
    {
      title: t('pitchTitle'),
      type: t('pitchType'),
      location: t('pitchLocation'),
      desc: t('pitchDesc'),
    },
  ];

  return (
    <main className="site-shell">
      <section className="cinematic-hero min-h-[54vh]">
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
        <div className="content-wrap grid gap-6 md:grid-cols-3">
          {[
            t('benefit1'),
            t('benefit2'),
            t('benefit3'),
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
            <h2 className="section-title text-4xl md:text-5xl">{t('openRoles')}</h2>
            <Link href="/careers/apply" className="gaming-button">{t('applyNow')}</Link>
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
