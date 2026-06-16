import Link from 'next/link';
import styles from './CaseStudyCard.module.css';

interface CaseStudyCardProps {
  title: string;
  client: string;
  industry: string;
  slug: string;
  category: string;
  coverImage?: string | null;
}

export function CaseStudyCard({ title, client, industry, slug, category, coverImage }: CaseStudyCardProps) {
  const categoryClass = category.toLowerCase() as 'finance' | 'management' | 'it';

  return (
    <Link href={`/case-studies/${slug}`} className={styles.card} id={`case-study-card-${slug}`}>
      <div className={styles.imageWrapper}>
        {coverImage ? (
          <img src={coverImage} alt={title} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            <span>📊</span>
          </div>
        )}
        <span className={`badge badge-${categoryClass} ${styles.badge}`}>{category}</span>
      </div>
      <div className={styles.content}>
        <p className={styles.client}>{client} · {industry}</p>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.link}>Lihat Detail →</span>
      </div>
    </Link>
  );
}
