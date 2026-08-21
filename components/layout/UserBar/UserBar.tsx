// UserBar.tsx
"use client";

import Image from "next/image";
import Icon from "@/components/common/Icon/Icon";
import css from "./UserBar.module.css";

type UserBarProps = {
  name: string;
  email: string;
  avatarUrl?: string;
};

export default function UserBar({ name, email, avatarUrl }: UserBarProps) {
  const handleLogout = () => {
    console.log("logout clicked");
  };

  return (
    <div className={css.wrapper}>
      <div className={css.avatarWrapper}>
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            width={40}
            height={40}
            className={css.avatar}
          />
        ) : (
          <div className={css.avatarPlaceholder} />
        )}
      </div>

      <div className={css.info}>
        <p className={css.name}>{name}</p>
        <p className={css.email}>{email}</p>
      </div>

      <button
        type="button"
        className={css.logoutBtn}
        onClick={handleLogout}
        aria-label="Вийти з акаунту"
      >
        <Icon name="icon-logout" size={24} />
      </button>
    </div>
  );
}
