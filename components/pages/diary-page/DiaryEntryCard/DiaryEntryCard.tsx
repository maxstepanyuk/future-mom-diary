import React from 'react';
import { DiaryNote } from '@/types/diary';
import styles from './DiaryEntryCard.module.css';

interface DiaryEntryCardProps {
  note: DiaryNote;
  isSelected?: boolean;
  onClick: () => void;
}

export const DiaryEntryCard: React.FC<DiaryEntryCardProps> = ({
  note,
  isSelected = false,
  onClick,
}) => {
  const cardClassName = `${styles.card} ${isSelected ? styles.selected : ''}`;

  return (
    <article className={cardClassName} onClick={onClick}>
      <div className={styles.header}>
        <h3 className={styles.title}>{note.title}</h3>
        <time className={styles.date}>{note.date}</time>
      </div>

      <ul className={styles.emotionsList}>
        {note.emotions?.map((emotion) => (
          <li key={emotion._id} className={styles.emotionBadge}>
            {emotion.title}
          </li>
        ))}
      </ul>
    </article>
  );
};