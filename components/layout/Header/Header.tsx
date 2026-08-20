"use client";
import css from "./Header.module.css";
import Link from "next/link";
import Icon from "@/components/common/Icon/Icon";
import { useMenuStore } from "@/lib/api/store/menuStore";

export default function Header() {
  const toggle = useMenuStore((state) => state.toggle);

  return (
    <header className={css.header}>
      <Link href="/" className={css.logo}>
        <svg width={84} height={36}>
          <use href="/sprite.svg#icon-Logo" />
        </svg>
      </Link>

      <button
        type="button"
        className={css.burgerBtn}
        onClick={toggle}
        aria-label="Відкрити меню"
      >
        <Icon name="icon-menu" size={32} />
      </button>
    </header>
  );
}
