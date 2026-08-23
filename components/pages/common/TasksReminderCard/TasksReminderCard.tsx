'use client';
import { useAuthStore } from '@/lib/store/authStore';
import css from './TasksReminderCard.module.css';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getTasks } from '@/lib/api/clientApi';
import TaskList from './TaskList/TaskList';
import { useRouter } from 'next/navigation';
import Modal from '@/components/common/Modal/Modal';
import AddTaskModal from '../AddTaskModal/AddTaskModal';

export default function TaskReminderCard() {
  const isAuthenticated = useAuthStore(store => store.isAuthenticated);
  //   console.log(isAuthenticated);

  const [currentPage, setCurrentPage] = useState(1);
  const [isModal, setIsModal] = useState(false);

  const {
    data: tasksData,
    isError,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['tasks', currentPage],
    queryFn: () => {
      return getTasks({ page: 1, perPage: 10, sortOrder: 'desc' });
    },
    enabled: isAuthenticated,
    placeholderData: keepPreviousData,
    // refetchOnMount: false,
  });

  const router = useRouter();

  function addbuttonClickHandler() {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
    setIsModal(true);
  }

  function modalCloseHandler() {
    setIsModal(false);
  }

  return (
    <>
      {isModal && (
        <Modal onClose={modalCloseHandler}>
          <AddTaskModal />
        </Modal>
      )}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Some Error...</p>}
      <div className={css.wrapper}>
        <div className={css.headingWrapper}>
          <h3 className={css.heading}>Важливі завдання</h3>
          <button
            className={css.addButton}
            type="button"
            onClick={addbuttonClickHandler}
            aria-label="Додати завдання"
          >
            <svg className={css.iconButton} width={18} height={18}>
              <use href="/sprite.svg#icon-add_circle" aria-hidden="true"></use>
            </svg>
          </button>
        </div>

        <div className={css.taskContentWrapper}>
          <div className={css.taskContent}>
            {tasksData && tasksData.tasks.length > 0 ? (
              <TaskList tasks={tasksData.tasks} />
            ) : (
              <div className={css.taskDefaultContent}>
                <div className={css.taskDefaultContentTextWrapper}>
                  <p className={css.taskDefaultContentTextBold}>
                    Наразі немає жодних завдань
                  </p>
                  <p className={css.taskDefaultContentText}>
                    Створіть мершій нове завдання!
                  </p>
                </div>
                <button
                  className={css.addButtonDefault}
                  type="button"
                  onClick={addbuttonClickHandler}
                  aria-label="Додати завдання"
                >
                  Створити завдання
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
