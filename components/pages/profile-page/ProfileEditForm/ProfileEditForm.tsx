'use client';

import { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import css from './ProfileEditForm.module.css';

const genderOptions = [
  { value: '', label: 'Оберіть стать' },
  { value: 'girl', label: 'Дівчинка' },
  { value: 'boy', label: 'Хлопчик' },
  { value: 'unknown', label: 'Ще не знаю' },
];

const ProfileEditForm = () => {
  const [dueDate, setDueDate] = useState<Date | null>(
    new Date(2025, 6, 16)
  );

  return (
    <form className={css.form}>
      <div className={css.fieldGroup}>
        <label htmlFor="name" className={css.label}>
          Ім’я
        </label>

        <input
          id="name"
          type="text"
          defaultValue="Ганна"
          className={css.input}
        />
      </div>

      <div className={css.fieldGroup}>
        <label htmlFor="email" className={css.label}>
          Пошта
        </label>

        <input
          id="email"
          type="email"
          defaultValue="hanna@gmail.com"
          className={css.input}
        />
      </div>

      <div className={css.fieldGroup}>
        <label className={css.label}>
          Стать дитини
        </label>

        <Select
          options={genderOptions}
          defaultValue={genderOptions[0]}
          isSearchable={false}
          classNamePrefix="profileSelect"
        />
      </div>

      <div className={css.fieldGroup}>
        <label htmlFor="dueDate" className={css.label}>
          Планова дата пологів
        </label>

        <div className={css.dateWrapper}>
          <DatePicker
            id="dueDate"
            selected={dueDate}
            onChange={(date: Date | null) => setDueDate(date)}
            dateFormat="dd.MM.yyyy"
            className={`${css.input} ${css.dateInput}`}
            wrapperClassName={css.datePickerWrapper}
            popperClassName={css.datePopper}
          />

          <svg
            className={css.dateChevron}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.922 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z" />
          </svg>
        </div>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
        >
          Відмінити зміни
        </button>

        <button
          type="button"
          className={css.saveButton}
        >
          Зберегти зміни
        </button>
      </div>
    </form>
  );
};

export default ProfileEditForm;