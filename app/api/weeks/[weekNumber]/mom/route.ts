import { NextResponse } from 'next/server';
// import { api } from '../../api';
import { cookies } from 'next/headers';
// import { logErrorResponse } from '../../_utils/utils';
import { isAxiosError } from 'axios';
import { serverApi } from '@/app/api/api';
import { logErrorResponse } from '@/app/api/_utils/utils';

type Props = {
  params: Promise<{ weekNumber: string }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { weekNumber } = await params;
    const res = await serverApi.get(`/weeks/${weekNumber}/mom`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(res.data, { status: res.status });
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
