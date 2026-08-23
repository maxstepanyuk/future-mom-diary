import React from "react";
import css from "./StatusBlock.module.css";
import {
  getWeeksPregnancyInfoPublicServer,
  getWeeksPregnancyInfoServer,
} from "@/lib/api/serverApi";
import { cookies } from "next/headers";

export default async function StatusBlock() {
  const cookieStore = await cookies();
  const isAuth = cookieStore.has("accessToken");

  let data;
  if (isAuth) {
    try {
      data = await getWeeksPregnancyInfoServer();
    } catch (e) {
      data = await getWeeksPregnancyInfoPublicServer();
    }
  } else {
    data = await getWeeksPregnancyInfoPublicServer();
  }

  return (
    <div>
      <ul className={css.list}>
        <li className={css.item}>
          <p className={css.text}>Тиждень</p>
          <h3 className={css.title}>{data?.curWeekToPregnant}</h3>
        </li>
        <li className={css.item}>
          <p className={css.text}>Днів до зустрічі</p>
          <h3 className={css.title}>~{data?.daysBeforePregnant}</h3>
        </li>
      </ul>
    </div>
  );
}
