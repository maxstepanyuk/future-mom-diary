"use client";

import { useState } from "react";

import AddDiaryEntryModal from "@/components/pages/common/AddDiaryEntryModal/AddDiaryEntryModal";

export default function DiaryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsModalOpen(true)}>
        Новий запис
      </button>

      {isModalOpen && (
        <AddDiaryEntryModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
