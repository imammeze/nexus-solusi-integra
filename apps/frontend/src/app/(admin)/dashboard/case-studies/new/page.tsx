'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createCaseStudy } from '@/lib/api';
import styles from '../../../admin.module.css';

export default function NewCaseStudyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    client: '',
    industry: '',
    challenge: '',
    solution: '',
    impact: '',
    category: 'FINANCE',
    status: 'DRAFT',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createCaseStudy(form);
      router.push('/dashboard/case-studies');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formPage}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Buat Studi Kasus Baru</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGrid}>
          <div className={styles.formGroupFull}>
            <label className={styles.formLabelDark}>Judul</label>
            <input className={styles.formInputDark} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Judul studi kasus..." required />
          </div>
          <div>
            <label className={styles.formLabelDark}>Nama Klien</label>
            <input className={styles.formInputDark} value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} placeholder="PT. Contoh..." required />
          </div>
          <div>
            <label className={styles.formLabelDark}>Industri</label>
            <input className={styles.formInputDark} value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} placeholder="contoh: Perbankan" required />
          </div>
          <div className={styles.formGroupFull}>
            <label className={styles.formLabelDark}>Tantangan</label>
            <textarea className={`${styles.formInputDark} ${styles.formTextarea}`} style={{ minHeight: '100px' }} value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} placeholder="Jelaskan tantangan yang dihadapi klien..." required />
          </div>
          <div className={styles.formGroupFull}>
            <label className={styles.formLabelDark}>Solusi</label>
            <textarea className={`${styles.formInputDark} ${styles.formTextarea}`} style={{ minHeight: '100px' }} value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} placeholder="Jelaskan solusi yang diberikan..." required />
          </div>
          <div className={styles.formGroupFull}>
            <label className={styles.formLabelDark}>Dampak / Hasil</label>
            <textarea className={`${styles.formInputDark} ${styles.formTextarea}`} style={{ minHeight: '100px' }} value={form.impact} onChange={(e) => setForm({ ...form, impact: e.target.value })} placeholder="Jelaskan dampak positif dari solusi..." required />
          </div>
          <div>
            <label className={styles.formLabelDark}>Kategori</label>
            <select className={`${styles.formInputDark} ${styles.formSelect}`} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option value="FINANCE">Keuangan</option>
              <option value="MANAGEMENT">Manajemen</option>
              <option value="IT">Teknologi Informasi</option>
            </select>
          </div>
          <div>
            <label className={styles.formLabelDark}>Status</label>
            <select className={`${styles.formInputDark} ${styles.formSelect}`} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>
        </div>

        <div className={styles.formActions}>
          <Link href="/dashboard/case-studies" className={styles.btnSecondary}>Batal</Link>
          <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>
            {isSubmitting ? 'Menyimpan...' : 'Simpan Studi Kasus'}
          </button>
        </div>
      </form>
    </div>
  );
}
