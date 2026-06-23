'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchConsultationsByDate } from '@/lib/api';
import type { Consultation } from '@/lib/api';
import styles from './BookingCalendar.module.css';

const DAY_NAMES = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

const SERVICE_MAP: Record<string, string> = {
  FINANCE: 'Konsultan Keuangan',
  MANAGEMENT: 'Manajemen Bisnis',
  IT: 'Teknologi Informasi',
};

interface BookingCalendarProps {
  onBookingClick: (date: Date) => void;
}

export function BookingCalendar({ onBookingClick }: BookingCalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [schedules, setSchedules] = useState<Consultation[]>([]);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(false);

  // Format date as YYYY-MM-DD
  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const loadSchedules = useCallback(async (date: Date) => {
    setIsLoadingSchedules(true);
    try {
      const data = await fetchConsultationsByDate(formatDate(date));
      setSchedules(data);
    } catch {
      setSchedules([]);
    } finally {
      setIsLoadingSchedules(false);
    }
  }, []);

  useEffect(() => {
    loadSchedules(selectedDate);
  }, [selectedDate, loadSchedules]);

  // Calendar helpers
  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    // Don't allow selecting past dates
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (date < todayStart) return;
    setSelectedDate(date);
  };

  const isToday = (day: number) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };

  const isSelected = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  // Format selected date for display
  const selectedDateStr = selectedDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className={styles.bookingContainer}>
      {/* Calendar */}
      <div className={styles.calendarCard}>
        <div className={styles.calendarHeader}>
          <span className={styles.calendarTitle}>
            📅 {MONTH_NAMES[currentMonth]} {currentYear}
          </span>
          <div className={styles.calendarNav}>
            <button className={styles.calendarNavBtn} onClick={prevMonth} aria-label="Bulan sebelumnya">‹</button>
            <button className={styles.calendarNavBtn} onClick={nextMonth} aria-label="Bulan selanjutnya">›</button>
          </div>
        </div>

        <div className={styles.calendarGrid}>
          {DAY_NAMES.map((name) => (
            <div key={name} className={styles.calendarDayName}>{name}</div>
          ))}

          {/* Empty cells before first day */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className={`${styles.calendarDay} ${styles.calendarDayEmpty}`} />
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayClasses = [
              styles.calendarDay,
              isToday(day) ? styles.calendarDayToday : '',
              isSelected(day) ? styles.calendarDaySelected : '',
              isPast(day) ? styles.calendarDayPast : '',
            ].filter(Boolean).join(' ');

            return (
              <button
                key={day}
                className={dayClasses}
                onClick={() => handleDayClick(day)}
                disabled={isPast(day)}
              >
                {day}
              </button>
            );
          })}
        </div>

        <button
          className={styles.bookingBtn}
          onClick={() => onBookingClick(selectedDate)}
        >
          + Ajukan Konsultasi
        </button>
      </div>

      {/* Schedule List */}
      <div className={styles.scheduleSection}>
        <div className={styles.scheduleHeader}>
          <h3 className={styles.scheduleTitle}>Jadwal pada {selectedDateStr}</h3>
          <span className={styles.scheduleBadge}>Disetujui</span>
        </div>

        {isLoadingSchedules ? (
          <div className={styles.loading}>Memuat jadwal...</div>
        ) : schedules.length > 0 ? (
          <div className={styles.scheduleList}>
            {schedules.map((item) => (
              <div key={item.id} className={styles.scheduleItem}>
                <div className={styles.scheduleTime}>
                  <span>{item.startTime}</span>
                  <span className={styles.scheduleTimeSeparator}>s/d</span>
                  <span>{item.endTime}</span>
                </div>
                <div className={styles.scheduleInfo}>
                  <div className={styles.scheduleName}>{item.fullName}</div>
                  <div className={styles.scheduleService}>{SERVICE_MAP[item.service] || item.service}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.scheduleEmpty}>
            <div className={styles.scheduleEmptyIcon}>📋</div>
            <h4>Belum ada jadwal yang disetujui pada tanggal ini.</h4>
            <p>Jadwal masih kosong, silakan ajukan konsultasi!</p>
          </div>
        )}
      </div>
    </div>
  );
}
