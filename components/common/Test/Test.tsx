// import css from './Header.module.css';
'use client';

import { login, register } from '@/lib/api/clientApi';
import { useEffect } from 'react';

export default function Test() {
  useEffect(() => {
    const loginEffect = async () => {
      const loginData = {
        email: 'BC81@gmail.com',
        password: '12345678',
      };
      //! проверка лоигна
      const response = await login(loginData);
      console.log(response);
      // const cookieStore = await cookies();
      // console.log(`Кукистор в браузере: ${cookieStore}`);
    };
    loginEffect();
  }, []);

  // const registerData = {
  //   name: 'TEST4',
  //   email: 'BC81@gmail.com',
  //   password: '12345678',
  // };

  // ! проверка реги
  // const response = await register(registerData);
  // console.log(response);

  return (
    <>
      <div>TEST</div>
    </>
  );
}
