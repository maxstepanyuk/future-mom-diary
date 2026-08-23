import {
  GetDiaryNotesResponse,
  GetEmotionsResponse,
  GetTasksResponse,
  GetWeeksBabyInfoResponse,
  GetWeeksMomInfoResponse,
  GetWeeksPregnancyInfoResponse,
} from "@/types/responses";
import { serverApi } from "@/app/api/api";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export async function checkSessionServer() {
  const cookieStore = await cookies();
  const res = await serverApi.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export async function getMeServer(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await serverApi.get<User>("/users/current", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function getTasksServer(
  page: number,
  perPage: number,
  sortOrder?: "asc" | "desc",
): Promise<GetTasksResponse> {
  const cookieStore = await cookies();
  const response = await serverApi.get<GetTasksResponse>("/tasks", {
    params: {
      page,
      limit: perPage,
      sortOrder,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function getEmotionsServer(
  page: number,
  perPage?: number,
): Promise<GetEmotionsResponse> {
  const cookieStore = await cookies();
  const response = await serverApi.get<GetEmotionsResponse>("/emotions", {
    params: {
      page,
      limit: perPage,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function getDiaryNotesServer(
  page: number,
  perPage?: number,
  sortOrder?: "asc" | "desc",
): Promise<GetDiaryNotesResponse> {
  const cookieStore = await cookies();
  const response = await serverApi.get<GetDiaryNotesResponse>("/diary", {
    params: {
      page,
      limit: perPage,
      sortOrder,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function getWeeksPregnancyInfoServer(): Promise<GetWeeksPregnancyInfoResponse> {
  const cookieStore = await cookies();

  const response = await serverApi.get<GetWeeksPregnancyInfoResponse>(
    "/weeks/greeting",
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );
  return response.data;
}

export async function getWeeksPregnancyInfoPublicServer(): Promise<GetWeeksPregnancyInfoResponse> {
  const cookieStore = await cookies();
  const response = await serverApi.get<GetWeeksPregnancyInfoResponse>(
    "/weeks/greeting/public",
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );
  return response.data;
}

<<<<<<< HEAD
export async function getWeeksBabyInfoServer(
  weekNumber: number,
): Promise<GetWeeksBabyInfoResponse> {
  const cookieStore = await cookies();
  const response = await serverApi.get<GetWeeksBabyInfoResponse>(
=======
export async function getWeeksBabyInfoServer(weekNumber: number) {
  const cookieStore = await cookies();
  const response = await nextApi.get<GetWeeksBabyInfoResponse>(
>>>>>>> main
    `/weeks/${weekNumber}/baby`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );
  return response.data;
}

export async function getWeeksMomInfoServer(
  weekNumber: number,
): Promise<GetWeeksMomInfoResponse> {
  const cookieStore = await cookies();
<<<<<<< HEAD
  const response = await serverApi.get<GetWeeksMomInfoResponse>(
=======
  const response = await nextApi.get<GetWeeksMomInfoResponse>(
>>>>>>> main
    `/weeks/${weekNumber}/mom`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );
  return response.data;
}
