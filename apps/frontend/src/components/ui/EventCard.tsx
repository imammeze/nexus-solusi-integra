import Link from 'next/link';
import styles from './EventCard.module.css';

interface EventCardProps {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  coverImage?: string | null;
}

export function EventCard({
  title,
  excerpt,
  slug,
  category,
  eventDate,
  startTime,
  endTime,
  location,
  coverImage,
}: EventCardProps) {
  const categoryClass = category.toLowerCase() as 'finance' | 'management' | 'it';
  const date = new Date(eventDate);
  const day = date.getUTCDate();
  const month = date.toLocaleDateString('id-ID', { month: 'short', timeZone: 'UTC' });

  return (
    <Link href={`/events/${slug}`} className={styles.card} id={`event-card-${slug}`}>
      <div className={styles.imageWrapper}>
        {coverImage ? (
          <img src={coverImage} alt={title} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            <span>📅</span>
          </div>
        )}
        <div className={styles.dateBadge}>
          <span className={styles.dateDay}>{day}</span>
          <span className={styles.dateMonth}>{month}</span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={`badge badge-${categoryClass}`}>{category}</span>
          <span className={styles.time}>
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            {startTime} – {endTime}
          </span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.location}>
          <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          {location}
        </div>
      </div>
    </Link>
  );
}
