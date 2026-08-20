export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  dueDate: string;
  babyGender: string;
  theme: string;
}

export interface UserUpdateData {
  name?: string;
  email?: string;
  dueDate?: string;
  babyGender?: 'girl' | 'boy' | 'unknown';
}
