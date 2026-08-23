import { ComfortTip } from './comfortTip';
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
  page: number;
  totalCount: number;
  totalPages: number;
}

export interface GetWeeksPregnancyInfoResponse {
  curWeekToPregnant: number;
  daysBeforePregnant: number;
  babyToday: {
    babySize: number;
    babyWeight: number;
    babyActivity: string;
    babyDevelopment: string;
    image: string;
  };
  momHint: string;
}

export interface GetWeeksBabyInfoResponse {
  analogy: string;
  image: string;
  description: string[];
  interestingFact: string;
}

export interface GetWeeksMomInfoResponse {
  feelings: {
    states: string[];
    sensationDescr: string;
  };
  comfortTips: ComfortTip[];
}
