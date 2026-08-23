"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./GreetingBlock.module.css";

export default function GreetingBlock() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className={css.greeting}>
      <h2 className={css.title}>
        {user ? `Вітаю, ${user.name}!` : "Вітаємо!"}
      </h2>
    </div>
  );
}
