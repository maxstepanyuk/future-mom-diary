import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./AddTaskModal.module.css";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { postTask } from "@/lib/api/clientApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface AddTaskModalProps {
  onClose: () => void;
}
interface OrderFormValues {
  taskName: string;
  taskDate: string;
}

const date = new Date();
const defaultDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

console.log(defaultDate);

const initialValues: OrderFormValues = {
  taskName: "",
  taskDate: defaultDate,
};

const taskFormSchema = Yup.object().shape({
  taskName: Yup.string()
    .min(1, "Назва натотки повинна мати щонайменше 1 символ")
    .max(96, "Назва натотки повинна бути не більше 96 символів")
    .required("Назва нотатки обов’язкова"),
  taskDate: Yup.date()
    .min(defaultDate, "Дата має бути більшою або рівною поточній")
    .required("Дата обов’язкова"),
});

export default function AddTaskModal({ onClose }: AddTaskModalProps) {
  const queryClient = useQueryClient();

  const postTaskMutation = useMutation({
    mutationFn: postTask,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", 1] });
    },
  });

  function submitHandler(
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>,
  ) {
    postTaskMutation.mutate(
      { name: values.taskName, date: values.taskDate },
      {
        onSuccess: () => {
          actions.resetForm();
        },
      },
    );
    actions.resetForm();
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
          Нове{" "}
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
          {({ values, setFieldValue }) => (
            <Form className={css.form}>
              <label className={css.label}>
                <legend className={css.labelTitle}>Нове завдання</legend>
                <Field
                  type="text"
                  name="taskName"
                  className={css.taskField}
                  placeholder="Назва завдання"
                />

                <ErrorMessage
                  name="taskName"
                  component="span"
                  className={css.error}
                />
              </label>

              <label className={css.label}>
                <legend className={css.labelTitle}>Дата</legend>

                <div className={css.dateWrapper}>
                  <DatePicker
                    selected={
                      values.taskDate ? new Date(values.taskDate) : null
                    }
                    onChange={(data: Date | null) =>
                      setFieldValue("taskDate", data)
                    }
                    className={`${css.taskField} ${css.dataFile}`}
                    dateFormat="yyyy.MM.dd"
                    wrapperClassName={css.datePickerWrapper}
                  />
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
          )}
        </Formik>
      </div>
    </section>
  );
}
