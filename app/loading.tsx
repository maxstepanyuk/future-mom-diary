import Loader from "@/components/common/Loader/Loader";
import css from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={css.wrapper}>
      <Loader />
    </div>
  );
}
