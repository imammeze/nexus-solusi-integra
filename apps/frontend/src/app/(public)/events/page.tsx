import type { Metadata } from 'next';
import { EventCard } from '@/components/ui/EventCard';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Event & Kegiatan',
  description: 'Ikuti berbagai event, seminar, dan workshop yang diselenggarakan oleh Nexus Solusi Integra. Dapatkan insight dan networking berkualitas.',
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api';

async function getEvents() {
  try {
    const res = await fetch(`${API_BASE}/events?limit=20`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Failed to fetch events:', err);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Event</span>
          <h1 className={styles.heroTitle}>Event & Kegiatan</h1>
          <p className={styles.heroSubtitle}>
            Ikuti berbagai event, seminar, dan workshop yang kami selenggarakan untuk membantu Anda berkembang dan membangun jejaring profesional.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {events.length > 0 ? (
            <div className={styles.eventsGrid}>
              {events.map((event: any) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  excerpt={event.excerpt}
                  slug={event.slug}
                  category={event.category}
                  eventDate={event.eventDate}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  location={event.location}
                  coverImage={event.coverImage ? `${API_BASE.replace('/api', '')}${event.coverImage}` : null}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>📅</span>
              <h3>Event Segera Hadir</h3>
              <p>Tim kami sedang mempersiapkan event-event menarik. Nantikan kegiatan terbaru dari kami!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
