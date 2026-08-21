'use client';
import Link from 'next/link';
import css from './RegistrationForm.module.css';
import Image from 'next/image';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
  const handleSubmit = (
    values: RegisterValues,
    actions: FormikHelpers<RegisterValues>
  ) => {
    console.log('Register data:', values);
    //Запит на бек
    actions.resetForm();
  };
  return (
    <>
      <div className={css.wrapper}>
        <div className={css.container}>
          <Link href="/" className={css.logoLink}>
            <svg className={css.logoMain} width="105" height="45">
              <use href="/logo.svg#logoMain"></use>
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
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className={css.error}
                  />
                </label>

                <button className={css.registerBtn} type="submit">
                  Зареєструватись
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
        />
      </div>
    </>
  );
}
