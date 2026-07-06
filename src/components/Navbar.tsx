"use client";

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import Image from 'next/image';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLocaleChange = (newLocale: 'en' | 'jp') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[#140c12]/60 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
        : 'bg-black/10 backdrop-blur-sm border-b border-transparent'
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
              { href: "/about", label: t('about'), dropdown: [
                { href: "/about/life", label: t('studioLife') },
                { href: "/about/team", label: t('ourTeam') }
              ]},
              { href: "/games", label: t('products'), dropdown: [
                { href: "/games/tiles-and-towers", label: "Tiles & Towers" },
                { href: "/games/mansion-of-chaos", label: "Mansion of Chaos" },
                { href: "/games/finite-samsara", label: "Finite Samsara" },
                { href: "/games", label: "All Products" }
              ]},
              { href: "/services", label: t('services') },
              { href: "/careers", label: t('careers') },
              { href: "/contact", label: t('contact') },
            ].map((item) => {
              if (item.dropdown) {
                return (
                  <div key={item.href} className="relative group py-2">
                    <Link
                      href={item.href}
                      className="text-sm uppercase tracking-[0.14em] text-white/80 group-hover:text-[#ff6b8a] transition-all duration-300 flex items-center gap-1.5"
                    >
                      {item.label}
                      <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180 text-white/60 group-hover:text-[#ff6b8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-44 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 py-1.5 z-50 shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-xs uppercase tracking-widest text-white/70 hover:text-[#ff6b8a] hover:bg-white/5 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm uppercase tracking-[0.14em] text-white/80 hover:text-[#ff6b8a] hover:tracking-[0.18em] transition-all duration-300"
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/careers/apply" className="gaming-button !px-5 !py-2.5 !text-xs">
              {t('apply')}
            </Link>

            {/* Language Switcher Dropdown */}
            <div className="relative group py-2">
              <button className="text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-[#ff6b8a] flex items-center gap-1.5 border-l border-white/20 pl-4 h-5">
                {locale === 'en' ? 'EN' : 'JP'}
                <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180 text-white/60 group-hover:text-[#ff6b8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full right-0 mt-1.5 w-28 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 py-1.5 z-50 shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
                <button
                  onClick={() => handleLocaleChange('en')}
                  className={`w-full text-left block px-4 py-2 text-xs uppercase tracking-widest hover:text-[#ff6b8a] hover:bg-white/5 transition-colors ${locale === 'en' ? 'text-[#ff6b8a] font-bold' : 'text-white/70'}`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLocaleChange('jp')}
                  className={`w-full text-left block px-4 py-2 text-xs uppercase tracking-widest hover:text-[#ff6b8a] hover:bg-white/5 transition-colors ${locale === 'jp' ? 'text-[#ff6b8a] font-bold' : 'text-white/70'}`}
                >
                  日本語
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 border border-[#dc143c]/30 rounded-lg flex items-center justify-center font-bold text-xs uppercase tracking-widest"
            aria-label="Toggle menu"
          >
            {isOpen ? t('close') : t('menu')}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-[#dc143c]/20 bg-black/85 backdrop-blur-xl">
          <div className="content-wrap py-4 flex flex-col gap-2">
            {[
              { href: "/", label: "Home" },
              { href: "/games", label: t('products') },
              { href: "/services", label: t('services') },
              { href: "/about/life", label: t('studioLife') },
              { href: "/about/team", label: t('ourTeam') },
              { href: "/careers", label: t('careers') },
              { href: "/contact", label: t('contact') },
              { href: "/careers/apply", label: t('apply') },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm uppercase tracking-wider text-white/85 hover:bg-[#dc143c]/15 transition-all"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Language Switcher */}
            <div className="flex gap-4 border-t border-white/10 mt-3 pt-3 px-4 text-sm font-semibold tracking-wider text-white/50">
              <button 
                onClick={() => { handleLocaleChange('en'); setIsOpen(false); }} 
                className={`hover:text-white transition-colors uppercase ${locale === 'en' ? 'text-[#ff6b8a]' : ''}`}
              >
                English
              </button>
              <button 
                onClick={() => { handleLocaleChange('jp'); setIsOpen(false); }} 
                className={`hover:text-white transition-colors uppercase ${locale === 'jp' ? 'text-[#ff6b8a]' : ''}`}
              >
                日本語
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}