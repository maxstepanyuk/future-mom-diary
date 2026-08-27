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
  ////////////////////////////////// ! empty useEffect for future checks
  useEffect(() => {
    const testHandler = async () => {
      console.log('TEST useEffect');
    };
    testHandler();
  }, []);

  ////////////////////////////////// ! registration check
  const registerHandler = async () => {
    // ! example argument for registration
    const registerData = {
      name: 'TEST4',
      email: 'BC81@gmail.com',
      password: '12345678',
    };
    try {
      // ! register returns nothing
      await register(registerData);
      console.log('register Success: the register method returns nothing');
    } catch (error) {
      console.log(`registerError: ${error}`);
    }
  };
  ////////////////////////////////// ! login check
  const loginHandler = async () => {
    // ! example argument for login
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
  ////////////////////////////////// ! logout check
  const logoutHandler = async () => {
    // ! no parameter needed for logout
    try {
      // ! logout returns nothing
      await logout();
      console.log('logaut success!!');
    } catch (error) {
      console.log(`logautError!!: ${error}`);
    }
  };

  ////////////////////////////////// ! session check
  const sessionHandler = async () => {
    // ! no parameter needed for session

    try {
      //! returns boolean true on success
      const response = await checkSession();
      console.log('checkSession:', response);
    } catch (error) {
      console.log(`checkSessionError: ${error}`);
    }
  };

  //! =========================================================================USER================================================================================

  ////////////////////////////////// ! user check getMe
  const getMeHandler = async () => {
    // ! no parameter needed for getMe

    try {
      const response = await getMe();
      console.log('getMe:', response);
    } catch (error) {
      console.log(`getMeError: ${error}`);
    }
  };

  ////////////////////////////////// ! check updating user updateMe
  const updateMeHandler = async () => {
    // ! example argument for updateMe
    //! example of creating a date:

    // const date = new Date();
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    // const day = String(date.getDate()).padStart(2, '0');
    // const dateToPost = `${date.getFullYear()}-${month}-${day}`;

    const userUpdateData: UserUpdateData = {
      //! at least 1 field is required to update
      name: 'TEST_UPDATE',
      // email: string;
      //! date must be between 1 and 41 days from the current date
      // dueDate: dateToPost,
      // babyGender: 'girl',
    };
    //! need to add field validation logic when implementing the request
    try {
      const response = await updateMe(userUpdateData);
      console.log('updateMe:', response);
    } catch (error) {
      console.log(`updateMeError: ${error}`);
    }
  };

  ////////////////////////////////// ! check updating avatar updateMe
  const updateAvatarHandler = async () => {};

  //! =========================================================================TASKS================================================================================

  ////////////////////////////////// ! tasks check getTasks
  const getTasksHandler = async () => {
    // ! for getTasks object: {page: number, perPage?(default 10, max 100): number, sortOrder?(default 'asc'):('asc|dsc')}

    try {
      const response = await getTasks({ page: 1, perPage: 10 });
      console.log('getTasks:', response);
    } catch (error) {
      console.log(`getTasksError: ${error}`);
    }
  };

  ////////////////////////////////// ! check creating a task postTasks
  const postTaskHandler = async () => {
    // ! example of creating an argument for postTask
    // ! example of creating a date:
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

  ////////////////////////////////// ! check updating a task updateTaskStatus
  const updateTaskStatusHandler = async () => {
    // ! example of creating an argument for updateTaskStatus

    try {
      //! 1. get the tasks
      const tasks = await getTasks({ page: 10, perPage: 10 });
      //! 2. take a task from the array by index
      const task = tasks.tasks[0];
      //! 3. pass the task id as an argument
      //! the new task state is returned as a boolean value
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

  ////////////////////////////////// ! check creating a note postDiaryNote
  const postDiaryNoteHandler = async () => {
    // ! example of creating an argument for postDiaryNote

    const diaryNote = {
      title: 'TEST NOTE 4',
      description: 'DESCRIPTION TEST NOTE 4',
      //!  array of emotion IDs
      emotions: ['6895bd86a5c677999ed2ae16'],
    };

    try {
      const response = await postDiaryNote(diaryNote);
      console.log('postDiaryNote:', response);
    } catch (error) {
      console.log(`postDiaryNoteError: ${error}`);
    }
  };

 ////////////////////////////////// ! check getDiaryNotes
  const getDiaryNotesHandler = async () => {
    try {
      const response = await getDiaryNotes({ page: 1, limit: 10 });
      console.log("getDiaryNotes:", response);

    } catch (error) {
      console.log(`getDiaryNotesError: ${error}`);
    }
  };

  ////////////////////////////////// ! check updating a task updateDiaryNote
  const updateDiaryNoteHandler = async () => {
    // ! example of creating an argument for updateDiaryNote
    const noteDiaryId = '6a8712c7ddd422d137b22939';
    const diaryData = {
      title: 'TEST updateDiaryNote',
      description: 'TEST updateDiaryNote Description',
      //! need to pass an array of emotion IDs
      emotions: ['6895bd86a5c677999ed2ae16'],
    };

    try {
      const response = await updateDiaryNote(noteDiaryId, diaryData);
      console.log('updateDiaryNote:', response);
    } catch (error) {
      console.log(`updateDiaryNoteError: ${error}`);
    }
  };

  ////////////////////////////////// ! check deleting a note deleteDiaryNote
  const deleteDiaryNoteHandler = async () => {
    try {
      const responsegetDiaryNotes = await getDiaryNotes({ page: 1, limit: 10 });
      const notes = responsegetDiaryNotes.diaryNotes || [];

      if (notes.length > 0) {
        const noteId = notes[notes.length - 1]._id;
        const response = await deleteDiaryNote(noteId);
        console.log("deleteDiaryNote:", response);
      }
    } catch (error) {
      console.log(`deleteDiaryNote: ${error}`);
    }
  };
  //! =========================================================================WEEKS================================================================================

  ////////////////////////////////// ! check getWeeksPregnancyInfo
  const getWeeksPregnancyInfoHandler = async () => {
    // ! no arguments needed for getWeeksPregnancyInfo

    try {
      const response = await getWeeksPregnancyInfo();
      console.log('getWeeksPregnancyInfo:', response);
    } catch (error) {
      console.log(`getWeeksPregnancyInfoError: ${error}`);
    }
  };

  ////////////////////////////////// ! check getWeeksPregnancyInfoPublic
  const getWeeksPregnancyInfoPublicHandler = async () => {
    // ! no arguments needed for getWeeksPregnancyInfoPublic

    try {
      const response = await getWeeksPregnancyInfoPublic();
      console.log('getWeeksPregnancyInfoPublic:', response);
    } catch (error) {
      console.log(`getWeeksPregnancyInfoPublicError: ${error}`);
    }
  };

  ////////////////////////////////// ! check getWeeksBabyInfo
  const getWeeksBabyInfoHandler = async () => {
    // ! getWeeksBabyInfo needs a week number (from 1 to 41), take it from the user

    try {
      const user = await getMe();
      //! check whether a week number exists, if not, default to 1
      const weekNumber = user.curWeekNumber ?? 1;
      const response = await getWeeksBabyInfo(weekNumber);
      console.log('getWeeksBabyInfo:', response);
    } catch (error) {
      console.log(`getWeeksBabyInfoError: ${error}`);
    }
  };

  ////////////////////////////////// ! check getWeeksMomInfo
  const getWeeksMomInfoHandler = async () => {
    // ! getWeeksMomInfo needs a week number (from 1 to 41), take it from the user

    try {
      const user = await getMe();
      //! check whether a week number exists, if not, default to 1
      const weekNumber = user.curWeekNumber ?? 1;
      const response = await getWeeksMomInfo(weekNumber);
      console.log('getWeeksMomInfo:', response);
    } catch (error) {
      console.log(`getWeeksMomInfoError: ${error}`);
    }
  };

  //! =========================================================================EMOTIONS================================================================================

  ////////////////////////////////// ! check updating a task getEmotions
  const getEmotionsHandler = async () => {
    // ! example of creating an argument for getEmotions

    try {
      // ! getEmotions takes 2 parameters: page: number, perPage?(default 10, max 100): number,
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