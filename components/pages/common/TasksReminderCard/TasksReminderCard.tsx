'use client';
import { useAuthStore } from '@/lib/store/authStore';
import css from './TasksReminderCard.module.css';
import { useState } from 'react';

export default function TaskReminderCard() {
  const user = useAuthStore(store => store.user);

  return (
    <>
      <div className={css.wrapper}>
        <div className={css.headingWrapper}>
          <h3 className={css.heading}>Важливі завдання</h3>
          <button className={css.addButton} aria-label="Додати завдання">
            <svg className={css.iconButton} width={24} height={24}>
              <use href="/sprite.svg#icon-add_circle" aria-hidden="true"></use>
            </svg>
          </button>
        </div>

        <div className={css.taskContentWrapper}>
          <div className={css.taskContent}>
            <div className={css.taskDefaultContent}>
              <div className={css.taskDefaultContentTextWrapper}>
                <p className={css.taskDefaultContentTextBold}>
                  Наразі немає жодних завдань
                </p>
                <p className={css.taskDefaultContentText}>
                  Створіть мершій нове завдання!
                </p>
              </div>
              <button className={css.addButtonDefault}>
                Створити завдання
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
