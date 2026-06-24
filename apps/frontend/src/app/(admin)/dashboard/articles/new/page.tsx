'use client';

import { useState, FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createArticle, uploadFile } from '@/lib/api';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import styles from '../../../admin.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function NewArticlePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'FINANCE',
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
      await createArticle({
        ...form,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()) : [],
      });
      router.push('/dashboard/articles');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formPage}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Buat Artikel Baru</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formGrid}>
          <div className={styles.formGroupFull}>
            <label className={styles.formLabelDark}>Judul</label>
            <input
              className={styles.formInputDark}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Judul artikel..."
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
            <RichTextEditor
              value={form.excerpt}
              onChange={(html) => setForm({ ...form, excerpt: html })}
              placeholder="Ringkasan singkat artikel..."
              minHeight="small"
            />
          </div>

          <div className={styles.formGroupFull}>
            <label className={styles.formLabelDark}>Konten</label>
            <RichTextEditor
              value={form.content}
              onChange={(html) => setForm({ ...form, content: html })}
              placeholder="Tulis konten artikel di sini..."
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
              placeholder="contoh: keuangan, pajak, audit"
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <Link href="/dashboard/articles" className={styles.btnSecondary}>Batal</Link>
          <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>
            {isSubmitting ? 'Menyimpan...' : 'Simpan Artikel'}
          </button>
        </div>
      </form>
    </div>
  );
}
