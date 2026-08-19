// import css from './Header.module.css';

import { login, register } from '@/lib/api/clientApi';
import { cookies } from 'next/headers';

export default async function Test() {
  const registerData = {
    name: 'TEST4',
    email: 'test4@mail.com',
    password: '12345678',
  };

  const loginData = {
    email: 'test4@mail.com',
    password: '12345678',
  };

  // ! проверка реги
  // const response = await register(registerData);
  // console.log(response);

  //! проверка лоигна
  const response = await login(loginData);
  console.log(response);
  const cookieStore = await cookies();
  // console.log(cookieStore);

  return (
    <>
      <div>TEST</div>
    </>
  );
}
