"use client";

import Image from "next/image";
import Footer from "@/components/Footer";

const team = [
  {
    name: "Suryanshu Mittal",
    role: "Founder & Game Director",
    bio: "Visionary behind Abyss Studios with a passion for narrative-driven games and atmospheric storytelling.",
    expertise: ["Game Design","Creative Direction","Project Management", "Team Leadership"],
    image: "/images/surya.jpg",
    social: {
      twitter: "@theabyssant",
      linkedin: "suryanshu-mittal"
    }
  },
  {
    name: "Daksh Kaushik",
    role: "Director of Animation and 3D",
    bio: "Brings worlds to life through stunning 3D art and fluid animations that enhance narrative impact.",
    expertise: ["3D Modeling", "Animation", "Visual Effects"],
    image: "/images/Daksh.jpg",
    social: {
      twitter: "@daksh_kaushik",
      linkedin: "daksh-kaushik"
    }
  },

];

const departments = [
  {
    name: "Game Direction",
    lead: "Suryanshu Mittal",
    description: "Crafting compelling narratives and innovative gameplay mechanics.",
    color: "#dc143c"
  },
  {
    name: "Art & Animation",
    lead: "Daksh Kaushik",
    description: "Creating stunning visuals and fluid animations that bring our worlds to life.",
    color: "#f8c36a"
  },
  {
    name: "Production",
    lead: "---",
    description: "Managing projects and ensuring smooth execution from concept to release.",
    color: "#5b2a67"
  }
];

export default function TeamPage() {
  return (
    <main className="site-shell">
      <section className="cinematic-hero min-h-[56vh]">
        <div className="hero-overlay"></div>
        <div className="hero-noise"></div>
        <div className="content-wrap relative z-10 text-center">
          <span className="heading-kicker">Our Team</span>
          <h1 className="section-title text-5xl md:text-6xl">Meet the Abyss Crew</h1>
          <p className="section-subtitle mx-auto max-w-3xl">
            The passionate creators behind our immersive gaming experiences. 
            Each member brings unique expertise and creative vision to every project.
          </p>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-wrap">
          <div className="mb-8">
            <span className="heading-kicker">Leadership</span>
            <h2 className="section-title text-4xl md:text-5xl">Core Team</h2>
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
                    <h4 className="text-sm font-semibold text-white/80 mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill) => (
                        <span key={skill} className="tag !text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
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
            <span className="heading-kicker">Departments</span>
            <h2 className="section-title text-4xl md:text-5xl">Our Creative Pillars</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {departments.map((dept) => (
              <article key={dept.name} className="cinematic-card">
                <div 
                  className="h-2 rounded-t-2xl mb-6"
                  style={{ backgroundColor: dept.color }}
                />
                <h3 className="text-2xl font-bold text-white">{dept.name}</h3>
                <p className="text-[#ff7f9a] mt-2">Led by {dept.lead}</p>
                <p className="mt-4 text-white/75 leading-relaxed">{dept.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="content-wrap">
          <div className="cinematic-card">
            <h2 className="text-3xl font-bold text-white">Join Our Team</h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              We're always looking for talented individuals who share our passion for creating 
              immersive gaming experiences. Whether you're an experienced professional or just 
              starting your journey, we'd love to hear from you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/careers" className="gaming-button">View Open Roles</a>
              <a href="/contact" className="tag">Send Portfolio</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
