'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import GreetingBlock from '@/components/pages/common/GreetingBlock/GreetingBlock';
import { DiaryList } from '@/components/pages/diary-page/DiaryList';
import { DiaryEntryDetails } from '@/components/pages/diary-page/DiaryEntryDetails';
import AddDiaryEntryModal from '@/components/pages/common/AddDiaryEntryModal/AddDiaryEntryModal';
import ConfirmationModal from '@/components/pages/common/ConfirmationModal/ConfirmationModal'; 

import { DiaryNote } from '@/types/diaryNote';
import { getDiaryNotes, deleteDiaryNote } from '@/lib/api/clientApi';
import styles from './page.module.css';

export default function DiaryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const activeIdFromQuery = searchParams.get('entryId');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<DiaryNote | undefined>(undefined);
  
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['diary'],
    queryFn: () => getDiaryNotes({ page: 1, limit: 10, sortOrder: 'asc' }),
  });

  const notes: DiaryNote[] = data?.diaryNotes ?? [];

  const selectedNote: DiaryNote | null =
    notes.find((n) => n._id === activeIdFromQuery) || notes[0] || null;

const deleteMutation = useMutation({
  mutationFn: (id: string) => deleteDiaryNote(id),
  onSuccess: () => {
    toast.success('Запис успішно видалено');
    queryClient.invalidateQueries({ queryKey: ['diary'] });
    setDeletingNoteId(null);
    router.replace('/diary', { scroll: false });
  },
  onError: () => {
    toast.error('Не вдалося видалити запис');
  },
});

  const handleSelectNote = (note: DiaryNote) => {
    if (window.innerWidth < 1440) {
      router.push(`/diary/${note._id}`);
    } else {
      router.replace(`/diary?entryId=${note._id}`, { scroll: false });
    }
  };

  const handleOpenAddModal = () => {
    setEditingNote(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (noteToEdit?: DiaryNote) => {
    setEditingNote(noteToEdit || selectedNote || undefined);
    setIsModalOpen(true);
  };

  // Підтвердження видалення
  const handleConfirmDelete = () => {
    if (deletingNoteId) {
      deleteMutation.mutate(deletingNoteId);
    }
  };

  const errorMessage = error instanceof Error ? error.message : 'Сталася помилка при завантаженні';

  return (
    <div className={styles.pageContainer}>
      {error && <div className={styles.errorAlert}>{errorMessage}</div>}

      <GreetingBlock />

      {isLoading ? (
        <div className={styles.loader}>Завантаження нотаток...</div>
      ) : (
        <main className={styles.layout}>
          <section className={styles.listSection}>
            <DiaryList
              notes={notes}
              selectedNoteId={selectedNote?._id}
              onSelectNote={handleSelectNote}
              onOpenAddModal={handleOpenAddModal}
            />
          </section>

          <section className={styles.detailsSection}>
            <DiaryEntryDetails
              note={selectedNote}
              onEdit={handleOpenEditModal}
              onDelete={(id) => setDeletingNoteId(id)}
            />
          </section>
        </main>
      )}

      {/* Модалка створення/редагування */}
      {isModalOpen && (
        <AddDiaryEntryModal
          diaryNote={editingNote}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Модалка підтвердження видалення */}
      {deletingNoteId && (
        <ConfirmationModal
          title="Ви впевнені, що хочете видалити цей запис?"
          confirmButtonText={deleteMutation.isPending ? "Видалення..." : "Видалити"}
          cancelButtonText="Скасувати"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingNoteId(null)}
        />
      )}
    </div>
  );
}