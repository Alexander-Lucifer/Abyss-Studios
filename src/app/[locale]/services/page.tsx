'use client';

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function ServicesPage() {
  const t = useTranslations('Services');
  const params = useParams();
  const locale = (params?.locale as "en" | "jp" | "zh" | "ko" | "hi") || "en";

  const [servicesList, setServicesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch services config dynamically
  useEffect(() => {
    fetch("/data/services.json")
      .then((res) => res.json())
      .then((data) => {
        setServicesList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load services config:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="site-shell">
      {/* Hero Section */}
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

      {/* Services Grid */}
      <section className="section-shell">
        <div className="content-wrap">
          {loading ? (
            <div className="text-center py-20 font-mono text-xs text-white/40">
              [ SCANNING_CAPABILITY_ARCHIVE... ]
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {servicesList.map((service, index) => {
                const title = service.title?.[locale] || service.title?.en || "";
                const desc = service.desc?.[locale] || service.desc?.en || "";
                const deliverables = service.deliverables?.[locale] || service.deliverables?.en || service.deliverables || [];

                return (
                  <article key={index} className="cinematic-card flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">{service.icon}</span>
                        <h3 className="text-2xl font-bold text-white tracking-wide">{title}</h3>
                      </div>
                      <p className="text-white/75 leading-relaxed mb-6 font-light">{desc}</p>
                    </div>
                    
                    <div className="border-t border-[#dc143c]/15 pt-4">
                      <h4 className="text-xs uppercase tracking-[0.16em] text-[#ff7f9a] mb-3 font-semibold">{t('keyCapabilities')}</h4>
                      <ul className="space-y-1 text-sm text-white/60">
                        {deliverables.map((item: string, i: number) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-[#dc143c]">▪</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Client CTA Panel */}
      <section className="section-shell pb-28">
        <div className="content-wrap">
          <div className="cinematic-card text-center py-16">
            <span className="heading-kicker">{t('collabKicker')}</span>
            <h2 className="section-title text-4xl md:text-5xl">{t('collabTitle')}</h2>
            <p className="section-subtitle mx-auto max-w-2xl mb-8">
              {t('collabDesc')}
            </p>
            <div className="flex justify-center">
              <Link href="/contact?type=services" className="gaming-button">
                {t('brief')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
