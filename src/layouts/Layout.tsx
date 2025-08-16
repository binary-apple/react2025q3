import Flayout from '@components/Flayout';
import Header from '@components/Header/Header';
import { Outlet } from 'react-router';

function Layout() {
  return (
    <div className="dark:bg-background dark:text-foreground bg-background-dark text-foreground-dark h-full w-full flex-grow">
      <div className="flex min-h-screen flex-grow flex-col items-center gap-2.5">
        <Header />
        <main className="flex flex-grow items-center gap-2.5">
          <Outlet />
        </main>
        <section className="sticky bottom-0">
          <Flayout />
        </section>
      </div>
    </div>
  );
}

export default Layout;
