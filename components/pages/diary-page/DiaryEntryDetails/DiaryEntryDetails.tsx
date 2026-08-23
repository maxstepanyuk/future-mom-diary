import { DiaryNote } from '@/types/diaryNote';
import styles from './DiaryEntryDetails.module.css';

interface DiaryEntryDetailsProps {
  note: DiaryNote | null;
  onEdit?: (note: DiaryNote) => void;
  onDelete?: (id: string) => void;
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

export const DiaryEntryDetails = ({
  note,
  onEdit,
  onDelete,
}: DiaryEntryDetailsProps) => {
  if (!note) {
    return (
      <div className={styles.placeholder}>
        <p className={styles.placeholderText}>Наразі записи у щоденнику відсутні</p>
      </div>
    );
  }

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>{note.title}</h2>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => onEdit?.(note)}
            aria-label="Редагувати запис"
          >
            <svg width={24} height={24} className={styles.icon}>
              <use href="/sprite.svg#icon-edit_square" />
            </svg>
          </button>
        </div>

        <div className={styles.metaGroup}>
          <time className={styles.date} dateTime={note.date}>
            {formatDate(note.date)}
          </time>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => onDelete?.(note._id)}
            aria-label="Видалити запис"
          >
            <svg width={24} height={24} className={styles.icon}>
              <use href="/sprite.svg#icon-delete_forever" />
            </svg>
          </button>
        </div>
      </header>

      <p className={styles.description}>{note.description}</p>

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