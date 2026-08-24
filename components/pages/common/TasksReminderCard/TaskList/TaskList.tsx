'use client';

import css from './TaskList.module.css';
import clsx from 'clsx';

import { updateTaskStatus } from '@/lib/api/clientApi';
import { Task } from '@/types/task';
import {
  InfiniteQueryObserverResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import Loader from '@/components/common/Loader/Loader';

// interface InfiniteQueryObserverResult {
//   tasks: Task[];
//   pages: GetTasksResponse[];
//   pageParams: number[];
// }

interface TaskListProps {
  tasks: Task[];
  getMoreTasks: () => Promise<InfiniteQueryObserverResult>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function TaskList({
  tasks,
  getMoreTasks,
  hasNextPage,
  isFetchingNextPage,
}: TaskListProps) {
  const queryClient = useQueryClient();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLLIElement>(null);

  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,

    onSuccess: () => {
      //   console.log('success');
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
      toast.success('Статус завдання оновленно');
    },
    onError: () => {
      toast.error('Помилка оновлення статусу завдання');
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          getMoreTasks();
        }
      },
      {
        root: wrapperRef.current,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [getMoreTasks, hasNextPage, isFetchingNextPage]);

  async function checkboxChangeHandler(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    // console.log(event.target);
    // console.log(event.target.name);
    // console.log(event.target.checked);

    mutate({
      taskId: event.target.name,
      isDone: event.target.checked,
    });
  }
  return (
    <div ref={wrapperRef} className={css.taskListWrapper}>
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
                    //   value={`${task.isDone}`}
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
        {/* <button onClick={() => getMoreTasks()}> FETCH</button> */}
        {isFetchingNextPage && (
          <div className={css.loaderWrapper}>
            <Loader />
          </div>
        )}
        <li ref={loadMoreRef} aria-hidden={true}></li>
      </ul>
    </div>
  );
}
