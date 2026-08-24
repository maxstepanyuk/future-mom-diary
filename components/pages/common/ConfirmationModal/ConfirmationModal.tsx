"use client";

import Modal from "@/components/common/Modal/Modal";
import Icon from "@/components/common/Icon/Icon";
import css from "./ConfirmationModal.module.css";

interface ConfirmationModalProps {
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <Modal onClose={onCancel}>
      <div className={css.content}>
        <button
          type="button"
          className={css.closeButton}
          onClick={onCancel}
          aria-label="Закрити модальне вікно"
        >
          <Icon name="icon-close" size={20} />
        </button>

        <h2 className={css.title}>{title}</h2>

        <div className={css.actions}>
          <button type="button" onClick={onCancel} className={css.btnCancel}>
            {cancelButtonText}
          </button>
          <button type="button" onClick={onConfirm} className={css.btnConfirm}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
