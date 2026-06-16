'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/about', label: 'Tentang Kami' },
  { href: '/services', label: 'Layanan' },
  { href: '/case-studies', label: 'Studi Kasus' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Kontak' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <span className={styles.logoIcon}>N</span>
          <span className={styles.logoText}>Nexus Solusi Integra</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
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
