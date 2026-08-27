import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './AddTaskModal.module.css';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { postTask } from '@/lib/api/clientApi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast'; 
import clsx from 'clsx';
interface AddTaskModalProps {
  onClose: () => void;
}
interface OrderFormValues {
  taskName: string;
  taskDate: string;
}

const date = new Date();
const defaultDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const initialValues: OrderFormValues = {
  taskName: '',
  taskDate: defaultDate,
};

const taskFormSchema = Yup.object().shape({
  taskName: Yup.string()
    .min(1, 'Назва натотки повинна мати щонайменше 1 символ')
    .max(96, 'Назва натотки повинна бути не більше 96 символів')
    .required('Назва нотатки обов’язкова'),
  taskDate: Yup.date()
    .min(defaultDate, 'Дата має бути більшою або рівною поточній')
    .required('Дата обов’язкова'),
});

export default function AddTaskModal({ onClose }: AddTaskModalProps) {
  const queryClient = useQueryClient();

  const postTaskMutation = useMutation({
    mutationFn: postTask,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  function submitHandler(
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) {
    console.log(values.taskDate);
    postTaskMutation.mutate(
      { name: values.taskName, date: values.taskDate },
      {
        onSuccess: () => {
          actions.resetForm();
          toast.success('Завдання додано');
          onClose();
        },
        onError: () => {
          toast.error('Помилка додавання завдання');
        },
      }
    );
  }

  return (
    <section className={css.section}>
      <button
        className={css.closeButton}
        type="button"
        onClick={onClose}
        aria-label="Додати завдання"
      >
        <svg className={css.iconButton} width={24} height={24}>
          <use href="/sprite.svg#icon-close" aria-hidden="true"></use>
        </svg>
      </button>
      <div className={css.contentWrapper}>
        <h2 className={css.contentHeading}>
          Нове{' '}
          <span className={css.headingDivider}>
            <br />
          </span>
          завдання
        </h2>

        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={taskFormSchema}
        >
          {({ values, setFieldValue, errors, touched, setFieldTouched }) => (
            <Form className={css.form}>
              <div className={css.fieldWrapper}>
                <label className={css.label} htmlFor="taskName">
                  Нове завдання
                </label>
                <Field
                  id={'taskName'}
                  type="text"
                  name="taskName"
                  className={clsx(
                    css.taskField,
                    touched.taskName && errors.taskName && css.fieldError
                  )}
                  placeholder="Додайте назву завдання"
                />

                <ErrorMessage
                  name="taskName"
                  component="span"
                  className={css.error}
                />
              </div>

              <div className={css.fieldWrapper}>
                <label htmlFor="taskModalDatepicker" className={css.label}>
                  Дата
                </label>
                <div className={css.dateWrapper}>
                  <DatePicker
                    id="taskModalDatepicker"
                    selected={
                      values.taskDate
                        ? new Date(values.taskDate)
                        : new Date(defaultDate)
                    }
                    onChange={async (data: Date | null) => {
                      await setFieldValue(
                        'taskDate',
                        data
                          ? `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`
                          : defaultDate
                      );
                      await setFieldTouched('taskDate', true);
                    }}
                    className={clsx(
                      css.taskField,
                      touched.taskDate && errors.taskDate && css.fieldError
                    )}
                    dateFormat="dd.MM.yyyy"
                    wrapperClassName={css.datePickerWrapper}
                    minDate={date}
                  />
                </div>
                <ErrorMessage
                  name="taskDate"
                  component="span"
                  className={css.error}
                />
              </div>

              <button
                disabled={Boolean(errors.taskDate || errors.taskName)}
                type="submit"
                className={css.submitButton}

                // className={clsx(
                //   css.submitButton,
                //   ((touched.taskName && errors.taskName) ||
                //     (touched.taskDate && errors.taskDate && css.fieldError)) &&
                //     css.submitButtonDisabled
                // )}
              >
                Зберегти
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
