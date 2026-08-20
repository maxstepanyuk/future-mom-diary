import { Emotion } from './emotion';
import { Task } from './task';

export interface CheckSessionResponse {
  success: boolean;
}

export interface getTasksResponse {
  tasks: Task[];
  totalCount: number;
  totalPages: number;
  page: number;
}

export interface getEmotionsResponse {
  emotions: Emotion[];
  totalCount: number;
  totalPages: number;
  page: number;
  limit: number;
}
