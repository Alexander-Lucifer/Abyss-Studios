import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: {
    name: string;
    image: string;
    brief: string;
    genre: string;
    alt: string;
    screenshots?: string[];
    features?: string[];
    engine?: string;
    systemRequirements?: {
      minimum: string[];
      recommended: string[];
    };
    version?: string;
    downloadLinks?: {
      epic?: string;
      steam?: string;
      itch?: string;
    };
    credits?: {
      developers?: string[];
      artists?: string[];
      designers?: string[];
      writers?: string[];
      specialThanks?: string[];
    };
  };
}

export default function GameModal({ isOpen, onClose, game }: GameModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeImg, setActiveImg] = useState(game.image);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setActiveImg(game.image);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }, 300);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, game]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!isVisible && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop with heavy blur */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Main Container */}
      <div
        className={`relative w-full max-w-5xl h-[85vh] bg-[#0c060a]/95 border-l-4 border-[#dc143c] border-t border-r border-b border-[#dc143c]/20 rounded-xl overflow-hidden transform transition-all duration-300 shadow-[0_0_50px_rgba(220,20,60,0.15)] flex flex-col ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* HUD Laser Scanning Effect */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="w-full h-[2px] bg-[#dc143c]/15 animate-scanline absolute top-0 left-0" />
          {/* HUD Corner Accents */}
          <span className="absolute top-3 left-3 text-white/20 font-mono text-[8px] select-none">┌ ACCESS POINT 0x7A</span>
          <span className="absolute top-3 right-16 text-white/20 font-mono text-[8px] select-none">SYSTEM_RECORD :: OK ┐</span>
          <span className="absolute bottom-3 left-3 text-white/20 font-mono text-[8px] select-none">└ ABYSS_STATION_GRID</span>
          <span className="absolute bottom-3 right-3 text-white/20 font-mono text-[8px] select-none">HUD_ACTIVE ┘</span>
        </div>

        {/* Header HUD */}
        <div className="flex justify-between items-center bg-[#140a10] px-6 py-4 border-b border-[#dc143c]/20 z-10 font-mono">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#dc143c] animate-pulse" />
            <span className="text-[10px] text-[#ff7f9a] font-bold tracking-[0.2em] uppercase select-none">
              PRODUCT_DOSSIER // {game.name}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors duration-300 text-xs font-mono uppercase tracking-widest border border-white/10 hover:border-[#dc143c]/50 rounded px-2.5 py-1 bg-white/5"
          >
            [ CLOSE ]
          </button>
        </div>

        {/* Body Split Grid */}
        <div className="flex-1 overflow-hidden grid lg:grid-cols-12">
          {/* Left Column: Visuals, Links */}
          <div className="lg:col-span-5 border-r border-[#dc143c]/10 flex flex-col overflow-y-auto custom-scrollbar">
            {/* Game Key Art */}
            <div className="relative aspect-[16/10] lg:aspect-video w-full overflow-hidden bg-black/40">
              <Image
                src={activeImg}
                alt={game.name}
                fill
                className="object-cover object-center brightness-90 contrast-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c060a] via-[#0c060a]/30 to-transparent" />
            </div>

            {/* Thumbnail Gallery (Interactive) */}
            {game.screenshots && game.screenshots.length > 0 && (
              <div className="px-6 py-3 bg-[#11070e] border-b border-[#dc143c]/10 flex gap-2 overflow-x-auto custom-scrollbar">
                {game.screenshots.map((shot, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(shot)}
                    className={`relative h-10 w-16 rounded overflow-hidden flex-shrink-0 border transition-all duration-300 ${
                      activeImg === shot ? 'border-[#dc143c] scale-95 shadow-[0_0_8px_rgba(220,20,60,0.4)]' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={shot} alt={`screenshot-${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Platform & Genre Info Block */}
            <div className="p-6 space-y-6 flex-1 bg-gradient-to-b from-transparent to-[#12080f]/20">
              <div>
                <span className="text-[10px] text-white/40 font-mono tracking-widest block mb-2 font-bold uppercase">
                  CLASSIFICATION
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {game.genre.split(',').map((genre, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] font-mono border border-[#dc143c]/30 bg-[#dc143c]/5 text-[#ff7f9a] uppercase tracking-wider rounded"
                    >
                      {genre.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Version & Access Status */}
              <div className="grid grid-cols-2 gap-4">
                {game.version && (
                  <div className="border border-white/5 p-3 rounded-lg bg-black/20 font-mono">
                    <span className="text-[8px] text-white/40 block mb-1 uppercase tracking-widest">
                      BUILD_VERSION
                    </span>
                    <span className="text-white text-xs font-bold">{game.version}</span>
                  </div>
                )}
                {game.engine && (
                  <div className="border border-white/5 p-3 rounded-lg bg-black/20 font-mono">
                    <span className="text-[8px] text-white/40 block mb-1 uppercase tracking-widest">
                      GAME_ENGINE
                    </span>
                    <span className="text-[#ff7f9a] text-xs font-bold">{game.engine}</span>
                  </div>
                )}
              </div>

              {/* Action Links */}
              {((game.downloadLinks) || (game.alt && game.alt.includes('itch.io'))) && (
                <div className="pt-4 border-t border-[#dc143c]/10">
                  <span className="text-[10px] text-white/40 font-mono tracking-widest block mb-3 font-bold uppercase">
                    DEPLOYMENT_CHANNELS
                  </span>
                  <div className="grid gap-2">
                    {game.downloadLinks?.epic && (
                      <a
                        href={game.downloadLinks.epic}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gaming-button text-center w-full !text-xs !py-2.5 flex items-center justify-center gap-2"
                      >
                        Epic Games Store
                      </a>
                    )}
                    {game.downloadLinks?.steam && (
                      <a
                        href={game.downloadLinks.steam}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gaming-button text-center w-full !text-xs !py-2.5 flex items-center justify-center gap-2"
                      >
                        Steam Community
                      </a>
                    )}
                    {(game.downloadLinks?.itch || (game.alt && game.alt.includes('itch.io'))) && (
                      <a
                        href={game.downloadLinks?.itch || game.alt}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gaming-button text-center w-full !text-xs !py-2.5 flex items-center justify-center gap-2"
                      >
                        Play on itch.io
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Spec Dossier, Requirements, Credits */}
          <div className="lg:col-span-7 p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-8">
            {/* Overview / Brief */}
            <div className="space-y-3 font-mono">
              <span className="text-[10px] text-[#ff7f9a] tracking-widest font-bold uppercase select-none">
                [ OVERVIEW_ANALYSIS ]
              </span>
              <p className="text-white/80 leading-relaxed text-sm font-sans font-light">
                {game.brief}
              </p>
            </div>

            {/* Gameplay Features List */}
            {game.features && game.features.length > 0 && (
              <div className="border-t border-[#dc143c]/10 pt-6 space-y-3 font-mono">
                <span className="text-[10px] text-[#ff7f9a] tracking-widest font-bold uppercase select-none block">
                  [ CORE_PLAYABLE_PILLARS ]
                </span>
                <ul className="space-y-2 text-white/70 text-xs font-light">
                  {game.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#dc143c] mt-0.5">■</span>
                      <span className="leading-relaxed font-sans">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* System Requirements */}
            {game.systemRequirements && (
              <div className="border-t border-[#dc143c]/10 pt-6 space-y-4">
                <span className="text-[10px] text-[#ff7f9a] font-mono tracking-widest font-bold uppercase select-none block">
                  [ HARDWARE_SPECIFICATIONS ]
                </span>
                <div className="grid md:grid-cols-2 gap-6 bg-black/25 p-4 rounded-xl border border-white/5 font-mono text-xs">
                  <div className="space-y-2">
                    <span className="text-white/40 uppercase tracking-wider block text-[10px]">MINIMUM_CONFIG</span>
                    <ul className="space-y-1 text-white/70 font-light">
                      {game.systemRequirements.minimum.map((req, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-[#dc143c] select-none">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <span className="text-white/40 uppercase tracking-wider block text-[10px]">RECOMMENDED_CONFIG</span>
                    <ul className="space-y-1 text-white/70 font-light">
                      {game.systemRequirements.recommended.map((req, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-[#dc143c] select-none">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Credits Section */}
            {game.credits && (
              <div className="border-t border-[#dc143c]/10 pt-6 space-y-4">
                <span className="text-[10px] text-[#ff7f9a] font-mono tracking-widest font-bold uppercase select-none block">
                  [ CREATION_CREDENTIALS ]
                </span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-mono text-xs">
                  {game.credits.developers && (
                    <div>
                      <span className="text-white/40 uppercase tracking-wider block text-[9px] mb-1.5">DEVELOPMENT</span>
                      <ul className="space-y-1 text-white/80 font-light">
                        {game.credits.developers.map((dev, i) => (
                          <li key={i}>{dev}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {game.credits.artists && (
                    <div>
                      <span className="text-white/40 uppercase tracking-wider block text-[9px] mb-1.5">CREATIVE_ART</span>
                      <ul className="space-y-1 text-white/80 font-light">
                        {game.credits.artists.map((art, i) => (
                          <li key={i}>{art}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {game.credits.designers && (
                    <div>
                      <span className="text-white/40 uppercase tracking-wider block text-[9px] mb-1.5">GAME_DESIGN</span>
                      <ul className="space-y-1 text-white/80 font-light">
                        {game.credits.designers.map((des, i) => (
                          <li key={i}>{des}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {game.credits.writers && (
                    <div>
                      <span className="text-white/40 uppercase tracking-wider block text-[9px] mb-1.5">NARRATIVE_LOG</span>
                      <ul className="space-y-1 text-white/80 font-light">
                        {game.credits.writers.map((writer, i) => (
                          <li key={i}>{writer}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {game.credits.specialThanks && (
                  <div className="bg-black/15 p-3 rounded-lg border border-white/5 font-mono text-xs">
                    <span className="text-white/40 uppercase tracking-wider block text-[9px] mb-1">RECOGNITIONS</span>
                    <p className="text-white/70 font-light">
                      {game.credits.specialThanks.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}