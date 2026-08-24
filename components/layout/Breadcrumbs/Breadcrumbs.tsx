"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Breadcrumbs.module.css";
import Icon from "@/components/common/Icon/Icon";

const labels: Record<string, string> = {
  "": "Мій день",
  journey: "Подорож",
  diary: "Щоденник",
  profile: "Профіль",
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) return null;

  const segments = pathname.split("/").filter(Boolean);
  const filteredSegments = segments.filter((segment) => !/^\d+$/.test(segment));
  const crumbs = [
    { label: "Лелека", href: "/" },
    ...(filteredSegments.length === 0
      ? [{ label: labels[""], href: "/" }]
      : filteredSegments.map((segment, index) => ({
          label: labels[segment] ?? segment,
          href: "/" + filteredSegments.slice(0, index + 1).join("/"),
        }))),
  ];

  return (
    <nav className={css.breadcrumbs}>
      <ul className={css.list}>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.href + index} className={css.item}>
              {isLast ? (
                <span className={css.current}>{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className={css.link}>
                  {crumb.label}
                </Link>
              )}
              {!isLast && (
                <Icon
                  name="icon-chevron_right"
                  size={24}
                  className={css.separator}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
