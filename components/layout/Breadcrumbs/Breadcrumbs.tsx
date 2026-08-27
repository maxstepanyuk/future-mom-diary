"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Breadcrumbs.module.css";
import Icon from "@/components/common/Icon/Icon";
import { useQuery } from "@tanstack/react-query";
import { getDiaryNotes } from "@/lib/api/clientApi";
import { DiaryNote } from "@/types/diaryNote";

const labels: Record<string, string> = {
  "": "Мій день",
  journey: "Подорож",
  diary: "Щоденник",
  profile: "Профіль",
};
function isEntryId(segment: string) {
  return /^[a-f0-9]{24}$/i.test(segment);
}
export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const isDiaryEntryPage = segments[0] === "diary" && isEntryId(lastSegment);
  const { data } = useQuery({
    queryKey: ["diary"],
    queryFn: () => getDiaryNotes({ page: 1, limit: 10, sortOrder: "asc" }),
    enabled: isDiaryEntryPage,
  });
  if (pathname.startsWith("/auth")) return null;
  const notes: DiaryNote[] = data?.diaryNotes ?? [];
  const selectedNote = isDiaryEntryPage
    ? notes.find((note) => note._id === lastSegment)
    : null;
  const filteredSegments = segments.filter((segment) => !/^\d+$/.test(segment));
  const crumbs = [
    { label: "Лелека", href: "/" },
    ...(filteredSegments.length === 0
      ? [{ label: labels[""], href: "/" }]
      : filteredSegments.map((segment, index) => {
          const isLastSegment = index === filteredSegments.length - 1;
          const label =
            isLastSegment && isDiaryEntryPage
              ? (selectedNote?.title ?? "Завантаження...")
              : (labels[segment] ?? segment);
          return {
            label,
            href: "/" + filteredSegments.slice(0, index + 1).join("/"),
          };
        })),
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
                <Link
                  href={crumb.href}
                  className={css.link}
                  aria-label={crumb.label}
                >
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
