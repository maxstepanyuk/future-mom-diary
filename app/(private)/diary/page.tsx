'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['diary'],
    queryFn: ({ pageParam = 1 }) =>
      getDiaryNotes({ page: pageParam, limit: 10, sortOrder: 'asc' }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  const rawNotes: DiaryNote[] =
    data?.pages.flatMap((page) => page.diaryNotes) ?? [];
  const notes: DiaryNote[] = Array.from(
    new Map(rawNotes.map((note) => [note._id, note])).values()
  );

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

  return (
    <div className={styles.pageContainer}>
      {error && <div className={styles.errorAlert}>Помилка завантаження</div>}

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
              onOpenAddModal={() => {
                setEditingNote(undefined);
                setIsModalOpen(true);
              }}
              onLoadMore={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </section>

          <section className={styles.detailsSection}>
            <DiaryEntryDetails
              note={selectedNote}
              onEdit={(note) => {
                setEditingNote(note);
                setIsModalOpen(true);
              }}
              onDelete={(id) => setDeletingNoteId(id)}
            />
          </section>
        </main>
      )}

      {isModalOpen && (
        <AddDiaryEntryModal
          diaryNote={editingNote}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {deletingNoteId && (
        <ConfirmationModal
          title="Ви впевнені, що хочете видалити цей запис?"
          confirmButtonText={deleteMutation.isPending ? 'Видалення...' : 'Видалити'}
          cancelButtonText="Скасувати"
          onConfirm={() => deleteMutation.mutate(deletingNoteId)}
          onCancel={() => setDeletingNoteId(null)}
        />
      )}
    </div>
  );
}