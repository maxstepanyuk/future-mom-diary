import Header from '@/components/layout/Header/Header';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import Breadcrumbs from '@/components/layout/Breadcrumbs/Breadcrumbs';

import css from './PrivateLayout.module.css';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({
  children,
}: PrivateLayoutProps) {
  return (
    <>
      <Header />

      <div className={css.wrapper}>
        <Sidebar />

        <main className={css.content}>
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </>
  );
}