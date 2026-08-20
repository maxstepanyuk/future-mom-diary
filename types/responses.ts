import { DiaryNote } from './diaryNote';
import { Emotion } from './emotion';
import { Task } from './task';

export interface CheckSessionResponse {
  success: boolean;
}

export interface GetTasksResponse {
  tasks: Task[];
  totalCount: number;
  totalPages: number;
  page: number;
}

export interface GetEmotionsResponse {
  emotions: Emotion[];
  totalCount: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface GetDiaryNotesResponse {
  diaryNotes: DiaryNote[];
  totalCount: number;
  totalPages: number;
  page: number;
}
