'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchEvents, deleteEvent } from '@/lib/api';
import type { Event } from '@/lib/api';
import styles from '../../admin.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
const resolveImageUrl = (path: string) => `${API_BASE.replace('/api', '')}${path}`;

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadEvents = async (p: number) => {
    setIsLoading(true);
    try {
      const res = await fetchEvents(p, 10);
      setEvents(res.data);
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
    loadEvents(1);
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Hapus event "${title}"?`)) return;
    try {
      await deleteEvent(id);
      loadEvents(page);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Event</h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>{total} event ditemukan</p>
        </div>
        <Link href="/dashboard/events/new" className={styles.addButton}>
          <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Buat Event
        </Link>
      </div>

      <div className={styles.tableCard}>
        {isLoading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Memuat...</div>
        ) : events.length === 0 ? (
          <div className={styles.emptyState}>
            <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            <h3>Belum Ada Event</h3>
            <p>Mulai buat event pertama Anda</p>
          </div>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Kategori</th>
                  <th>Tanggal Event</th>
                  <th>Lokasi</th>
                  <th>Status</th>
                  <th style={{ width: 100 }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>
                      <div className={styles.tableTitleRow}>
                        {event.coverImage ? (
                          <img src={resolveImageUrl(event.coverImage)} alt="Thumbnail" className={styles.tableThumbnail} />
                        ) : (
                          <div className={styles.tableThumbnailPlaceholder}>
                            <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                          </div>
                        )}
                        <div>
                          <div className={styles.tableTitle}>{event.title}</div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{event.startTime} – {event.endTime}</div>
                        </div>
                      </div>
                    </td>
                    <td>{event.category}</td>
                    <td>{new Date(event.eventDate).toLocaleDateString('id-ID', { timeZone: 'UTC' })}</td>
                    <td style={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.location}</td>
                    <td>
                      <span className={`${styles.badge} ${event.status === 'PUBLISHED' ? styles.badgePublished : event.status === 'DRAFT' ? styles.badgeDraft : styles.badgeArchived}`}>
                        {event.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.tableActions}>
                        <Link href={`/dashboard/events/${event.id}`} className={styles.actionBtn} title="Edit">
                          <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </Link>
                        <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => handleDelete(event.id, event.title)} title="Hapus">
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
                  <button className={styles.paginationBtn} disabled={page <= 1} onClick={() => loadEvents(page - 1)}>← Sebelumnya</button>
                  <button className={styles.paginationBtn} disabled={page >= totalPages} onClick={() => loadEvents(page + 1)}>Selanjutnya →</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
