"use client";

import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import Select, { components, type OptionProps } from "react-select";
import * as Yup from "yup";

import {
  getEmotions,
  postDiaryNote,
  updateDiaryNote,
} from "@/lib/api/clientApi";

import type { DiaryNote } from "@/types/diaryNote";
import type { Emotion } from "@/types/emotion";

import css from "../AddDiaryEntryModal/AddDiaryEntryModal.module.css";

interface AddDiaryEntryFormProps {
  diaryNote?: DiaryNote;
  onSuccess: () => void;
}

interface DiaryFormValues {
  title: string;
  emotions: Emotion[];
  description: string;
}

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Введіть заголовок"),
  emotions: Yup.array().min(1, "Оберіть хоча б одну категорію"),
  description: Yup.string().trim().required("Введіть текст запису"),
});

function EmotionOption(props: OptionProps<Emotion, true>) {
  return (
    <components.Option {...props}>
      <span
        className={`${css.checkbox} ${
          props.isSelected ? css.checkboxChecked : ""
        }`}
      >
        {props.isSelected && (
          <svg
            className={css.checkboxIcon}
            viewBox="0 0 18 18"
            aria-hidden="true"
          >
            <path d="M3.5 9L7.2 12.5L14.5 5" />
          </svg>
        )}
      </span>

      {props.label}
    </components.Option>
  );
}

export default function AddDiaryEntryForm({
  diaryNote,
  onSuccess,
}: AddDiaryEntryFormProps) {
  const queryClient = useQueryClient();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isLoadingEmotions,
  } = useInfiniteQuery({
    queryKey: ["emotions"],
    queryFn: ({ pageParam }) => getEmotions(pageParam, 10),
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;

      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
  });

  const emotions = data?.pages.flatMap((page) => page.emotions) ?? [];

  const mutation = useMutation({
    mutationFn: (values: DiaryFormValues) => {
      const diaryData = {
        title: values.title,
        description: values.description,
        emotions: values.emotions.map((emotion) => emotion._id),
      };

      if (diaryNote) {
        return updateDiaryNote(diaryNote._id, diaryData);
      }

      return postDiaryNote(diaryData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["diary"],
      });

      onSuccess();
    },

    onError: () => {
      toast.error("Не вдалося зберегти запис");
    },
  });

  return (
    <Formik
      initialValues={{
        title: diaryNote?.title ?? "",
        emotions: diaryNote?.emotions ?? [],
        description: diaryNote?.description ?? "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        mutation.mutate(values);
      }}
    >
      {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
        <Form className={css.form}>
          <div className={css.field}>
            <label className={css.label} htmlFor="diary-title">
              Заголовок
            </label>

            <Field
              className={`${css.input} ${
                touched.title && errors.title ? css.invalid : ""
              }`}
              id="diary-title"
              name="title"
              type="text"
              placeholder="Введіть заголовок запису"
            />

            <ErrorMessage className={css.error} name="title" component="span" />
          </div>

          <div className={css.field}>
            <span className={css.label}>Категорії</span>

            <Select<Emotion, true>
              options={emotions}
              value={values.emotions}
              isMulti
              isClearable={false}
              isSearchable={false}
              isLoading={isLoadingEmotions}
              closeMenuOnSelect={false}
              blurInputOnSelect={false}
              captureMenuScroll={true}
              hideSelectedOptions={false}
              maxMenuHeight={204}
              placeholder="Оберіть категорію"
              noOptionsMessage={() => "Категорій немає"}
              classNamePrefix="diarySelect"
              className={
                touched.emotions && errors.emotions ? css.selectError : ""
              }
              getOptionLabel={(emotion) => emotion.title}
              getOptionValue={(emotion) => emotion._id}
              onChange={(emotions) => setFieldValue("emotions", [...emotions])}
              onBlur={() => setFieldTouched("emotions", true)}
              onMenuScrollToBottom={() => {
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
              components={{ Option: EmotionOption }}
            />

            <ErrorMessage
              className={css.error}
              name="emotions"
              component="span"
            />
          </div>

          <div className={css.field}>
            <label className={css.label} htmlFor="diary-description">
              Запис
            </label>

            <Field
              as="textarea"
              className={`${css.textarea} ${
                touched.description && errors.description ? css.invalid : ""
              }`}
              id="diary-description"
              name="description"
              placeholder="Запишіть, як ви себе відчуваєте"
            />

            <ErrorMessage
              className={css.error}
              name="description"
              component="span"
            />
          </div>

          <button
            className={css.submitButton}
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Збереження..." : "Зберегти"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
