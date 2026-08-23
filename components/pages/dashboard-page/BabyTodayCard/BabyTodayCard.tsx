import React from "react";
import css from "./BabyTodayCard.module.css";
import Image from "next/image";

export default function BabyTodayCard() {
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
              src="/images/plant.jpg"
              alt="plant"
              width={287}
              height={216}
            />
            <div className={css.textDescription}>
              <p className={css.text}>
                <strong>Розмір:</strong>Приблизно 12 см <br />
              </p>

              <p className={css.text}>
                <strong>Вага:</strong> Близько 45 грамів
                <br />
              </p>
              <p className={css.text}>
                <strong>Активність:</strong> М&#39;язи обличчя вже працюють!
                Малюк вчиться хмуритися, мружитись і навіть може зловити
                гикавку.
              </p>
            </div>
          </li>
        </ul>
        <article>
          <p className={css.description}>
            У цей час тіло малюка починає вкриватися лануго — надзвичайно ніжним
            пушком, який зберігатиме тепло. Його шийка стає міцнішою, а рухи —
            все більш скоординованими. Хоч ви ще не відчуваєте цих кульбітів,
            знайте: всередині вас відбувається справжнє диво!
          </p>
        </article>
      </div>
    </>
  );
}
