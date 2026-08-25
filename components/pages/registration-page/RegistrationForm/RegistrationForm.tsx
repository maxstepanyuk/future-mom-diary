'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';

import css from './RegistrationForm.module.css';
import { register } from '@/lib/api/clientApi';

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Занадто коротке імʼя')
    .max(32, 'Занадто довге імʼя')
    .required('Обов’язкове поле'),

  email: Yup.string()
    .email('Некоректний email')
    .max(64, 'Занадто довгий email')
    .required('Обов’язкове поле'),

  password: Yup.string()
    .min(8, 'Пароль має бути від 8 символів')
    .max(64, 'Занадто довгий пароль')
    .required('Обов’язкове поле'),
});

const initialValues: RegisterValues = {
  name: '',
  email: '',
  password: '',
};

export default function RegistrationForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    values: RegisterValues,
    actions: FormikHelpers<RegisterValues>
  ) => {
    setIsLoading(true);

    try {
      await register(values);

      toast.success('Реєстрація успішна!');
      actions.resetForm();

      router.push('/auth/register/onboarding');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.error('Користувач з такими даними вже існує');
      } else {
        console.error(error);
        toast.error('Не вдалося зареєструватися. Спробуйте ще раз.');
      }
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
          <h1 className={css.title}>Реєстрація</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            <Form className={css.registrationForm}>
              <label className={css.label}>
                <span className={css.labelTitle}>Ім&#39;я*</span>

                <Field
                  className={css.input}
                  type="text"
                  name="name"
                  placeholder="Ваше імʼя"
                  disabled={isLoading}
                />

                <ErrorMessage
                  name="name"
                  component="span"
                  className={css.error}
                />
              </label>

              <label className={css.label}>
                <span className={css.labelTitle}>Пошта*</span>

                <Field
                  className={css.input}
                  type="email"
                  name="email"
                  placeholder="hello@leleka.com"
                  disabled={isLoading}
                />

                <ErrorMessage
                  name="email"
                  component="span"
                  className={css.error}
                />
              </label>

              <label className={css.label}>
                <span className={css.labelTitle}>Пароль*</span>

                <Field
                  className={css.input}
                  type="password"
                  name="password"
                  placeholder="********"
                  disabled={isLoading}
                />

                <ErrorMessage
                  name="password"
                  component="span"
                  className={css.error}
                />
              </label>

              <button
                className={css.registerBtn}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Реєстрація...' : 'Зареєструватись'}
              </button>
            </Form>
          </Formik>

          <p className={css.text}>
            Вже маєте аккаунт?
            <Link className={css.login} href="/auth/login">
              Увійти
            </Link>
          </p>
        </div>
      </div>

      <Image
        className={css.image}
        src="/images/leleka.jpg"
        alt="Stork's family"
        width={720}
        height={900}
        preload={true}
      />
    </div>
  );
}
