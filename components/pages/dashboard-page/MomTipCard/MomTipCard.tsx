import css from "./MomTipCard.module.css";
import {
  checkSessionServer,
  getWeeksPregnancyInfoPublicServer,
  getWeeksPregnancyInfoServer,
} from "@/lib/api/serverApi";

export default async function MomTipCard() {
  const isAuth = await checkSessionServer().catch(() => null);
  let weekData = isAuth
    ? await getWeeksPregnancyInfoServer().catch(() => null)
    : null;
  if (!weekData) {
    weekData = await getWeeksPregnancyInfoPublicServer().catch(() => null);
  }
  const currentWeek = weekData?.curWeekToPregnant;

  if (!currentWeek) {
    return null;
  }
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}> Порада для мами</h2>
      <p className={css.text}>{weekData?.momHint}</p>
    </div>
  );
}
