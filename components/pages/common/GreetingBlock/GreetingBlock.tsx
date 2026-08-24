'use client';

import { usePathname } from 'next/navigation';

import { useAuthStore } from '@/lib/store/authStore';
import css from './GreetingBlock.module.css';

export default function GreetingBlock() {
  const user = useAuthStore(state => state.user);
  const pathname = usePathname();

  if (pathname.startsWith('/profile')) {
    return null;
  }

  return (
    <div className={css.greeting}>
      <h2 className={css.title}>
        {user ? `Вітаю, ${user.name}!` : 'Вітаємо!'}
      </h2>
    </div>
  );
}