import Link from "next/link";

import css from "./NotFound.module.css"

export default function NotFound() {
  return (
    <div className={css.wrapper}>
      <h2>Сторінку не знайдено</h2>
      <Link href="/" className={css.link}>Певернутися на головну</Link>
    </div>
  );
}
