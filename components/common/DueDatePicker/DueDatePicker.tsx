import { useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';

import css from '../../pages/onboarding-page/OnboardingForm/OnboardingForm.module.css';
import { OnboardingValues } from '@/components/pages/onboarding-page/OnboardingForm/OnboardingForm';

interface DueDatePickerProps {
  isLoading: boolean;
}

export default function DueDatePicker({ isLoading }: DueDatePickerProps) {
  const { values, setFieldValue } = useFormikContext<OnboardingValues>();

  return (
    <DatePicker
      selected={values.dueDate ? new Date(values.dueDate) : null}
      onChange={(date: Date | null) => {
        setFieldValue('dueDate', date ? date.toISOString().split('T')[0] : '');
      }}
      dateFormat="dd.MM.yyyy"
      placeholderText="Оберіть дату"
      disabled={isLoading}
      className={css.input}
      minDate={new Date()}
    />
  );
}
