import styles from '../page.module.css';

export default function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Insights</span>
          <h1 className={styles.heroTitle}>Detail Artikel</h1>
          <p className={styles.heroSubtitle}>
            Halaman ini akan menampilkan detail artikel berdasarkan data dari API.
          </p>
        </div>
      </section>
    </div>
  );
}
