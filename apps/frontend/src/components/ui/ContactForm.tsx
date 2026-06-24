'use client';

import { useState } from 'react';
import { ServiceCategory } from '@repo/types';
import { submitContactForm } from '@/services/contact.service';
import styles from './ContactForm.module.css';

const SERVICE_OPTIONS = [
  { value: ServiceCategory.FINANCE, label: 'Konsultan Keuangan' },
  { value: ServiceCategory.MANAGEMENT, label: 'Manajemen Bisnis' },
  { value: ServiceCategory.IT, label: 'Teknologi Informasi' },
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    whatsapp: '',
    service: '' as ServiceCategory | '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      if (!formData.service) {
        setSubmitResult({ success: false, message: 'Silakan pilih layanan yang diinginkan.' });
        setIsSubmitting(false);
        return;
      }

      await submitContactForm({
        ...formData,
        service: formData.service as ServiceCategory,
      });

      setSubmitResult({ success: true, message: 'Terima kasih! Pesan Anda telah terkirim. Tim kami akan menghubungi Anda segera.' });
      setFormData({ fullName: '', companyName: '', email: '', whatsapp: '', service: '', description: '' });
    } catch {
      setSubmitResult({ success: false, message: 'Maaf, terjadi kesalahan. Silakan coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} id="consultation-form">
      <div className={styles.grid}>
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">Nama Lengkap *</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="form-input"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Masukkan nama lengkap"
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyName" className="form-label">Nama Perusahaan *</label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            className="form-input"
            value={formData.companyName}
            onChange={handleChange}
            required
            placeholder="Masukkan nama perusahaan"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Alamat Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="email@perusahaan.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="whatsapp" className="form-label">Nomer Hp Aktif *</label>
          <div className={styles.inputGroup}>
            <span className={styles.inputPrefix}>+62</span>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              className={`form-input ${styles.inputWithPrefix}`}
              value={formData.whatsapp}
              onChange={handleChange}
              required
              placeholder="Contoh: 812345678"
            />
          </div>
          <p className={styles.inputHint}>Masukkan nomor tanpa awalan 0 (contoh: 812345678).</p>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="service" className="form-label">Pilihan Layanan *</label>
        <select
          id="service"
          name="service"
          className="form-select"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="">Pilih layanan yang diinginkan</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">Deskripsi Kebutuhan *</label>
        <textarea
          id="description"
          name="description"
          className="form-textarea"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Jelaskan kebutuhan atau tantangan bisnis Anda..."
          rows={5}
        />
      </div>

      {submitResult && (
        <div className={`${styles.alert} ${submitResult.success ? styles.alertSuccess : styles.alertError}`}>
          {submitResult.message}
        </div>
      )}

      <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting} style={{ width: '100%' }}>
        {isSubmitting ? 'Mengirim...' : 'Jadwalkan Konsultasi'}
      </button>
    </form>
  );
}
