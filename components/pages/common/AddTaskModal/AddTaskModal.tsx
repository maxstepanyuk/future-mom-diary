import css from './AddTaskModal.module.css';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

const date = new Date();
const defaultDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

console.log(defaultDate);

interface OrderFormValues {
  taskName: string;
  taskDate: string;
}

const initialValues: OrderFormValues = {
  taskName: '',
  taskDate: defaultDate,
};
// "Дата має бути більшою або рівною поточній"
const taskFormSchema = Yup.object().shape({
  taskName: Yup.string()
    .min(1, 'Назва натотки повинна мати щонайменше 1 символ')
    .max(96, 'Назва натотки повинна бути не більше 96 символів')
    .required('Назва нотатки обов’язкова'),
  taskDate: Yup.date()
    .min(defaultDate, 'Дата має бути більшою або рівною поточній')
    .required('Дата обов’язкова'),
});

export default function AddTaskModal() {
  function submitHandler(
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) {
    console.log('Order data:', values);
    actions.resetForm();
  }

  return (
    <section className={css.section}>
      <div className={css.contentWrapper}>
        <h2 className={css.contentHeading}>Нове завдання</h2>

        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={taskFormSchema}
        >
          <Form className={css.form}>
            <label className={css.label}>
              <legend className={css.labelTitle}>Нове завдання</legend>
              <Field
                type="text"
                name="taskName"
                className={css.taskField}
                placeholder="Назва завдання"
              />
              <div className={css.errorWrapper}>
                <ErrorMessage
                  name="taskName"
                  component="span"
                  className={css.error}
                />
              </div>
            </label>

            <label className={css.label}>
              <legend className={css.labelTitle}>Дата</legend>

              <Field type="date" name="taskDate" className={css.taskField} />
              <div className={css.errorWrapper}>
                <ErrorMessage
                  name="taskDate"
                  component="span"
                  className={css.error}
                />
              </div>
            </label>

            <button type="submit" className={css.submitButton}>
              Зберегти
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
