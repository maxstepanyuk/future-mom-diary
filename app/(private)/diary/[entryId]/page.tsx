'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { DiaryEntryDetails } from '@/components/pages/diary-page/DiaryEntryDetails';
import AddDiaryEntryModal from '@/components/pages/common/AddDiaryEntryModal/AddDiaryEntryModal';
import ConfirmationModal from '@/components/pages/common/ConfirmationModal/ConfirmationModal'; 

import { getDiaryNotes, deleteDiaryNote } from '@/lib/api/clientApi';
import { DiaryNote } from '@/types/diaryNote';
import styles from './page.module.css';

export default function DiaryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const entryId = params.entryId as string;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const infiniteData = queryClient.getQueryData<{ pages: { diaryNotes: DiaryNote[] }[] }>(['diary']);
  const initialNote = infiniteData?.pages
    .flatMap((page) => page.diaryNotes)
    .find((n) => n._id === entryId);

  const { data: selectedNote, isLoading } = useQuery({
    queryKey: ['diaryNote', entryId],
    queryFn: async () => {
      const res = await getDiaryNotes({ page: 1, limit: 100, sortOrder: 'asc' });
      return res.diaryNotes.find((n) => n._id === entryId) || null;
    },
    initialData: initialNote, 
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteDiaryNote(id),
    onSuccess: () => {
      toast.success('Запис успішно видалено');
      queryClient.invalidateQueries({ queryKey: ['diary'] });
      queryClient.removeQueries({ queryKey: ['diaryNote', entryId] });
      setIsDeleteModalOpen(false);
      router.push('/diary'); 
    },
    onError: () => {
      toast.error('Не вдалося видалити запис');
    },
  });

  if (isLoading && !selectedNote) {
    return <div className={styles.loader}>Завантаження нотатки...</div>;
  }

  if (!selectedNote) {
    return (
      <div className={styles.errorContainer}>
        <p>Запис не знайдено</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <DiaryEntryDetails
        note={selectedNote}
        onEdit={() => setIsEditModalOpen(true)}
        onDelete={() => setIsDeleteModalOpen(true)}
      />

      {/* Модалка редагування */}
      {isEditModalOpen && (
        <AddDiaryEntryModal
          diaryNote={selectedNote}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {/* Модалка видалення */}
      {isDeleteModalOpen && (
        <ConfirmationModal
          title="Ви впевнені, що хочете видалити цей запис?"
          confirmButtonText={deleteMutation.isPending ? 'Видалення...' : 'Видалити'}
          cancelButtonText="Скасувати"
          onConfirm={() => deleteMutation.mutate(selectedNote._id)}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}
