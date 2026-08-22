"use client";

import React from "react";
import css from "./FeelingCheckCard.module.css";

export default function FeelingCheckCard() {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Як ви себе почуваєте?</h2>
      <p className={css.description}>Рекомендація на сьогодні:</p>
      <p className={css.text}>Занотуйте незвичні відчуття у тілі.</p>
      <button className={css.button}>Зробити запис у щоденник</button>
    </div>
  );
}
