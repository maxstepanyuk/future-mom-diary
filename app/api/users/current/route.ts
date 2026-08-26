export const dynamic = 'force-dynamic';

import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { isAxiosError } from 'axios';

import {
  authRequest,
  type ParsedCookie,
} from '../../_utils/authRequest';
import { logErrorResponse } from '../../_utils/utils';

function applyCookies(
  response: NextResponse,
  cookiesToSet: ParsedCookie[]
) {
  for (const parsed of cookiesToSet) {
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
}

export async function GET() {
  try {
    const {
      response: apiResponse,
      setCookies,
    } = await authRequest({
      method: 'GET',
      url: '/users/current',
    });

    const response = NextResponse.json(
      apiResponse.data,
      {
        status: apiResponse.status,
      }
    );

    applyCookies(response, setCookies);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status:
            error.response?.status ?? 500,
        }
      );
    }

    logErrorResponse(error);

    return NextResponse.json(
      {
        error: 'Internal Server Error',
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      response: apiResponse,
      setCookies,
    } = await authRequest({
      method: 'PATCH',
      url: '/users/current',
      data: body,
      headers: {
        'Content-Type':
          'application/json',
      },
    });

    const response = NextResponse.json(
      apiResponse.data,
      {
        status: apiResponse.status,
      }
    );

    applyCookies(response, setCookies);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status:
            error.response?.status ?? 500,
        }
      );
    }

    logErrorResponse(error);

    return NextResponse.json(
      {
        error: 'Internal Server Error',
      },
      {
        status: 500,
      }
    );
  }
}