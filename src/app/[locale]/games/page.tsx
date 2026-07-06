'use client';

import { useMemo, useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import GameModal from "@/components/GameModal";
import { useTranslations } from "next-intl";

const games = [
  {
    name: "Tiles & Towers",
    image: "/images/Tiles.png",
    key: "tiles",
    brief: "",
    genre: "Puzzle,Strategy,Windows,Mac,Web,Jam",
    alt: "https://abyss-studios.itch.io/tiles-towers",
  },
  {
    name: "Mansion of Chaos",
    image: "/images/moc.png",
    key: "mansion",
    brief: "",
    genre: "Exploration,Thriller,Windows,Jam",
    alt: "https://the-abyss-games.itch.io/mansion-of-chaos",
  },
  {
    name: "Finite Samsara",
    image: "/images/Samsara.png",
    key: "samsara",
    brief: "",
    genre: "First-Person,Puzzle,Windows,Jam",
    alt: "https://abyss-studios.itch.io/finite-samsara",
  },
  {
    name: "God Of War Lite",
    image: "/images/gow.png",
    key: "gow",
    brief: "",
    genre: "Platformer,RPG,Windows",
    alt: "https://the-abyss-games.itch.io/god-of-war-lite",
  },
  {
    name: "Seek A Little",
    image: "/images/sal.png",
    key: "seek",
    brief: "",
    genre: "Thriller,Exploration,Windows,Jam",
    alt: "https://the-abyss-games.itch.io/seek-a-little",
  },
  {
    name: "Under Beast",
    image: "/images/ub.png",
    key: "beast",
    brief: "",
    genre: "Platformer,RPG,Windows",
    alt: "https://the-abyss-games.itch.io/under-beast",
  },
];

const filters = ["All", "Puzzle", "Thriller", "Platformer", "RPG", "Jam"];

export default function GamesPage() {
  const t = useTranslations('Games');
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState<typeof games[0] | null>(null);

  const getGameBrief = (key: string) => {
    switch (key) {
      case "tiles": return t('tilesBrief');
      case "mansion": return t('mansionBrief');
      case "samsara": return t('samsaraBrief');
      case "gow": return t('gowBrief');
      case "seek": return t('seekBrief');
      case "beast": return t('beastBrief');
      default: return "";
    }
  };

  const getFilterLabel = (filter: string) => {
    switch (filter) {
      case "All": return t('filterAll');
      case "Puzzle": return t('filterPuzzle');
      case "Thriller": return t('filterThriller');
      case "Platformer": return t('filterPlatformer');
      case "RPG": return t('filterRPG');
      case "Jam": return t('filterJam');
      default: return filter;
    }
  };

  const filtered = useMemo(() => {
    return games.filter((game) => {
      const byFilter =
        selectedFilter === "All" || game.genre.toLowerCase().includes(selectedFilter.toLowerCase());
      const brief = getGameBrief(game.key);
      const bySearch =
        game.name.toLowerCase().includes(search.toLowerCase()) ||
        brief.toLowerCase().includes(search.toLowerCase());
      return byFilter && bySearch;
    });
  }, [search, selectedFilter, t]);

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
          <div className="mb-8 flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full rounded-xl border border-[#dc143c]/35 bg-black/45 px-4 py-3 text-white outline-none focus:border-[#ff7f9a] md:flex-1"
            />
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`tag ${selectedFilter === filter ? "!bg-[#dc143c]/35 !text-white" : ""}`}
                >
                  {getFilterLabel(filter)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((game) => (
              <article key={game.name} className="cinematic-card p-0">
                <button 
                  onClick={() => {
                    const brief = getGameBrief(game.key);
                    setSelectedGame({ ...game, brief });
                  }} 
                  className="block w-full text-left"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                    <Image src={game.image} alt={game.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white">{game.name}</h3>
                    <p className="mt-2 text-white/75">{getGameBrief(game.key)}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {game.genre.split(",").map((g) => (
                        <span key={`${game.name}-${g}`} className="tag">{g.trim()}</span>
                      ))}
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedGame && (
        <GameModal isOpen={true} onClose={() => setSelectedGame(null)} game={selectedGame} />
      )}

      <Footer />
    </main>
  );
}
