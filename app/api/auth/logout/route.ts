import { NextResponse } from 'next/server';
import { serverApi } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function POST() {
  const cookieStore = await cookies();

  try {
    await serverApi.post(
      '/auth/logout',
      null,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error);
    } else {
      logErrorResponse({
        message: (error as Error).message,
      });
    }
  }

  const response = NextResponse.json(
    {
      message: 'Logged out successfully',
    },
    {
      status: 200,
    }
  );

  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');

  return response;
}