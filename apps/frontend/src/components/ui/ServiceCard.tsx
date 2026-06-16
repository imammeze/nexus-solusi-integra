import Link from 'next/link';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  accentColor?: string;
}

export function ServiceCard({ icon, title, description, href, accentColor }: ServiceCardProps) {
  return (
    <Link href={href} className={styles.card} id={`service-card-${title.toLowerCase().replace(/\s/g, '-')}`}>
      <div className={styles.iconWrapper} style={{ background: accentColor ? `${accentColor}15` : undefined }}>
        <span className={styles.icon} style={{ color: accentColor }}>{icon}</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <span className={styles.link}>
        Selengkapnya →
      </span>
    </Link>
  );
}
