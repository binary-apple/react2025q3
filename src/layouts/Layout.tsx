import { NavLink, Outlet } from 'react-router';
import Flayout from '@components/Flayout';

function Layout() {
  return (
    <div className="flex flex-col gap-2.5 flex-grow items-center">
      <header className="flex flex-row justify-between w-[320px] py-2.5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'cursor-default text-primary font-bold' : ''
          }
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
            }
          }}
        >
          Main
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'cursor-default text-primary font-bold' : ''
          }
          onClick={(e) => {
            if (window.location.pathname === '/about') {
              e.preventDefault();
            }
          }}
        >
          About
        </NavLink>
      </header>
      <main className="flex gap-2.5 flex-grow items-center">
        <Outlet />
      </main>
      <section className="sticky bottom-0">
        <Flayout />
      </section>
    </div>
  );
}

export default Layout;
