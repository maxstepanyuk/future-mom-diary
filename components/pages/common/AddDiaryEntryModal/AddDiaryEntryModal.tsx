"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

import AddDiaryEntryForm from "../AddDiaryEntryForm/AddDiaryEntryForm";

import type { DiaryNote } from "@/types/diaryNote";

import css from "./AddDiaryEntryModal.module.css";

interface AddDiaryEntryModalProps {
  onClose: () => void;
  diaryNote?: DiaryNote;
}
export default function AddDiaryEntryModal({
  onClose,
  diaryNote,
}: AddDiaryEntryModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.closeButton} type="button" onClick={onClose}>
          <svg className={css.closeIcon}>
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        <h2 className={css.title}>
          {diaryNote ? "Редагувати запис" : "Новий запис"}
        </h2>

        <AddDiaryEntryForm diaryNote={diaryNote} onSuccess={onClose} />
      </div>
    </div>,
    document.body,
  );
}
