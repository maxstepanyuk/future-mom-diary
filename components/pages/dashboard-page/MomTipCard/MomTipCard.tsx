import { cookies } from "next/headers";
import css from "./MomTipCard.module.css";
import {
  getWeeksPregnancyInfoPublicServer,
  getWeeksPregnancyInfoServer,
} from "@/lib/api/serverApi";

export default async function MomTipCard() {
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
    <div className={css.wrapper}>
      <h2 className={css.title}> Порада для мами</h2>
      <p className={css.text}>{data?.momHint}</p>
    </div>
  );
}
