"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-black/55 backdrop-blur-xl border-b border-[#dc143c]/25'
        : 'bg-black/15 backdrop-blur-sm'
    }`}>
      <div className="content-wrap">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="relative block transition-transform duration-300 hover:scale-[1.02]">
            <Image
              src="/images/newLogo.svg"
              alt="ABYSS"
              width={170}
              height={64}
              unoptimized={true}
              className="drop-shadow-[0_0_10px_rgba(220,20,60,0.35)]"
            />
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {[
              { href: "/", label: "Home" },
              { href: "/games", label: "Games" },
              { href: "/about", label: "About", dropdown: [
                { href: "/about/life", label: "Studio Life" },
                { href: "/about/team", label: "Our Team" }
              ]},
              { href: "/careers", label: "Careers" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm uppercase tracking-[0.14em] text-white/80 hover:text-[#ff6b8a] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/careers/apply" className="gaming-button !px-5 !py-2.5 !text-xs">
              Apply
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 border border-[#dc143c]/30 rounded-lg"
            aria-label="Toggle menu"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-[#dc143c]/20 bg-black/70 backdrop-blur-xl">
          <div className="content-wrap py-4 flex flex-col gap-2">
            {[
              { href: "/", label: "Home" },
              { href: "/games", label: "Games" },
              { href: "/about", label: "About" },
              { href: "/careers", label: "Careers" },
              { href: "/contact", label: "Contact" },
              { href: "/careers/apply", label: "Apply" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-white/85 hover:bg-[#dc143c]/15"
            >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}