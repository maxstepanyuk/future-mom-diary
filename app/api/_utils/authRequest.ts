import {
  type AxiosRequestConfig,
  type AxiosResponse,
  isAxiosError,
} from 'axios';
import { cookies } from 'next/headers';
import { parseSetCookie } from 'cookie';

import { serverApi } from '../api';

export type ParsedCookie = ReturnType<
  typeof parseSetCookie
>;

interface AuthRequestResult<T> {
  response: AxiosResponse<T>;
  setCookies: ParsedCookie[];
}

export async function authRequest<T>(
  config: AxiosRequestConfig
): Promise<AuthRequestResult<T>> {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore.toString();

  try {
    const response = await serverApi.request<T>({
      ...config,
      headers: {
        ...config.headers,
        Cookie: cookieHeader,
      },
    });

    return {
      response,
      setCookies: [],
    };
  } catch (error) {
    if (
      !isAxiosError(error) ||
      error.response?.status !== 401
    ) {
      throw error;
    }

    const refreshToken =
      cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      throw error;
    }

    const sessionResponse = await serverApi.get(
      '/auth/session',
      {
        headers: {
          Cookie: cookieHeader,
        },
      }
    );

    const setCookieHeader =
      sessionResponse.headers['set-cookie'];

    if (!setCookieHeader) {
      throw error;
    }

    const cookieArray = Array.isArray(
      setCookieHeader
    )
      ? setCookieHeader
      : [setCookieHeader];

    const parsedCookies = cookieArray
      .map((cookieString) =>
        parseSetCookie(cookieString)
      )
      .filter(
        (cookie): cookie is ParsedCookie =>
          Boolean(cookie.value)
      );

    const refreshedCookieHeader = [
      cookieHeader,
      ...parsedCookies.map(
        (cookie) =>
          `${cookie.name}=${cookie.value}`
      ),
    ]
      .filter(Boolean)
      .join('; ');

    const retryResponse =
      await serverApi.request<T>({
        ...config,
        headers: {
          ...config.headers,
          Cookie: refreshedCookieHeader,
        },
      });

    return {
      response: retryResponse,
      setCookies: parsedCookies,
    };
  }
}