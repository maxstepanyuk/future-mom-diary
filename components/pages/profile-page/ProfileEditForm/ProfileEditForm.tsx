'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select, {
  components,
  type DropdownIndicatorProps,
  type SingleValue,
} from 'react-select';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import 'react-datepicker/dist/react-datepicker.css';

import css from './ProfileEditForm.module.css';

interface GenderOption {
  value: '' | 'girl' | 'boy' | 'unknown';
  label: string;
}

interface ProfileFormValues {
  name: string;
  email: string;
  babyGender: GenderOption['value'];
  dueDate: Date | null;
}

const genderOptions: GenderOption[] = [
  { value: '', label: 'Оберіть стать' },
  { value: 'girl', label: 'Дівчинка' },
  { value: 'boy', label: 'Хлопчик' },
  { value: 'unknown', label: 'Ще не знаю' },
];

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Ім’я має містити щонайменше 2 символи')
    .max(50, 'Ім’я має містити не більше 50 символів')
    .required('Введіть ім’я'),

  email: Yup.string()
    .email('Некоректна адреса електронної пошти')
    .required('Email обов’язковий'),

  babyGender: Yup.string()
    .oneOf(
      ['girl', 'boy', 'unknown'],
      'Оберіть стать дитини'
    )
    .required('Оберіть стать дитини'),

  dueDate: Yup.date()
    .nullable()
    .required('Оберіть планову дату пологів'),
});

function ArrowIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={css.arrowIcon}
      width="20"
      height="20"
      aria-hidden="true"
    >
      <use
        href={`/sprite.svg#${
          isOpen
            ? 'icon-keyboard_arrow_up'
            : 'icon-keyboard_arrow_down'
        }`}
      />
    </svg>
  );
}

function SelectDropdownIndicator(
  props: DropdownIndicatorProps<GenderOption, false>
) {
  const isOpen = Boolean(props.selectProps.menuIsOpen);

  return (
    <components.DropdownIndicator {...props}>
      <ArrowIcon isOpen={isOpen} />
    </components.DropdownIndicator>
  );
}

function parseDueDate(date?: string | null): Date | null {
  if (!date) {
    return null;
  }

  return new Date(`${date}T00:00:00`);
}

function formatDueDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function ProfileEditForm() {
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  if (!user) {
    return null;
  }

  const initialValues: ProfileFormValues = {
    name: user.name ?? '',
    email: user.email ?? '',
    babyGender: user.babyGender ?? '',
    dueDate: parseDueDate(user.dueDate),
  };

  return (
    <Formik<ProfileFormValues>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        if (
          values.babyGender !== 'girl' &&
          values.babyGender !== 'boy' &&
          values.babyGender !== 'unknown'
        ) {
          actions.setFieldError(
            'babyGender',
            'Оберіть стать дитини'
          );

          actions.setSubmitting(false);
          return;
        }

        if (!values.dueDate) {
          actions.setFieldError(
            'dueDate',
            'Оберіть планову дату пологів'
          );

          actions.setSubmitting(false);
          return;
        }

        try {
          actions.setStatus(undefined);

          const updatedUser = await updateMe({
            name: values.name.trim(),
            babyGender: values.babyGender,
            dueDate: formatDueDate(values.dueDate),
          });

          setUser(updatedUser);

          actions.resetForm({
            values: {
              name: updatedUser.name ?? '',
              email: updatedUser.email ?? '',
              babyGender: updatedUser.babyGender ?? '',
              dueDate: parseDueDate(updatedUser.dueDate),
            },
          });
        } catch {
          actions.setStatus(
            'Не вдалося зберегти зміни. Спробуйте ще раз.'
          );
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        status,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        resetForm,
        isSubmitting,
      }) => (
        <Form className={css.form}>
          <div className={css.fieldGroup}>
            <label
              htmlFor="name"
              className={css.label}
            >
              Ім’я
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={css.input}
            />

            {touched.name && errors.name && (
              <p className={css.error}>
                {errors.name}
              </p>
            )}
          </div>

          <div className={css.fieldGroup}>
            <label
              htmlFor="email"
              className={css.label}
            >
              Пошта
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              readOnly
              aria-readonly="true"
              className={`${css.input} ${css.readonlyInput}`}
            />
          </div>

          <div className={css.fieldGroup}>
            <label
              htmlFor="babyGender"
              className={css.label}
            >
              Стать дитини
            </label>

            <Select<GenderOption, false>
              instanceId="profile-gender"
              inputId="babyGender"
              options={genderOptions}
              value={
                genderOptions.find(
                  (option) =>
                    option.value === values.babyGender
                ) ?? genderOptions[0]
              }
              onChange={(
                option: SingleValue<GenderOption>
              ) => {
                setFieldValue(
                  'babyGender',
                  option?.value ?? ''
                );
              }}
              onBlur={() => {
                setFieldTouched('babyGender', true);
              }}
              onMenuOpen={() => {
                setIsGenderOpen(true);
              }}
              onMenuClose={() => {
                setIsGenderOpen(false);
              }}
              menuIsOpen={isGenderOpen}
              isSearchable={false}
              classNamePrefix="profileSelect"
              components={{
                DropdownIndicator:
                  SelectDropdownIndicator,
              }}
            />

            {touched.babyGender &&
              errors.babyGender && (
                <p className={css.error}>
                  {errors.babyGender}
                </p>
              )}
          </div>

          <div className={css.fieldGroup}>
            <label
              htmlFor="dueDate"
              className={css.label}
            >
              Планова дата пологів
            </label>

            <div className={css.dateWrapper}>
              <DatePicker
                id="dueDate"
                selected={values.dueDate}
                onChange={(date: Date | null) => {
                  setFieldValue('dueDate', date);
                }}
                onBlur={() => {
                  setFieldTouched('dueDate', true);
                }}
                onCalendarOpen={() => {
                  setIsDateOpen(true);
                }}
                onCalendarClose={() => {
                  setIsDateOpen(false);
                }}
                dateFormat="dd.MM.yyyy"
                className={`${css.input} ${css.dateInput}`}
                wrapperClassName={
                  css.datePickerWrapper
                }
                popperClassName={css.datePopper}
              />

              <div className={css.dateArrow}>
                <ArrowIcon isOpen={isDateOpen} />
              </div>
            </div>

            {touched.dueDate && errors.dueDate && (
              <p className={css.error}>
                {errors.dueDate}
              </p>
            )}
          </div>

          {status && (
            <p
              className={css.error}
              role="alert"
            >
              {status}
            </p>
          )}

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => {
                resetForm({
                  values: {
                    name: user.name ?? '',
                    email: user.email ?? '',
                    babyGender: user.babyGender ?? '',
                    dueDate: parseDueDate(user.dueDate),
                  },
                });

                setIsGenderOpen(false);
                setIsDateOpen(false);
              }}
              disabled={isSubmitting}
            >
              Відмінити зміни
            </button>

            <button
              type="submit"
              className={css.saveButton}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Збереження...'
                : 'Зберегти зміни'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ProfileEditForm;