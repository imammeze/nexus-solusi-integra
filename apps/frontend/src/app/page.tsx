import Link from 'next/link';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { FaqSection } from '@/components/ui/FaqSection';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { ClientMarquee } from '@/components/ui/ClientMarquee';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
      {/* ===== Hero Section ===== */}
      <section className={styles.hero} id="hero-section">
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <span className="section-label animate-fade-in-up">Trusted Consulting Partner</span>
            <h1 className={`${styles.heroTitle} animate-fade-in-up delay-1`}>
              Transformasi Bisnis <br />
              <span className={styles.heroAccent}>Dimulai dari Sini</span>
            </h1>
            <p className={`${styles.heroSubtitle} animate-fade-in-up delay-2`}>
              Kami membantu perusahaan dari skala UMKM hingga Enterprise untuk
              bertumbuh melalui solusi strategis di bidang Keuangan, Manajemen,
              dan Teknologi Informasi.
            </p>
            <div className={`${styles.heroActions} animate-fade-in-up delay-3`}>
              <Link href="/contact" className="btn btn-primary btn-lg">
                Konsultasi Gratis
              </Link>
              <Link href="/case-studies" className="btn btn-secondary btn-lg">
                Lihat Portofolio
              </Link>
            </div>
          </div>
          <div className={`${styles.heroVisual} animate-fade-in delay-2`}>
            <div className={styles.heroCard}>
              <div className={styles.heroStat}>
                <span className={styles.statNumber}><AnimatedCounter end={150} suffix="+" /></span>
                <span className={styles.statLabel}>Klien Aktif</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.statNumber}><AnimatedCounter end={98} suffix="%" /></span>
                <span className={styles.statLabel}>Kepuasan Klien</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.statNumber}><AnimatedCounter end={10} suffix="+" /></span>
                <span className={styles.statLabel}>Tahun Pengalaman</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Client Marquee Section ===== */}
      <ClientMarquee />

      {/* ===== Services Section ===== */}
      <section className="section" id="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Layanan Kami</span>
            <h2>Tiga Pilar Solusi Bisnis</h2>
            <p>
              Kami menghadirkan layanan terintegrasi yang dirancang untuk
              mendorong pertumbuhan dan efisiensi bisnis Anda.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            <ServiceCard
              icon="💰"
              title="Konsultan Keuangan"
              description="Strategi pengelolaan keuangan, perencanaan investasi, audit, dan optimasi pajak untuk pertumbuhan bisnis yang berkelanjutan."
              href="/services"
              accentColor="var(--color-finance)"
            />
            <ServiceCard
              icon="📈"
              title="Manajemen Bisnis"
              description="Transformasi operasional, pengembangan strategi bisnis, manajemen perubahan, dan peningkatan kinerja organisasi."
              href="/services"
              accentColor="var(--color-management)"
            />
            <ServiceCard
              icon="💻"
              title="Teknologi Informasi"
              description="Transformasi digital, pengembangan sistem, integrasi teknologi, dan konsultasi keamanan siber untuk bisnis modern."
              href="/services"
              accentColor="var(--color-it)"
            />
          </div>
        </div>
      </section>

      {/* ===== FAQ Section ===== */}
      <FaqSection />

      {/* ===== CTA Section ===== */}
      <section className={styles.cta} id="cta-section">
        <div className="container">
          <div className={styles.ctaContent}>
            <span className="section-label">Mulai Sekarang</span>
            <h2 className={styles.ctaTitle}>
              Siap untuk Memulai Transformasi Bisnis Anda?
            </h2>
            <p className={styles.ctaDescription}>
              Jadwalkan sesi konsultasi gratis dengan tim ahli kami dan temukan
              solusi terbaik untuk tantangan bisnis Anda.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Jadwalkan Konsultasi
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
