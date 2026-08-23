import { DiaryNote } from '@/types/diaryNote';
import styles from './DiaryEntryCard.module.css';

interface DiaryEntryCardProps {
  note: DiaryNote;
  isSelected?: boolean;
  onClick: () => void;
}

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

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
        <time className={styles.date} dateTime={note.date}>
          {formatDate(note.date)}
        </time>
      </div>

      {note.emotions && note.emotions.length > 0 && (
        <ul className={styles.emotionsList}>
          {note.emotions.map((emotion) => (
            <li key={emotion._id} className={styles.emotionBadge}>
              {emotion.title}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};