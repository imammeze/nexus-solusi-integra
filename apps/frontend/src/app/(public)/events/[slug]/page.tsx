import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api';

async function getEvent(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/events/slug/${slug}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch event:', err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return { title: 'Event Tidak Ditemukan' };
  }

  return {
    title: `${event.title} | Nexus Event`,
    description: event.excerpt,
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  const categoryClass = event.category.toLowerCase();
  const eventDate = new Date(event.eventDate);
  const formattedDate = eventDate.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <article className="page-transition" style={{ paddingTop: 'var(--header-height)' }}>
      <header className={styles.articleHeader}>
        <div className="container">
          <div className={styles.articleMeta}>
            <Link href="/events" className={styles.backLink}>
              ← Kembali ke Event
            </Link>
            <span>•</span>
            <span className={`badge badge-${categoryClass}`}>{event.category}</span>
          </div>

          <h1 className={styles.articleTitle}>{event.title}</h1>

          <div className={styles.eventInfo}>
            <div className={styles.eventInfoItem}>
              <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              <div>
                <div className={styles.eventInfoLabel}>Tanggal</div>
                <div className={styles.eventInfoValue}>{formattedDate}</div>
              </div>
            </div>
            <div className={styles.eventInfoItem}>
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              <div>
                <div className={styles.eventInfoLabel}>Waktu</div>
                <div className={styles.eventInfoValue}>{event.startTime} – {event.endTime}</div>
              </div>
            </div>
            <div className={styles.eventInfoItem}>
              <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              <div>
                <div className={styles.eventInfoLabel}>Lokasi</div>
                <div className={styles.eventInfoValue}>{event.location}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {event.coverImage && (
        <div className="container">
          <div className={styles.articleCover}>
            <img src={`${API_BASE.replace('/api', '')}${event.coverImage}`} alt={event.title} />
          </div>
        </div>
      )}

      <div className="container">
        <div className={styles.articleContent}>
          <p>{event.description}</p>
        </div>

        {event.tags && event.tags.length > 0 && (
          <div className={styles.tagsSection}>
            {event.tags.map((tag: string, idx: number) => (
              <span key={idx} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
