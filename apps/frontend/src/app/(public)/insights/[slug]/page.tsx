import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api';

async function getArticle(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/articles/slug/${slug}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch article:', err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: 'Artikel Tidak Ditemukan' };
  }

  return {
    title: `${article.title} | Nexus Insights`,
    description: article.excerpt,
  };
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const categoryClass = article.category.toLowerCase();
  
  return (
    <article className="page-transition" style={{ paddingTop: 'var(--header-height)' }}>
      <header className={styles.articleHeader}>
        <div className="container">
          <div className={styles.articleMeta}>
            <Link href="/insights" className={styles.backLink}>
              ← Kembali ke Insights
            </Link>
            <span>•</span>
            <span className={`badge badge-${categoryClass}`}>{article.category}</span>
            <span>•</span>
            <span>{new Date(article.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>•</span>
            <span style={{ fontWeight: 500, color: 'var(--color-primary)' }}>
              Oleh {article.author?.name || 'Tim Nexus'}
            </span>
          </div>
          
          <h1 className={styles.articleTitle}>{article.title}</h1>
        </div>
      </header>

      {article.coverImage && (
        <div className="container">
          <div className={styles.articleCover}>
            <img src={`${API_BASE.replace('/api', '')}${article.coverImage}`} alt={article.title} />
          </div>
        </div>
      )}

      <div className="container">
        <div className={styles.articleContent}>
          <p>{article.content}</p>
        </div>
      </div>
    </article>
  );
}
