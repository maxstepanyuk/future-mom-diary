export type BabyGender = 'boy' | 'girl' | 'unknown';
export type Theme = 'light' | 'dark';

export interface User {
  _id: string;
  name: string;
  email: string;
  dueDate?: string | null;
  babyGender?: BabyGender | null;
  theme?: Theme;
  avatarUrl: string;
  curWeekNumber: number;
}

export interface UserUpdateData {
  name?: string;
  email?: string;
  dueDate?: string;
  babyGender?: BabyGender;
}

export type GenderOption = {
  value: BabyGender | '';
  label: string;
};

export type ProfileFormValues = Omit<
  UserUpdateData,
  'dueDate' | 'babyGender'
> & {
  name: string;
  email: string;
  babyGender: BabyGender | '';
  dueDate: Date | null;
};