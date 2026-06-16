import Link from 'next/link';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  date: string;
  coverImage?: string | null;
}

export function ArticleCard({ title, excerpt, slug, category, date, coverImage }: ArticleCardProps) {
  const categoryClass = category.toLowerCase() as 'finance' | 'management' | 'it';

  return (
    <Link href={`/insights/${slug}`} className={styles.card} id={`article-card-${slug}`}>
      <div className={styles.imageWrapper}>
        {coverImage ? (
          <img src={coverImage} alt={title} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            <span>📝</span>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={`badge badge-${categoryClass}`}>{category}</span>
          <span className={styles.date}>{new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
      </div>
    </Link>
  );
}
