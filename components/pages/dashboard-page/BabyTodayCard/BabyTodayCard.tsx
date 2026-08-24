import React from "react";
import css from "./BabyTodayCard.module.css";
import Image from "next/image";
import {
  checkSessionServer,
  getWeeksPregnancyInfoPublicServer,
  getWeeksPregnancyInfoServer,
} from "@/lib/api/serverApi";
import { cookies } from "next/headers";

export default async function BabyTodayCard() {
  const cookieStore = await cookies();
  const isAuth = cookieStore.get("accessToken");
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
    <>
      <div className={css.wrapper}>
        <ul className={css.list}>
          <li>
            <h2 className={css.title}>Малюк сьогодні</h2>
          </li>
          <li className={css.content}>
            <Image
              className={css.image}
              src={data.babyToday.image || ""}
              alt="plant"
              width={287}
              height={216}
              preload={true}
            />
            <div className={css.textDescription}>
              <p className={css.text}>
                <strong>Розмір:</strong> Приблизно {data.babyToday.babySize} см.
                <br />
              </p>

              <p className={css.text}>
                <strong>Вага:</strong> Близько {data.babyToday.babyWeight}{" "}
                грамів.
                <br />
              </p>
              <p className={css.text}>
                <strong>Активність:</strong>
                {data.babyToday?.babyActivity}
              </p>
            </div>
          </li>
        </ul>
        <article>
          <p className={css.description}>{data.babyToday?.babyDevelopment}</p>
        </article>
      </div>
    </>
  );
}
