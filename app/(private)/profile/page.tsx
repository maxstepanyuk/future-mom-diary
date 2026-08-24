import { Metadata } from "next";

import ProfileAvatar from "@/components/pages/profile-page/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/pages/profile-page/ProfileEditForm/ProfileEditForm";

import css from "./ProfilePage.module.css";

export const metadata: Metadata = {
  title: "Профіль - Лелека",
  openGraph: {
    title: "Профіль - Лелека",
  },
};

export default function ProfilePage() {
  return (
    <div className={css.container}>
      <ProfileAvatar />
      <ProfileEditForm />
    </div>
  );
}