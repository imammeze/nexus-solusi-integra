'use client';

import { useState, useCallback } from 'react';
import { BookingCalendar } from '@/components/ui/BookingCalendar';
import { BookingFormModal } from '@/components/ui/BookingFormModal';

export function BookingSection() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [refreshKey, setRefreshKey] = useState(0);

  const handleBookingClick = useCallback((date: Date) => {
    setSelectedDate(date);
    setShowModal(true);
  }, []);

  const handleSuccess = useCallback(() => {
    setShowModal(false);
    // Force calendar to reload schedules
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <>
      <BookingCalendar key={refreshKey} onBookingClick={handleBookingClick} />

      {showModal && (
        <BookingFormModal
          selectedDate={selectedDate}
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}
