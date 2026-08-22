import css from "./DashboardPage.module.css";
import StatusBlock from "@/components/pages/dashboard-page/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/pages/dashboard-page/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/pages/dashboard-page/MomTipCard/MomTipCard";
import FeelingCheckCard from "@/components/pages/dashboard-page/FeelingCheckCard/FeelingCheckCard";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardPageClient from "./DashboardPage.client";
import {
  getTasksServer,
  getWeeksPregnancyInfoServer,
} from "@/lib/api/serverApi";

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  //tasks
  const TASKS_PAGE = 1;
  const TASKS_PER_PAGE = 10;
  const TASKS_SORT = "desc";
  await queryClient.prefetchQuery({
    queryKey: ["tasks", TASKS_PAGE, TASKS_PER_PAGE, TASKS_SORT],
    queryFn: () => getTasksServer(TASKS_PAGE, TASKS_PER_PAGE, TASKS_SORT),
  });

  //week
  await queryClient.prefetchQuery({
    queryKey: ["greeting"],
    queryFn: () => getWeeksPregnancyInfoServer(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DashboardPageClient />
      </HydrationBoundary>
      {/* <section>
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
      </section> */}
    </>
  );
}
