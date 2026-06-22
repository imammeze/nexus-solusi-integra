'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchArticles, deleteArticle } from '@/lib/api';
import type { Article } from '@/lib/api';
import styles from '../../admin.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
const resolveImageUrl = (path: string) => `${API_BASE.replace('/api', '')}${path}`;

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadArticles = async (p: number) => {
    setIsLoading(true);
    try {
      const res = await fetchArticles(p, 10);
      setArticles(res.data);
      setTotalPages(res.meta.totalPages);
      setTotal(res.meta.total);
      setPage(p);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArticles(1);
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Hapus artikel "${title}"?`)) return;
    try {
      await deleteArticle(id);
      loadArticles(page);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Artikel</h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>{total} artikel ditemukan</p>
        </div>
        <Link href="/dashboard/articles/new" className={styles.addButton}>
          <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Buat Artikel
        </Link>
      </div>

      <div className={styles.tableCard}>
        {isLoading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Memuat...</div>
        ) : articles.length === 0 ? (
          <div className={styles.emptyState}>
            <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
            <h3>Belum Ada Artikel</h3>
            <p>Mulai buat artikel pertama Anda</p>
          </div>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Kategori</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                  <th style={{ width: 100 }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td>
                      <div className={styles.tableTitleRow}>
                        {article.coverImage ? (
                          <img src={resolveImageUrl(article.coverImage)} alt="Thumbnail" className={styles.tableThumbnail} />
                        ) : (
                          <div className={styles.tableThumbnailPlaceholder}>
                            <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                          </div>
                        )}
                        <div>
                          <div className={styles.tableTitle}>{article.title}</div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{article.author?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{article.category}</td>
                    <td>
                      <span className={`${styles.badge} ${article.status === 'PUBLISHED' ? styles.badgePublished : article.status === 'DRAFT' ? styles.badgeDraft : styles.badgeArchived}`}>
                        {article.status}
                      </span>
                    </td>
                    <td>{new Date(article.createdAt).toLocaleDateString('id-ID')}</td>
                    <td>
                      <div className={styles.tableActions}>
                        <Link href={`/dashboard/articles/${article.id}`} className={styles.actionBtn} title="Edit">
                          <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </Link>
                        <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => handleDelete(article.id, article.title)} title="Hapus">
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
                  <button className={styles.paginationBtn} disabled={page <= 1} onClick={() => loadArticles(page - 1)}>← Sebelumnya</button>
                  <button className={styles.paginationBtn} disabled={page >= totalPages} onClick={() => loadArticles(page + 1)}>Selanjutnya →</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
