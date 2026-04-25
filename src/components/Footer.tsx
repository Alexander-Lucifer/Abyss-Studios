"use client";

import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
  handleNavClick?: (_sectionId: string) => void;
}

export default function Footer({ handleNavClick: _handleNavClick }: FooterProps) {
  return (
    <footer className="section-shell pb-10">
      <div className="content-wrap">
        <div className="rounded-2xl border border-[#dc143c]/25 bg-black/35 p-8 backdrop-blur-md">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <Image src="/images/newLogo.svg" alt="ABYSS STUDIOS" width={170} height={60} unoptimized={true} />
              <p className="mt-4 text-sm text-white/70">
                Fiction-first game studio crafting atmospheric worlds with a dark crimson signature.
              </p>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-[0.16em] text-white/70">Explore</h3>
              <div className="mt-4 flex flex-col gap-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/games", label: "Games" },
                  { href: "/about", label: "About" },
                  { href: "/careers", label: "Careers" },
                  { href: "/contact", label: "Contact" },
                ].map((item) => (
                  <Link key={item.href} href={item.href} className="text-white/80 hover:text-[#ff7f9a]">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-[0.16em] text-white/70">Social</h3>
              <div className="mt-4 flex gap-4">
                {[
                  { name: "X", icon: "/images/x.svg", link: "https://x.com/theabyssstudios" },
                  { name: "Instagram", icon: "/images/instagram.svg", link: "https://www.instagram.com/abyssstudios_._" },
                  { name: "LinkedIn", icon: "/images/linkedin.svg", link: "https://www.linkedin.com/company/the-abyss-studios" },
                ].map((social) => (
                  <a key={social.name} href={social.link} target="_blank" rel="noreferrer" className="tag">
                    <Image src={social.icon} alt={social.name} width={16} height={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[#dc143c]/20 pt-6 text-sm text-white/60 md:flex-row md:items-center">
            <p>
              © 2026 Abyss Studios. All rights reserved.
            </p>
            <div className="flex gap-5">
              <a href="/privacy-policy" className="hover:text-[#ff7f9a]">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="hover:text-[#ff7f9a]">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 