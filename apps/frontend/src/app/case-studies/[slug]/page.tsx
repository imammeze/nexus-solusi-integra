import styles from '../page.module.css';

export default function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Studi Kasus</span>
          <h1 className={styles.heroTitle}>Detail Studi Kasus</h1>
          <p className={styles.heroSubtitle}>
            Halaman ini akan menampilkan detail studi kasus berdasarkan data dari API.
          </p>
        </div>
      </section>
    </div>
  );
}
