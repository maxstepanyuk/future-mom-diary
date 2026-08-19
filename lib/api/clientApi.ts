import { User } from '@/types/user';
import { nextApi } from './api';

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

export async function register(registerData: RegisterRequest): Promise<void> {
  await nextApi.post('/auth/register', registerData);
}

export async function login(loginData: LoginRequest) {
  const { data } = await nextApi.post<LoginResponse>('/auth/login', loginData);
  return data.user;
}
