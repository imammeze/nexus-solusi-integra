'use client';

import { useEffect, useState } from 'react';
import { fetchMessages, updateMessageStatus, deleteMessage } from '@/lib/api';
import type { ContactMessage } from '@/lib/api';
import styles from '../../admin.module.css';

const STATUS_MAP: Record<string, string> = {
  NEW: 'BARU',
  IN_PROGRESS: 'PROSES',
  RESOLVED: 'SELESAI',
};

const SERVICE_MAP: Record<string, string> = {
  FINANCE: 'Keuangan',
  MANAGEMENT: 'Manajemen',
  IT: 'Teknologi Informasi',
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const loadData = async (p: number, status?: string) => {
    setIsLoading(true);
    try {
      const res = await fetchMessages(p, 10, status);
      setMessages(res.data);
      setTotalPages(res.meta.totalPages);
      setTotal(res.meta.total);
      setPage(p);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(1, filter); }, [filter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateMessageStatus(id, newStatus);
      if (selected && selected.id === id) {
        setSelected({ ...selected, status: newStatus });
      }
      loadData(page, filter);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus pesan ini?')) return;
    try {
      await deleteMessage(id);
      setSelected(null);
      loadData(page, filter);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Pesan Masuk</h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>{total} pesan ditemukan</p>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filterTabs}>
        {[undefined, 'NEW', 'IN_PROGRESS', 'RESOLVED'].map((status) => (
          <button
            key={status || 'all'}
            className={`${styles.filterTab} ${filter === status ? styles.active : ''}`}
            onClick={() => setFilter(status)}
          >
            {status ? STATUS_MAP[status] : 'Semua'}
          </button>
        ))}
      </div>

      <div className={styles.messageCard}>
        {isLoading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Memuat...</div>
        ) : messages.length === 0 ? (
          <div className={styles.emptyState}>
            <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            <h3>Belum Ada Pesan</h3>
            <p>Pesan dari formulir kontak akan muncul di sini</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={styles.messageItem}
              onClick={() => setSelected(msg)}
            >
              <div>
                <div className={styles.messageMeta}>
                  <span className={styles.messageFrom}>{msg.fullName}</span>
                  <span className={styles.messageCompany}>{msg.companyName}</span>
                </div>
                <div className={styles.messagePreview}>{msg.description}</div>
              </div>
              <div className={styles.messageRight}>
                <span className={`${styles.badge} ${msg.status === 'NEW' ? styles.badgeNew : msg.status === 'IN_PROGRESS' ? styles.badgeInProgress : styles.badgeResolved}`}>
                  {STATUS_MAP[msg.status]}
                </span>
                <span className={styles.messageDate}>
                  {new Date(msg.createdAt).toLocaleDateString('id-ID')}
                </span>
              </div>
            </div>
          ))
        )}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <span className={styles.paginationInfo}>Halaman {page} dari {totalPages}</span>
            <div className={styles.paginationButtons}>
              <button className={styles.paginationBtn} disabled={page <= 1} onClick={() => loadData(page - 1, filter)}>← Sebelumnya</button>
              <button className={styles.paginationBtn} disabled={page >= totalPages} onClick={() => loadData(page + 1, filter)}>Selanjutnya →</button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className={styles.modalOverlay} onClick={() => setSelected(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Detail Pesan</h2>
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
                <label>Perusahaan</label>
                <p>{selected.companyName}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.modalField}>
                  <label>Email</label>
                  <p>{selected.email}</p>
                </div>
                <div className={styles.modalField}>
                  <label>WhatsApp</label>
                  <p>{selected.whatsapp}</p>
                </div>
              </div>
              <div className={styles.modalField}>
                <label>Layanan yang Diminati</label>
                <p>{SERVICE_MAP[selected.service] || selected.service}</p>
              </div>
              <div className={styles.modalField}>
                <label>Deskripsi</label>
                <p>{selected.description}</p>
              </div>
              <div className={styles.modalField}>
                <label>Status</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {['NEW', 'IN_PROGRESS', 'RESOLVED'].map((s) => (
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
