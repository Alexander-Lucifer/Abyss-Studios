"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TechBackground from "@/components/TechBackground";
import MediaFrame from "../../components/MediaFrame";

// Toggle to show or hide "Read More" buttons — change here in code only.
const SHOW_READ_MORE = false;

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

    useEffect(() => {
      // Observe the timeline DOTs so the card pops from the node position
      // Progress stem update: fill between nodes based on which dots are past the viewport center
      const updateProgress = () => {
        const container = timelineRef.current;
        const prog = progressRef.current;
        if (!container || !prog) return;

        const dots = Array.from(container.querySelectorAll('.timeline-dot')) as HTMLElement[];
        if (dots.length === 0) {
          prog.style.height = '0px';
          return;
        }

        const containerRect = container.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;

        const centers = dots.map((d) => {
          const r = d.getBoundingClientRect();
          return r.top + r.height / 2; // viewport coords
        });

        // Determine which dots are "passed" (their center is above viewport center)
        const passedIndices = centers.map((c, i) => (c <= viewportCenter ? i : -1)).filter((i) => i !== -1);

        if (passedIndices.length === 0) {
          // nothing passed yet — set tiny progress at the first node (no visible fill)
          const firstTop = centers[0] - containerRect.top;
          prog.style.top = `${firstTop}px`;
          prog.style.height = `0px`;
          return;
        }

        const firstIdx = passedIndices[0];
        const lastIdx = passedIndices[passedIndices.length - 1];

        const firstY = centers[firstIdx] - containerRect.top;
        const lastY = centers[lastIdx] - containerRect.top;

        const height = Math.max(4, lastY - firstY);
        prog.style.top = `${firstY}px`;
        prog.style.height = `${height}px`;
      };

        // Enhanced behavior: compute horizontal offsets so blocks expand out from stem and collapse back
        const dots = Array.from(document.querySelectorAll('.timeline-dot')) as HTMLElement[];
        const items = Array.from(document.querySelectorAll('.timeline-item')) as HTMLElement[];

        const computeOffsets = () => {
          items.forEach((item) => {
            const dot = item.querySelector('.timeline-dot') as HTMLElement | null;
            const left = item.querySelector('.timeline-left') as HTMLElement | null;
            const right = item.querySelector('.timeline-right') as HTMLElement | null;
            if (!dot) return;

            const dotRect = dot.getBoundingClientRect();
            const dotCenterX = dotRect.left + dotRect.width / 2;

            if (left) {
              const leftRect = left.getBoundingClientRect();
              const leftCenterX = leftRect.left + leftRect.width / 2;
              const offset = Math.round(dotCenterX - leftCenterX);
              left.style.transform = `translateX(${offset}px) scale(0.85)`;
              left.style.opacity = '0';
              left.style.transition = 'transform 650ms cubic-bezier(.16,.84,.24,1), opacity 520ms ease';
              left.dataset.offset = String(offset);
            }

            if (right) {
              const rightRect = right.getBoundingClientRect();
              const rightCenterX = rightRect.left + rightRect.width / 2;
              const offsetR = Math.round(dotCenterX - rightCenterX);
              right.style.transform = `translateX(${offsetR}px) scale(0.85)`;
              right.style.opacity = '0';
              right.style.transition = 'transform 650ms cubic-bezier(.16,.84,.24,1), opacity 520ms ease';
              right.dataset.offset = String(offsetR);
            }
          });
        };

        const obs = new IntersectionObserver(
          (entries) => {
                entries.forEach((entry) => {
                  const dot = entry.target as HTMLElement;
                  const item = dot.closest('.timeline-item') as HTMLElement | null;
                  if (!item) return;

                  const left = item.querySelector('.timeline-left') as HTMLElement | null;
                  const right = item.querySelector('.timeline-right') as HTMLElement | null;

                  if (entry.isIntersecting) {
                    // make the parent visible so children are not hidden by opacity
                    item.classList.remove('opacity-0');
                    item.classList.add('opacity-100');

                    if (left) {
                      left.style.transform = 'translateX(0px) scale(1)';
                      left.style.opacity = '1';
                    }
                    if (right) {
                      right.style.transform = 'translateX(0px) scale(1)';
                      right.style.opacity = '1';
                    }
                  } else {
                    // collapse children back to stem and hide parent
                    if (left) {
                      const off = left.dataset.offset ?? '0';
                      left.style.transform = `translateX(${off}px) scale(0.85)`;
                      left.style.opacity = '0';
                    }
                    if (right) {
                      const off = right.dataset.offset ?? '0';
                      right.style.transform = `translateX(${off}px) scale(0.85)`;
                      right.style.opacity = '0';
                    }

                    item.classList.remove('opacity-100');
                    item.classList.add('opacity-0');
                  }
                });
              },
          { threshold: 0.22 }
        );

        // initial computation and observers
        computeOffsets();
        dots.forEach((d) => obs.observe(d));
        updateProgress();

        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', () => {
          computeOffsets();
          updateProgress();
        });

        return () => {
          obs.disconnect();
          window.removeEventListener('scroll', updateProgress);
          window.removeEventListener('resize', computeOffsets as any);
        };
    }, []);

  return (
    <div className="min-h-screen text-white">
      <TechBackground/>
      <Navbar />
      <main className="pt-28">

      {/* Company Overview */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#DC143C] to-[#B01030] bg-clip-text text-transparent">Our Vision</h2>
            <p className="mt-4 text-white/70">
              Abyss Studios is dedicated to exploring new territories in game
              storytelling and interactivity. We aim to design emotionally resonant
              worlds where every detail contributes to immersion.
            </p>

            <h3 className="mt-8 text-xl font-semibold">What We Do</h3>
            <ul className="mt-4 space-y-3 text-white/70">
              <li>Original narrative-driven games</li>
              <li>Cinematic direction and worldbuilding</li>
              <li>Experimental gameplay systems</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-black/30 border border-[#DC143C]/10">
              <h4 className="font-semibold text-lg">Founded</h4>
              <p className="text-white/70 mt-2">2024 — Founded by a dreamer, a writer, a gamer</p>
            </div>

            <div className="p-6 rounded-lg bg-black/30 border border-[#DC143C]/10">
              <h4 className="font-semibold text-lg">Location</h4>
              <p className="text-white/70 mt-2">India, Currently Remote</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Message */}
        <section id="founder" className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#DC143C] to-[#B01030] bg-clip-text text-transparent">Message From Our Founder, Suryanshu Mittal</h2>
              <p className="mt-4 text-white/70 max-w-2xl">
                This is to the dreamers, the observers and the lost ones in the web of Stories.
            </p>   
            <p className="mt-4 text-white/70 max-w-2xl">
                We are all incarnations of The Observers, who witness the fall of worlds and rise of Heroes.
                We are the dreamers who, Lost in stories, find light in the darkness.
              </p>
              <p className="mt-4 text-white/70 max-w-2xl">
                For fiction is what binds us all. It is the thread that weaves through our lives, connecting us across time and space.
                It is the mirror that reflects our deepest fears and highest hopes.
                It is the bridge that spans the chasm between reality and imagination.
              </p>
              <p className="mt-4 text-white/70 max-w-2xl">
              While we as Observers, Watch, interact and create stories, we find ourselves lost in the web of narratives we weave.
              of the countless lives we envision inside our minds.
              Yet, in this labyrinth of tales, we discover our own truths and forge our destinies.
              </p>
              <p className="mt-4 text-white/70 max-w-2xl">
              For we are the storytellers, the architects of worlds, the creators of dreams.
              And in this grand tapestry of existence, we find our purpose and our place.
              So let us embrace the power of fiction, and let us journey together into the unknown.
              For in the end, we are all but stories waiting to be told.
            </p>
            <p className="mt-4 text-white/70 max-w-2xl">
            We are The Crimson Observer and Nexus of Worlds, Abyx.
            </p>
              <p className="mt-4 text-white/70 max-w-2xl">
            Welcome to Abyss Studios, where stories come alive and dreams take flight.
              </p>

              <blockquote className="mt-6 p-6 bg-black/30 border border-[#DC143C]/10 rounded-lg">
                <p className="italic text-white/80">"For True Freedom exists, When we take control of the dreams, and become Architects of worlds"</p>
                <cite className="mt-4 block text-sm text-white/60">— Suryanshu Mittal, Founder</cite>
              </blockquote>
            </div>

            {/*<div className="flex justify-center">
                <div className="w-full max-w-3xl rounded-xl overflow-hidden p-6">
                  <div
                    className="rounded-md overflow-hidden"
                    style={{
                      WebkitMaskImage: 'radial-gradient(circle at 50% 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
                      maskImage: 'radial-gradient(circle at 50% 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <Image src="/images/pp.png" alt="Founder" width={1200} height={1600} className="object-cover w-full h-[720px] md:h-[920px]" />
                  </div>
                </div>
            </div> */}
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#DC143C] to-[#B01030] bg-clip-text text-transparent">Timeline</h2>
          <p className="mt-3 text-white/70 max-w-2xl">Key milestones from our founding to present.</p>

          <div ref={timelineRef} className="mt-8 relative">
            {/* center progress-stem */}
            <div className="hidden sm:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 items-start z-0 pointer-events-none">
                <div className="w-1 sm:w-2 h-full bg-white/6 rounded mx-auto relative">
                  <div
                    ref={progressRef}
                    className="timeline-progress absolute left-0 right-0 bg-gradient-to-t from-[#AA110A] via-[#FFFFFF] to-[#A5A5A5] rounded"
                    style={{ top: 0, height: 0, transition: 'top 420ms cubic-bezier(.16,.84,.24,1), height 420ms cubic-bezier(.16,.84,.24,1)' }}
                  />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-9 sm:gap-6">
              {[
                { year: 'March 2024', text: 'Formal Operations start, With New Team, Participation in Game Jams and Minor Projects', mediaType: 'image', media: '/images/Logo-Website.svg' },
                { year: 'December 2025', text: 'Proper Rebranding, and Work Begins of Flagship Project and prototype', mediaType: 'embed', media: 'https://www.youtube.com/embed/moBPbKp9S_g?si=hXbjhPbymFN6Qoo8&amp;controls=0' },
              ].map((item, idx) => (
                <div
                  key={item.year}
                  className="timeline-item sm:col-span-9 opacity-0 scale-75 transition-transform transition-opacity duration-700 ease-out relative py-6 sm:py-12"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {/* make this item a 9-col grid so inner col-span classes work */}
                  <div className="sm:grid sm:grid-cols-9 sm:items-start">
                    {/* dot above the SVG line (observed for triggering animation) */}
                    <div className="timeline-dot absolute left-6 sm:left-1/2 top-8 sm:top-10 transform sm:-translate-x-1/2 w-4 h-4 rounded-full bg-[#DC143C] border-2 border-white/10 z-50 shadow-[0_0_14px_rgba(170,17,10,0.35)]" />

                    {/* left content (cols 1-4) */}
                    <div className={`timeline-left sm:col-span-4 ${idx % 2 !== 0 ? 'sm:col-start-1 sm:text-right sm:pr-8' : 'sm:col-start-6 sm:text-left sm:pl-8'}`}>
                      <div className={`${idx % 2 !== 0 ? 'sm:float-right' : ''}`}>
                        <div className="inline-block">
                          {(() => {
                            const isLeft = idx % 2 !== 0;
                            return (
                              <svg className="h-10 sm:h-12 w-auto" viewBox="0 0 220 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={item.year}>
                                {/* flip polygon when item is on the left so the cut faces away from the center line */}
                                {isLeft ? (
                                  <g transform="translate(220 0) scale(-1 1)">
                                    <polygon points="0,0 160,0 220,48 0,48" fill="#AA110A" />
                                  </g>
                                ) : (
                                  <polygon points="0,0 160,0 220,48 0,48" fill="#AA110A" />
                                )}

                                {/* text stays unflipped and centered */}
                                <text x="110" y="60%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="12" className="uppercase">{item.year.toUpperCase()}</text>
                              </svg>
                            );
                          })()}
                        </div>

                        <div className={`mt-4 text-white/70 ${idx % 2 !== 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                          {item.text}
                        </div>

                        <div className={`mt-4 ${idx % 2 !== 0 ? 'sm:flex sm:justify-end' : ''}`}>
                          {SHOW_READ_MORE && (
                            <button className="px-4 py-2 bg-gradient-to-b from-white/10 to-white/5 text-white rounded-md border border-white/10 hover:opacity-90">Read More</button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* center spacer (col 5) */}
                    <div className="hidden sm:block sm:col-span-1" />

                    {/* media / right block (cols 6-9) */}
                    <div className={`timeline-right sm:col-span-4 mt-6 sm:mt-0 ${idx % 2 !== 0 ? 'sm:col-start-6' : 'sm:col-start-1'}`}>
                      <MediaFrame
                        mediaType={item.mediaType}
                        applyTo={['image','embed']}
                        maxWidth={item.mediaType === 'embed' ? 'max-w-4xl' : 'max-w-md'}
                        className="mx-auto w-full"
                        bg="bg-black/20"
                        padding={item.mediaType === 'embed' ? 'p-2' : 'p-4'}
                        rounded="rounded-lg"
                        border="border border-white/5"
                        aspectRatio={item.mediaType === 'embed' ? '16:9' : undefined}
                      >
                        {item.mediaType === 'image' && item.media ? (
                          <Image src={item.media} alt={`${item.year} media`} width={640} height={360} className="w-full h-full object-cover rounded-md" />
                        ) : item.mediaType === 'embed' && item.media ? (
                          <iframe
                            src={item.media}
                            title={`${item.year} video`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-black/40 rounded-md flex items-center justify-center text-white/50">Media</div>
                        )}
                      </MediaFrame>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* Values / Philosophy */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#DC143C] to-[#B01030] bg-clip-text text-transparent">Our Values</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-black/30 border border-[#DC143C]/10">
              <h4 className="font-semibold">Craft</h4>
              <p className="text-white/70 mt-2">We refine every detail until it elevates the whole.</p>
            </div>
            <div className="p-6 rounded-lg bg-black/30 border border-[#DC143C]/10">
              <h4 className="font-semibold">Boldness</h4>
              <p className="text-white/70 mt-2">We take creative risks to deliver unique experiences.</p>
            </div>
            <div className="p-6 rounded-lg bg-black/30 border border-[#DC143C]/10">
              <h4 className="font-semibold">Community</h4>
              <p className="text-white/70 mt-2">We build for players and listen to our community.</p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="bg-gradient-to-r from-[#070707] to-[#0b0b0b] py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold">Get In Touch</h3>
            <p className="mt-3 text-white/70">Interested in collaborating or joining the team? Reach out and let's talk.</p>
            <div className="mt-6">
              <a href="/contact" className="inline-block px-6 py-3 rounded-md bg-[#DC143C] text-black font-medium">Contact</a>
            </div>
          </div>
        </section>
      </main>

      <Footer handleNavClick={handleNavClick} />
    </div>
  );
}
