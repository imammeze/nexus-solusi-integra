import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Kenali lebih dekat Nexus Solusi Integra — visi, misi, nilai inti, dan tim profesional kami yang siap membantu transformasi bisnis Anda.',
};

const CORE_VALUES = [
  { icon: '🎯', title: 'Integritas', description: 'Menjunjung tinggi kejujuran dan transparansi dalam setiap layanan.' },
  { icon: '🚀', title: 'Inovasi', description: 'Menghadirkan solusi kreatif yang relevan dengan perkembangan zaman.' },
  { icon: '🤝', title: 'Kolaborasi', description: 'Bekerja sama erat dengan klien untuk hasil yang optimal.' },
  { icon: '📊', title: 'Hasil Terukur', description: 'Memberikan dampak nyata yang dapat diukur dan dipertanggungjawabkan.' },
];

const TEAM_MEMBERS = [
  { name: 'Ahmad Faisal', role: 'CEO & Founder', expertise: 'Strategic Management' },
  { name: 'Siti Nurhaliza', role: 'Head of Finance', expertise: 'Financial Advisory' },
  { name: 'Budi Santoso', role: 'Head of IT', expertise: 'Digital Transformation' },
  { name: 'Dewi Anggraini', role: 'Head of Operations', expertise: 'Business Process' },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Tentang Kami</span>
          <h1 className={styles.heroTitle}>Mitra Strategis untuk Pertumbuhan Bisnis Anda</h1>
          <p className={styles.heroSubtitle}>
            Nexus Solusi Integra adalah perusahaan konsultan terintegrasi yang berdedikasi untuk
            membantu perusahaan mencapai potensi terbaiknya melalui tiga pilar utama layanan.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section">
        <div className="container">
          <div className={styles.vmGrid}>
            <div className={styles.vmCard}>
              <span className={styles.vmIcon}>🔭</span>
              <h3>Visi</h3>
              <p>
                Menjadi perusahaan konsultan terdepan di Indonesia yang mampu menghadirkan
                solusi terintegrasi dan berdampak nyata bagi setiap klien.
              </p>
            </div>
            <div className={styles.vmCard}>
              <span className={styles.vmIcon}>🎯</span>
              <h3>Misi</h3>
              <ul className={styles.missionList}>
                <li>Memberikan layanan konsultasi berkualitas tinggi di bidang Keuangan, Manajemen, dan IT.</li>
                <li>Membangun hubungan jangka panjang berbasis kepercayaan dan hasil.</li>
                <li>Mengembangkan solusi inovatif yang relevan dengan kebutuhan industri.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className={`section ${styles.valuesBg}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Core Values</span>
            <h2>Nilai yang Kami Pegang</h2>
          </div>
          <div className={styles.valuesGrid}>
            {CORE_VALUES.map((value) => (
              <div key={value.title} className={styles.valueCard}>
                <span className={styles.valueIcon}>{value.icon}</span>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Tim Kami</span>
            <h2>Para Profesional di Balik Solusi</h2>
          </div>
          <div className={styles.teamGrid}>
            {TEAM_MEMBERS.map((member) => (
              <div key={member.name} className={styles.teamCard}>
                <div className={styles.teamAvatar}>
                  <span>{member.name.charAt(0)}</span>
                </div>
                <h4>{member.name}</h4>
                <p className={styles.teamRole}>{member.role}</p>
                <p className={styles.teamExpertise}>{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
