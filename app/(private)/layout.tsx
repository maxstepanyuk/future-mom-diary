import Header from "@/components/layout/Header/Header";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import css from "./PrivateLayout.module.css";
export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className={css.wrapper}>
        <Sidebar />
        <main>{children}</main>
      </div>
    </>
  );
}
