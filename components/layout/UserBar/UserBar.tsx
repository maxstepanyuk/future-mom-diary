"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/common/Icon/Icon";
import ConfirmationModal from "@/components/pages/common/ConfirmationModal/ConfirmationModal";
import css from "./UserBar.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/lib/api/clientApi";

type UserBarProps = {
  name: string;
  email: string;
  avatarUrl?: string;
};

export default function UserBar({ name, email, avatarUrl }: UserBarProps) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const clearIsAuthenticated = useAuthStore((store) => store.clearIsAuthenticated);
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleConfirmLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearIsAuthenticated();
      queryClient.clear();
      setIsLogoutModalOpen(false);
      router.push("/");
    }
  };

  return (
    <>
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
          onClick={() => setIsLogoutModalOpen(true)}
          aria-label="Вийти з акаунту"
        >
          <Icon name="icon-logout" size={24} />
        </button>
      </div>
      {isLogoutModalOpen && (
        <ConfirmationModal
          title="Ви точно хочете вийти?"
          confirmButtonText="Так"
          cancelButtonText="Ні"
          onConfirm={handleConfirmLogout}
          onCancel={() => setIsLogoutModalOpen(false)}
        />
      )}
    </>
  );
}
