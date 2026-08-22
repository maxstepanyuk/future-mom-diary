"use client";

import { getTasks, getWeeksPregnancyInfo } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";

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
        {/* remove demo - start */}
        <h3>/weeks/greeting</h3>
        <pre>{weekGreeting.isLoading && "tasks.isLoading"}</pre>
        <pre>{JSON.stringify(weekGreeting.data, null, "  ")}</pre>
        <hr />
        <h3>tasks</h3>
        <pre>{tasks.isLoading && "tasks.isLoading"}</pre>
        <pre>{JSON.stringify(tasks.data, null, "  ")}</pre>
        {/* remove demo - end */}
      </section>
    </>
  );
}
