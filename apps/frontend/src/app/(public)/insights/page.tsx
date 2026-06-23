import type { Metadata } from 'next';
import { ArticleCard } from '@/components/ui/ArticleCard';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Insights & Blog',
  description: 'Artikel, riset, dan analisis tren industri dari tim ahli Nexus Solusi Integra. Dapatkan wawasan terbaru tentang Keuangan, Bisnis, dan IT.',
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api';

async function getArticles() {
  try {
    const res = await fetch(`${API_BASE}/articles?limit=20`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Failed to fetch articles:', err);
    return [];
  }
}

export default async function InsightsPage() {
  const articles = await getArticles();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Insights</span>
          <h1 className={styles.heroTitle}>Wawasan & Analisis Terbaru</h1>
          <p className={styles.heroSubtitle}>
            Artikel, riset, dan analisis tren industri dari tim ahli kami untuk membantu Anda tetap selangkah lebih maju.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {articles.length > 0 ? (
            <div className={styles.articlesGrid}>
              {articles.map((article: any) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  slug={article.slug}
                  category={article.category}
                  date={article.createdAt}
                  coverImage={article.coverImage ? `${API_BASE.replace('/api', '')}${article.coverImage}` : null}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>📝</span>
              <h3>Artikel Segera Hadir</h3>
              <p>Tim kami sedang mempersiapkan artikel-artikel berkualitas tinggi. Nantikan konten terbaru dari kami!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
