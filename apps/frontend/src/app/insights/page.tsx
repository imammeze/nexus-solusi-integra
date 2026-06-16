import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Insights & Blog',
  description: 'Artikel, riset, dan analisis tren industri dari tim ahli Nexus Solusi Integra. Dapatkan wawasan terbaru tentang Keuangan, Bisnis, dan IT.',
};

export default function InsightsPage() {
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
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📝</span>
            <h3>Artikel Segera Hadir</h3>
            <p>Tim kami sedang mempersiapkan artikel-artikel berkualitas tinggi. Nantikan konten terbaru dari kami!</p>
          </div>
        </div>
      </section>
    </div>
  );
}
