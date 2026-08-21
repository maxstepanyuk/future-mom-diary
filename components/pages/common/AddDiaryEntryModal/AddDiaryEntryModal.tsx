import css from "./AddDiaryEntryModal.module.css";

export default function AddDiaryEntryModal() {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button
          className={css.closeButton}
          type="button"
          aria-label="Закрити модальне вікно"
        >
          <svg className={css.closeIcon}>
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        <h2 id="diary-modal-title" className={css.title}>
          Новий запис
        </h2>

        <form className={css.form}>
          <div className={css.field}>
            <label className={css.label} htmlFor="diary-title">
              Заголовок
            </label>

            <input
              className={css.input}
              id="diary-title"
              name="title"
              type="text"
              placeholder="Введіть заголовок запису"
            />
          </div>

          <div className={css.field}>
            <span className={css.label} id="categories-label">
              Категорії
            </span>

            <div
              className={css.categories}
              role="button"
              tabIndex={0}
              aria-labelledby="categories-label"
            >
              <div className={css.tags}>
                <span className={css.tag}>Натхнення</span>
                <span className={css.tag}>Вдячність</span>
                <span className={css.tag}>Тривога</span>
              </div>

              <svg className={css.arrowIcon}>
                <use href="/sprite.svg#icon-keyboard_arrow_down" />
              </svg>
            </div>
          </div>

          <div className={css.field}>
            <label className={css.label} htmlFor="diary-description">
              Запис
            </label>

            <textarea
              className={css.textarea}
              id="diary-description"
              name="description"
              placeholder="Запишіть, як ви себе відчуваєте"
            />
          </div>

          <button className={css.submitButton} type="submit">
            Зберегти
          </button>
        </form>
      </div>
    </div>
  );
}
