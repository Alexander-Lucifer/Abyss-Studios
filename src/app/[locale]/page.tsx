'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const t = useTranslations('Home');
  const params = useParams();
  const locale = (params?.locale as "en" | "jp") || "en";

  // Carousel State & Effect
  const [carouselSlides, setCarouselSlides] = useState<any[]>([]);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  // Fetch games configuration for homepage carousel
  useEffect(() => {
    fetch('/data/games.json')
      .then(res => res.json())
      .then(data => {
        const slides = data.map((g: any) => ({
          image: g.image,
          title: g.name,
          kicker: `${(g.genre?.split(',')[0] || 'ADVENTURE').toUpperCase()} / ${(g.engine || 'UNITY').toUpperCase()}`
        }));
        setCarouselSlides(slides);
      })
      .catch(err => {
        console.error("Failed to fetch games for carousel:", err);
        setCarouselSlides([
          { image: "/images/Tiles.png", title: "Tiles & Towers", kicker: "PUZZLE / UNITY" },
          { image: "/images/moc.png", title: "Mansion of Chaos", kicker: "THRILLER / UNITY" },
          { image: "/images/Samsara.png", title: "Finite Samsara", kicker: "PUZZLE / UNITY" }
        ]);
      });
  }, []);

  useEffect(() => {
    if (carouselSlides.length === 0) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [carouselSlides]);

  // Telemetry HUD stats (dynamic simulation)
  const [currentTime, setCurrentTime] = useState<string>("");
  const [ping, setPing] = useState<number>(42);
  const [signalStrength, setSignalStrength] = useState<number>(98);

  // Logs state
  const [logs, setLogs] = useState<any[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [loadingLogs, setLoadingLogs] = useState<boolean>(true);

  // Admin Overlay States
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const [editLogs, setEditLogs] = useState<any[]>([]);
  const [editGames, setEditGames] = useState<any[]>([]);
  const [editTeam, setEditTeam] = useState<any[]>([]);
  const [editServices, setEditServices] = useState<any[]>([]);
  const [cmsTab, setCmsTab] = useState<"logs" | "games" | "team" | "services">("logs");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [serverlessSaveError, setServerlessSaveError] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  // Fetch telemetry logs at runtime
  const fetchLogs = () => {
    setLoadingLogs(true);
    fetch('/data/transmission-log.json')
      .then(res => res.json())
      .then(data => {
        setLogs(data);
        setEditLogs(JSON.parse(JSON.stringify(data))); // Deep copy for editing
        setLoadingLogs(false);
      })
      .catch(err => {
        console.error("Failed to fetch transmission logs:", err);
        setLoadingLogs(false);
      });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // Clock ticks
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString(locale === 'jp' ? 'ja-JP' : 'en-US', { hour12: false });
      setCurrentTime(timeStr);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [locale]);

  // Telemetry HUD stats simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 15) + 35);
      setSignalStrength(Math.floor(Math.random() * 5) + 95);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Filter logs logic
  useEffect(() => {
    if (activeFilter === "ALL") {
      setFilteredLogs(logs);
    } else {
      setFilteredLogs(logs.filter(log => {
        const tagEn = log.tag?.en?.toUpperCase() || "";
        return tagEn === activeFilter;
      }));
    }
  }, [logs, activeFilter]);

  // CMS Fetch Logic
  const fetchCmsData = async () => {
    try {
      const logsRes = await fetch('/data/transmission-log.json');
      const logsData = await logsRes.json();
      setEditLogs(JSON.parse(JSON.stringify(logsData)));

      const gamesRes = await fetch('/data/games.json');
      const gamesData = await gamesRes.json();
      setEditGames(JSON.parse(JSON.stringify(gamesData)));

      const teamRes = await fetch('/data/team.json');
      const teamData = await teamRes.json();
      setEditTeam(JSON.parse(JSON.stringify(teamData)));

      const servicesRes = await fetch('/data/services.json');
      const servicesData = await servicesRes.json();
      setEditServices(JSON.parse(JSON.stringify(servicesData)));
    } catch (err) {
      console.error("Failed to load CMS data:", err);
    }
  };

  // Passcode verification
  const handleVerifyPasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const response = await fetch('/api/cms/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setIsAuthed(true);
        fetchCmsData();
      } else {
        setAuthError(data.message || "ACCESS DENIED. DECRYPTION KEY INVALID.");
      }
    } catch (err) {
      setAuthError("AUTHENTICATION OFFLINE. SECURE PROTOCOL FAILURE.");
    }
  };

  // Admin Logs manipulation
  const handleAddEntry = () => {
    const newEntry = {
      id: String(Date.now()),
      timestamp: new Date().toISOString().split('T')[0],
      tag: { en: "RELEASED", jp: "配信中" },
      text: { 
        en: "System baseline update finalized.", 
        jp: "システムベースラインのアップデートが完了しました。" 
      }
    };
    setEditLogs([newEntry, ...editLogs]);
  };

  const handleDeleteEntry = (id: string) => {
    setEditLogs(editLogs.filter(log => log.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= editLogs.length) return;
    const newLogs = [...editLogs];
    const temp = newLogs[index];
    newLogs[index] = newLogs[nextIndex];
    newLogs[nextIndex] = temp;
    setEditLogs(newLogs);
  };

  // Games manipulation
  const handleAddGame = () => {
    const newGame = {
      name: "New Creation Project",
      key: "new-game-" + Date.now(),
      image: "/images/soon.jpeg",
      genre: "Puzzle,Windows,Jam",
      alt: "https://abyss-studios.itch.io",
      engine: "Unity",
      version: "v1.0.0",
      brief: {
        en: "Brief description of the project.",
        jp: "プロジェクトの概要説明。"
      },
      features: {
        en: ["Feature core loop description."],
        jp: ["コアゲームプレイ機能の説明。"]
      },
      systemRequirements: {
        minimum: ["OS: Windows 10", "Memory: 4 GB RAM", "Storage: 100 MB"],
        recommended: ["OS: Windows 11", "Memory: 8 GB RAM", "Storage: 100 MB"]
      },
      credits: {
        developers: ["Suryanshu Mittal"],
        designers: ["Suryanshu Mittal"],
        artists: ["Daksh Kaushik"]
      }
    };
    setEditGames([newGame, ...editGames]);
  };

  const handleDeleteGame = (key: string) => {
    setEditGames(editGames.filter(g => g.key !== key));
  };

  const handleMoveGame = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= editGames.length) return;
    const list = [...editGames];
    const temp = list[index];
    list[index] = list[nextIndex];
    list[nextIndex] = temp;
    setEditGames(list);
  };

  // Team manipulation
  const handleAddMember = () => {
    const newMember = {
      name: "Creative Associate",
      role: {
        en: "Junior Developer",
        jp: "ジュニアデベロッパー"
      },
      bio: {
        en: "Dossier bio records for the associate.",
        jp: "アソシエイトのバイオグラフィーレコード。"
      },
      expertise: ["C# Programming", "Asset Design"],
      image: "/images/soon.jpeg",
      social: {
        twitter: "",
        linkedin: ""
      },
      stats: [
        { label: "Commit Frequency", value: 75 },
        { label: "Coffee Intake", value: 60 },
        { label: "Design Focus", value: 70 }
      ],
      subjectId: "CORE_SUBJECT::" + String(editTeam.length + 1).padStart(2, '0')
    };
    setEditTeam([newMember, ...editTeam]);
  };

  const handleDeleteMember = (name: string) => {
    setEditTeam(editTeam.filter(m => m.name !== name));
  };

  const handleMoveMember = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= editTeam.length) return;
    const list = [...editTeam];
    const temp = list[index];
    list[index] = list[nextIndex];
    list[nextIndex] = temp;
    setEditTeam(list);
  };

  // Services manipulation
  const handleAddService = () => {
    const newService = {
      icon: "✨",
      title: {
        en: "New Capable Service",
        jp: "新しいケイパビリティサービス"
      },
      desc: {
        en: "Service overview details description.",
        jp: "サービスの概要説明文。"
      },
      deliverables: {
        en: ["Key capability one", "Key capability two"],
        jp: ["主な成果物・機能１", "主な成果物・機能２"]
      }
    };
    setEditServices([newService, ...editServices]);
  };

  const handleDeleteService = (index: number) => {
    setEditServices(editServices.filter((_, idx) => idx !== index));
  };

  const handleMoveService = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= editServices.length) return;
    const list = [...editServices];
    const temp = list[index];
    list[index] = list[nextIndex];
    list[nextIndex] = temp;
    setEditServices(list);
  };

  // Save config polymorphic CMS writer
  const handleSaveCms = async (type: "logs" | "games" | "team" | "services") => {
    setIsSaving(true);
    setServerlessSaveError(false);
    setSuccessMessage("");
    
    let payloadData: any[] = [];
    if (type === "logs") payloadData = editLogs;
    else if (type === "games") payloadData = editGames;
    else if (type === "team") payloadData = editTeam;
    else if (type === "services") payloadData = editServices;

    try {
      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data: payloadData })
      });
      
      const resData = await response.json();
      if (response.ok && resData.success) {
        if (type === "logs") {
          setLogs(editLogs);
        }
        setSuccessMessage(`COMPILATION SUCCESSFUL. ${type.toUpperCase()} DATABASE UPDATED.`);
        setTimeout(() => setSuccessMessage(""), 4000);
      } else if (resData.isServerless) {
        setServerlessSaveError(true);
      } else {
        alert("Action failed: " + resData.message);
      }
    } catch (err) {
      console.warn("CMS write failed, falling back to download overlay:", err);
      setServerlessSaveError(true);
    } finally {
      setIsSaving(false);
    }
  };

  // Download updated JSON file config based on active tab
  const handleDownloadCmsJson = () => {
    let payload = editLogs;
    let filename = "transmission-log.json";
    if (cmsTab === "games") {
      payload = editGames;
      filename = "games.json";
    } else if (cmsTab === "team") {
      payload = editTeam;
      filename = "team.json";
    } else if (cmsTab === "services") {
      payload = editServices;
      filename = "services.json";
    }

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(payload, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Translate English to Japanese using public Google Translate API
  const translateText = async (text: string): Promise<string> => {
    if (!text.trim()) return "";
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ja&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Translation request failed");
      const data = await res.json();
      if (data && data[0]) {
        return data[0].map((x: any) => x[0]).join('');
      }
    } catch (err: any) {
      console.warn("Auto-translation offline fallback:", err.message || err);
    }
    return "";
  };

  // Helper for tag style variants
  const getTagStyle = (tagEn: string) => {
    const upper = tagEn.toUpperCase();
    if (upper === "RELEASED") {
      return "border border-[#dc143c]/60 text-[#ff7f9a] bg-[#dc143c]/10";
    }
    if (upper === "MILESTONE") {
      return "border border-[#b12a8b]/60 text-[#f68de2] bg-[#b12a8b]/10";
    }
    if (upper === "CAPACITY") {
      return "border border-[#f8c36a]/60 text-[#ffd99c] bg-[#f8c36a]/10";
    }
    return "border border-white/30 text-white/70 bg-white/5";
  };

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

        {/* Cinematic Carousel Section */}
        <section className="relative w-full h-[45vh] md:h-[65vh] border-t border-b border-[#dc143c]/15 bg-black overflow-hidden group">
          {carouselSlides.length > 0 ? (
            <>
              {/* Slides */}
              <div className="absolute inset-0">
                {carouselSlides.map((slide, idx) => (
                  <div
                    key={slide.title + idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      idx === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={idx === 0}
                      className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-[10000ms] ease-out"
                    />
                    {/* Immersive overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/35" />
                    <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.7) 90%)" />
                    
                    {/* Content HUD */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4 z-20 font-mono">
                      <div className="text-left">
                        <span className="text-[10px] text-[#ff7f9a] font-bold tracking-[0.3em] uppercase block mb-1">
                          {slide.kicker}
                        </span>
                        <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-wider">
                          {slide.title}
                        </h3>
                      </div>
                      <Link 
                        href="/games" 
                        className="tag !px-4 !py-2 text-[10px] self-start md:self-auto"
                      >
                        [ ACCESS_DATA ]
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setActiveSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full border border-white/10 bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#dc143c] hover:border-[#ff7f9a] opacity-0 group-hover:opacity-100 transition-all duration-300 font-mono text-sm"
              >
                &lt;
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev + 1) % carouselSlides.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full border border-white/10 bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#dc143c] hover:border-[#ff7f9a] opacity-0 group-hover:opacity-100 transition-all duration-300 font-mono text-sm"
              >
                &gt;
              </button>

              {/* HUD Indicators (Dashes at the bottom) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {carouselSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1 transition-all duration-300 rounded ${
                      idx === activeSlide ? "w-8 bg-[#dc143c]" : "w-3 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white/40">
              [ SYNCING_CINEMATIC_FEED... ]
            </div>
          )}
        </section>

        {/* Pillars Section */}
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

        {/* Featured Creations Showcase */}
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

        {/* Anatomy of Atmosphere Section */}
        <section className="section-shell border-t border-[#dc143c]/15 bg-black/20">
          <div className="content-wrap">
            <div className="text-center mb-16">
              <span className="heading-kicker">{t('anatomyTitle')}</span>
              <p className="section-subtitle mx-auto max-w-2xl mt-4">
                {t('anatomySubtitle')}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: t('somaticTitle'), desc: t('somaticDesc'), icon: "🎮" },
                { title: t('architectureTitle'), desc: t('architectureDesc'), icon: "🏛️" },
                { title: t('auditoryTitle'), desc: t('auditoryDesc'), icon: "🔊" },
              ].map((item) => (
                <article key={item.title} className="cinematic-card fun-card flex flex-col justify-between group">
                  <span className="card-spark" />
                  <div className="space-y-4">
                    <div className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#ff7f9a] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* The Crimson Signature Manifesto */}
        <section className="relative py-24 md:py-32 border-t border-[#dc143c]/15 bg-gradient-to-b from-[#140c12]/30 to-[#22131c]/10">
          <div className="hero-noise opacity-10" />
          <div className="content-wrap relative z-10 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#ff7f9a] font-bold block mb-4">
              {t('ludicKicker')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-[0.05em] mb-8 uppercase">
              {t('ludicTitle')}
            </h2>
            <blockquote className="max-w-4xl mx-auto">
              <p className="text-lg md:text-2xl font-extralight text-white/90 leading-[1.8] tracking-wide italic">
                “ {t('ludicText')} ”
              </p>
            </blockquote>
          </div>
        </section>

        {/* Transmission Log Section (Moved down) */}
        <section className="border-t border-[#dc143c]/15 bg-black/45 py-16 relative overflow-hidden">
          <div className="hero-noise opacity-5 animate-pulse" />
          <div className="absolute inset-x-0 top-0 h-0.5 bg-[#dc143c]/20 animate-bounce pointer-events-none" style={{ animationDuration: '6s' }} />
          
          <div className="content-wrap relative z-10">
            <div className="grid gap-8 lg:grid-cols-12 items-start">
              
              {/* Left HUD Panel */}
              <div className="lg:col-span-4 space-y-4">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#ff7f9a]">
                    <span className="h-2 w-2 rounded-full bg-[#dc143c] animate-pulse" />
                    {t('logTitle')}
                  </span>
                  <p className="text-white/60 text-sm font-light leading-relaxed">
                    {t('logSubtitle')}
                  </p>
                </div>

                {/* Telemetry Status HUD */}
                <div className="border border-[#dc143c]/20 bg-black/80 rounded-xl p-4 font-mono text-xs text-white/70 space-y-3 relative overflow-hidden shadow-2xl">
                  <div className="flex justify-between items-center border-b border-[#dc143c]/15 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#dc143c] animate-pulse" />
                      <span className="text-[#ff7f9a] font-bold text-[10px]">HUD :: SYSTEM_TELEMETRY</span>
                    </div>
                    <button 
                      onClick={() => {
                        setIsAdminOpen(true);
                        setPasscode("");
                        setIsAuthed(false);
                        setAuthError("");
                        setServerlessSaveError(false);
                      }}
                      className="text-[10px] text-white/40 hover:text-[#ff7f9a] border border-white/10 hover:border-[#dc143c]/40 rounded px-1.5 py-0.5 transition-all font-mono"
                    >
                      [ ACCESS_CONSOLE ]
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[10px]">
                    <div>TIME: <span className="text-white font-bold">{currentTime || "00:00:00"}</span></div>
                    <div>PING: <span className="text-white font-bold">{ping}ms</span></div>
                    <div>STRENGTH: <span className="text-white font-bold">{signalStrength}%</span></div>
                    <div>STATUS: <span className="text-emerald-400 font-bold animate-pulse">ONLINE</span></div>
                  </div>
                </div>
              </div>
              
              {/* Right log feed & Filter Menu */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Clean interactive filter row */}
                <div className="flex flex-wrap gap-2 border-b border-[#dc143c]/15 pb-4">
                  {["ALL", "RELEASED", "MILESTONE", "CAPACITY"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`font-mono text-xs px-3 py-1 rounded transition-all select-none ${
                        activeFilter === filter
                          ? "bg-[#dc143c] text-white font-bold shadow-md shadow-[#dc143c]/20"
                          : "text-white/60 hover:text-white border border-white/5 bg-black/20"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Logs Feed Container */}
                <div className="space-y-4 min-h-[180px]">
                  {loadingLogs ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-2">
                      <span className="h-6 w-6 rounded-full border-2 border-t-transparent border-[#dc143c] animate-spin" />
                      <span className="text-xs font-mono text-white/50 tracking-widest uppercase">Deciphering Telemetry...</span>
                    </div>
                  ) : filteredLogs.length === 0 ? (
                    <div className="text-center py-12 font-mono text-xs text-white/45">
                      NO LOGS ENCOUNTERED WITH FILTER TAG [{activeFilter}]
                    </div>
                  ) : (
                    filteredLogs.map((log) => (
                      <div 
                        key={log.id} 
                        className="flex gap-4 items-start border-b border-white/5 pb-4 last:border-0 last:pb-0 font-mono text-xs group"
                      >
                        <span className={`shrink-0 px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider transition-all duration-300 ${getTagStyle(log.tag?.en || "")}`}>
                          {locale === 'jp' ? log.tag?.jp : log.tag?.en}
                        </span>
                        <div className="space-y-1">
                          <p className="text-white/80 leading-relaxed font-light group-hover:text-white transition-colors duration-300">
                            {locale === 'jp' ? log.text?.jp : log.text?.en}
                          </p>
                          <span className="text-[9px] text-white/30 block font-light select-none">
                            DATE: {log.timestamp}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>
            </div>
          </div>
        </section>


        {/* CTA Co-Dev Section */}
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

      {/* Access Console Overlay (Admin Modal) */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
          
          {/* Verification Screen */}
          {!isAuthed ? (
            <div className="w-full max-w-md border border-[#dc143c]/30 bg-[#140c12] p-8 rounded-xl shadow-2xl space-y-6 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-[#dc143c]/20 pb-3">
                <span className="text-[#ff7f9a] font-bold">DECRYPT_HUD :: VERIFY</span>
                <button 
                  onClick={() => setIsAdminOpen(false)} 
                  className="text-white/40 hover:text-white"
                >
                  [ X ]
                </button>
              </div>
              <p className="text-white/70 leading-relaxed">
                SYSTEM REGISTER LOCKED. PLEASE KEY IN ACCESS DECRYPTION PASSCODE.
              </p>
              <form onSubmit={handleVerifyPasscode} className="space-y-4">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="PASSCODE"
                  required
                  autoFocus
                  className="w-full rounded border border-[#dc143c]/30 bg-black/60 px-4 py-3 text-white placeholder-white/20 outline-none focus:border-[#ff7f9a]"
                />
                {authError && (
                  <p className="text-red-400 font-bold">{authError}</p>
                )}
                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsAdminOpen(false)} 
                    className="border border-white/10 hover:bg-white/5 rounded px-4 py-2 text-white/60"
                  >
                    CANCEL
                  </button>
                  <button 
                    type="submit" 
                    className="bg-[#dc143c] hover:bg-[#ff7f9a] text-white font-bold rounded px-4 py-2 shadow-lg shadow-[#dc143c]/20"
                  >
                    DECRYPT
                  </button>
                </div>
              </form>
            </div>
          ) : (
            
            /* Admin Console Workspace */
            <div className="w-full max-w-4xl border border-[#dc143c]/30 bg-[#140c12] rounded-xl shadow-2xl p-6 font-mono text-xs flex flex-col max-h-[85vh]">
              
              <div className="flex justify-between items-center border-b border-[#dc143c]/20 pb-3 mb-4 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-bold">HUD :: REGISTER_WORKSPACE</span>
                </div>
                <button 
                  onClick={() => {
                    setIsAdminOpen(false);
                    fetchLogs();
                  }} 
                  className="text-white/40 hover:text-white"
                >
                  [ CLOSE_HUD ]
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 mb-4 shrink-0 border-b border-[#dc143c]/15 pb-2 font-mono">
                <button
                  onClick={() => setCmsTab("logs")}
                  className={`px-3 py-1.5 border rounded transition-all duration-300 ${
                    cmsTab === "logs" 
                      ? "border-[#dc143c] bg-[#dc143c]/10 text-white font-bold" 
                      : "border-white/5 text-white/50 hover:text-white"
                  }`}
                >
                  [ LOGS_CMS ]
                </button>
                <button
                  onClick={() => setCmsTab("games")}
                  className={`px-3 py-1.5 border rounded transition-all duration-300 ${
                    cmsTab === "games" 
                      ? "border-[#dc143c] bg-[#dc143c]/10 text-white font-bold" 
                      : "border-white/5 text-white/50 hover:text-white"
                  }`}
                >
                  [ GAMES_CMS ]
                </button>
                <button
                  onClick={() => setCmsTab("team")}
                  className={`px-3 py-1.5 border rounded transition-all duration-300 ${
                    cmsTab === "team" 
                      ? "border-[#dc143c] bg-[#dc143c]/10 text-white font-bold" 
                      : "border-white/5 text-white/50 hover:text-white"
                  }`}
                >
                  [ TEAM_CMS ]
                </button>
                <button
                  onClick={() => setCmsTab("services")}
                  className={`px-3 py-1.5 border rounded transition-all duration-300 ${
                    cmsTab === "services" 
                      ? "border-[#dc143c] bg-[#dc143c]/10 text-white font-bold" 
                      : "border-white/5 text-white/50 hover:text-white"
                  }`}
                >
                  [ SERVICES_CMS ]
                </button>
              </div>

              {/* Serverless Warnings and Success Messages */}
              {successMessage && (
                <div className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 rounded p-3 mb-4 shrink-0">
                  {successMessage}
                </div>
              )}

              {serverlessSaveError && (
                <div className="bg-amber-500/10 border border-amber-500/40 text-amber-300 rounded p-4 mb-4 shrink-0 space-y-2">
                  <p className="font-bold">⚠️ RUNTIME ENVIRONMENT DETECTED AS SERVERLESS</p>
                  <p className="font-light">
                    Direct server writes are blocked by Vercel/Amplify. To update the website, click download below to save the file, replace it at <code className="bg-black/40 px-1 py-0.5 rounded text-white font-bold">public/data/{cmsTab === "logs" ? "transmission-log.json" : cmsTab === "games" ? "games.json" : cmsTab === "team" ? "team.json" : "services.json"}</code> in your project, and commit it to git.
                  </p>
                  <button 
                    onClick={handleDownloadCmsJson}
                    className="bg-amber-500 hover:bg-amber-400 text-black font-bold rounded px-4 py-2"
                  >
                    DOWNLOAD UPDATED CONFIG
                  </button>
                </div>
              )}

              {/* List editing scrollbox */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-6 mb-4">
                
                {/* 1. Logs Tab Editor */}
                {cmsTab === "logs" && editLogs.map((log, index) => (
                  <div key={log.id} className="border border-white/5 bg-black/40 rounded-lg p-4 space-y-3 relative group">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 font-bold">#{index + 1}</span>
                        <input
                          type="date"
                          value={log.timestamp}
                          onChange={(e) => {
                            const updated = [...editLogs];
                            updated[index].timestamp = e.target.value;
                            setEditLogs(updated);
                          }}
                          className="bg-black/60 border border-white/10 rounded px-2 py-1 text-white font-bold text-[10px]"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMove(index, 'up')}
                          disabled={index === 0}
                          className="px-2 py-1 border border-white/10 hover:bg-white/5 rounded text-white disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => handleMove(index, 'down')}
                          disabled={index === editLogs.length - 1}
                          className="px-2 py-1 border border-white/10 hover:bg-white/5 rounded text-white disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          ▼
                        </button>
                        <button
                          onClick={() => handleDeleteEntry(log.id)}
                          className="px-2 py-1 border border-red-500/30 hover:border-red-500 hover:bg-red-500/10 text-red-400 rounded"
                        >
                          DELETE
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-12">
                      {/* Tag selector */}
                      <div className="md:col-span-3 space-y-1">
                        <label className="text-[10px] text-white/40">TAG CATEGORY</label>
                        <select
                          value={log.tag?.en || "RELEASED"}
                          onChange={(e) => {
                            const updated = [...editLogs];
                            const val = e.target.value;
                            updated[index].tag.en = val;
                            if (val === "RELEASED") updated[index].tag.jp = "配信中";
                            if (val === "MILESTONE") updated[index].tag.jp = "マイルストーン";
                            if (val === "CAPACITY") updated[index].tag.jp = "受け入れ枠";
                            setEditLogs(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white"
                        >
                          <option value="RELEASED">RELEASED (配信中)</option>
                          <option value="MILESTONE">MILESTONE (マイルストーン)</option>
                          <option value="CAPACITY">CAPACITY (受け入れ枠)</option>
                        </select>
                      </div>

                      {/* Translations */}
                      <div className="md:col-span-9 space-y-3">
                        <div className="space-y-1">
                          <label className="text-[10px] text-white/40">TEXT (ENGLISH)</label>
                          <input
                            type="text"
                            value={log.text?.en || ""}
                            onChange={(e) => {
                              const updated = [...editLogs];
                              updated[index].text.en = e.target.value;
                              setEditLogs(updated);
                            }}
                            className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] text-white/40">TEXT (JAPANESE / 日本語)</label>
                            <button
                              type="button"
                              onClick={async () => {
                                if (!log.text?.en) return;
                                const btn = document.getElementById(`translate-btn-${log.id}`);
                                if (btn) btn.innerText = "TRANSLATING...";
                                const translated = await translateText(log.text.en);
                                if (translated) {
                                  const updated = [...editLogs];
                                  updated[index].text.jp = translated;
                                  setEditLogs(updated);
                                }
                                if (btn) btn.innerText = "[ ⚡ AUTO-TRANSLATE ]";
                              }}
                              id={`translate-btn-${log.id}`}
                              className="text-[9px] text-[#ff7f9a] hover:underline font-mono"
                            >
                              [ ⚡ AUTO-TRANSLATE ]
                            </button>
                          </div>
                          <input
                            type="text"
                            value={log.text?.jp || ""}
                            onChange={(e) => {
                              const updated = [...editLogs];
                              updated[index].text.jp = e.target.value;
                              setEditLogs(updated);
                            }}
                            className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-sans"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 2. Games Tab Editor */}
                {cmsTab === "games" && editGames.map((game, index) => (
                  <div key={game.key} className="border border-white/5 bg-black/40 rounded-lg p-4 space-y-3 relative group">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 font-bold">GAME #{index + 1}</span>
                        <input
                          type="text"
                          value={game.name}
                          onChange={(e) => {
                            const updated = [...editGames];
                            updated[index].name = e.target.value;
                            setEditGames(updated);
                          }}
                          className="bg-black/60 border border-white/10 rounded px-2 py-1 text-white font-bold text-[10px]"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveGame(index, 'up')}
                          disabled={index === 0}
                          className="px-2 py-1 border border-white/10 hover:bg-white/5 rounded text-white disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => handleMoveGame(index, 'down')}
                          disabled={index === editGames.length - 1}
                          className="px-2 py-1 border border-white/10 hover:bg-white/5 rounded text-white disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          ▼
                        </button>
                        <button
                          onClick={() => handleDeleteGame(game.key)}
                          className="px-2 py-1 border border-red-500/30 hover:border-red-500 hover:bg-red-500/10 text-red-400 rounded"
                        >
                          DELETE
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">KEY (SLUG)</label>
                        <input
                          type="text"
                          value={game.key}
                          onChange={(e) => {
                            const updated = [...editGames];
                            updated[index].key = e.target.value;
                            setEditGames(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">IMAGE PATH</label>
                        <input
                          type="text"
                          value={game.image}
                          onChange={(e) => {
                            const updated = [...editGames];
                            updated[index].image = e.target.value;
                            setEditGames(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">GENRE (COMMA SEPARATED)</label>
                        <input
                          type="text"
                          value={game.genre}
                          onChange={(e) => {
                            const updated = [...editGames];
                            updated[index].genre = e.target.value;
                            setEditGames(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">ENGINE</label>
                        <input
                          type="text"
                          value={game.engine || "Unity"}
                          onChange={(e) => {
                            const updated = [...editGames];
                            updated[index].engine = e.target.value;
                            setEditGames(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">VERSION</label>
                        <input
                          type="text"
                          value={game.version || "v1.0.0"}
                          onChange={(e) => {
                            const updated = [...editGames];
                            updated[index].version = e.target.value;
                            setEditGames(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">ITCH.IO URL</label>
                        <input
                          type="text"
                          value={game.alt}
                          onChange={(e) => {
                            const updated = [...editGames];
                            updated[index].alt = e.target.value;
                            setEditGames(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">SCREENSHOTS GALLERY (COMMA-SEPARATED)</label>
                        <input
                          type="text"
                          value={game.screenshots?.join(", ") || ""}
                          onChange={(e) => {
                            const updated = [...editGames];
                            updated[index].screenshots = e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean);
                            setEditGames(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">BRIEF DESCRIPTION (EN)</label>
                        <textarea
                          rows={2}
                          value={game.brief?.en || ""}
                          onChange={(e) => {
                            const updated = [...editGames];
                            if (!updated[index].brief) updated[index].brief = {};
                            updated[index].brief.en = e.target.value;
                            setEditGames(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] text-white/40">BRIEF DESCRIPTION (JP)</label>
                          <button
                            type="button"
                            onClick={async () => {
                              if (!game.brief?.en) return;
                              const translated = await translateText(game.brief.en);
                              if (translated) {
                                const updated = [...editGames];
                                if (!updated[index].brief) updated[index].brief = {};
                                updated[index].brief.jp = translated;
                                setEditGames(updated);
                              }
                            }}
                            className="text-[9px] text-[#ff7f9a] hover:underline"
                          >
                            [ ⚡ AUTO-TRANSLATE ]
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={game.brief?.jp || ""}
                          onChange={(e) => {
                            const updated = [...editGames];
                            if (!updated[index].brief) updated[index].brief = {};
                            updated[index].brief.jp = e.target.value;
                            setEditGames(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">CORE PLAYABLE PILLARS (EN, ONE PER LINE)</label>
                        <textarea
                          rows={3}
                          value={game.features?.en?.join("\n") || ""}
                          onChange={(e) => {
                            const updated = [...editGames];
                            if (!updated[index].features) updated[index].features = {};
                            updated[index].features.en = e.target.value.split("\n").map((s: string) => s.trim()).filter(Boolean);
                            setEditGames(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-sans text-[11px]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">CORE PLAYABLE PILLARS (JP, ONE PER LINE)</label>
                        <textarea
                          rows={3}
                          value={game.features?.jp?.join("\n") || ""}
                          onChange={(e) => {
                            const updated = [...editGames];
                            if (!updated[index].features) updated[index].features = {};
                            updated[index].features.jp = e.target.value.split("\n").map((s: string) => s.trim()).filter(Boolean);
                            setEditGames(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-sans text-[11px]"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">MINIMUM HARDWARE REQUIREMENTS (ONE PER LINE)</label>
                        <textarea
                          rows={3}
                          value={game.systemRequirements?.minimum?.join("\n") || ""}
                          onChange={(e) => {
                            const updated = [...editGames];
                            if (!updated[index].systemRequirements) updated[index].systemRequirements = {};
                            updated[index].systemRequirements.minimum = e.target.value.split("\n").map((s: string) => s.trim()).filter(Boolean);
                            setEditGames(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-sans text-[11px]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">RECOMMENDED HARDWARE REQUIREMENTS (ONE PER LINE)</label>
                        <textarea
                          rows={3}
                          value={game.systemRequirements?.recommended?.join("\n") || ""}
                          onChange={(e) => {
                            const updated = [...editGames];
                            if (!updated[index].systemRequirements) updated[index].systemRequirements = {};
                            updated[index].systemRequirements.recommended = e.target.value.split("\n").map((s: string) => s.trim()).filter(Boolean);
                            setEditGames(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-sans text-[11px]"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">DEVELOPERS (COMMA-SEPARATED)</label>
                        <input
                          type="text"
                          value={game.credits?.developers?.join(", ") || ""}
                          onChange={(e) => {
                            const updated = [...editGames];
                            if (!updated[index].credits) updated[index].credits = {};
                            updated[index].credits.developers = e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean);
                            setEditGames(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">DESIGNERS (COMMA-SEPARATED)</label>
                        <input
                          type="text"
                          value={game.credits?.designers?.join(", ") || ""}
                          onChange={(e) => {
                            const updated = [...editGames];
                            if (!updated[index].credits) updated[index].credits = {};
                            updated[index].credits.designers = e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean);
                            setEditGames(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">ARTISTS (COMMA-SEPARATED)</label>
                        <input
                          type="text"
                          value={game.credits?.artists?.join(", ") || ""}
                          onChange={(e) => {
                            const updated = [...editGames];
                            if (!updated[index].credits) updated[index].credits = {};
                            updated[index].credits.artists = e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean);
                            setEditGames(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">SPECIAL THANKS (COMMA-SEPARATED)</label>
                        <input
                          type="text"
                          value={game.credits?.specialThanks?.join(", ") || ""}
                          onChange={(e) => {
                            const updated = [...editGames];
                            if (!updated[index].credits) updated[index].credits = {};
                            updated[index].credits.specialThanks = e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean);
                            setEditGames(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* 3. Team Tab Editor */}
                {cmsTab === "team" && editTeam.map((member, index) => (
                  <div key={member.subjectId} className="border border-white/5 bg-black/40 rounded-lg p-4 space-y-3 relative group">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 font-bold">MEMBER #{index + 1}</span>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => {
                            const updated = [...editTeam];
                            updated[index].name = e.target.value;
                            setEditTeam(updated);
                          }}
                          className="bg-black/60 border border-white/10 rounded px-2 py-1 text-white font-bold text-[10px]"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveMember(index, 'up')}
                          disabled={index === 0}
                          className="px-2 py-1 border border-white/10 hover:bg-white/5 rounded text-white disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => handleMoveMember(index, 'down')}
                          disabled={index === editTeam.length - 1}
                          className="px-2 py-1 border border-white/10 hover:bg-white/5 rounded text-white disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          ▼
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.name)}
                          className="px-2 py-1 border border-red-500/30 hover:border-red-500 hover:bg-red-500/10 text-red-400 rounded"
                        >
                          DELETE
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">SUBJECT IDENTIFICATION</label>
                        <input
                          type="text"
                          value={member.subjectId}
                          onChange={(e) => {
                            const updated = [...editTeam];
                            updated[index].subjectId = e.target.value;
                            setEditTeam(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">IMAGE PATH</label>
                        <input
                          type="text"
                          value={member.image}
                          onChange={(e) => {
                            const updated = [...editTeam];
                            updated[index].image = e.target.value;
                            setEditTeam(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">ROLE (EN)</label>
                        <input
                          type="text"
                          value={member.role?.en || ""}
                          onChange={(e) => {
                            const updated = [...editTeam];
                            if (!updated[index].role) updated[index].role = {};
                            updated[index].role.en = e.target.value;
                            setEditTeam(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">ROLE (JP)</label>
                          <button
                            type="button"
                            onClick={async () => {
                              if (!member.role?.en) return;
                              const translated = await translateText(member.role.en);
                              if (translated) {
                                const updated = [...editTeam];
                                if (!updated[index].role) updated[index].role = {};
                                updated[index].role.jp = translated;
                                setEditTeam(updated);
                              }
                            }}
                            className="text-[9px] text-[#ff7f9a] hover:underline"
                          >
                            [ ⚡ AUTO-TRANSLATE ]
                          </button>
                        </div>
                        <input
                          type="text"
                          value={member.role?.jp || ""}
                          onChange={(e) => {
                            const updated = [...editTeam];
                            if (!updated[index].role) updated[index].role = {};
                            updated[index].role.jp = e.target.value;
                            setEditTeam(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40">BIO OVERVIEW (EN)</label>
                        <textarea
                          rows={2}
                          value={member.bio?.en || ""}
                          onChange={(e) => {
                            const updated = [...editTeam];
                            if (!updated[index].bio) updated[index].bio = {};
                            updated[index].bio.en = e.target.value;
                            setEditTeam(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] text-white/40">BIO OVERVIEW (JP)</label>
                          <button
                            type="button"
                            onClick={async () => {
                              if (!member.bio?.en) return;
                              const translated = await translateText(member.bio.en);
                              if (translated) {
                                const updated = [...editTeam];
                                if (!updated[index].bio) updated[index].bio = {};
                                updated[index].bio.jp = translated;
                                setEditTeam(updated);
                              }
                            }}
                            className="text-[9px] text-[#ff7f9a] hover:underline"
                          >
                            [ ⚡ AUTO-TRANSLATE ]
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={member.bio?.jp || ""}
                          onChange={(e) => {
                            const updated = [...editTeam];
                            if (!updated[index].bio) updated[index].bio = {};
                            updated[index].bio.jp = e.target.value;
                            setEditTeam(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">CORE PILLARS / EXPERTISE (COMMA-SEPARATED)</label>
                        <input
                          type="text"
                          value={member.expertise?.join(", ") || ""}
                          onChange={(e) => {
                            const updated = [...editTeam];
                            updated[index].expertise = e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean);
                            setEditTeam(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-sans text-xs"
                        />
                      </div>
                      <div className="grid gap-2 grid-cols-2">
                        <div className="space-y-1">
                          <label className="text-[10px] text-white/40">TWITTER HANDLE</label>
                          <input
                            type="text"
                            value={member.social?.twitter || ""}
                            onChange={(e) => {
                              const updated = [...editTeam];
                              if (!updated[index].social) updated[index].social = {};
                              updated[index].social.twitter = e.target.value;
                              setEditTeam(updated);
                            }}
                            className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-mono text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-white/40">LINKEDIN ID</label>
                          <input
                            type="text"
                            value={member.social?.linkedin || ""}
                            onChange={(e) => {
                              const updated = [...editTeam];
                              if (!updated[index].social) updated[index].social = {};
                              updated[index].social.linkedin = e.target.value;
                              setEditTeam(updated);
                            }}
                            className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-mono text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] text-white/40 uppercase tracking-widest block font-bold">[ PHYSIOLOGICAL_TELEMETRY_STATS ]</label>
                      <div className="grid gap-3 md:grid-cols-2">
                        {(member.stats || []).map((stat: any, statIdx: number) => (
                          <div key={statIdx} className="flex items-center gap-3 bg-black/40 border border-white/5 p-2 rounded">
                            <div className="flex-1 space-y-1">
                              <label className="text-[8px] text-white/35">STAT #{statIdx + 1} LABEL</label>
                              <input
                                type="text"
                                value={stat.label}
                                onChange={(e) => {
                                  const updated = [...editTeam];
                                  updated[index].stats[statIdx].label = e.target.value;
                                  setEditTeam(updated);
                                }}
                                className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-white text-[10px]"
                              />
                            </div>
                            <div className="w-24 space-y-1">
                              <label className="text-[8px] text-white/35">VALUE ({stat.value}%)</label>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={stat.value}
                                onChange={(e) => {
                                  const updated = [...editTeam];
                                  updated[index].stats[statIdx].value = parseInt(e.target.value, 10);
                                  setEditTeam(updated);
                                }}
                                className="w-full accent-[#dc143c]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* 4. Services Tab Editor */}
                {cmsTab === "services" && editServices.map((service, index) => (
                  <div key={index} className="border border-white/5 bg-black/40 rounded-lg p-4 space-y-3 relative group">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 font-bold">SERVICE #{index + 1}</span>
                        <input
                          type="text"
                          value={service.icon || "✨"}
                          onChange={(e) => {
                            const updated = [...editServices];
                            updated[index].icon = e.target.value;
                            setEditServices(updated);
                          }}
                          placeholder="ICON EMOJI"
                          className="w-16 bg-black/60 border border-white/10 rounded px-2 py-1 text-white font-bold text-[10px] text-center"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveService(index, 'up')}
                          disabled={index === 0}
                          className="px-2 py-1 border border-white/10 hover:bg-white/5 rounded text-white disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => handleMoveService(index, 'down')}
                          disabled={index === editServices.length - 1}
                          className="px-2 py-1 border border-white/10 hover:bg-white/5 rounded text-white disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          ▼
                        </button>
                        <button
                          onClick={() => handleDeleteService(index)}
                          className="px-2 py-1 border border-red-500/30 hover:border-red-500 hover:bg-red-500/10 text-red-400 rounded"
                        >
                          DELETE
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">SERVICE TITLE (EN)</label>
                        <input
                          type="text"
                          value={service.title?.en || ""}
                          onChange={(e) => {
                            const updated = [...editServices];
                            if (!updated[index].title) updated[index].title = {};
                            updated[index].title.en = e.target.value;
                            setEditServices(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">SERVICE TITLE (JP)</label>
                          <button
                            type="button"
                            onClick={async () => {
                              if (!service.title?.en) return;
                              const translated = await translateText(service.title.en);
                              if (translated) {
                                const updated = [...editServices];
                                if (!updated[index].title) updated[index].title = {};
                                updated[index].title.jp = translated;
                                setEditServices(updated);
                              }
                            }}
                            className="text-[9px] text-[#ff7f9a] hover:underline"
                          >
                            [ ⚡ AUTO-TRANSLATE ]
                          </button>
                        </div>
                        <input
                          type="text"
                          value={service.title?.jp || ""}
                          onChange={(e) => {
                            const updated = [...editServices];
                            if (!updated[index].title) updated[index].title = {};
                            updated[index].title.jp = e.target.value;
                            setEditServices(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">SERVICE OVERVIEW (EN)</label>
                        <textarea
                          rows={2}
                          value={service.desc?.en || ""}
                          onChange={(e) => {
                            const updated = [...editServices];
                            if (!updated[index].desc) updated[index].desc = {};
                            updated[index].desc.en = e.target.value;
                            setEditServices(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">SERVICE OVERVIEW (JP)</label>
                          <button
                            type="button"
                            onClick={async () => {
                              if (!service.desc?.en) return;
                              const translated = await translateText(service.desc.en);
                              if (translated) {
                                const updated = [...editServices];
                                if (!updated[index].desc) updated[index].desc = {};
                                updated[index].desc.jp = translated;
                                setEditServices(updated);
                              }
                            }}
                            className="text-[9px] text-[#ff7f9a] hover:underline"
                          >
                            [ ⚡ AUTO-TRANSLATE ]
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={service.desc?.jp || ""}
                          onChange={(e) => {
                            const updated = [...editServices];
                            if (!updated[index].desc) updated[index].desc = {};
                            updated[index].desc.jp = e.target.value;
                            setEditServices(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">KEY CAPABILITIES (EN, ONE PER LINE)</label>
                        <textarea
                          rows={3}
                          value={service.deliverables?.en?.join("\n") || ""}
                          onChange={(e) => {
                            const updated = [...editServices];
                            if (!updated[index].deliverables) updated[index].deliverables = {};
                            updated[index].deliverables.en = e.target.value.split("\n").map((s: string) => s.trim()).filter(Boolean);
                            setEditServices(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-sans text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">KEY CAPABILITIES (JP, ONE PER LINE)</label>
                        <textarea
                          rows={3}
                          value={service.deliverables?.jp?.join("\n") || ""}
                          onChange={(e) => {
                            const updated = [...editServices];
                            if (!updated[index].deliverables) updated[index].deliverables = {};
                            updated[index].deliverables.jp = e.target.value.split("\n").map((s: string) => s.trim()).filter(Boolean);
                            setEditServices(updated);
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-3 py-2 text-white font-sans text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}

              </div>

              {/* Bottom toolbar action buttons */}
              <div className="flex flex-wrap justify-between items-center gap-3 border-t border-white/5 pt-4 shrink-0 font-mono">
                {cmsTab === "logs" && (
                  <button
                    onClick={handleAddEntry}
                    className="border border-[#dc143c] hover:bg-[#dc143c]/15 text-[#ff7f9a] font-bold rounded px-4 py-2.5 transition-all"
                  >
                    + ADD LOG ENTRY
                  </button>
                )}
                {cmsTab === "games" && (
                  <button
                    onClick={handleAddGame}
                    className="border border-[#dc143c] hover:bg-[#dc143c]/15 text-[#ff7f9a] font-bold rounded px-4 py-2.5 transition-all"
                  >
                    + ADD NEW GAME
                  </button>
                )}
                {cmsTab === "team" && (
                  <button
                    onClick={handleAddMember}
                    className="border border-[#dc143c] hover:bg-[#dc143c]/15 text-[#ff7f9a] font-bold rounded px-4 py-2.5 transition-all"
                  >
                    + ADD NEW MEMBER
                  </button>
                )}
                {cmsTab === "services" && (
                  <button
                    onClick={handleAddService}
                    className="border border-[#dc143c] hover:bg-[#dc143c]/15 text-[#ff7f9a] font-bold rounded px-4 py-2.5 transition-all"
                  >
                    + ADD NEW SERVICE
                  </button>
                )}

                <div className="flex gap-2">
                  <button 
                    onClick={handleDownloadCmsJson}
                    className="border border-white/10 hover:bg-white/5 rounded px-4 py-2.5 text-white/70"
                  >
                    DOWNLOAD CONFIG JSON
                  </button>
                  <button 
                    onClick={() => handleSaveCms(cmsTab)}
                    disabled={isSaving}
                    className="bg-[#dc143c] hover:bg-[#ff7f9a] text-white font-bold rounded px-5 py-2.5 shadow-lg shadow-[#dc143c]/20 disabled:opacity-50"
                  >
                    {isSaving ? "COMPILING..." : "COMPILE & SAVE"}
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      )}
    </main>
  );
}
