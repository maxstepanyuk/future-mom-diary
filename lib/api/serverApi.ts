import {
  CheckSessionResponse,
  GetDiaryNotesResponse,
  GetEmotionsResponse,
  GetTasksResponse,
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

export async function getTasksServer(
  page: number,
  perPage: number,
  sortOrder?: 'asc' | 'dsc'
): Promise<GetTasksResponse> {
  const response = await nextApi.get<GetTasksResponse>('/tasks', {
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

export async function getEmotionsServer(
  page: number,
  perPage?: number
): Promise<GetEmotionsResponse> {
  const response = await nextApi.get<GetEmotionsResponse>('/emotions', {
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

export async function getDiaryNotesServer(
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
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}
