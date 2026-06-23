'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import iconSrc from '@/app/icon.png';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/about', label: 'Tentang Kami' },
  { href: '/services', label: 'Layanan' },
  { href: '/case-studies', label: 'Studi Kasus' },
  { href: '/insights', label: 'Insights' },
  { href: '/events', label: 'Event' },
  { href: '/contact', label: 'Kontak' },
];

const PROGRAMS = [
  {
    title: 'Konsultan Keuangan',
    desc: 'Strategi pengelolaan keuangan, audit, dan optimasi pajak dari pakar.',
    href: '/services/keuangan',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Manajemen Bisnis',
    desc: 'Transformasi operasional dan pengembangan strategi organisasi.',
    href: '/services/manajemen',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Teknologi Informasi',
    desc: 'Transformasi digital, pengembangan sistem, dan integrasi IT.',
    href: '/services/it',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsServicesOpen(false);
    }, 300); // Tunda 300ms sebelum menu menghilang
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      id="main-navbar"
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image src={iconSrc} alt="Nexus Logo" className={styles.logoImg} />
          <span className={styles.logoText}>Nexus Solusi Integra</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => {
            if (link.label === 'Layanan') {
              return (
                <div 
                  key={link.href} 
                  className={styles.navItem}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link 
                    href={link.href} 
                    className={styles.navLink} 
                    style={{ display: 'flex', alignItems: 'center' }}
                    onClick={() => setIsServicesOpen(false)}
                  >
                    {link.label}
                    <svg className={`${styles.chevronIcon} ${isServicesOpen ? styles.rotated : ''}`} viewBox="0 0 24 24">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </Link>
                  <div className={`${styles.megaMenu} ${isServicesOpen ? styles.open : ''}`}>
                    <h3 className={styles.megaMenuTitle}>Layanan</h3>
                    <div className={styles.megaMenuGrid}>
                      {PROGRAMS.map((prog, idx) => (
                        <Link key={idx} href={prog.href} className={styles.megaMenuCard}>
                          <div className={styles.megaMenuIcon}>{prog.icon}</div>
                          <div className={styles.megaMenuCardContent}>
                            <h4>{prog.title}</h4>
                            <p>{prog.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <Link href="/contact" className={`btn btn-primary ${styles.ctaBtn}`}>
          Konsultasi Gratis
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className={`${styles.mobileToggle} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <nav className={styles.mobileNav}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn btn-primary"
            onClick={handleLinkClick}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            Konsultasi Gratis
          </Link>
        </nav>
      </div>
    </header>
  );
}
