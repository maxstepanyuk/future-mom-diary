import Link from "next/link";
import { Metadata } from "next";

import css from "./NotFound.module.css"

export const metadata: Metadata = {
  title: "Сторінку не знайдено - Лелека",
  openGraph: {
    title: "Сторінку не знайдено - Лелека",
  },
};

export default function NotFound() {
  return (
    <div className={css.wrapper}>
      <h2>Сторінку не знайдено</h2>
      <Link href="/" className={css.link}>Певернутися на головну</Link>
    </div>
  );
}
