import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { serverApi } from '../../api';
import { parseSetCookie } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function GET() {
  try {
    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get('accessToken')?.value;

    const refreshToken =
      cookieStore.get('refreshToken')?.value;

    if (accessToken) {
      return NextResponse.json(
        { success: true },
        { status: 200 }
      );
    }

    if (refreshToken) {
      const apiRes = await serverApi.get(
        '/auth/session',
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        }
      );

      const setCookie =
        apiRes.headers['set-cookie'];

      if (setCookie) {
        const cookieArray =
          Array.isArray(setCookie)
            ? setCookie
            : [setCookie];

        const response = NextResponse.json(
          { success: true },
          { status: 200 }
        );

        for (const cookieStr of cookieArray) {
          const parsed =
            parseSetCookie(cookieStr);

          if (!parsed.value) {
            continue;
          }

          response.cookies.set(
            parsed.name,
            parsed.value,
            {
              path: parsed.path ?? '/',
              httpOnly: parsed.httpOnly,
              secure: parsed.secure,
              sameSite: parsed.sameSite,
              expires: parsed.expires,
              maxAge: parsed.maxAge,
            }
          );
        }

        return response;
      }
    }

    return NextResponse.json(
      { success: false },
      { status: 200 }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error);

      const response = NextResponse.json(
        { success: false },
        { status: 200 }
      );

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');
      }

      return response;
    }

    logErrorResponse({
      message: (error as Error).message,
    });

    return NextResponse.json(
      { success: false },
      { status: 200 }
    );
  }
}