'use client';

import { useState, useEffect, FormEvent, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchCaseStudyById, updateCaseStudy } from '@/lib/api';
import styles from '../../../admin.module.css';

export default function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    async function load() {
      try {
        const cs = await fetchCaseStudyById(id);
        setForm({
          title: cs.title,
          client: cs.client,
          industry: cs.industry,
          challenge: cs.challenge,
          solution: cs.solution,
          impact: cs.impact,
          category: cs.category,
          status: cs.status,
        });
      } catch (err: any) {
        alert('Gagal memuat data: ' + err.message);
        router.push('/dashboard/case-studies');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [id, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateCaseStudy(id, form);
      router.push('/dashboard/case-studies');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p style={{ color: '#94a3b8' }}>Memuat data...</p>;

  return (
    <div className={styles.formPage}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Edit Studi Kasus</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGrid}>
          <div className={styles.formGroupFull}>
            <label className={styles.formLabelDark}>Judul</label>
            <input className={styles.formInputDark} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div>
            <label className={styles.formLabelDark}>Nama Klien</label>
            <input className={styles.formInputDark} value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} required />
          </div>
          <div>
            <label className={styles.formLabelDark}>Industri</label>
            <input className={styles.formInputDark} value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} required />
          </div>
          <div className={styles.formGroupFull}>
            <label className={styles.formLabelDark}>Tantangan</label>
            <textarea className={`${styles.formInputDark} ${styles.formTextarea}`} style={{ minHeight: '100px' }} value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} required />
          </div>
          <div className={styles.formGroupFull}>
            <label className={styles.formLabelDark}>Solusi</label>
            <textarea className={`${styles.formInputDark} ${styles.formTextarea}`} style={{ minHeight: '100px' }} value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} required />
          </div>
          <div className={styles.formGroupFull}>
            <label className={styles.formLabelDark}>Dampak / Hasil</label>
            <textarea className={`${styles.formInputDark} ${styles.formTextarea}`} style={{ minHeight: '100px' }} value={form.impact} onChange={(e) => setForm({ ...form, impact: e.target.value })} required />
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
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>

        <div className={styles.formActions}>
          <Link href="/dashboard/case-studies" className={styles.btnSecondary}>Batal</Link>
          <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>
            {isSubmitting ? 'Menyimpan...' : 'Perbarui Studi Kasus'}
          </button>
        </div>
      </form>
    </div>
  );
}
