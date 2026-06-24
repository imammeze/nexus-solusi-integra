'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createCaseStudy } from '@/lib/api';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
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
            <RichTextEditor value={form.challenge} onChange={(html) => setForm({ ...form, challenge: html })} placeholder="Jelaskan tantangan yang dihadapi klien..." minHeight="small" />
          </div>
          <div className={styles.formGroupFull}>
            <label className={styles.formLabelDark}>Solusi</label>
            <RichTextEditor value={form.solution} onChange={(html) => setForm({ ...form, solution: html })} placeholder="Jelaskan solusi yang diberikan..." minHeight="small" />
          </div>
          <div className={styles.formGroupFull}>
            <label className={styles.formLabelDark}>Dampak / Hasil</label>
            <RichTextEditor value={form.impact} onChange={(html) => setForm({ ...form, impact: html })} placeholder="Jelaskan dampak positif dari solusi..." minHeight="small" />
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
