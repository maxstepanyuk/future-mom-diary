// import css from './Header.module.css';
'use client';

import {
  checkSession,
  getEmotions,
  getMe,
  getTasks,
  postTask,
  register,
  updateMe,
  updateTaskStatus,
} from '@/lib/api/clientApi';
import { login } from '@/lib/api/clientApi';
import { logout } from '@/lib/api/clientApi';
import { UserUpdateData } from '@/types/user';

import { useEffect } from 'react';

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
      const response = await checkSession();
      console.log('checkSession:', response);
    } catch (error) {
      console.log(`checkSessionError: ${error}`);
    }
  };

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

  ////////////////////////////////// ! проверка тасков getTasks
  const getTasksHandler = async () => {
    // ! для getTasks 3 параметра: page: number, perPage?(дефолтное 10 макс 100): number, sortOrder?(дефолтное 'asc'):('asc|dsc')

    try {
      const response = await getTasks(1, 10);
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
      name: 'TEST task1',
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
      const tasks = await getTasks(1, 10);
      //! 2.берём из массива тасок таску по индексу
      const task = tasks.tasks[0];
      //! 3. передаём id таски аргументом
      //! при успехе в ответ приходит булевое true
      const response = await updateTaskStatus(task._id);
      console.log('updateTaskStatus:', response);
    } catch (error) {
      console.log(`updateTaskStatusError: ${error}`);
    }
  };

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
      <button onClick={getEmotionsHandler}>getEmotions</button>
    </>
  );
}
