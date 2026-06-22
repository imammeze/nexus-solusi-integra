'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchArticles, fetchCaseStudies, fetchMessages } from '@/lib/api';
import type { Article, CaseStudy, ContactMessage } from '@/lib/api';
import styles from '../admin.module.css';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    articles: 0,
    caseStudies: 0,
    messages: 0,
    newMessages: 0,
  });
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [articlesRes, caseStudiesRes, messagesRes] = await Promise.all([
          fetchArticles(1, 5),
          fetchCaseStudies(1, 1),
          fetchMessages(1, 5),
        ]);

        setStats({
          articles: articlesRes.meta.total,
          caseStudies: caseStudiesRes.meta.total,
          messages: messagesRes.meta.total,
          newMessages: messagesRes.data.filter((m) => m.status === 'NEW').length,
        });

        setRecentArticles(articlesRes.data);
        setRecentMessages(messagesRes.data);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return <p style={{ color: '#94a3b8' }}>Memuat data dashboard...</p>;
  }

  return (
    <>
      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <div
              className={styles.statCardIcon}
              style={{ background: '#dbeafe', color: '#2563eb' }}
            >
              📝
            </div>
          </div>
          <div className={styles.statCardValue}>{stats.articles}</div>
          <div className={styles.statCardLabel}>Total Artikel</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <div
              className={styles.statCardIcon}
              style={{ background: '#ede9fe', color: '#7c3aed' }}
            >
              📊
            </div>
          </div>
          <div className={styles.statCardValue}>{stats.caseStudies}</div>
          <div className={styles.statCardLabel}>Studi Kasus</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <div
              className={styles.statCardIcon}
              style={{ background: '#d1fae5', color: '#059669' }}
            >
              ✉️
            </div>
          </div>
          <div className={styles.statCardValue}>{stats.messages}</div>
          <div className={styles.statCardLabel}>Total Pesan</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <div
              className={styles.statCardIcon}
              style={{ background: '#fef3c7', color: '#d97706' }}
            >
              🔔
            </div>
          </div>
          <div className={styles.statCardValue}>{stats.newMessages}</div>
          <div className={styles.statCardLabel}>Pesan Baru</div>
        </div>
      </div>

      {/* Recent Articles */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className={styles.tableCard}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Artikel Terbaru</h3>
            <Link href="/dashboard/articles" style={{ fontSize: '0.8125rem', color: '#c9a84c', textDecoration: 'none', fontWeight: 600 }}>Lihat Semua →</Link>
          </div>
          {recentArticles.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
              Belum ada artikel
            </div>
          ) : (
            recentArticles.map((article) => (
              <div key={article.id} style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.875rem' }}>{article.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.125rem' }}>{new Date(article.createdAt).toLocaleDateString('id-ID')}</div>
                </div>
                <span className={`${styles.badge} ${article.status === 'PUBLISHED' ? styles.badgePublished : article.status === 'DRAFT' ? styles.badgeDraft : styles.badgeArchived}`}>
                  {article.status}
                </span>
              </div>
            ))
          )}
        </div>

        <div className={styles.tableCard}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Pesan Terbaru</h3>
            <Link href="/dashboard/messages" style={{ fontSize: '0.8125rem', color: '#c9a84c', textDecoration: 'none', fontWeight: 600 }}>Lihat Semua →</Link>
          </div>
          {recentMessages.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
              Belum ada pesan
            </div>
          ) : (
            recentMessages.map((msg) => (
              <div key={msg.id} style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.875rem' }}>{msg.fullName}</div>
                  <span className={`${styles.badge} ${msg.status === 'NEW' ? styles.badgeNew : msg.status === 'IN_PROGRESS' ? styles.badgeInProgress : styles.badgeResolved}`}>
                    {msg.status === 'IN_PROGRESS' ? 'PROSES' : msg.status === 'RESOLVED' ? 'SELESAI' : 'BARU'}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>{msg.companyName} • {msg.email}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
