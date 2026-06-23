import Link from 'next/link';
import Image from 'next/image';
import iconSrc from '@/app/icon.png';
import styles from './Footer.module.css';

const FOOTER_LINKS = {
  layanan: [
    { href: '/services', label: 'Konsultan Keuangan' },
    { href: '/services', label: 'Manajemen Bisnis' },
    { href: '/services', label: 'Teknologi Informasi' },
  ],
  perusahaan: [
    { href: '/about', label: 'Tentang Kami' },
    { href: '/case-studies', label: 'Studi Kasus' },
    { href: '/insights', label: 'Blog & Insights' },
    { href: '/contact', label: 'Hubungi Kami' },
  ],
};

export function Footer() {
  return (
    <footer className={styles.footer} id="main-footer">
      <div className={`container ${styles.container}`}>
        {/* Brand Column */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Image src={iconSrc} alt="Nexus Logo" className={styles.logoImg} />
            <span className={styles.logoText}>Nexus Solusi Integra</span>
          </div>
          <p className={styles.description}>
            Perusahaan konsultan terpercaya yang bergerak di bidang Keuangan,
            Manajemen Bisnis, dan Teknologi Informasi. Mitra strategis untuk
            transformasi bisnis Anda.
          </p>
        </div>

        {/* Links */}
        <div className={styles.linksGroup}>
          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>Layanan</h4>
            {FOOTER_LINKS.layanan.map((link) => (
              <Link key={link.label} href={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>Perusahaan</h4>
            {FOOTER_LINKS.perusahaan.map((link) => (
              <Link key={link.label} href={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact info */}
        <div className={styles.contactCol}>
          <h4 className={styles.columnTitle}>Kontak</h4>
          <p className={styles.contactItem}>📧 info@nexus-solusi.com</p>
          <p className={styles.contactItem}>📞 +62 21 1234 5678</p>
          <p className={styles.contactItem}>📍 Jakarta, Indonesia</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Nexus Solusi Integra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
