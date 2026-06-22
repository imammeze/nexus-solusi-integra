'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCaseStudies, deleteCaseStudy } from '@/lib/api';
import type { CaseStudy } from '@/lib/api';
import styles from '../../admin.module.css';

export default function CaseStudiesListPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async (p: number) => {
    setIsLoading(true);
    try {
      const res = await fetchCaseStudies(p, 10);
      setCaseStudies(res.data);
      setTotalPages(res.meta.totalPages);
      setTotal(res.meta.total);
      setPage(p);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(1); }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Hapus studi kasus "${title}"?`)) return;
    try {
      await deleteCaseStudy(id);
      loadData(page);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Studi Kasus</h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>{total} studi kasus ditemukan</p>
        </div>
        <Link href="/dashboard/case-studies/new" className={styles.addButton}>
          <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Buat Studi Kasus
        </Link>
      </div>

      <div className={styles.tableCard}>
        {isLoading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Memuat...</div>
        ) : caseStudies.length === 0 ? (
          <div className={styles.emptyState}>
            <svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
            <h3>Belum Ada Studi Kasus</h3>
            <p>Mulai buat studi kasus pertama Anda</p>
          </div>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Klien</th>
                  <th>Kategori</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                  <th style={{ width: 100 }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {caseStudies.map((cs) => (
                  <tr key={cs.id}>
                    <td className={styles.tableTitle}>{cs.title}</td>
                    <td>{cs.client}</td>
                    <td>{cs.category}</td>
                    <td>
                      <span className={`${styles.badge} ${cs.status === 'PUBLISHED' ? styles.badgePublished : cs.status === 'DRAFT' ? styles.badgeDraft : styles.badgeArchived}`}>
                        {cs.status}
                      </span>
                    </td>
                    <td>{new Date(cs.createdAt).toLocaleDateString('id-ID')}</td>
                    <td>
                      <div className={styles.tableActions}>
                        <Link href={`/dashboard/case-studies/${cs.id}`} className={styles.actionBtn} title="Edit">
                          <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </Link>
                        <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => handleDelete(cs.id, cs.title)} title="Hapus">
                          <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <span className={styles.paginationInfo}>Halaman {page} dari {totalPages}</span>
                <div className={styles.paginationButtons}>
                  <button className={styles.paginationBtn} disabled={page <= 1} onClick={() => loadData(page - 1)}>← Sebelumnya</button>
                  <button className={styles.paginationBtn} disabled={page >= totalPages} onClick={() => loadData(page + 1)}>Selanjutnya →</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
