"use client";

import { getTasks, getWeeksPregnancyInfo } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";

import css from "./DashboardPage.module.css";
import StatusBlock from "@/components/pages/dashboard-page/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/pages/dashboard-page/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/pages/dashboard-page/MomTipCard/MomTipCard";
import FeelingCheckCard from "@/components/pages/dashboard-page/FeelingCheckCard/FeelingCheckCard";

export default function DashboardPageClient() {
  //tasks
  const TASKS_PAGE = 1;
  const TASKS_PER_PAGE = 10;
  const TASKS_SORT = "desc";
  const tasks = useQuery({
    queryKey: ["tasks", TASKS_PAGE, TASKS_PER_PAGE, TASKS_SORT],
    queryFn: () => getTasks(TASKS_PAGE, TASKS_PER_PAGE, TASKS_SORT),
    refetchOnMount: false,
  });

  //greeting
  const weekGreeting = useQuery({
    queryKey: ["greeting"],
    queryFn: () => getWeeksPregnancyInfo(),
    refetchOnMount: false,
  });

  console.log("🚀 ~ DashboardPageClient ~ weekGreeting:", weekGreeting); // todo: remove demo
  console.log("🚀 ~ DashboardPageClient ~ tasks:", tasks); // todo: remove demo

  return (
    <>
      <section>
        <div className={css.container}>
          <div className={css.leftColumn}>
            <StatusBlock />
            <BabyTodayCard />
            <MomTipCard />
          </div>
          <div className={css.rightColumn}>
            <FeelingCheckCard />
          </div>
        </div>
        {/* todo: remove demo - start */}
        <h3>/weeks/greeting</h3>
        <pre>{weekGreeting.isLoading && "tasks.isLoading"}</pre>
        <pre>{JSON.stringify(weekGreeting.data, null, "  ")}</pre>
        <hr />
        <h3>tasks</h3>
        <pre>{tasks.isLoading && "tasks.isLoading"}</pre>
        <pre>{JSON.stringify(tasks.data, null, "  ")}</pre>
        {/* todo: remove demo - end */}
      </section>
    </>
  );
}
