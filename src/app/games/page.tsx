'use client';

import { useMemo, useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import GameModal from "@/components/GameModal";

const games = [
  {
    name: "Tiles & Towers",
    image: "/images/Tiles.png",
    brief: "Roll your fate in a strategic board-inspired roguelite.",
    genre: "Puzzle,Strategy,Windows,Mac,Web,Jam",
    alt: "https://abyss-studios.itch.io/tiles-towers",
  },
  {
    name: "Mansion of Chaos",
    image: "/images/moc.png",
    brief: "Explore a haunted architecture where memory mutates.",
    genre: "Exploration,Thriller,Windows,Jam",
    alt: "https://the-abyss-games.itch.io/mansion-of-chaos",
  },
  {
    name: "Finite Samsara",
    image: "/images/Samsara.png",
    brief: "Break a cursed loop through puzzle-driven investigation.",
    genre: "First-Person,Puzzle,Windows,Jam",
    alt: "https://abyss-studios.itch.io/finite-samsara",
  },
  {
    name: "God Of War Lite",
    image: "/images/gow.png",
    brief: "A compact 2D demake tribute with arcade pacing.",
    genre: "Platformer,RPG,Windows",
    alt: "https://the-abyss-games.itch.io/god-of-war-lite",
  },
  {
    name: "Seek A Little",
    image: "/images/sal.png",
    brief: "A tense short-form survival thriller built for jam cadence.",
    genre: "Thriller,Exploration,Windows,Jam",
    alt: "https://the-abyss-games.itch.io/seek-a-little",
  },
  {
    name: "Under Beast",
    image: "/images/ub.png",
    brief: "A dark satire platformer in a collapsing media world.",
    genre: "Platformer,RPG,Windows",
    alt: "https://the-abyss-games.itch.io/under-beast",
  },
];

const filters = ["All", "Puzzle", "Thriller", "Platformer", "RPG", "Jam"];

export default function GamesPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState<typeof games[0] | null>(null);

  const filtered = useMemo(() => {
    return games.filter((game) => {
      const byFilter =
        selectedFilter === "All" || game.genre.toLowerCase().includes(selectedFilter.toLowerCase());
      const bySearch =
        game.name.toLowerCase().includes(search.toLowerCase()) ||
        game.brief.toLowerCase().includes(search.toLowerCase());
      return byFilter && bySearch;
    });
  }, [search, selectedFilter]);

  return (
    <main className="site-shell">
      <section className="cinematic-hero min-h-[56vh]">
        <div className="hero-overlay"></div>
        <div className="hero-noise"></div>
        <div className="content-wrap relative z-10 text-center">
          <span className="heading-kicker">Game Library</span>
          <h1 className="section-title text-5xl md:text-6xl">Our Creations</h1>
          <p className="section-subtitle mx-auto max-w-3xl">
            Experimental worlds, short narrative arcs, and systems designed for mood-first gameplay.
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
              placeholder="Search by game name or theme..."
              className="w-full rounded-xl border border-[#dc143c]/35 bg-black/45 px-4 py-3 text-white outline-none focus:border-[#ff7f9a] md:flex-1"
            />
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`tag ${selectedFilter === filter ? "!bg-[#dc143c]/35 !text-white" : ""}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((game) => (
              <article key={game.name} className="cinematic-card p-0">
                <button onClick={() => setSelectedGame(game)} className="block w-full text-left">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                    <Image src={game.image} alt={game.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white">{game.name}</h3>
                    <p className="mt-2 text-white/75">{game.brief}</p>
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
