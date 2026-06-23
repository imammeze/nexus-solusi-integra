'use client';

import { useState } from 'react';
import { createConsultation } from '@/lib/api';
import styles from './BookingFormModal.module.css';

const SERVICE_OPTIONS = [
  { value: 'FINANCE', label: 'Konsultan Keuangan' },
  { value: 'MANAGEMENT', label: 'Manajemen Bisnis' },
  { value: 'IT', label: 'Teknologi Informasi' },
];

interface BookingFormModalProps {
  selectedDate: Date;
  onClose: () => void;
  onSuccess: () => void;
}

export function BookingFormModal({ selectedDate, onClose, onSuccess }: BookingFormModalProps) {
  const [form, setForm] = useState({
    fullName: '',
    whatsapp: '',
    service: '',
    description: '',
    startTime: '',
    endTime: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const dateStr = selectedDate.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formatDateISO = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    if (!form.service) {
      setResult({ success: false, message: 'Silakan pilih layanan yang diinginkan.' });
      setIsSubmitting(false);
      return;
    }

    if (!form.startTime || !form.endTime) {
      setResult({ success: false, message: 'Silakan isi jam mulai dan jam selesai.' });
      setIsSubmitting(false);
      return;
    }

    if (form.startTime >= form.endTime) {
      setResult({ success: false, message: 'Jam selesai harus lebih dari jam mulai.' });
      setIsSubmitting(false);
      return;
    }

    try {
      await createConsultation({
        fullName: form.fullName,
        whatsapp: form.whatsapp,
        service: form.service,
        description: form.description,
        consultDate: formatDateISO(selectedDate),
        startTime: form.startTime,
        endTime: form.endTime,
      });

      setResult({
        success: true,
        message: 'Pengajuan konsultasi berhasil dikirim! Mohon tunggu persetujuan dari admin.',
      });
      setForm({ fullName: '', whatsapp: '', service: '', description: '', startTime: '', endTime: '' });

      // Refresh the schedule list after a delay
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: any) {
      setResult({ success: false, message: err.message || 'Terjadi kesalahan, coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderInfo}>
            <h2>Form Konsultasi</h2>
            <span className={styles.modalHeaderDate}>📅 {dateStr}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Tutup">×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            {result && (
              <div className={`${styles.alert} ${result.success ? styles.alertSuccess : styles.alertError}`}>
                {result.message}
              </div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Nama Lengkap</label>
              <input
                name="fullName"
                type="text"
                className={styles.formInput}
                placeholder="Masukkan nama Anda"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Nomor WhatsApp (Aktif)</label>
              <input
                name="whatsapp"
                type="tel"
                className={styles.formInput}
                placeholder="Contoh: 08123456789"
                value={form.whatsapp}
                onChange={handleChange}
                required
              />
              <p className={styles.formHint}>*Nomor ini digunakan untuk verifikasi identitas Anda.</p>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Pilihan Layanan</label>
              <select
                name="service"
                className={`${styles.formInput} ${styles.formSelect}`}
                value={form.service}
                onChange={handleChange}
                required
              >
                <option value="">-- Pilih Layanan --</option>
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Tujuan / Keperluan</label>
              <textarea
                name="description"
                className={`${styles.formInput} ${styles.formTextarea}`}
                placeholder="Contoh: Konsultasi terkait perencanaan keuangan bisnis"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.timeRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Jam Mulai</label>
                <input
                  name="startTime"
                  type="time"
                  className={styles.formInput}
                  value={form.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Jam Selesai</label>
                <input
                  name="endTime"
                  type="time"
                  className={styles.formInput}
                  value={form.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <p className={styles.formHint}>*Pemesanan minimal adalah 1 jam pada tanggal yang dipilih.</p>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Batalkan
            </button>
            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Mengirim...' : 'Ajukan Sekarang'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
