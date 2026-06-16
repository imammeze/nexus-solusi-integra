'use client';

import React from 'react';
import styles from './ClientMarquee.module.css';

// Data mock up klien
const clients = [
  { id: 1, name: 'TechCorp', color: '#0ea5e9' },
  { id: 2, name: 'BuildMaster', color: '#f59e0b' },
  { id: 3, name: 'FinServe', color: '#10b981' },
  { id: 4, name: 'HealthPlus', color: '#ef4444' },
  { id: 5, name: 'EduGlobal', color: '#8b5cf6' },
  { id: 6, name: 'AgriGrow', color: '#84cc16' },
  { id: 7, name: 'RetailNet', color: '#f43f5e' },
];

export function ClientMarquee() {
  // Komponen untuk merepresentasikan logo placeholder yang terlihat profesional
  const LogoPlaceholder = ({ name, color }: { name: string, color: string }) => (
    <div className={styles.logoItem}>
      <svg
        className={styles.logoSvg}
        viewBox="0 0 200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" y="10" rx="8" fill={color} />
        <circle cx="30" cy="30" r="8" fill="#ffffff" />
        <text
          x="55"
          y="38"
          fill="currentColor"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fontSize="24"
        >
          {name}
        </text>
      </svg>
    </div>
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Telah Dipercaya Oleh Perusahaan Terkemuka</h2>
      <div className={styles.marqueeWrapper}>
        {/* Kita render dua track identical agar animasinya bisa loop tanpa jeda */}
        <div className={styles.marqueeTrack}>
          {clients.map((client) => (
            <LogoPlaceholder key={client.id} name={client.name} color={client.color} />
          ))}
        </div>
        <div className={styles.marqueeTrack} aria-hidden="true">
          {clients.map((client) => (
            <LogoPlaceholder key={`dup-${client.id}`} name={client.name} color={client.color} />
          ))}
        </div>
      </div>
    </section>
  );
}
