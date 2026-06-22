'use client';

import { useState, FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createEvent, uploadFile } from '@/lib/api';
import styles from '../../../admin.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function NewEventPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    excerpt: '',
    category: 'FINANCE',
    eventDate: '',
    startTime: '09:00',
    endTime: '17:00',
    location: '',
    tags: '',
    status: 'DRAFT',
    coverImage: '',
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await uploadFile(file);
      setForm((prev) => ({ ...prev, coverImage: result.url }));
      setCoverPreview(`${API_BASE.replace('/api', '')}${result.url}`);
    } catch (err: any) {
      alert('Upload gagal: ' + err.message);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createEvent({
        ...form,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()) : [],
      });
      router.push('/dashboard/events');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formPage}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Buat Event Baru</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGrid}>
          <div className={styles.formGroupFull}>
            <label className={styles.formLabelDark}>Judul</label>
            <input
              className={styles.formInputDark}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Judul event..."
              required
            />
          </div>

          <div className={styles.formGroupFull}>
            <label className={styles.formLabelDark}>Cover Image</label>
            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
            <div
              className={`${styles.uploadArea} ${coverPreview ? styles.hasImage : ''}`}
              onClick={() => fileInputRef.current?.click()}
            >
              {coverPreview ? (
                <img src={coverPreview} alt="Cover preview" />
              ) : (
                <>
                  <div className={styles.uploadIcon}>📷</div>
                  <div className={styles.uploadText}>
                    Klik untuk <span className={styles.uploadTextHighlight}>upload gambar</span> cover
                  </div>
                  <div className={styles.uploadText} style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    JPG, PNG, WebP (maks. 5MB)
                  </div>
                </>
              )}
            </div>
          </div>

          <div className={styles.formGroupFull}>
            <label className={styles.formLabelDark}>Ringkasan</label>
            <textarea
              className={`${styles.formInputDark} ${styles.formTextarea}`}
              style={{ minHeight: '80px' }}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Ringkasan singkat event..."
              required
            />
          </div>

          <div className={styles.formGroupFull}>
            <label className={styles.formLabelDark}>Deskripsi</label>
            <textarea
              className={`${styles.formInputDark} ${styles.formTextarea}`}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Tulis deskripsi event di sini..."
              required
            />
          </div>

          <div>
            <label className={styles.formLabelDark}>Tanggal Event</label>
            <input
              type="date"
              className={styles.formInputDark}
              value={form.eventDate}
              onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
              required
            />
          </div>

          <div>
            <label className={styles.formLabelDark}>Lokasi</label>
            <input
              className={styles.formInputDark}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Lokasi event..."
              required
            />
          </div>

          <div>
            <label className={styles.formLabelDark}>Waktu Mulai</label>
            <input
              type="time"
              className={styles.formInputDark}
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              required
            />
          </div>

          <div>
            <label className={styles.formLabelDark}>Waktu Selesai</label>
            <input
              type="time"
              className={styles.formInputDark}
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              required
            />
          </div>

          <div>
            <label className={styles.formLabelDark}>Kategori</label>
            <select
              className={`${styles.formInputDark} ${styles.formSelect}`}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="FINANCE">Keuangan</option>
              <option value="MANAGEMENT">Manajemen</option>
              <option value="IT">Teknologi Informasi</option>
            </select>
          </div>

          <div>
            <label className={styles.formLabelDark}>Status</label>
            <select
              className={`${styles.formInputDark} ${styles.formSelect}`}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          <div className={styles.formGroupFull}>
            <label className={styles.formLabelDark}>Tags (pisahkan dengan koma)</label>
            <input
              className={styles.formInputDark}
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="contoh: seminar, workshop, keuangan"
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <Link href="/dashboard/events" className={styles.btnSecondary}>Batal</Link>
          <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>
            {isSubmitting ? 'Menyimpan...' : 'Simpan Event'}
          </button>
        </div>
      </form>
    </div>
  );
}
