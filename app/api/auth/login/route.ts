import { NextRequest, NextResponse } from 'next/server';
import { serverApi } from '../../api';
import { cookies } from 'next/headers';
import { parseSetCookie } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await serverApi.post('auth/login', body);

    const cookieStore = await cookies();
    const setCookie = apiRes.headers['set-cookie'];

    //!!!!!
    console.log(`ApiRes: ${setCookie}`);

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parseSetCookie(cookieStr);

        //!!!!
        console.log(`parsed.value: ${parsed.value}`);

        if (parsed.value) {
          cookieStore.set(parsed.name, parsed.value, parsed);

          //!!!
          console.log(`CookieStore: ${cookieStore}`);
        }
      }
      //!!!
      console.log(`CookieStoreBeforeReturn: ${cookieStore}`);
      return NextResponse.json(apiRes.data, {
        status: apiRes.status,
        // headers: {
        //   Cookie: cookieStore.toString(),
        // },
      });
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
