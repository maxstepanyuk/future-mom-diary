import Image from 'next/image';

import css from './ProfileAvatar.module.css';

function ProfileAvatar(){
  return (
    <section className={css.profileAvatar}>
      <Image
        src="/images/profile/default-avatar.jpg"
        alt="Ганна"
        width={132}
        height={132}
        className={css.avatar}
      />

      <div className={css.info}>
        <div className={css.userText}>
          <h1 className={css.name}>Ганна</h1>
          <p className={css.email}>hanna@gmail.com</p>
        </div>

        <button
          type="button"
          className={css.uploadButton}
        >
          Завантажити нове фото
        </button>
      </div>
    </section>
  );
};

export default ProfileAvatar;