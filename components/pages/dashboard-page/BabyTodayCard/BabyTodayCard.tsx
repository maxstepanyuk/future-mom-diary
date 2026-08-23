import React from "react";
import css from "./BabyTodayCard.module.css";
import Image from "next/image";
import {
  checkSessionServer,
  getWeeksPregnancyInfoPublicServer,
  getWeeksPregnancyInfoServer,
} from "@/lib/api/serverApi";

// const defaultBabyToday = {
//   image: "/images/eggs.jpg",
//   babySize: "Приблизно 12 см ",
//   babyWeight: "Близько 45 грамів",
//   babyActivity:
//     "М&#39;язи обличчя вже працюють!Малюк вчиться хмуритися, мружитись і навіть може зловити гикавку.",
//   babyDevelopment:
//     "У цей час тіло малюка починає вкриватися лануго — надзвичайно ніжним пушком, який зберігатиме тепло. Його шийка стає міцнішою, а рухи — все більш скоординованими.Хоч ви ще не відчуваєте цих кульбітів, знайте: всередині вас відбувається справжнє диво!",
// };
export default async function BabyTodayCard() {
  const isAuth = await checkSessionServer();

  let data = isAuth
    ? await getWeeksPregnancyInfoServer().catch(() => null)
    : null;
  if (!data) {
    data = await getWeeksPregnancyInfoPublicServer().catch(() => null);
  }
  const baby = data?.babyToday;

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
              src={baby?.image || ""}
              alt="plant"
              width={287}
              height={216}
            />
            <div className={css.textDescription}>
              <p className={css.text}>
                <strong>Розмір:</strong>
                {baby?.babySize}
                <br />
              </p>

              <p className={css.text}>
                <strong>Вага:</strong>
                {baby?.babyWeight}
                <br />
              </p>
              <p className={css.text}>
                <strong>Активність:</strong>
                {baby?.babyActivity}
              </p>
            </div>
          </li>
        </ul>
        <article>
          <p className={css.description}>{baby?.babyDevelopment}</p>
        </article>
      </div>
    </>
  );
}
