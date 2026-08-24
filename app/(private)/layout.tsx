import Header from "@/components/layout/Header/Header";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Breadcrumbs from "@/components/layout/Breadcrumbs/Breadcrumbs";

import css from "./PrivateLayout.module.css";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className={css.wrapper}>
        <Sidebar />
        <div className={css.content}>
          <Breadcrumbs />

          {children}
        </div>
      </main>
    </>
  );
}
