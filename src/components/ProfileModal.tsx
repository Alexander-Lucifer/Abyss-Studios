import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: {
    name: string;
    role: string;
    bio: string;
    expertise: string[];
    image: string;
    social: {
      twitter?: string;
      linkedin?: string;
    };
    stats?: {
      label: string;
      value: number;
    }[];
    subjectId?: string;
  };
}

export default function ProfileModal({ isOpen, onClose, member }: ProfileModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
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
  }, [isOpen]);

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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Main Container */}
      <div
        className={`relative w-full max-w-4xl h-[80vh] bg-[#0c060a]/95 border-l-4 border-[#dc143c] border-t border-r border-b border-[#dc143c]/20 rounded-xl overflow-hidden transform transition-all duration-300 shadow-[0_0_50px_rgba(220,20,60,0.15)] flex flex-col ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Film grain / scanning overlay */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="w-full h-[2px] bg-[#dc143c]/15 animate-scanline absolute top-0 left-0" />
          <span className="absolute top-3 left-3 text-white/20 font-mono text-[8px] select-none">┌ DOSSIER SYSTEM v0.98</span>
          <span className="absolute top-3 right-16 text-white/20 font-mono text-[8px] select-none">RESTRICTED_ACCESS ┐</span>
          <span className="absolute bottom-3 left-3 text-white/20 font-mono text-[8px] select-none">└ SUBJECT_CLASSIFICATION_GRID</span>
          <span className="absolute bottom-3 right-3 text-white/20 font-mono text-[8px] select-none">SYS_READY ┘</span>
        </div>

        {/* Header HUD */}
        <div className="flex justify-between items-center bg-[#140a10] px-6 py-4 border-b border-[#dc143c]/20 z-10 font-mono">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#dc143c] animate-pulse" />
            <span className="text-[10px] text-[#ff7f9a] font-bold tracking-[0.2em] uppercase select-none">
              SUBJECT_DOSSIER // {member.subjectId || "CORE_SUBJECT::00"}
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
        <div className="flex-1 overflow-hidden grid md:grid-cols-12">
          {/* Left Column: Picture and Socials */}
          <div className="md:col-span-5 border-r border-[#dc143c]/10 flex flex-col justify-between overflow-y-auto custom-scrollbar p-6 bg-gradient-to-b from-transparent to-[#12080f]/20">
            <div className="space-y-6">
              {/* Member Visual with blueprint borders */}
              <div className="relative aspect-[4/5] w-full max-w-[280px] mx-auto overflow-hidden rounded-xl border border-[#dc143c]/35 shadow-xl bg-black/40 group">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c060a] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[#dc143c]/5 opacity-30 pointer-events-none" />
              </div>

              {/* Basic Role Info */}
              <div className="text-center font-mono">
                <h3 className="text-xl font-black text-white uppercase tracking-wider">{member.name}</h3>
                <span className="text-xs text-[#ff7f9a] uppercase tracking-widest block mt-1">{member.role}</span>
              </div>
            </div>

            {/* Social accounts at bottom */}
            <div className="pt-6 border-t border-white/5 flex justify-center gap-4">
              {member.social.twitter && (
                <a
                  href={`https://x.com/${member.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/50 hover:text-[#ff7f9a] font-mono text-[10px] uppercase border border-white/10 rounded px-3 py-1.5 bg-white/5 hover:border-[#dc143c]/40 transition-all duration-300"
                >
                  X_FEED
                </a>
              )}
              {member.social.linkedin && (
                <a
                  href={`https://linkedin.com/in/${member.social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/50 hover:text-[#ff7f9a] font-mono text-[10px] uppercase border border-white/10 rounded px-3 py-1.5 bg-white/5 hover:border-[#dc143c]/40 transition-all duration-300"
                >
                  LINKEDIN
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Dossier Details, Expertise, Skill Matrix */}
          <div className="md:col-span-7 p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-8">
            {/* Dossier Record Bio */}
            <div className="space-y-3 font-mono">
              <span className="text-[10px] text-[#ff7f9a] tracking-widest font-bold uppercase select-none">
                [ SERVICE_RECORD_SUMMARY ]
              </span>
              <p className="text-white/80 leading-relaxed text-sm font-sans font-light">
                {member.bio}
              </p>
            </div>

            {/* Core Competencies */}
            <div className="space-y-3 font-mono">
              <span className="text-[10px] text-[#ff7f9a] tracking-widest font-bold uppercase select-none block">
                [ CORE_COMPETENCiES ]
              </span>
              <div className="flex flex-wrap gap-1.5">
                {member.expertise.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 text-[10px] border border-white/10 text-white/70 uppercase tracking-wider rounded bg-white/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Gamified Skill Matrix */}
            {member.stats && (
              <div className="border-t border-[#dc143c]/10 pt-6 space-y-4 font-mono">
                <span className="text-[10px] text-[#ff7f9a] tracking-widest font-bold uppercase select-none block">
                  [ PHYSIOLOGICAL_TELEMETRY ]
                </span>
                <div className="space-y-3 bg-black/25 p-4 rounded-xl border border-white/5">
                  {member.stats.map((stat, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-white/50 uppercase tracking-widest">{stat.label}</span>
                        <span className="text-[#ff7f9a] font-bold">{stat.value}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-[#dc143c] to-[#ff7f9a] rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${stat.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
