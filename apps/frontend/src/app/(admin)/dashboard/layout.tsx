'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import styles from '../admin.module.css';

const SIDEBAR_LINKS = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Artikel',
    href: '/dashboard/articles',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: 'Studi Kasus',
    href: '/dashboard/case-studies',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: 'Pesan Masuk',
    href: '/dashboard/messages',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Konsultasi',
    href: '/dashboard/consultations',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: 'Event',
    href: '/dashboard/events',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      </svg>
    ),
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className={styles.loginPage}>
        <p style={{ color: 'rgba(255,255,255,0.5)' }}>Memuat...</p>
      </div>
    );
  }

  if (!user) return null;

  // Page title based on pathname
  const getTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard';
    if (pathname.startsWith('/dashboard/articles')) return 'Manajemen Artikel';
    if (pathname.startsWith('/dashboard/case-studies')) return 'Manajemen Studi Kasus';
    if (pathname.startsWith('/dashboard/messages')) return 'Pesan Masuk';
    if (pathname.startsWith('/dashboard/consultations')) return 'Manajemen Konsultasi';
    if (pathname.startsWith('/dashboard/events')) return 'Manajemen Event';
    return 'Dashboard';
  };

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogoIcon}>N</div>
          <div className={styles.sidebarLogoText}>
            <span className={styles.sidebarLogoTitle}>Nexus Admin</span>
            <span className={styles.sidebarLogoSub}>Content Management</span>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <span className={styles.sidebarLabel}>Menu</span>
          {SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.sidebarLink} ${
                pathname === link.href ||
                (link.href !== '/dashboard' && pathname.startsWith(link.href))
                  ? styles.active
                  : ''
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button
            className={styles.logoutButton}
            onClick={() => {
              logout();
              router.push('/login');
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={styles.mainArea}>
        <header className={styles.topbar}>
          <h1 className={styles.topbarTitle}>{getTitle()}</h1>
          <div className={styles.topbarUser}>
            <div>
              <div className={styles.topbarName}>{user.name}</div>
              <div className={styles.topbarRole}>{user.role}</div>
            </div>
            <div className={styles.topbarAvatar}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <div className={styles.contentArea}>{children}</div>
      </div>
    </div>
  );
}
