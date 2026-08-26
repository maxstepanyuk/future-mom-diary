import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { isAxiosError } from 'axios';

import {
  authRequest,
  type ParsedCookie,
} from '../_utils/authRequest';
import { logErrorResponse } from '../_utils/utils';

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

export async function GET(
  request: NextRequest
) {
  try {
    const page = Number(
      request.nextUrl.searchParams.get('page') ??
        1
    );

    const limit = Number(
      request.nextUrl.searchParams.get('limit') ??
        10
    );

    const sortOrder =
      request.nextUrl.searchParams.get(
        'sortOrder'
      ) ?? 'asc';

    const {
      response: apiResponse,
      setCookies,
    } = await authRequest({
      method: 'GET',
      url: '/tasks',
      params: {
        page,
        limit,
        sortOrder,
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
          response:
            error.response?.data,
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

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      response: apiResponse,
      setCookies,
    } = await authRequest({
      method: 'POST',
      url: '/tasks',
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
          response:
            error.response?.data,
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