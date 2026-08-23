'use client';

import { DiaryNote } from '@/types/diaryNote';
import { DiaryEntryCard } from '../DiaryEntryCard/DiaryEntryCard';
import styles from './DiaryList.module.css';

interface DiaryListProps {
  notes: DiaryNote[];
  selectedNoteId?: string;
  onSelectNote: (note: DiaryNote) => void;
  onOpenAddModal?: () => void;
}

export const DiaryList = ({
  notes,
  selectedNoteId,
  onSelectNote,
  onOpenAddModal,
}: DiaryListProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.heading}>Ваші записи</h2>

        <div className={styles.createContainer}>
          <button
            type="button"
            className={styles.addBtn}
            onClick={onOpenAddModal}
            aria-label="Додати новий запис"
          >
            <span className={styles.addText}>Новий запис</span>
            <svg
              width={24}
              height={24}
              className={styles.iconPlus}
              aria-hidden="true"
            >
              <use href="/sprite.svg#icon-add_circle" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.list}>
        {notes.length === 0 ? (
          <p className={styles.emptyText}>Наразі записи у щоденнику відсутні</p>
        ) : (
          notes.map((note) => (
            <DiaryEntryCard
              key={note._id}
              note={note}
              isSelected={note._id === selectedNoteId}
              onClick={() => onSelectNote(note)}
            />
          ))
        )}
      </div>
    </div>
  );
};