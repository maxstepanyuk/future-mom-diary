'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { DiaryEntryDetails } from '@/components/pages/diary-page/DiaryEntryDetails';
import { getDiaryNotes } from '@/lib/api/clientApi';
import { DiaryNote } from '@/types/diaryNote';
import styles from './page.module.css';

export default function DiaryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const entryId = params.entryId as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ['diary'],
    queryFn: () => getDiaryNotes({ page: 1, limit: 10, sortOrder: 'asc' }),
  });

  const notes: DiaryNote[] = data?.diaryNotes ?? [];
  const selectedNote = notes.find((n) => n._id === entryId) || null;

  if (isLoading) {
    return <div className={styles.loader}>Завантаження нотатки...</div>;
  }

  if (error || !selectedNote) {
    return (
      <div className={styles.errorContainer}>
        <p>Запис не знайдено</p>
        <button type="button" onClick={() => router.push('/diary')}>
          Повернутися до списку
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button 
        type="button" 
        className={styles.backButton} 
        onClick={() => router.push('/diary')}
      >
        ← Назад до щоденника
      </button>

      <DiaryEntryDetails note={selectedNote} />
    </div>
  );
}