'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './page.module.css';
import { DiaryEntryDetails } from '@/components/pages/diary-page/DiaryEntryDetails/DiaryEntryDetails';
import { DiaryNote } from '@/types/diary';
import { getDiaryNotes } from '@/services/diaryApi';

export default function DiaryEntryPage() {
  const params = useParams();
  const router = useRouter();
  const entryId = params.entryId as string;

  const [note, setNote] = useState<DiaryNote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNote() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getDiaryNotes({ page: 1, limit: 100 });
        const foundNote = data.tasks.find((item) => item._id === entryId);

        if (foundNote) {
          setNote(foundNote);
        } else {
          setError('Запис не знайдено');
        }
      } catch (err) {
  const errorMessage = err instanceof Error ? err.message : 'Не вдалося завантажити детальну інформацію';
  setError(errorMessage);
} finally {
        setIsLoading(false);
      }
    }

    if (entryId) {
      loadNote();
    }
  }, [entryId]);

  return (
    <main className={styles.wrapper}>
      <button 
        type="button" 
        className={styles.backBtn} 
        onClick={() => router.back()}
      >
        ← Назад до списку
      </button>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {isLoading ? (
        <div className={styles.loading}>Завантаження...</div>
      ) : (
        <div className={styles.detailsContainer}>
          <DiaryEntryDetails
            note={note}
            onEdit={(editedNote) => {
              // Відкриває модальне вікно для редагування (інший розробник)
            }}
            onDelete={(id) => {
              // Відкриває модальне вікно ConfirmationModal (інший розробник)
            }}
          />
        </div>
      )}
    </main>
  );
}