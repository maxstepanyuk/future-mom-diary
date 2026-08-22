import React from "react";
import css from "./StatusBlock.module.css";

export default function StatusBlock() {
  return (
    <>
      <div>
        <ul className={css.list}>
          <li className={css.item}>
            <p className={css.text}>Тиждень</p>
            <h3 className={css.title}>0</h3>
          </li>
          <li className={css.item}>
            <p className={css.text}>Днів до зустрічі</p>
            <h3 className={css.title}>~0</h3>
          </li>
        </ul>
      </div>
    </>
  );
}
