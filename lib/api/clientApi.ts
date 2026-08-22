import { User, UserUpdateData } from '@/types/user';
import { nextApi } from './api';
import {
  CheckSessionResponse,
  GetDiaryNotesResponse,
  GetEmotionsResponse,
  GetTasksResponse,
  GetWeeksBabyInfoResponse,
  GetWeeksMomInfoResponse,
  GetWeeksPregnancyInfoResponse,
} from '@/types/responses';
import { Task } from '@/types/task';
import { DiaryNote } from '@/types/diaryNote';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
}

interface PostTaskRequest {
  name: string;
  date: string;
}

interface UpdateTaskStatusResponse {
  isDone: boolean;
}

interface PostDiaryNoteRequest {
  title: string;
  description: string;
  emotions: string[];
}

//////////////! /auth запросы

export async function register(registerData: RegisterRequest): Promise<void> {
  await nextApi.post('/auth/register', registerData);
}

export async function login(loginData: LoginRequest): Promise<User> {
  const response = await nextApi.post<LoginResponse>('/auth/login', loginData);

  return response.data.user;
}

export async function logout(): Promise<void> {
  await nextApi.post('/auth/logout');
}

export async function checkSession(): Promise<boolean> {
  const res = await nextApi.get<CheckSessionResponse>('/auth/session');
  return res.data.success;
}

//////////////! /users запросы

export async function getMe(): Promise<User> {
  const { data } = await nextApi.get<User>('/users/current');
  return data;
}

export async function updateMe(userData: UserUpdateData): Promise<User> {
  const { data } = await nextApi.patch<User>('/users/current', userData);
  return data;
}

export async function updateAvatar(avatar: File): Promise<User> {
  const formData = new FormData();
  formData.append('avatar', avatar);
  const { data } = await nextApi.patch<User>(
    '/users/current/avatars',
    formData
  );
  return data;
}

//////////////! /tasks запросы

export async function postTask(taskData: PostTaskRequest): Promise<Task> {
  const response = await nextApi.post<Task>('/tasks', taskData);

  return response.data;
}

export async function getTasks(
  page: number,
  perPage?: number,
  sortOrder?: 'asc' | 'dsc'
): Promise<GetTasksResponse> {
  const response = await nextApi.get<GetTasksResponse>('/tasks', {
    params: {
      page,
      limit: perPage,
      sortOrder,
    },
  });
  return response.data;
}

export async function updateTaskStatus(
  taskId: string,
  isDone: boolean
): Promise<boolean> {
  const response = await nextApi.patch<UpdateTaskStatusResponse>(
    `/tasks/status/${taskId}`,
    { isDone: isDone }
  );
  return response.data.isDone;
}

//////////////! /diary запросы

export async function postDiaryNote(
  diaryData: PostDiaryNoteRequest
): Promise<DiaryNote> {
  const response = await nextApi.post<DiaryNote>('/diary', diaryData);
  return response.data;
}

export async function getDiaryNotes(
  page: number,
  perPage?: number,
  sortOrder?: 'asc' | 'dsc'
): Promise<GetDiaryNotesResponse> {
  const response = await nextApi.get<GetDiaryNotesResponse>('/diary', {
    params: {
      page,
      limit: perPage,
      sortOrder,
    },
  });
  return response.data;
}

export async function updateDiaryNote(
  noteDiaryId: string,
  diaryData: PostDiaryNoteRequest
): Promise<DiaryNote> {
  const response = await nextApi.patch<DiaryNote>(
    `/diary/${noteDiaryId}`,
    diaryData
  );
  return response.data;
}

export async function deleteDiaryNote(noteDiaryId: string): Promise<string> {
  const response = await nextApi.delete<{ _id: string }>(
    `/diary/${noteDiaryId}`
  );
  return response.data._id;
}

//////////////! /weeks запросы

export async function getWeeksPregnancyInfo(): Promise<GetWeeksPregnancyInfoResponse> {
  const response =
    await nextApi.get<GetWeeksPregnancyInfoResponse>('/weeks/greeting');
  return response.data;
}

export async function getWeeksPregnancyInfoPublic(): Promise<GetWeeksPregnancyInfoResponse> {
  const response = await nextApi.get<GetWeeksPregnancyInfoResponse>(
    '/weeks/greeting/public'
  );
  return response.data;
}

export async function getWeeksBabyInfo(
  weekNumber: number
): Promise<GetWeeksBabyInfoResponse> {
  const response = await nextApi.get<GetWeeksBabyInfoResponse>(
    `/weeks/${weekNumber}/baby`
  );
  return response.data;
}

export async function getWeeksMomInfo(
  weekNumber: number
): Promise<GetWeeksMomInfoResponse> {
  const response = await nextApi.get<GetWeeksMomInfoResponse>(
    `/weeks/${weekNumber}/mom`
  );
  return response.data;
}

//////////////! /emotions

export async function getEmotions(
  page: number,
  perPage?: number
): Promise<GetEmotionsResponse> {
  const response = await nextApi.get<GetEmotionsResponse>('/emotions', {
    params: {
      page,
      limit: perPage,
    },
  });
  return response.data;
}
