import React from "react";
import BabyTodayCard from "../BabyTodayCard/BabyTodayCard";
import StatusBlock from "../StatusBlock/StatusBlock";
import MomTipCard from "../MomTipCard/MomTipCard";
import FeelingCheckCard from "../FeelingCheckCard/FeelingCheckCard";
import css from "./DashboardPageWrapper.module.css";

export default function DashboardPageWrapper() {
  return (
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
  );
}
