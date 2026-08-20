import { User, UserUpdateData } from '@/types/user';
import { nextApi } from './api';
import {
  CheckSessionResponse,
  getEmotionsResponse,
  getTasksResponse,
} from '@/types/responses';
import { Task } from '@/types/task';

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

interface updateAvatarRequest {
  //! пока не понятно как типизировать запрос по аватару
  avatar: string;
}

interface postTaskRequest {
  name: string;
  date: string;
}

interface updateTaskStatusResponse {
  isDone: boolean;
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

export async function updateAvatar({
  avatar,
}: updateAvatarRequest): Promise<User> {
  const { data } = await nextApi.patch<User>('/users/current/avatars', avatar);
  return data;
}

//////////////! /tasks запросы

export async function postTask(taskData: postTaskRequest): Promise<Task> {
  const response = await nextApi.post<Task>('/tasks', taskData);

  return response.data;
}

export async function getTasks(
  page: number,
  perPage?: number,
  sortOrder?: 'asc' | 'dsc'
): Promise<getTasksResponse> {
  const response = await nextApi.get<getTasksResponse>('/tasks', {
    params: {
      page,
      limit: perPage,
      sortOrder,
    },
  });
  return response.data;
}

export async function updateTaskStatus(taskId: string): Promise<boolean> {
  const response = await nextApi.patch<updateTaskStatusResponse>(
    `/tasks/status/${taskId}`,
    { isDone: true }
  );
  return response.data.isDone;
}

//////////////! /emotions

export async function getEmotions(
  page: number,
  perPage?: number
): Promise<getEmotionsResponse> {
  const response = await nextApi.get<getEmotionsResponse>('/emotions', {
    params: {
      page,
      limit: perPage,
    },
  });
  return response.data;
}
