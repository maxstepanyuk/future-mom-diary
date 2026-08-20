// import css from './DashboardPage.module.css';
import Header from "@/components/layout/Header/Header";
import Sidebar from "@/components/layout/Sidebar/Sidebar";

export default function DashboardPage() {
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <main>
          <section>DashboardPage</section>
        </main>
      </div>
    </>
  );
}
