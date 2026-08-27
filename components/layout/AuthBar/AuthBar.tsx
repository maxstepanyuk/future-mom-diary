"use client";
import Link from "next/link";
import css from "./AuthBar.module.css";
import { useMenuStore } from "@/lib/store/menuStore";

export default function AuthBar() {
  const close = useMenuStore((state) => state.close);
  return (
    <div className={css.wrapper}>
      <Link
        href="/auth/register"
        className={css.registerLink}
        onClick={close}
        aria-label="Зареєструватися"
      >
        Зареєструватися
      </Link>
      <Link
        href="/auth/login"
        className={css.loginLink}
        onClick={close}
        aria-label="Увійти"
      >
        Увійти
      </Link>
    </div>
  );
}
