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
  const response = await nextApi.post<LoginResponse>('/auth/login', loginData);

  return response.data.user;
}
