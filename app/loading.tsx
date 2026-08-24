import Loader from "@/components/common/Loader/Loader";
import { Metadata } from "next";
import css from "./Loading.module.css";

export const metadata: Metadata = {
  title: "Завантаження - Лелека",
  openGraph: {
    title: "Завантаження - Лелека",
  },
};

export default function Loading() {
  return (
    <div className={css.wrapper}>
      <Loader />
    </div>
  );
}
