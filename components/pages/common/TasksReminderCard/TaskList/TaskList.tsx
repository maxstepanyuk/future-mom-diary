'use client';

import css from './TaskList.module.css';
import clsx from 'clsx';

import { updateTaskStatus } from '@/lib/api/clientApi';
import { Task } from '@/types/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,

    onSuccess: () => {
      //   console.log('success');
      queryClient.invalidateQueries({ queryKey: ['tasks', 1] });
    },
  });

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
      </ul>
    </div>
  );
}
