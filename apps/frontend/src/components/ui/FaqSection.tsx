'use client';

import React, { useState } from 'react';
import styles from './FaqSection.module.css';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: '1',
    question: 'Layanan apa saja yang ditawarkan oleh Nexus Solusi Integra?',
    answer: 'Kami menawarkan tiga pilar utama: Konsultan Keuangan, Manajemen Bisnis, dan Teknologi Informasi (IT) yang dapat disesuaikan dengan kebutuhan skala UMKM hingga Enterprise.'
  },
  {
    id: '2',
    question: 'Apakah Nexus Solusi Integra melayani konsultasi secara online?',
    answer: 'Ya, kami melayani sesi konsultasi baik secara online (melalui Zoom/Google Meet) maupun offline (kunjungan langsung ke kantor Anda) sesuai dengan preferensi dan kebutuhan proyek.'
  },
  {
    id: '3',
    question: 'Data perusahaan saya aman di Nexus Solusi Integra?',
    answer: 'Sangat aman. Kami menerapkan standar keamanan dan kerahasiaan data yang sangat ketat, serta selalu menandatangani Non-Disclosure Agreement (NDA) sebelum proyek atau diskusi mendalam dimulai.'
  },
  {
    id: '4',
    question: 'Apakah bisa integrasi dengan sistem internal perusahaan?',
    answer: 'Tentu bisa. Layanan Teknologi Informasi kami mencakup integrasi sistem, pengembangan software kustom (ERP, CRM), hingga migrasi data dari sistem lama (legacy) ke sistem cloud yang lebih modern.'
  },
  {
    id: '5',
    question: 'Bagaimana cara memulai kerjasama dengan Nexus Solusi Integra?',
    answer: 'Anda dapat memulai dengan menjadwalkan sesi konsultasi gratis melalui halaman Kontak. Tim representatif kami akan segera menghubungi Anda untuk mengatur jadwal diskusi awal.'
  },
  {
    id: '6',
    question: 'Berapa biaya untuk layanan konsultasi?',
    answer: 'Biaya layanan kami sangat bervariasi bergantung pada kompleksitas proyek, durasi, dan ruang lingkup masalah. Kami akan memberikan proposal penawaran (quotation) yang transparan setelah sesi konsultasi awal.'
  }
];

export function FaqSection() {
  const [activeId, setActiveId] = useState<string>(faqData[0].id);

  const activeItem = faqData.find((item) => item.id === activeId) || faqData[0];

  return (
    <section className={`section ${styles.faqSection}`} id="faq-section">
      <div className="container">
        <div className={styles.faqHeader}>
          <h2 className={styles.faqTitle}>Tanya Jawab Layanan Nexus Solusi Integra</h2>
          <p className={styles.faqSubtitle}>Pertanyaan umum seputar layanan Nexus Solusi Integra</p>
        </div>

        <div className={styles.faqContainer}>
          {/* Sidebar List */}
          <div className={styles.faqSidebar}>
            <div className={styles.faqSidebarTitle}>FAQ</div>
            <ul className={styles.faqList}>
              {faqData.map((item) => (
                <li
                  key={item.id}
                  className={`${styles.faqItem} ${activeId === item.id ? styles.active : ''}`}
                  onClick={() => setActiveId(item.id)}
                >
                  <div className={styles.faqIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <span className={styles.faqQuestion}>{item.question}</span>
                </li>
              ))}
            </ul>
            <div className={styles.scrollHint}>
              &darr; Scroll untuk lihat lebih banyak
            </div>
          </div>

          {/* Content Area */}
          <div className={styles.faqContent}>
            <h3 className={styles.activeQuestion}>{activeItem.question}</h3>
            <p className={styles.activeAnswer}>{activeItem.answer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
