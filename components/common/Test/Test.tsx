// import css from './Header.module.css';
'use client';

import TaskReminderCard from '@/components/pages/common/TasksReminderCard/TasksReminderCard';
import {
  checkSession,
  deleteDiaryNote,
  getDiaryNotes,
  getEmotions,
  getMe,
  getTasks,
  getWeeksBabyInfo,
  getWeeksMomInfo,
  getWeeksPregnancyInfo,
  getWeeksPregnancyInfoPublic,
  postDiaryNote,
  postTask,
  register,
  updateDiaryNote,
  updateMe,
  updateTaskStatus,
} from '@/lib/api/clientApi';
import { login } from '@/lib/api/clientApi';
import { logout } from '@/lib/api/clientApi';
import { UserUpdateData } from '@/types/user';

import { useEffect } from 'react';
//! =========================================================================AUTH================================================================================
export default function Test() {
  ////////////////////////////////// ! пустой юзэффект для будущих проверок
  useEffect(() => {
    const testHandler = async () => {
      console.log('TEST useEffect');
    };
    testHandler();
  }, []);

  ////////////////////////////////// ! проверка реги
  const registerHandler = async () => {
    // ! пример аргумента для регистрации
    const registerData = {
      name: 'TEST4',
      email: 'BC81@gmail.com',
      password: '12345678',
    };
    try {
      // ! register ничего не возвращает
      await register(registerData);
      console.log('register Success: метод register ничего не возвращает');
    } catch (error) {
      console.log(`registerError: ${error}`);
    }
  };
  ////////////////////////////////// ! проверка логина
  const loginHandler = async () => {
    // ! пример аргумента для логина
    const loginData = {
      email: 'BC81@gmail.com',
      password: '12345678',
    };
    try {
      const response = await login(loginData);
      console.log('login Success:', response);
    } catch (error) {
      console.log(`loginError: ${error}`);
    }
  };
  ////////////////////////////////// ! проверка логаута
  const logoutHandler = async () => {
    // ! для логаута параметр отсутсвует
    try {
      // ! logout ничего не возвращает
      await logout();
      console.log('logaut success!!');
    } catch (error) {
      console.log(`logautError!!: ${error}`);
    }
  };

  ////////////////////////////////// ! проверка сессии
  const sessionHandler = async () => {
    // ! для сессии параметр отсутсвует

    try {
      //! при успехе возврщает буль true
      const response = await checkSession();
      console.log('checkSession:', response);
    } catch (error) {
      console.log(`checkSessionError: ${error}`);
    }
  };

  //! =========================================================================USER================================================================================

  ////////////////////////////////// ! проверка юзера getMe
  const getMeHandler = async () => {
    // ! для getMe параметр отсутсвует

    try {
      const response = await getMe();
      console.log('getMe:', response);
    } catch (error) {
      console.log(`getMeError: ${error}`);
    }
  };

  ////////////////////////////////// ! проверка обновления юзера updateMe
  const updateMeHandler = async () => {
    // ! пример аргумента для updateMe
    //! пример создания даты:

    // const date = new Date();
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    // const day = String(date.getDate()).padStart(2, '0');
    // const dateToPost = `${date.getFullYear()}-${month}-${day}`;

    const userUpdateData: UserUpdateData = {
      //! необходимо как минимум 1 поле для изминения
      name: 'TEST_UPDATE',
      // email: string;
      //! дата должна быть между 1 и 41 после текущей даты
      // dueDate: dateToPost,
      // babyGender: 'girl',
    };
    //! необходимо добавить логику проверку полей при реализации запроса
    try {
      const response = await updateMe(userUpdateData);
      console.log('updateMe:', response);
    } catch (error) {
      console.log(`updateMeError: ${error}`);
    }
  };

  ////////////////////////////////// ! проверка обновления аватара updateMe
  const updateAvatarHandler = async () => {};

  //! =========================================================================TASKS================================================================================

  ////////////////////////////////// ! проверка тасков getTasks
  const getTasksHandler = async () => {
    // ! для getTasks объект: {page: number, perPage?(дефолтное 10 макс 100): number, sortOrder?(дефолтное 'asc'):('asc|dsc')}

    try {
      const response = await getTasks({ page: 1, perPage: 10 });
      console.log('getTasks:', response);
    } catch (error) {
      console.log(`getTasksError: ${error}`);
    }
  };

  ////////////////////////////////// ! проверка создания таска postTasks
  const postTaskHandler = async () => {
    // ! пример создания аргумента для postTask
    // ! пример создания даты:
    const date = new Date();

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const dateToPost = `${date.getFullYear()}-${month}-${day}`;

    console.log(dateToPost);

    const postTaskData = {
      name: 'TEST 17:10 task1',
      date: dateToPost,
    };

    try {
      const response = await postTask(postTaskData);
      console.log('getTasks:', response);
    } catch (error) {
      console.log(`getTasksError: ${error}`);
    }
  };

  ////////////////////////////////// ! проверка обновления таска updateTaskStatus
  const updateTaskStatusHandler = async () => {
    // ! пример создания аргумента для updateTaskStatus

    try {
      //! 1.получаем таски
      const tasks = await getTasks({ page: 10, perPage: 10 });
      //! 2.берём из массива тасок таску по индексу
      const task = tasks.tasks[0];
      //! 3. передаём id таски аргументом
      //! в ответ приходит новое состояние таски булевым значением
      const response = await updateTaskStatus({
        taskId: task._id,
        isDone: false,
      });
      console.log('updateTaskStatus:', response);
    } catch (error) {
      console.log(`updateTaskStatusError: ${error}`);
    }
  };

  //! =========================================================================DIARY================================================================================

  ////////////////////////////////// ! проверка создания нотатки postDiaryNote
  const postDiaryNoteHandler = async () => {
    // ! пример создания аргумента для postDiaryNote

    const diaryNote = {
      title: 'TEST NOTE 4',
      description: 'DESCRIPTION TEST NOTE 4',
      //!  массив с ID эмоций
      emotions: ['6895bd86a5c677999ed2ae16'],
    };

    try {
      const response = await postDiaryNote(diaryNote);
      console.log('postDiaryNote:', response);
    } catch (error) {
      console.log(`postDiaryNoteError: ${error}`);
    }
  };

  ////////////////////////////////// ! проверка  getDiaryNotes
  const getDiaryNotesHandler = async () => {
    // ! для getDiaryNotes 3 параметра: page: number, perPage?(дефолтное 10 макс 100): number, sortOrder?(дефолтное 'asc'):('asc|dsc')

    try {
      const response = await getDiaryNotes(1, 10);
      console.log('getDiaryNotes:', response);

      // console.log('getDiaryNotes нулевая нотатка:', response.diaryNotes[0]);
    } catch (error) {
      console.log(`getDiaryNotesError: ${error}`);
    }
  };

  ////////////////////////////////// ! проверка обновления таска updateDiaryNote
  const updateDiaryNoteHandler = async () => {
    // ! пример создания аргумента для updateDiaryNote
    const noteDiaryId = '6a8712c7ddd422d137b22939';
    const diaryData = {
      title: 'TEST updateDiaryNote',
      description: 'TEST updateDiaryNote Description',
      //! треба передати масив с ID эмоций
      emotions: ['6895bd86a5c677999ed2ae16'],
    };

    try {
      const response = await updateDiaryNote(noteDiaryId, diaryData);
      console.log('updateDiaryNote:', response);
    } catch (error) {
      console.log(`updateDiaryNoteError: ${error}`);
    }
  };

  ////////////////////////////////// ! проверка обновления нотатки deleteDiaryNote
  const deleteDiaryNoteHandler = async () => {
    // ! пример создания аргумента для deleteDiaryNote
    //! для примера возмём массив нотаток, и будем удалять последнию в масиве:

    try {
      const responsegetDiaryNotes = await getDiaryNotes(1, 10);
      const noteId =
        responsegetDiaryNotes.diaryNotes[
          responsegetDiaryNotes.diaryNotes.length - 1
        ]._id;

      const response = await deleteDiaryNote(noteId);
      console.log('deleteDiaryNote:', response);
    } catch (error) {
      console.log(`deleteDiaryNote: ${error}`);
    }
  };
  //! =========================================================================WEEKS================================================================================

  ////////////////////////////////// ! проверка  getWeeksPregnancyInfo
  const getWeeksPregnancyInfoHandler = async () => {
    // ! для getWeeksPregnancyInfo не нужны аргументы

    try {
      const response = await getWeeksPregnancyInfo();
      console.log('getWeeksPregnancyInfo:', response);
    } catch (error) {
      console.log(`getWeeksPregnancyInfoError: ${error}`);
    }
  };

  ////////////////////////////////// ! проверка  getWeeksPregnancyInfoPublic
  const getWeeksPregnancyInfoPublicHandler = async () => {
    // ! для getWeeksPregnancyInfoPublic не нужны аргументы

    try {
      const response = await getWeeksPregnancyInfoPublic();
      console.log('getWeeksPregnancyInfoPublic:', response);
    } catch (error) {
      console.log(`getWeeksPregnancyInfoPublicError: ${error}`);
    }
  };

  ////////////////////////////////// ! проверка  getWeeksBabyInfo
  const getWeeksBabyInfoHandler = async () => {
    // ! для getWeeksBabyInfo нужен номер недели (от 1 до 41) возмём её из юзера

    try {
      const user = await getMe();
      //! проверяем есть ли номер недели если нет, подставляем 1
      const weekNumber = user.curWeekNumber ?? 1;
      const response = await getWeeksBabyInfo(weekNumber);
      console.log('getWeeksBabyInfo:', response);
    } catch (error) {
      console.log(`getWeeksBabyInfoError: ${error}`);
    }
  };

  ////////////////////////////////// ! проверка  getWeeksMomInfo
  const getWeeksMomInfoHandler = async () => {
    // ! для getWeeksMomInfo нужен номер недели (от 1 до 41) возмём её из юзера

    try {
      const user = await getMe();
      //! проверяем есть ли номер недели если нет, подставляем 1
      const weekNumber = user.curWeekNumber ?? 1;
      const response = await getWeeksMomInfo(weekNumber);
      console.log('getWeeksMomInfo:', response);
    } catch (error) {
      console.log(`getWeeksMomInfoError: ${error}`);
    }
  };

  //! =========================================================================EMOTIONS================================================================================

  ////////////////////////////////// ! проверка обновления таска getEmotions
  const getEmotionsHandler = async () => {
    // ! пример создания аргумента для getEmotions

    try {
      // ! для getEmotions 2 параметра: page: number, perPage?(дефолтное 10 макс 100): number,
      const response = await getEmotions(1, 10);
      console.log('getEmotions:', response);
    } catch (error) {
      console.log(`getEmotionsError: ${error}`);
    }
  };

  return (
    <>
      <div>TEST</div>
      <button onClick={registerHandler}>register</button>
      <button onClick={loginHandler}>login</button>
      <button onClick={logoutHandler}>logout</button>
      <button onClick={sessionHandler}>checkSession</button>

      <button onClick={getMeHandler}>getMe</button>
      <button onClick={updateMeHandler}>updateMe</button>
      <button onClick={updateAvatarHandler}>updateAvatar</button>

      <button onClick={getTasksHandler}>getTasks</button>
      <button onClick={postTaskHandler}>postTask</button>
      <button onClick={updateTaskStatusHandler}>updateTaskStatus</button>

      <button onClick={postDiaryNoteHandler}>postDiaryNote</button>
      <button onClick={getDiaryNotesHandler}>getDiaryNotes</button>
      <button onClick={updateDiaryNoteHandler}>updateDiaryNotes</button>
      <button onClick={deleteDiaryNoteHandler}>deleteDiaryNote</button>

      <button onClick={getWeeksPregnancyInfoHandler}>
        getWeeksPregnancyInfo
      </button>
      <button onClick={getWeeksPregnancyInfoPublicHandler}>
        getWeeksPregnancyInfoPublic
      </button>
      <button onClick={getWeeksBabyInfoHandler}>getWeeksBabyInfo</button>
      <button onClick={getWeeksMomInfoHandler}>getWeeksMomInfo</button>

      <button onClick={getEmotionsHandler}>getEmotions</button>
      <TaskReminderCard />
    </>
  );
}
