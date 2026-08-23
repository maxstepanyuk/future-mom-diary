import React from "react";
import css from "./StatusBlock.module.css";
import {
  checkSessionServer,
  getWeeksPregnancyInfoPublicServer,
  getWeeksPregnancyInfoServer,
} from "@/lib/api/serverApi";

export default async function StatusBlock() {
  const isAuth = await checkSessionServer();
  let data = isAuth
    ? await getWeeksPregnancyInfoServer().catch(() => null)
    : null;
  if (!data) {
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
