"use client";

import Image from "next/image";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function TeamPage() {
  const t = useTranslations('AboutTeam');

  const team = [
    {
      name: "Suryanshu Mittal",
      role: t('suryaRole'),
      bio: t('suryaBio'),
      expertise: [t('suryaExpertise1'), t('suryaExpertise2'), t('suryaExpertise3'), t('suryaExpertise4')],
      image: "/images/SuryaAbyss.png",
      social: {
        twitter: "@theabyssant",
        linkedin: "devilincarnate"
      }
    },
    {
      name: "Daksh Kaushik",
      role: t('dakshRole'),
      bio: t('dakshBio'),
      expertise: [t('dakshExpertise1'), t('dakshExpertise2'), t('dakshExpertise3')],
      image: "/images/DakshAbyss.png",
      social: {
        twitter: "",
        linkedin: "daksh-kaushik-28b93628a"
      }
    },
  ];

  const departments = [
    {
      name: t('dept1Name'),
      lead: t('dept1Led'),
      description: t('dept1Desc'),
      color: "#dc143c"
    },
    {
      name: t('dept2Name'),
      lead: t('dept2Led'),
      description: t('dept2Desc'),
      color: "#f8c36a"
    },
    {
      name: t('dept3Name'),
      lead: t('dept3Led'),
      description: t('dept3Desc'),
      color: "#5b2a67"
    }
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
            <span className="heading-kicker">{t('coreKicker')}</span>
            <h2 className="section-title text-4xl md:text-5xl">{t('coreTitle')}</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <article key={member.name} className="cinematic-card">
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-2xl mb-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                    <p className="text-[#ff7f9a] mt-1">{member.role}</p>
                  </div>
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                <div className="px-6 pb-6">
                  <p className="text-white/75 leading-relaxed mb-4">{member.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white/80 mb-2">{t('expertiseLabel')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill) => (
                        <span key={skill} className="tag !text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {member.social.twitter && (
                      <a 
                        href={`https://x.com/${member.social.twitter}`}
                        className="text-white/60 hover:text-[#ff7f9a] transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                        </svg>
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a 
                        href={`https://linkedin.com/in/${member.social.linkedin}`}
                        className="text-white/60 hover:text-[#ff7f9a] transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                          <circle cx="4" cy="4" r="2"/>
                        </svg>
                      </a>
                    )}
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
            <span className="heading-kicker">{t('deptKicker')}</span>
            <h2 className="section-title text-4xl md:text-5xl">{t('deptTitle')}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {departments.map((dept) => (
              <article key={dept.name} className="cinematic-card">
                <div 
                  className="h-2 rounded-t-2xl mb-6"
                  style={{ backgroundColor: dept.color }}
                />
                <h3 className="text-2xl font-bold text-white">{dept.name}</h3>
                <p className="text-[#ff7f9a] mt-2">{dept.lead}</p>
                <p className="mt-4 text-white/75 leading-relaxed">{dept.description}</p>
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
              <a href="/contact" className="tag">{t('sendPortfolio')}</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
