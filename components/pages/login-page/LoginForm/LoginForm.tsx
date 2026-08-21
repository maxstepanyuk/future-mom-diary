'use client';
import css from './LoginForm.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface LoginValues {
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некоректний email')
    .max(64, 'Занадто довгий email')
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, 'Пароль має бути від 8 символів')
    .max(64, 'Занадто довгий пароль')
    .required("Обов'язкове поле"),
});

const initialValues: LoginValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const handleSubmit = (
    values: LoginValues,
    actions: FormikHelpers<LoginValues>
  ) => {
    console.log('Login data:', values);
    //Запит на бек
    actions.resetForm();
  };
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <Link href="/" className={css.logoLink}>
          <svg className={css.logoMain} width="105" height="45">
            <use href="/logo.svg#logoMain"></use>
          </svg>
        </Link>
        <div className={css.wrapperForm}>
          <h1 className={css.title}>Вхід</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            <Form className={css.registrationForm}>
              <label className={css.label}>
                <span className={css.visuallyHidden}>Пошта</span>
                <Field
                  className={css.input}
                  type="email"
                  name="email"
                  placeholder="Пошта"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={css.error}
                />
              </label>

              <label className={css.label}>
                <span className={css.visuallyHidden}>Пароль</span>
                <Field
                  className={css.input}
                  type="password"
                  name="password"
                  placeholder="Пароль"
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className={css.error}
                />
              </label>

              <button className={css.loginBtn} type="submit">
                Увійти
              </button>
            </Form>
          </Formik>
          <p className={css.text}>
            Немає аккаунту?
            <Link className={css.login} href="/auth/register">
              Зареєструватися
            </Link>
          </p>
        </div>
      </div>
      <Image
        className={css.image}
        src="/images/eggs.jpg"
        alt="Stork's eggs"
        width={720}
        height={900}
      />
    </div>
  );
}
