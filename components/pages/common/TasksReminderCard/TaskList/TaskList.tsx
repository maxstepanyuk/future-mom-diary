'use client';

import { Task } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const checkboxClickHandle = () => {};
  return (
    <>
      <ul>
        {tasks.map(task => {
          return (
            <li key={task._id}>
              <p>{task.date}</p>
              <div>
                <input
                  type="checkbox"
                  name="status"
                  value={`${task.isDone}`}
                  onChange={checkboxClickHandle}
                  checked={task.isDone}
                ></input>
                <p>{task.name}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
