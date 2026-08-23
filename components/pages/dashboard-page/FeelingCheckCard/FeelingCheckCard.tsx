"use client";

import React, { useState } from "react";
import css from "./FeelingCheckCard.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import AddDiaryEntryModal from "../../common/AddDiaryEntryModal/AddDiaryEntryModal";

export default function FeelingCheckCard() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuth = useAuthStore((state) => state.isAuthenticated);

  function handleClick() {
    if (isAuth) {
      setIsModalOpen(true);
    } else {
      router.push("/auth/register");
    }
  }

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Як ви себе почуваєте?</h2>
      <p className={css.description}>Рекомендація на сьогодні:</p>
      <p className={css.text}>Занотуйте незвичні відчуття у тілі.</p>
      <button className={css.button} onClick={handleClick}>
        Зробити запис у щоденник
      </button>
      {isModalOpen && (
        <AddDiaryEntryModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
