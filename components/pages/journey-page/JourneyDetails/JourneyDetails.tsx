"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { getWeeksBabyInfo, getWeeksMomInfo } from "@/lib/api/clientApi";
import css from "./JourneyDetails.module.css";
import TaskReminderCard from "../../common/TasksReminderCard/TasksReminderCard";
import Loader from "@/components/common/Loader/Loader";

interface JourneyDetailsProps {
  weekNumber: number;
}

type TabType = "baby" | "mom";

const icons = ["icon-fork_spoon", "icon-fitness_center", "icon-chair"];

export default function JourneyDetails({ weekNumber }: JourneyDetailsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = (searchParams.get("tab") as TabType) || "baby";

  const setActiveTab = (tab: TabType) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    router.push(`${pathname}?${params.toString()}`);
  };

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
            {babyQuery.isFetching ? (
              <div className={css.loaderWrapper}>
                <Loader />
              </div>
            ) : babyQuery.isError ? (
              <p>Не вдалося завантажити дані.</p>
            ) : babyQuery.data ? (
              <div className={css.babyContent}>
                <div className={css.babyLeft}>
                  {babyQuery.data.image && (
                    <Image
                      src={babyQuery.data.image}
                      alt="Розвиток малюка"
                      width={656}
                      height={379}
                      className={css.image}
                    />
                  )}
                  <p className={css.analogy}>{babyQuery.data.analogy}</p>
                </div>
                <div className={css.babyRight}>
                  {babyQuery.data.description.map((text, index) => (
                    <p key={index} className={css.text}>
                      {text}
                    </p>
                  ))}

                  <div className={css.fact}>
                    <div className={css.factHeader}>
                      <svg className={css.factIcon} aria-hidden="true">
                        <use href="/sprite.svg#icon-star_shine" />
                      </svg>
                      <h4 className={css.factTitle}>Цікавий факт тижня</h4>
                    </div>
                    <p className={css.factText}>
                      {babyQuery.data.interestingFact}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}

        {/* ТАБ: Тіло мами */}
        {activeTab === "mom" && (
          <>
            {momQuery.isFetching ? (
              <div className={css.loaderWrapper}>
                <Loader />
              </div>
            ) : momQuery.isError ? (
              <p>Не вдалося завантажити дані.</p>
            ) : momQuery.data ? (
              <div className={css.momLayout}>
                <div className={css.momBlocks}>
                  {/* Блок "Як ви можете почуватись" */}
                  <div className={css.block}>
                    <h3 className={css.blockTitle}>Як ви можете почуватись</h3>
                    <ul className={css.statesList}>
                      {momQuery.data.feelings.states.map((state, index) => (
                        <li key={index} className={css.stateItem}>
                          {state}
                        </li>
                      ))}
                    </ul>
                    <p className={css.text}>
                      {momQuery.data.feelings.sensationDescr}
                    </p>
                  </div>

                  {/* Блок "Поради для вашого комфорту" */}
                  <div className={css.block}>
                    <h3 className={css.blockTitle}>
                      Поради для вашого комфорту
                    </h3>
                    <ul className={css.tipsList}>
                      {momQuery.data.comfortTips.map((tip, index) => (
                        <li key={index} className={css.tipItem}>
                          <div className={css.tipHeader}>
                            <svg className={css.tipIcon} aria-hidden="true">
                              <use href={`/sprite.svg#${icons[index]}`} />
                            </svg>
                            <span className={css.tipCategory}>
                              {tip.category}
                            </span>
                          </div>
                          <span className={css.tipText}>{tip.tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={css.momSidebar}>
                  <TaskReminderCard />
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
