import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Studi Kasus',
  description: 'Portofolio proyek dan solusi yang pernah kami kerjakan. Lihat bagaimana kami membantu klien mengatasi tantangan bisnis mereka.',
};

export default function CaseStudiesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Studi Kasus</span>
          <h1 className={styles.heroTitle}>Rekam Jejak Keberhasilan Kami</h1>
          <p className={styles.heroSubtitle}>
            Temukan bagaimana kami membantu berbagai perusahaan mengatasi tantangan dan mencapai tujuan bisnis mereka.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📊</span>
            <h3>Studi Kasus Segera Hadir</h3>
            <p>Kami sedang mempersiapkan studi kasus terbaik dari proyek-proyek yang telah kami kerjakan. Nantikan segera!</p>
          </div>
        </div>
      </section>
    </div>
  );
}
