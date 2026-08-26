'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

type Props = {
  children: React.ReactNode;
};

function AuthProvider({ children }: Props) {
  const pathname = usePathname();

  const setUser = useAuthStore(
    state => state.setUser
  );

  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  useEffect(() => {
    
    if (pathname.startsWith('/auth')) {
      return;
    }

    async function fetchUser() {
      try {
        const isAuthenticated =
          await checkSession();

        if (!isAuthenticated) {
          clearIsAuthenticated();
          return;
        }

        const user = await getMe();

        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error(
          'Auth check failed:',
          error
        );

        clearIsAuthenticated();
      }
    }

    fetchUser();
  }, [
    pathname,
    setUser,
    clearIsAuthenticated,
  ]);

  return children;
}

export default AuthProvider;