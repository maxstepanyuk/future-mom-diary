import {
  CheckSessionResponse,
  getEmotionsResponse,
  getTasksResponse,
} from '@/types/responses';
import { nextApi } from './api';
import { User } from '@/types/user';

export async function checkSessionServer(): Promise<boolean> {
  const res = await nextApi.get<CheckSessionResponse>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data.success;
}

export async function getMeServer(): Promise<User> {
  const { data } = await nextApi.get<User>('/users/current', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function getTasks(
  page: number,
  perPage: number,
  sortOrder?: 'asc' | 'dsc'
): Promise<getTasksResponse> {
  const response = await nextApi.get<getTasksResponse>('/tasks', {
    params: {
      page,
      limit: perPage,
      sortOrder,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function getEmotions(
  page: number,
  perPage?: number
): Promise<getEmotionsResponse> {
  const response = await nextApi.get<getEmotionsResponse>('/emotions', {
    params: {
      page,
      limit: perPage,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}
