import Link from 'next/link';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { FaqSection } from '@/components/ui/FaqSection';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { ClientMarquee } from '@/components/ui/ClientMarquee';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { EventCard } from '@/components/ui/EventCard';
import styles from './page.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api';

async function getRecentArticles() {
  try {
    const res = await fetch(`${API_BASE}/articles?limit=3`, {
      cache: 'no-store'
    });
    if (!res.ok) {
      console.error('API Error:', res.status, res.statusText);
      return [];
    }
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Failed to fetch articles:', err);
    return [];
  }
}

async function getUpcomingEvents() {
  try {
    const res = await fetch(`${API_BASE}/events/upcoming?limit=3`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch events:', err);
    return [];
  }
}

export default async function HomePage() {
  const articles = await getRecentArticles();
  const events = await getUpcomingEvents();

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

      {/* ===== Insights / Articles Section ===== */}
      <section className="section" id="insights-section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Insights</span>
            <h2>Artikel & Publikasi Terbaru</h2>
            <p>
              Temukan wawasan terbaru seputar bisnis, keuangan, dan teknologi dari para pakar kami.
            </p>
          </div>
          <div className={styles.articlesGrid}>
            {articles.length > 0 ? (
              articles.map((article: any) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  slug={article.slug}
                  category={article.category}
                  date={article.createdAt}
                  coverImage={article.coverImage ? `${API_BASE.replace('/api', '')}${article.coverImage}` : null}
                />
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                Belum ada artikel yang dipublikasikan.
              </p>
            )}
          </div>
          {articles.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
              <Link href="/insights" className="btn btn-secondary">
                Lihat Semua Artikel
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ===== Events Section ===== */}
      <section className="section" id="events-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Event</span>
            <h2>Event & Kegiatan Mendatang</h2>
            <p>
              Ikuti berbagai event, seminar, dan workshop yang kami selenggarakan untuk membantu Anda berkembang.
            </p>
          </div>
          <div className={styles.eventsGrid}>
            {events.length > 0 ? (
              events.map((event: any) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  excerpt={event.excerpt}
                  slug={event.slug}
                  category={event.category}
                  eventDate={event.eventDate}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  location={event.location}
                  coverImage={event.coverImage ? `${API_BASE.replace('/api', '')}${event.coverImage}` : null}
                />
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                Belum ada event yang dijadwalkan.
              </p>
            )}
          </div>
          {events.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
              <Link href="/events" className="btn btn-secondary">
                Lihat Semua Event
              </Link>
            </div>
          )}
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
