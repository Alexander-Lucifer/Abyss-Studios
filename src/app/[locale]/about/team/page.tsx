"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import ProfileModal from "@/components/ProfileModal";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function TeamPage() {
  const t = useTranslations('AboutTeam');
  const params = useParams();
  const locale = (params?.locale as "en" | "jp") || "en";

  const [teamList, setTeamList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  // Fetch team config dynamically
  useEffect(() => {
    fetch("/data/team.json")
      .then((res) => res.json())
      .then((data) => {
        setTeamList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load team config:", err);
        setLoading(false);
      });
  }, []);

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

          {loading ? (
            <div className="text-center py-20 font-mono text-xs text-white/40">
              [ ACCESSING_SUBJECT_DOSSIERS... ]
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {teamList.map((member) => (
                <article 
                  key={member.name} 
                  onClick={() => {
                    const role = member.role?.[locale] || member.role?.en || member.role;
                    const bio = member.bio?.[locale] || member.bio?.en || member.bio;
                    setSelectedMember({ ...member, role, bio });
                  }}
                  className="cinematic-card cursor-pointer hover:border-[#dc143c]/50 transition-all duration-300 group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-t-2xl mb-6">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent z-10" />
                    <div className="absolute bottom-4 left-4 right-4 z-20 font-mono">
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#ff7f9a] transition-colors duration-300">{member.name}</h3>
                      <p className="text-[#ff7f9a] mt-1 text-xs">
                        {member.role?.[locale] || member.role?.en || member.role}
                      </p>
                      <span className="text-[8px] font-mono text-white/30 tracking-[0.2em] block mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">
                        [ ACCESS DOSSIER ]
                      </span>
                    </div>
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  
                  <div className="px-6 pb-6">
                    <p className="text-white/75 leading-relaxed mb-4 text-sm line-clamp-3">
                      {member.bio?.[locale] || member.bio?.en || member.bio}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-xs font-mono text-white/40 mb-2 uppercase tracking-widest">[ CORE_PILLARS ]</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {member.expertise.map((skill: string) => (
                          <span key={skill} className="tag !text-[10px] font-mono px-2 py-0.5">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {member.social.twitter && (
                        <span className="text-[9px] font-mono text-white/40 border border-white/5 rounded px-2 py-0.5 select-none uppercase">
                          X_FEED
                        </span>
                      )}
                      {member.social.linkedin && (
                        <span className="text-[9px] font-mono text-white/40 border border-white/5 rounded px-2 py-0.5 select-none uppercase">
                          LINKEDIN
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
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

      {selectedMember && (
        <ProfileModal 
          isOpen={true} 
          onClose={() => setSelectedMember(null)} 
          member={selectedMember} 
        />
      )}

      <Footer />
    </main>
  );
}
