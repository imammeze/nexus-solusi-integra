'use client';

import { useEffect, useState } from 'react';
import {
  fetchConsultationsAdmin,
  updateConsultationStatus,
  deleteConsultation,
} from '@/lib/api';
import type { Consultation } from '@/lib/api';
import styles from '../../admin.module.css';

const STATUS_MAP: Record<string, string> = {
  PENDING: 'MENUNGGU',
  APPROVED: 'DISETUJUI',
  REJECTED: 'DITOLAK',
};

const SERVICE_MAP: Record<string, string> = {
  FINANCE: 'Keuangan',
  MANAGEMENT: 'Manajemen',
  IT: 'Teknologi Informasi',
};

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<Consultation | null>(null);

  const loadData = async (p: number, status?: string) => {
    setIsLoading(true);
    try {
      const res = await fetchConsultationsAdmin(p, 10, status);
      setConsultations(res.data);
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
    loadData(1, filter);
  }, [filter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateConsultationStatus(id, newStatus);
      if (selected && selected.id === id) {
        setSelected({ ...selected, status: newStatus });
      }
      loadData(page, filter);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus konsultasi ini?')) return;
    try {
      await deleteConsultation(id);
      setSelected(null);
      loadData(page, filter);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const getBadgeClass = (status: string) => {
    switch (status) {
      case 'PENDING': return styles.badgeInProgress;
      case 'APPROVED': return styles.badgePublished;
      case 'REJECTED': return styles.badgeDraft;
      default: return '';
    }
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Konsultasi</h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>
            {total} pengajuan ditemukan
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filterTabs}>
        {[undefined, 'PENDING', 'APPROVED', 'REJECTED'].map((status) => (
          <button
            key={status || 'all'}
            className={`${styles.filterTab} ${filter === status ? styles.active : ''}`}
            onClick={() => setFilter(status)}
          >
            {status ? STATUS_MAP[status] : 'Semua'}
          </button>
        ))}
      </div>

      <div className={styles.tableCard}>
        {isLoading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Memuat...</div>
        ) : consultations.length === 0 ? (
          <div className={styles.emptyState}>
            <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            <h3>Belum Ada Pengajuan</h3>
            <p>Pengajuan konsultasi dari client akan muncul di sini</p>
          </div>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nama / WhatsApp</th>
                  <th>Layanan</th>
                  <th>Tanggal</th>
                  <th>Jam</th>
                  <th>Status</th>
                  <th style={{ width: 160 }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {consultations.map((item) => (
                  <tr key={item.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(item)}>
                    <td>
                      <div className={styles.tableTitle}>{item.fullName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.whatsapp}</div>
                    </td>
                    <td>{SERVICE_MAP[item.service] || item.service}</td>
                    <td>{new Date(item.consultDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td>{item.startTime} - {item.endTime}</td>
                    <td>
                      <span className={`${styles.badge} ${getBadgeClass(item.status)}`}>
                        {STATUS_MAP[item.status]}
                      </span>
                    </td>
                    <td>
                      <div className={styles.tableActions} onClick={(e) => e.stopPropagation()}>
                        {item.status === 'PENDING' && (
                          <>
                            <button
                              className={styles.actionBtn}
                              title="Setujui"
                              onClick={() => handleStatusChange(item.id, 'APPROVED')}
                              style={{ borderColor: '#a7f3d0' }}
                            >
                              <svg viewBox="0 0 24 24" style={{ stroke: '#059669' }}><polyline points="20 6 9 17 4 12" /></svg>
                            </button>
                            <button
                              className={`${styles.actionBtn} ${styles.delete}`}
                              title="Tolak"
                              onClick={() => handleStatusChange(item.id, 'REJECTED')}
                            >
                              <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </button>
                          </>
                        )}
                        <button
                          className={`${styles.actionBtn} ${styles.delete}`}
                          title="Hapus"
                          onClick={() => handleDelete(item.id)}
                        >
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
                  <button className={styles.paginationBtn} disabled={page <= 1} onClick={() => loadData(page - 1, filter)}>← Sebelumnya</button>
                  <button className={styles.paginationBtn} disabled={page >= totalPages} onClick={() => loadData(page + 1, filter)}>Selanjutnya →</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className={styles.modalOverlay} onClick={() => setSelected(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Detail Konsultasi</h2>
              <button className={styles.modalClose} onClick={() => setSelected(null)}>
                <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalField}>
                <label>Nama Lengkap</label>
                <p>{selected.fullName}</p>
              </div>
              <div className={styles.modalField}>
                <label>WhatsApp</label>
                <p>{selected.whatsapp}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.modalField}>
                  <label>Layanan</label>
                  <p>{SERVICE_MAP[selected.service] || selected.service}</p>
                </div>
                <div className={styles.modalField}>
                  <label>Tanggal Konsultasi</label>
                  <p>{new Date(selected.consultDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.modalField}>
                  <label>Jam Mulai</label>
                  <p>{selected.startTime}</p>
                </div>
                <div className={styles.modalField}>
                  <label>Jam Selesai</label>
                  <p>{selected.endTime}</p>
                </div>
              </div>
              <div className={styles.modalField}>
                <label>Tujuan / Keperluan</label>
                <p>{selected.description}</p>
              </div>
              <div className={styles.modalField}>
                <label>Status</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {['PENDING', 'APPROVED', 'REJECTED'].map((s) => (
                    <button
                      key={s}
                      className={`${styles.filterTab} ${selected.status === s ? styles.active : ''}`}
                      onClick={() => handleStatusChange(selected.id, s)}
                      style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                    >
                      {STATUS_MAP[s]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.btnSecondary}
                style={{ color: '#ef4444', borderColor: '#fecaca' }}
                onClick={() => handleDelete(selected.id)}
              >
                Hapus
              </button>
              <button className={styles.btnSecondary} onClick={() => setSelected(null)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
