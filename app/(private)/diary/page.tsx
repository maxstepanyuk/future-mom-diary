'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { DiaryList } from '@/components/pages/diary-page/DiaryList';
import { DiaryEntryDetails } from '@/components/pages/diary-page/DiaryEntryDetails';
import AddDiaryEntryModal from '@/components/pages/common/AddDiaryEntryModal/AddDiaryEntryModal';
import { DiaryNote } from '@/types/diaryNote';
import { getDiaryNotes } from '@/lib/api/clientApi';
import styles from './page.module.css';

export default function DiaryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeIdFromQuery = searchParams.get('entryId');

  // Стан для модального вікна створення запису
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['diary'],
    queryFn: () => getDiaryNotes({ page: 1, limit: 10, sortOrder: 'asc' }),
  });

  const notes: DiaryNote[] = data?.tasks ?? [];

  const selectedNote: DiaryNote | null =
    notes.find((n) => n._id === activeIdFromQuery) || notes[0] || null;

  const handleSelectNote = (note: DiaryNote) => {
    if (window.innerWidth < 1440) {
      router.push(`/diary/${note._id}`);
    } else {
      router.replace(`/diary?entryId=${note._id}`, { scroll: false });
    }
  };

  const errorMessage = error instanceof Error ? error.message : 'Сталася помилка при завантаженні';

  return (
    <div className={styles.pageContainer}>
      {error && <div className={styles.errorAlert}>{errorMessage}</div>}

      {isLoading ? (
        <div className={styles.loader}>Завантаження нотаток...</div>
      ) : (
        <main className={styles.layout}>
          <section className={styles.listSection}>
            <DiaryList
              notes={notes}
              selectedNoteId={selectedNote?._id}
              onSelectNote={handleSelectNote}
              onOpenAddModal={() => setIsModalOpen(true)}
            />
          </section>

          <section className={styles.detailsSection}>
            <DiaryEntryDetails note={selectedNote} />
          </section>
        </main>
      )}

      {/* Модалка створення запису з гілки main */}
      {isModalOpen && (
        <AddDiaryEntryModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}