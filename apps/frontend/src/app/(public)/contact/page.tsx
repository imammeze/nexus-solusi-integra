import type { Metadata } from 'next';
import { ContactForm } from '@/components/ui/ContactForm';
import { BookingSection } from '@/components/ui/BookingSection';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description: 'Jadwalkan konsultasi gratis dengan tim ahli Nexus Solusi Integra. Isi formulir atau hubungi kami langsung untuk memulai transformasi bisnis Anda.',
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Hubungi Kami</span>
          <h1 className={styles.heroTitle}>Mari Wujudkan Solusi Terbaik</h1>
          <p className={styles.heroSubtitle}>
            Jadwalkan sesi konsultasi gratis dengan tim ahli kami. Isi formulir di bawah dan kami akan menghubungi Anda segera.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            {/* Form */}
            <div className={styles.formSection}>
              <h2 className={styles.formTitle}>Formulir Konsultasi</h2>
              <p className={styles.formSubtitle}>
                Isi informasi berikut dan tim kami akan menghubungi Anda dalam 1x24 jam kerja.
              </p>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className={styles.infoSection}>
              <div className={styles.infoCard}>
                <h3>Informasi Kontak</h3>
                <div className={styles.infoItems}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>📧</span>
                    <div>
                      <p className={styles.infoLabel}>Email</p>
                      <p className={styles.infoValue}>admin@nexusolusi.id</p>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>📞</span>
                    <div>
                      <p className={styles.infoLabel}>Telepon</p>
                      <p className={styles.infoValue}>+62 21 1234 5678</p>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>💬</span>
                    <div>
                      <p className={styles.infoLabel}>WhatsApp</p>
                      <p className={styles.infoValue}>+62 812 3456 7890</p>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>📍</span>
                    <div>
                      <p className={styles.infoLabel}>Alamat</p>
                      <p className={styles.infoValue}>Purwokerto, Indonesia</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Iframe */}
              <div id="office-map" style={{ width: '100%', marginTop: '2rem' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.27025648249716!2d109.24577824679142!3d-7.4293406764968255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655f003f9da045%3A0xdbc0e1031db80280!2sMasjid%20Al%20Haq%20Bata%20Merah!5e0!3m2!1sid!2sid!4v1781592204286!5m2!1sid!2sid"
                  width="100%"
                  height="350"
                  style={{ border: 0, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi Kantor"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Booking Calendar Section ===== */}
      <section className="section" id="booking-section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Jadwal Konsultasi</span>
            <h2>Booking Konsultasi Online</h2>
            <p>
              Pilih tanggal dan ajukan jadwal konsultasi Anda. Setelah disetujui oleh admin, jadwal akan tampil di kalender.
            </p>
          </div>
          <div className={styles.bookingLayout}>
            <BookingSection />
          </div>
        </div>
      </section>
    </div>
  );
}

