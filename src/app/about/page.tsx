"use client";

import Image from "next/image";
import Footer from "@/components/Footer";

const timeline = [
  { year: "2022", event: "Abyss Studios is conceived as an indie narrative experiment." },
  { year: "2024", event: "Formal operations begin with game jams and prototypes." },
  { year: "2025", event: "Studio expansion and flagship project pre-production." },
];

export default function AboutPage() {
  return (
    <main className="site-shell">
      {/* Hero Section */}
      <section className="cinematic-hero min-h-[56vh]">
        <div className="hero-overlay"></div>
        <div className="hero-noise"></div>
        <div className="content-wrap relative z-10 text-center">
          <span className="heading-kicker">About</span>
          <h1 className="section-title text-5xl md:text-6xl">Abyss Studios</h1>
          <p className="section-subtitle mx-auto max-w-3xl">
            We build games as narrative environments: places players enter, feel, and remember.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="/about/life" className="tag">Studio Life</a>
            <a href="/about/team" className="tag">Our Team</a>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="section-shell">
        <div className="content-wrap grid gap-6 lg:grid-cols-2">
          <article className="cinematic-card">
            <h2 className="text-3xl font-bold text-white">Vision</h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              We craft emotionally resonant, fiction-first experiences where atmosphere and interactivity
              are inseparable. Our worlds invite players to observe, interpret, and transform.
            </p>
          </article>

          <article className="cinematic-card">
            <h2 className="text-3xl font-bold text-white">Mission</h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              Blend cinematic storytelling, stylized art, and experimental mechanics into games that
              feel intimate, strange, and unforgettable.
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
                Founder Statement
              </span>
              
              <div className="text-white/90 font-light tracking-wide text-lg md:text-xl leading-[1.8] space-y-6 max-w-2xl">
                <p>
                  We are observers who build worlds from fragments of memory, fear, and wonder.
                </p>
                <p>
                  At Abyss Studios, we see games as Art, a new world born from the depths of its creator's mind.
                  We are Creators, Architects, and Lorekeepers of these Myriad Realms; using every tool at our disposal to shape both, these realms and our own world.
                  The Players who embark on these journeys are our heralds, pacing through our worlds and sharing their stories with the community.
                </p>
                <p>
                  We are not just creators, we are storytellers, dreamers and Crazies who will not settle for art without a soul,
                  soul that will give life to our creations.
                </p>
              </div>
              
              <p className="mt-10 text-[#ff7f9a] font-medium tracking-widest text-sm uppercase">
                — Suryanshu Mittal, Founder
              </p>
            </div>

            {/* Right Side Portrait - Fades cleanly behind layout on mobile, snaps beside text on desktop */}
            <div className="absolute inset-0 z-10 lg:relative lg:inset-auto lg:col-span-5 w-full h-full lg:h-[650px]">
              <div 
                className="relative w-full h-full opacity-50 lg:opacity-65 transition-opacity duration-500 lg:hover:opacity-80"
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
                  // Swapped standard layout anchors over to fix invalid positioning keywords
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
          <h2 className="section-title text-4xl md:text-5xl">Studio Timeline</h2>
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