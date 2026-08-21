'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';

import css from './OnboardingForm.module.css';
import { useAuthStore } from '@/lib/store/authStoreRENAME';
import { updateAvatar, updateMe } from '@/lib/api/clientApi';

import { BabyGender } from '@/types/user';

interface OnboardingValues {
  babyGender: BabyGender | '';
  dueDate: string;
}

const onboardingSchema = Yup.object().shape({
  babyGender: Yup.string().required('Оберіть стать'),
  dueDate: Yup.string().required('Вкажіть планову дату пологів'),
});

const initialValues: OnboardingValues = {
  babyGender: '',
  dueDate: '',
};

export default function OnboardingForm() {
  const router = useRouter();

  const setUser = useAuthStore(state => state.setUser);

  const [avatarPreview, setAvatarPreview] = useState(
    'https://ftp.goit.study/img/common/women-default-avatar.jpg'
  );

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error('Розмір фото не може перевищувати 1 MB');
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (
    values: OnboardingValues,
    actions: FormikHelpers<OnboardingValues>
  ) => {
    setIsLoading(true);

    try {
      if (!values.babyGender) {
        return;
      }

      let currentUser = await updateMe({
        babyGender: values.babyGender,
        dueDate: values.dueDate,
      });

      if (avatarFile) {
        currentUser = await updateAvatar(avatarFile);
      }

      setUser(currentUser);

      toast.success('Дані успішно збережено!');

      actions.resetForm();
      setAvatarFile(null);

      router.push('/');
    } catch (error) {
      console.error(error);

      toast.error('Не вдалося зберегти дані. Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <Link href="/" className={css.logoLink}>
          <svg className={css.logoMain} width="105" height="45">
            <use href="/logo.svg#logoMain" />
          </svg>
        </Link>

        <div className={css.wrapperForm}>
          <h1 className={css.title}>Давайте познайомимось ближче</h1>

          <div className={css.avatarContainer}>
            <div className={css.avatarPreview}>
              <Image
                src={avatarPreview}
                alt="User avatar"
                width={164}
                height={164}
                className={css.avatarImage}
                priority
              />
            </div>

            <label className={css.uploadBtn}>
              Завантажити фото
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className={css.fileInput}
                disabled={isLoading}
              />
            </label>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={onboardingSchema}
            onSubmit={handleSubmit}
          >
            <Form className={css.onboardingForm}>
              <label className={css.label}>
                <span className={css.labelTitle}>Стать дитини</span>

                <div className={css.selectWrapper}>
                  <Field
                    as="select"
                    name="babyGender"
                    className={css.select}
                    disabled={isLoading}
                  >
                    <option value="" disabled>
                      Оберіть стать
                    </option>

                    <option value="boy">Хлопчик</option>

                    <option value="girl">Дівчинка</option>

                    <option value="unknown">Ще не знаю</option>
                  </Field>

                  <svg className={css.selectIcon} width="20" height="20">
                    <use href="/sprite.svg#icon-keyboard_arrow_down" />
                  </svg>
                </div>

                <ErrorMessage
                  name="babyGender"
                  component="span"
                  className={css.error}
                />
              </label>

              <label className={css.label}>
                <span className={css.labelTitle}>Планова дата пологів</span>

                <Field
                  type="date"
                  name="dueDate"
                  className={css.input}
                  disabled={isLoading}
                />

                <ErrorMessage
                  name="dueDate"
                  component="span"
                  className={css.error}
                />
              </label>

              <button
                className={css.onboardingBtn}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Збереження...' : 'Зберегти'}
              </button>
            </Form>
          </Formik>
        </div>
      </div>

      <Image
        className={css.image}
        src="/images/plant.jpg"
        alt="Plant"
        width={720}
        height={900}
      />
    </div>
  );
}
