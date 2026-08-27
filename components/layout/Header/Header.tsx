"use client";
import css from "./Header.module.css";
import Link from "next/link";
import Icon from "@/components/common/Icon/Icon";
import { useMenuStore } from "@/lib/store/menuStore";
import { usePathname } from "next/navigation";

export default function Header() {
  const { toggle, close, isOpen } = useMenuStore();
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");
  if (isAuthPage) return null;

  return (
    <header className={css.header}>
      <Link
        href="/"
        className={css.logo}
        onClick={close}
        aria-label="Перейти на головну"
      >
        <svg width={84} height={36}>
          <use href="/sprite.svg#icon-Logo" />
        </svg>
      </Link>

      <button
        type="button"
        className={css.burgerBtn}
        onClick={toggle}
        aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
      >
        <Icon name="icon-menu" size={32} />
      </button>
    </header>
  );
}
