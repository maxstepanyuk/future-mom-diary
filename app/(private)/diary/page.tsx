'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DiaryList } from '@/components/pages/diary-page/DiaryList';
import { DiaryEntryDetails } from '@/components/pages/diary-page/DiaryEntryDetails';
import { DiaryNote } from '@/types/diaryNote';
import { getDiaryNotes } from '@/lib/api/clientApi';
import styles from './page.module.css';

export default function DiaryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeIdFromQuery = searchParams.get('entryId');

  const [notes, setNotes] = useState<DiaryNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<DiaryNote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadNotes() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getDiaryNotes({ page: 1, limit: 10, sortOrder: 'asc' });

        if (!isMounted) return;

        const fetchedNotes = data.tasks || [];
        setNotes(fetchedNotes);

        if (fetchedNotes.length > 0) {
          const found = activeIdFromQuery
            ? fetchedNotes.find((n) => n._id === activeIdFromQuery)
            : fetchedNotes[0];

          setSelectedNote(found || fetchedNotes[0]);
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Сталася помилка';
          setError(message);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadNotes();

    return () => {
      isMounted = false;
    };
  }, [activeIdFromQuery]);

  const handleSelectNote = (note: DiaryNote) => {
    setSelectedNote(note);

    if (window.innerWidth < 1440) {
      router.push(`/diary/${note._id}`);
    } else {
      router.replace(`/diary?entryId=${note._id}`, { scroll: false });
    }
  };

  return (
    <div className={styles.pageContainer}>
      {error && <div className={styles.errorAlert}>{error}</div>}

      {isLoading ? (
        <div className={styles.loader}>Завантаження нотаток...</div>
      ) : (
        <main className={styles.layout}>
          <section className={styles.listSection}>
            <DiaryList
              notes={notes}
              selectedNoteId={selectedNote?._id}
              onSelectNote={handleSelectNote}
            />
          </section>

          <section className={styles.detailsSection}>
            <DiaryEntryDetails note={selectedNote} />
          </section>
        </main>
      )}
    </div>
  );
}