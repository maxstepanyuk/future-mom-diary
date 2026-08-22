import React from "react";
import css from "./MomTipCard.module.css";

export default function MomTipCard() {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}> Порада для мами</h2>
      <p className={css.text}>
        Не забувайте про зволоження шкіри живота та стегон спеціальними
        олійками, щоб попередити появу розтяжок.
      </p>
    </div>
  );
}
