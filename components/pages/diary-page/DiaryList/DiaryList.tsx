'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { DiaryNote } from '@/types/diaryNote';
import { DiaryEntryCard } from '../DiaryEntryCard/DiaryEntryCard';
import styles from './DiaryList.module.css';

interface DiaryListProps {
  notes: DiaryNote[];
  selectedNoteId?: string;
  onSelectNote: (note: DiaryNote) => void;
  onOpenAddModal?: () => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export const DiaryList = ({
  notes,
  selectedNoteId,
  onSelectNote,
  onOpenAddModal,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: DiaryListProps) => {
  const [scrollRoot, setScrollRoot] = useState<HTMLUListElement | null>(null);
  const isLockedRef = useRef(false);

  const setListRef = useCallback((node: HTMLUListElement | null) => {
    if (node !== null) {
      if (window.innerWidth >= 1440) {
        setScrollRoot(node);
      } else {
        setScrollRoot(null);
      }
    }
  }, []);

  const { ref: triggerRef, inView } = useInView({
    root: scrollRoot, 
    rootMargin: '100px', 
    threshold: 0.1,
  });

  useEffect(() => {
    if (
      inView &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isLockedRef.current &&
      onLoadMore
    ) {
      isLockedRef.current = true;
      onLoadMore();

      setTimeout(() => {
        isLockedRef.current = false;
      }, 800);
    }
  }, [inView, hasNextPage, isFetchingNextPage, onLoadMore]);

  return (
    <section className={styles.container} aria-label="Список записів">
      <header className={styles.title}>
        <h2 className={styles.heading}>Ваші записи</h2>

        <div className={styles.createContainer}>
          <button
            type="button"
            className={styles.addBtn}
            onClick={onOpenAddModal}
            aria-label="Додати новий запис"
          >
            <span className={styles.addText}>Новий запис</span>
            <svg width={24} height={24} className={styles.iconPlus} aria-hidden="true">
              <use href="/sprite.svg#icon-add_circle" />
            </svg>
          </button>
        </div>
      </header>

      {notes.length === 0 ? (
        <p className={styles.emptyText}>Наразі записи у щоденнику відсутні</p>
      ) : (
        <ul ref={setListRef} className={styles.list}>
          {notes.map((note, index) => (
            <li key={`${note._id}-${index}`}>
              <DiaryEntryCard
                note={note}
                isSelected={note._id === selectedNoteId}
                onClick={() => onSelectNote(note)}
              />
            </li>
          ))}

          <li ref={triggerRef} className={styles.triggerItem}>
            {isFetchingNextPage && (
              <p className={styles.loadingText}>Завантаження ще 10 записів...</p>
            )}
          </li>
        </ul>
      )}
    </section>
  );
};