"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getWeeksBabyInfo, getWeeksMomInfo } from "@/lib/api/clientApi";
import css from "./JourneyDetails.module.css";

interface JourneyDetailsProps {
  weekNumber: number;
}

type TabType = "baby" | "mom";

export default function JourneyDetails({ weekNumber }: JourneyDetailsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("baby");

  const babyQuery = useQuery({
    queryKey: ["week", weekNumber, "baby"],
    queryFn: () => getWeeksBabyInfo(weekNumber),
    enabled: activeTab === "baby",
  });
  
  const momQuery = useQuery({
    queryKey: ["week", weekNumber, "mom"],
    queryFn: () => getWeeksMomInfo(weekNumber),
    enabled: activeTab === "mom",
  });
  
  return (
    <div className={css.container}>
      <div className={css.tabs}>
        <button
          className={activeTab === "baby" ? css.tabActive : css.tab}
          onClick={() => setActiveTab("baby")}
        >
          Розвиток малюка
        </button>
        <button
          className={activeTab === "mom" ? css.tabActive : css.tab}
          onClick={() => setActiveTab("mom")}
        >
          Тіло мами
        </button>
      </div>

      <div className={css.content}>
        {/* ТАБ: Розвиток малюка */}
        {activeTab === "baby" && (
          <>
            {babyQuery.isLoading && <p>Завантаження...</p>}
            {babyQuery.isError && <p>Не вдалося завантажити дані.</p>}
            {babyQuery.data && (
              <div className={css.babyContent}>
                {babyQuery.data.image && (
                  <Image
                    src={babyQuery.data.image}
                    alt="Розвиток малюка"
                    width={300}
                    height={300}
                    className={css.image}
                  />
                )}
                <p className={css.analogy}>{babyQuery.data.analogy}</p>
                {babyQuery.data.description.map((text, index) => (
                  <p key={index} className={css.text}>
                    {text}
                  </p>
                ))}
                <p className={css.fact}>{babyQuery.data.interestingFact}</p>
              </div>
            )}
          </>
        )}

        {/* ТАБ: Тіло мами */}
        {activeTab === "mom" && (
          <>
            {momQuery.isLoading && <p>Завантаження...</p>}
            {momQuery.isError && <p>Не вдалося завантажити дані.</p>}
            {momQuery.data && (
              <div className={css.momContent}>
                {/* Блок "Як ви можете почуватись" */}
                <div className={css.block}>
                  <h3 className={css.blockTitle}>Як ви можете почуватись</h3>
                  <p className={css.text}>
                    {momQuery.data.feelings.sensationDescr}
                  </p>
                  <ul className={css.list}>
                    {momQuery.data.feelings.states.map((state, index) => (
                      <li key={index} className={css.listItem}>
                        {state}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Блок "Поради для вашого комфорту" */}
                <div className={css.block}>
                  <h3 className={css.blockTitle}>Поради для вашого комфорту</h3>
                  <ul className={css.list}>
                    {momQuery.data.comfortTips.map((tip, index) => (
                      <li key={index} className={css.listItem}>
                        <span className={css.tipCategory}>{tip.category}</span>
                        <span className={css.tipText}>{tip.tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
