export type BabyGender = 'boy' | 'girl' | 'unknown';
export type Theme = 'light' | 'dark';

export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  dueDate?: string | null;
  babyGender?: BabyGender | null;
  theme?: Theme;
}
