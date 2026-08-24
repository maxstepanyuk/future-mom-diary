import ProfileAvatar from "@/components/pages/profile-page/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/pages/profile-page/ProfileEditForm/ProfileEditForm";

import css from "./ProfilePage.module.css";

export default function ProfilePage() {
  return (
    <div className={css.container}>
      <ProfileAvatar />
      <ProfileEditForm />
    </div>
  );
}
