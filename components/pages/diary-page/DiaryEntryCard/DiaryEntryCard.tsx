import { DiaryNote } from '@/types/diaryNote';
import styles from './DiaryEntryCard.module.css';

interface DiaryEntryCardProps {
  note: DiaryNote;
  isSelected?: boolean;
  onClick: () => void;
}

export const DiaryEntryCard = ({
  note,
  isSelected = false,
  onClick,
}: DiaryEntryCardProps) => {
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
            {emotion.name}
          </li>
        ))}
      </ul>
    </article>
  );
};