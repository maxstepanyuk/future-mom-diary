'use client';
import { useAuthStore } from '@/lib/store/authStore';
import css from './TasksReminderCard.module.css';
import { useState } from 'react';
import {
  // keepPreviousData,
  useInfiniteQuery,
  // useQuery,
} from '@tanstack/react-query';
import { getTasks } from '@/lib/api/clientApi';
import TaskList from './TaskList/TaskList';
import { useRouter } from 'next/navigation';
import Modal from '@/components/common/Modal/Modal';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import Loader from '@/components/common/Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

export default function TaskReminderCard() {
  const isAuthenticated = useAuthStore(store => store.isAuthenticated);
  //   console.log(isAuthenticated);

  // const [currentPage, setCurrentPage] = useState(1);
  const [isModal, setIsModal] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    isFetched,
  } = useInfiniteQuery({
    queryKey: ['tasks'],
    queryFn: async ({ pageParam }) => {
      // console.log('REQUEST:', pageParam);
      // const response = await getTasks({
      //   page: pageParam,
      //   perPage: 11,
      //   sortOrder: 'asc',
      // });
      // console.log('RESPONSE:', {
      //   page: response.page,
      //   totalPages: response.totalPages,
      //   ids: response.tasks.map(task => task._id),
      // });

      return await getTasks({
        page: pageParam,
        // Рендерю максимальное число, так как прилетают дублю
        perPage: 11,
        sortOrder: 'desc',
      });
    },
    initialPageParam: 1,
    getNextPageParam: lastResponse => {
      const nextPage = lastResponse.page + 1;
      return nextPage <= lastResponse.totalPages ? nextPage : undefined;
    },
    enabled: isAuthenticated,
    select: data => {
      return {
        ...data,
        tasks: data.pages.flatMap(page => page.tasks),
      };
    },
  });

  const tasks = data?.tasks ?? [];

  const router = useRouter();

  // console.log(data);
  // console.log(tasks);
  // console.log(data?.pageParams);

  // const {
  //   data: tasksData,
  //   isError,
  //   isSuccess,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ['tasks'],
  //   queryFn: () => {
  //     return getTasks({ page: 1, perPage: 11, sortOrder: 'desc' });
  //   },
  //   enabled: isAuthenticated,
  //   placeholderData: keepPreviousData,
  //   // refetchOnMount: false,
  // });

  // const notify = () => toast.error('Here is your toast.');

  if (isError) {
    toast.error('Помилка завантаження завданнь');
  }

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
      <Toaster />
      {isModal && (
        <Modal onClose={modalCloseHandler}>
          <AddTaskModal onClose={modalCloseHandler} />
        </Modal>
      )}

      <div className={css.container}>
        <section className={css.section}>
          <div className={css.headingWrapper}>
            <h3 className={css.heading}>Важливі завдання</h3>
            <button
              className={css.addButton}
              type="button"
              onClick={addbuttonClickHandler}
              aria-label="Додати завдання"
            >
              <svg className={css.iconButton} width={24} height={24}>
                <use
                  href="/sprite.svg#icon-add_circle"
                  aria-hidden="true"
                ></use>
              </svg>
            </button>
          </div>

          {/* {isError && <p>Some Error...</p>} */}
          {isLoading && (
            <div className={css.loaderWrapper}>
              <Loader />
            </div>
          )}
          <div className={css.taskContentWrapper}>
            <div className={css.taskContent}>
              {isError && (
                <p className={css.errorLoading}>
                  Помилка завантаження завдань...
                </p>
              )}
              {!isLoading && isFetched && !isError && (
                <>
                  {tasks && tasks.length > 0 ? (
                    <>
                      <TaskList
                        tasks={tasks}
                        getMoreTasks={fetchNextPage}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                      />
                      {/* <button onClick={() => fetchNextPage()}> FETCH</button> */}
                    </>
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
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
