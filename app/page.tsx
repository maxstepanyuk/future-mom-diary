import css from "./DashboardPage.module.css";
import StatusBlock from "@/components/pages/dashboard-page/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/pages/dashboard-page/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/pages/dashboard-page/MomTipCard/MomTipCard";
import FeelingCheckCard from "@/components/pages/dashboard-page/FeelingCheckCard/FeelingCheckCard";
import TaskReminderCard from "@/components/pages/common/TasksReminderCard/TasksReminderCard";
import Header from "@/components/layout/Header/Header";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Breadcrumbs from "@/components/layout/Breadcrumbs/Breadcrumbs";
import GreetingBlock from "@/components/pages/common/GreetingBlock/GreetingBlock";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мій день - Лелека",
  openGraph: {
    title: "Мій день - Лелека",
  },
};

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className={css.wrapper}>
        <Sidebar />
        <div className={css.content}>
          <Breadcrumbs />
          <GreetingBlock />
          <section>
            <div className={css.container}>
              <div className={css.leftColumn}>
                <StatusBlock />
                <BabyTodayCard />
                <MomTipCard />
              </div>
              <div className={css.rightColumn}>
                <TaskReminderCard />
                <FeelingCheckCard />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
