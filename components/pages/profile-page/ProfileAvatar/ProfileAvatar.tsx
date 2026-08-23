'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { ChangeEvent } from 'react';

import { updateAvatar } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import css from './ProfileAvatar.module.css';

const MAX_FILE_SIZE = 1024 * 1024;

function ProfileAvatar() {
  const inputRef = useRef<HTMLInputElement>(null);

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  function handleUploadClick() {
    inputRef.current?.click();
  }

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file || !user) {
      return;
    }

    setError('');

    if (!file.type.startsWith('image/')) {
      setError('Оберіть файл зображення.');
      event.target.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(
        'Розмір зображення не повинен перевищувати 1 МБ.'
      );

      event.target.value = '';
      return;
    }

    try {
      setIsUploading(true);

      const updatedUser = await updateAvatar(file);

      setUser({
        ...user,
        ...updatedUser,

        name: updatedUser.name ?? user.name,
        email: updatedUser.email ?? user.email,
        dueDate: updatedUser.dueDate ?? user.dueDate,
        babyGender:
          updatedUser.babyGender ?? user.babyGender,
        avatarUrl:
          updatedUser.avatarUrl ?? user.avatarUrl,
      });
    } catch {
      setError(
        'Не вдалося завантажити нове фото. Спробуйте ще раз.'
      );
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  }

  if (!user) {
    return null;
  }

  return (
    <section className={css.profileAvatar}>
      <Image
        src={
          user.avatarUrl ||
          '/images/profile/default-avatar.jpg'
        }
        alt={user.name || 'Аватар користувача'}
        width={132}
        height={132}
        className={css.avatar}
        loading="eager"
      />

      <div className={css.info}>
        <div className={css.userText}>
          <h1 className={css.name}>
            {user.name}
          </h1>

          <p className={css.email}>
            {user.email}
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className={css.fileInput}
          onChange={handleFileChange}
        />

        <button
          type="button"
          className={css.uploadButton}
          onClick={handleUploadClick}
          disabled={isUploading}
        >
          {isUploading
            ? 'Завантаження...'
            : 'Завантажити нове фото'}
        </button>

        {error && (
          <p
            className={css.error}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </section>
  );
}

export default ProfileAvatar;