import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

// ── Data lengkap masing-masing layanan ──
const SERVICES_DATA: Record<string, {
  icon: string;
  title: string;
  description: string;
  color: string;
  details: { icon: string; title: string; desc: string }[];
  approach: { title: string; desc: string }[];
}> = {
  keuangan: {
    icon: '💰',
    title: 'Konsultan Keuangan',
    description:
      'Strategi pengelolaan keuangan, perencanaan investasi, audit, dan optimasi pajak untuk pertumbuhan bisnis yang berkelanjutan.',
    color: 'var(--color-finance, #0ea5e9)',
    details: [
      {
        icon: '📊',
        title: 'Perencanaan & Analisis Keuangan',
        desc: 'Penyusunan anggaran, proyeksi arus kas, dan analisis rasio keuangan untuk pengambilan keputusan yang lebih tepat.',
      },
      {
        icon: '🔍',
        title: 'Audit & Kepatuhan',
        desc: 'Audit internal & eksternal, serta kepatuhan terhadap standar akuntansi dan regulasi yang berlaku.',
      },
      {
        icon: '💳',
        title: 'Optimasi Pajak',
        desc: 'Perencanaan pajak strategis untuk efisiensi beban pajak tanpa melanggar regulasi yang berlaku.',
      },
      {
        icon: '⚖️',
        title: 'Manajemen Risiko Keuangan',
        desc: 'Identifikasi, evaluasi, dan mitigasi risiko keuangan untuk melindungi aset perusahaan.',
      },
      {
        icon: '📋',
        title: 'Due Diligence',
        desc: 'Investigasi menyeluruh terhadap kondisi keuangan perusahaan untuk mendukung keputusan investasi atau akuisisi.',
      },
      {
        icon: '🔄',
        title: 'Restrukturisasi Keuangan',
        desc: 'Penataan ulang struktur keuangan perusahaan untuk meningkatkan kesehatan finansial jangka panjang.',
      },
    ],
    approach: [
      { title: 'Assessment Awal', desc: 'Analisis mendalam terhadap kondisi keuangan perusahaan saat ini.' },
      { title: 'Identifikasi Peluang', desc: 'Menemukan area yang dapat dioptimalkan untuk efisiensi dan pertumbuhan.' },
      { title: 'Perencanaan Strategi', desc: 'Menyusun rencana implementasi yang terstruktur dan realistis.' },
      { title: 'Implementasi & Monitoring', desc: 'Eksekusi rencana disertai pemantauan berkala untuk memastikan hasil.' },
    ],
  },
  manajemen: {
    icon: '📈',
    title: 'Manajemen Bisnis',
    description:
      'Transformasi operasional, pengembangan strategi bisnis, manajemen perubahan, dan peningkatan kinerja organisasi.',
    color: 'var(--color-management, #8b5cf6)',
    details: [
      {
        icon: '🎯',
        title: 'Strategi & Perencanaan Bisnis',
        desc: 'Pengembangan visi, misi, dan peta jalan strategis untuk mencapai tujuan bisnis jangka panjang.',
      },
      {
        icon: '🔁',
        title: 'Manajemen Perubahan',
        desc: 'Membantu organisasi dalam bertransisi secara mulus dengan framework yang teruji.',
      },
      {
        icon: '⚙️',
        title: 'Optimasi Proses Bisnis',
        desc: 'Penyederhanaan dan otomasi proses bisnis untuk meningkatkan produktivitas dan mengurangi biaya.',
      },
      {
        icon: '👥',
        title: 'HR & Organizational Development',
        desc: 'Pengembangan kompetensi SDM dan struktur organisasi yang adaptif terhadap perubahan.',
      },
      {
        icon: '📊',
        title: 'Performance Management',
        desc: 'Merancang sistem pengukuran kinerja dan KPI yang terukur untuk mendorong akuntabilitas.',
      },
      {
        icon: '🔗',
        title: 'Supply Chain Optimization',
        desc: 'Optimasi rantai pasok untuk meningkatkan efisiensi operasional dan penghematan biaya.',
      },
    ],
    approach: [
      { title: 'Diagnosis Organisasi', desc: 'Memahami struktur, budaya, dan proses kerja yang sedang berjalan.' },
      { title: 'Gap Analysis', desc: 'Mengidentifikasi kesenjangan antara kondisi saat ini dan tujuan yang ingin dicapai.' },
      { title: 'Rancang Solusi', desc: 'Mendesain solusi yang disesuaikan dengan kebutuhan unik perusahaan.' },
      { title: 'Pendampingan Implementasi', desc: 'Mendampingi tim internal selama proses transformasi berlangsung.' },
    ],
  },
  it: {
    icon: '💻',
    title: 'Teknologi Informasi',
    description:
      'Transformasi digital, pengembangan sistem, integrasi teknologi, dan konsultasi keamanan siber untuk bisnis modern.',
    color: 'var(--color-it, #10b981)',
    details: [
      {
        icon: '🚀',
        title: 'Transformasi Digital',
        desc: 'Strategi digitalisasi menyeluruh untuk meningkatkan efisiensi dan daya saing bisnis Anda.',
      },
      {
        icon: '🖥️',
        title: 'Pengembangan Software Custom',
        desc: 'Pengembangan aplikasi web, mobile, dan sistem internal yang disesuaikan dengan kebutuhan bisnis.',
      },
      {
        icon: '☁️',
        title: 'IT Infrastructure & Cloud',
        desc: 'Migrasi dan pengelolaan infrastruktur cloud untuk skalabilitas dan keandalan yang optimal.',
      },
      {
        icon: '🛡️',
        title: 'Keamanan Siber',
        desc: 'Perlindungan menyeluruh terhadap ancaman siber termasuk audit keamanan dan incident response.',
      },
      {
        icon: '📈',
        title: 'Data Analytics & BI',
        desc: 'Transformasi data mentah menjadi insight bisnis yang actionable melalui analitik dan dashboard.',
      },
      {
        icon: '📜',
        title: 'IT Governance & Compliance',
        desc: 'Kerangka tata kelola IT yang selaras dengan standar industri seperti ISO 27001 dan COBIT.',
      },
    ],
    approach: [
      { title: 'Discovery & Requirement', desc: 'Menggali kebutuhan bisnis dan teknis secara komprehensif.' },
      { title: 'Architecture & Design', desc: 'Merancang arsitektur solusi yang skalabel dan aman.' },
      { title: 'Development & Testing', desc: 'Pengembangan iteratif dengan quality assurance di setiap tahap.' },
      { title: 'Deployment & Support', desc: 'Peluncuran sistem dan dukungan purna-jual yang berkelanjutan.' },
    ],
  },
};

