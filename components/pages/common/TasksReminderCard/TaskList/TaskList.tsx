'use client';

import css from './TaskList.module.css';
import clsx from 'clsx';

import { updateTaskStatus } from '@/lib/api/clientApi';
import { Task } from '@/types/task';
import {
  // InfiniteQueryObserverResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';

// import { useEffect, useRef } from 'react';
// import Loader from '@/components/common/Loader/Loader';

interface TaskListProps {
  tasks: Task[];
  // getMoreTasks: () => Promise<InfiniteQueryObserverResult>;
  // hasNextPage: boolean;
  // isFetchingNextPage: boolean;
}

export default function TaskList({
  tasks,
  // getMoreTasks,
  // hasNextPage,
  // isFetchingNextPage,
}: TaskListProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
      toast.success('Статус завдання оновленно');
    },
    onError: () => {
      toast.error('Помилка оновлення статусу завдання');
    },
  });
  //! ================================= infinite PAgination ===========================================

  // const wrapperRef = useRef<HTMLDivElement>(null);
  // const loadMoreRef = useRef<HTMLLIElement>(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
  //         getMoreTasks();
  //       }
  //     },
  //     {
  //       root: wrapperRef.current,
  //     }
  //   );

  //   if (loadMoreRef.current) {
  //     observer.observe(loadMoreRef.current);
  //   }

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [getMoreTasks, hasNextPage, isFetchingNextPage]);

  //! ================================= infinite PAgination ===========================================

  async function checkboxChangeHandler(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    mutate({
      taskId: event.target.name,
      isDone: event.target.checked,
    });
  }
  return (
    // <div ref={wrapperRef} className={css.taskListWrapper}>
    <div className={css.taskListWrapper}>
      <ul className={css.taskList}>
        {tasks.map(task => {
          return (
            <li key={task._id} className={css.taskItem}>
              <p className={css.taskDate}>
                {task.date.slice(5).replaceAll('-', '.')}
              </p>

              <label className={css.checkboxLabel}>
                <div className={css.checkboxWrapper}>
                  <input
                    className={css.checkbox}
                    type="checkbox"
                    name={task._id}
                    onChange={checkboxChangeHandler}
                    checked={task.isDone}
                  />
                  <span className={css.customCheckbox}></span>
                  <svg className={css.iconCheckbox} width={18} height={18}>
                    <use
                      className={css.iconCheckboxUse}
                      href="/sprite.svg#icon-checkbox"
                      aria-hidden="true"
                    ></use>
                  </svg>
                </div>

                <p
                  className={clsx(
                    css.taskName,
                    task.isDone && css.taskNameDone
                  )}
                >
                  {task.name}
                </p>
              </label>
            </li>
          );
        })}
        {/* <li ref={loadMoreRef} aria-hidden={true}></li> */}
      </ul>
    </div>
  );
}
