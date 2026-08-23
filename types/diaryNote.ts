import { Emotion } from './emotion';

export interface DiaryNote {
  _id: string;
  title: string;
  date: string;
  emotions: Emotion[];
  description: string;
}
export interface GetDiaryNotesResponse {
  diaryNotes: DiaryNote[];
  page: number;
  totalCount: number;
  totalPages: number;
}