import ProfileAvatar from './ProfileAvatar/ProfileAvatar';
import ProfileEditForm from './ProfileEditForm/ProfileEditForm';

import css from './ProfilePage.module.css';

const ProfilePage = () => {
  return (
    
      <div className={css.container}>

        <ProfileAvatar />

        <ProfileEditForm />
      </div>
  
  );
};

export default ProfilePage;