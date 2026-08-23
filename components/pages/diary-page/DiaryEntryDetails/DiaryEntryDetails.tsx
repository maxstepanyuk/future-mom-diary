import { DiaryNote } from '@/types/diaryNote';
import styles from './DiaryEntryDetails.module.css';

interface DiaryEntryDetailsProps {
  note: DiaryNote | null;
  onEdit?: (note: DiaryNote) => void;
  onDelete?: (id: string) => void;
}

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
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{note.title}</h2>
        <div className={styles.actions}>
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

      <time className={styles.date}>{note.date}</time>

      <p className={styles.description}>{note.description}</p>

      <ul className={styles.emotionsList}>
        {note.emotions?.map((emotion) => (
          <li key={emotion._id} className={styles.emotionBadge}>
            {emotion.name}
          </li>
        ))}
      </ul>
    </div>
  );
};