// List semua layanan (untuk sidebar "Layanan Lainnya")
const ALL_SERVICES = [
  { slug: 'keuangan', icon: '💰', title: 'Konsultan Keuangan' },
  { slug: 'manajemen', icon: '📈', title: 'Manajemen Bisnis' },
  { slug: 'it', icon: '💻', title: 'Teknologi Informasi' },
];

// ── Generate Static Params ──
export function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({ slug }));
}

// ── Dynamic Metadata ──
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  if (!service) return { title: 'Layanan Tidak Ditemukan' };
  return {
    title: `${service.title} — Nexus Solusi Integra`,
    description: service.description,
  };
}

// ── Page Component ──
export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  if (!service) notFound();

  const otherServices = ALL_SERVICES.filter((s) => s.slug !== slug);

  return (
    <div className={styles.page}>
      {/* ===== Hero ===== */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.breadcrumb}>
            <Link href="/">Beranda</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href="/services">Layanan</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>{service.title}</span>
          </div>
          <div
            className={styles.heroIcon}
            style={{
              background: `${service.color}20`,
            }}
          >
            {service.icon}
          </div>
          <h1 className={styles.heroTitle}>{service.title}</h1>
          <p className={styles.heroDescription}>{service.description}</p>
        </div>
      </section>

      {/* ===== Content ===== */}
      <section className={styles.content}>
        <div className="container">
          <div className={styles.contentGrid}>
            {/* Main */}
            <div className={styles.mainContent}>
              {/* Layanan Detail */}
              <div>
                <h2 className={styles.sectionTitle} style={{ '--accent': service.color } as React.CSSProperties}>
                  Apa yang Kami Tawarkan
                </h2>
                <div className={styles.detailsGrid}>
                  {service.details.map((detail, idx) => (
                    <div key={idx} className={styles.detailCard}>
                      <div
                        className={styles.detailCardIcon}
                        style={{ background: `${service.color}12` }}
                      >
                        {detail.icon}
                      </div>
                      <div className={styles.detailCardContent}>
                        <h4>{detail.title}</h4>
                        <p>{detail.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pendekatan */}
              <div>
                <h2 className={styles.sectionTitle}>Pendekatan Kami</h2>
                <div className={styles.approachList}>
                  {service.approach.map((step, idx) => (
                    <div key={idx} className={styles.approachStep}>
                      <div
                        className={styles.stepNumber}
                        style={{
                          background: `${service.color}15`,
                          color: service.color,
                        }}
                      >
                        {idx + 1}
                      </div>
                      <div className={styles.stepContent}>
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              {/* CTA */}
              <div className={styles.ctaCard}>
                <h3>Tertarik dengan layanan ini?</h3>
                <p>
                  Konsultasikan kebutuhan bisnis Anda secara gratis bersama tim ahli kami.
                </p>
                <Link href="/contact" className={styles.ctaButton}>
                  Konsultasi Gratis →
                </Link>
              </div>

              {/* Other services */}
              <div className={styles.otherServices}>
                <h3>Layanan Lainnya</h3>
                {otherServices.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className={styles.otherServiceLink}>
                    <span className={styles.otherServiceIcon}>{s.icon}</span>
                    {s.title}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
