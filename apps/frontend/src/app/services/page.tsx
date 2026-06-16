import type { Metadata } from 'next';
import { ServiceCard } from '@/components/ui/ServiceCard';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Layanan',
  description: 'Layanan konsultasi terintegrasi: Konsultan Keuangan, Manajemen Bisnis, dan Teknologi Informasi untuk kebutuhan bisnis Anda.',
};

const SERVICES = [
  {
    icon: '💰',
    title: 'Konsultan Keuangan',
    description: 'Strategi pengelolaan keuangan, perencanaan investasi, audit, dan optimasi pajak untuk pertumbuhan bisnis yang berkelanjutan.',
    href: '/services/keuangan',
    color: 'var(--color-finance)',
    details: [
      'Perencanaan & Analisis Keuangan',
      'Audit & Kepatuhan',
      'Optimasi Pajak',
      'Manajemen Risiko Keuangan',
      'Due Diligence',
      'Restrukturisasi Keuangan',
    ],
  },
  {
    icon: '📈',
    title: 'Manajemen Bisnis',
    description: 'Transformasi operasional, pengembangan strategi bisnis, manajemen perubahan, dan peningkatan kinerja organisasi.',
    href: '/services/manajemen',
    color: 'var(--color-management)',
    details: [
      'Strategi & Perencanaan Bisnis',
      'Manajemen Perubahan (Change Management)',
      'Optimasi Proses Bisnis',
      'HR & Organizational Development',
      'Performance Management',
      'Supply Chain Optimization',
    ],
  },
  {
    icon: '💻',
    title: 'Teknologi Informasi',
    description: 'Transformasi digital, pengembangan sistem, integrasi teknologi, dan konsultasi keamanan siber untuk bisnis modern.',
    href: '/services/it',
    color: 'var(--color-it)',
    details: [
      'Transformasi Digital',
      'Pengembangan Software Custom',
      'IT Infrastructure & Cloud',
      'Keamanan Siber',
      'Data Analytics & BI',
      'IT Governance & Compliance',
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Layanan Kami</span>
          <h1 className={styles.heroTitle}>Solusi Terintegrasi untuk Bisnis Anda</h1>
          <p className={styles.heroSubtitle}>
            Tiga pilar layanan yang dirancang untuk menjawab setiap tantangan bisnis modern.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className={`${styles.serviceBlock} ${index % 2 !== 0 ? styles.reversed : ''}`}
              id={`service-${service.title.toLowerCase().replace(/\s/g, '-')}`}
            >
              <div className={styles.serviceInfo}>
                <span className={styles.serviceIcon} style={{ background: `${service.color}15`, color: service.color }}>
                  {service.icon}
                </span>
                <h2>{service.title}</h2>
                <p className={styles.serviceDesc}>{service.description}</p>
                <ul className={styles.serviceList}>
                  {service.details.map((detail) => (
                    <li key={detail}>✓ {detail}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.serviceVisual}>
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                  accentColor={service.color}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
