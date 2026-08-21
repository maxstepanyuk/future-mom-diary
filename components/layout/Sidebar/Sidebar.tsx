"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthBar from "../AuthBar/AuthBar";
import css from "./Sidebar.module.css";
import Icon from "@/components/common/Icon/Icon";
import { useMenuStore } from "@/lib/api/store/menuStore";

const navItems = [
  { label: "Мій день", href: "/", icon: "icon-today" },
  { label: "Подорож", href: "/journey", icon: "icon-conversion_path" },
  { label: "Щоденник", href: "/diary", icon: "icon-book_2" },
  { label: "Профіль", href: "/profile", icon: "icon-account_circle" },
];

export default function Sidebar() {
  const { isOpen, close } = useMenuStore();
  const pathname = usePathname();
  const isAuthenticated = false;
  return (
    <>
      {isOpen && <div className={css.overlay} onClick={close} />}

      <aside className={`${css.sidebar} ${isOpen ? css.open : ""}`}>
        <div className={css.topBar}>
          <div className={css.topMenu}>
            <Link className={css.topLogo} href="/" onClick={close}>
              <svg width={105} height={45}>
                <use href="/sprite.svg#icon-Logo" />
              </svg>
            </Link>
            <button
              type="button"
              className={css.closeBtn}
              onClick={close}
              aria-label="Закрити меню"
            >
              <Icon name="icon-close" size={32} />
            </button>
          </div>

          <nav>
            <ul className={css.navList}>
              {navItems.map(({ label, href, icon }) => {
                const isActive = pathname === href;
                return (
                  <li key={label}>
                    <Link
                      href={isAuthenticated ? href : "/auth/login"}
                      className={`${css.navLink} ${isActive ? css.active : ""}`}
                      onClick={close}
                    >
                      <Icon name={icon} size={24} />
                      <span className={css.navText}>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <AuthBar />
      </aside>
    </>
  );
}
