"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./WeekSelector.module.css";

interface WeekSelectorProps {
  activeWeek: number;
}

const TOTAL_WEEKS = 42;

export default function WeekSelector({ activeWeek }: WeekSelectorProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const currentWeek = user?.curWeekNumber ?? 1;

  const activeRef = useRef<HTMLButtonElement>(null);

  const weeks = [];
  for (let i = 1; i <= TOTAL_WEEKS; i++) {
    weeks.push(i);
  }

  const handleWeekClick = (week: number) => {
    if (week > currentWeek) return;
    router.push(`/journey/${week}`);
  };

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeWeek]);

  return (
    <div className={css.selector}>
      {weeks.map((week) => {
        const isFuture = week > currentWeek;
        const isActive = week === activeWeek;
        const isPast = week <= currentWeek;

        return (
          <button
            key={week}
            ref={isActive ? activeRef : null}
            className={`${css.week} ${isPast ? css.weekPast : ""} ${isActive ? css.weekActive : ""} ${isFuture ? css.weekFuture : ""}`}
            onClick={() => handleWeekClick(week)}
            disabled={isFuture}
          >
            <span className={css.weekNumber}>{week}</span>
            <span className={css.weekLabel}>Тиждень</span>
          </button>
        );
      })}
    </div>
  );
}
