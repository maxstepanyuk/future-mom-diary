import css from "./DashboardPage.module.css";
import StatusBlock from "@/components/pages/dashboard-page/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/pages/dashboard-page/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/pages/dashboard-page/MomTipCard/MomTipCard";
import FeelingCheckCard from "@/components/pages/dashboard-page/FeelingCheckCard/FeelingCheckCard";

export default function DashboardPage() {
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
      </section>
    </>
  );
}
