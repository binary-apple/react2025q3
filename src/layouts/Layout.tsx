import Flayout from '@components/Flayout';
import { useTheme } from '@contexts/ThemeContext';
import { NavLink, Outlet } from 'react-router';

function Layout() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="dark:bg-background dark:text-foreground bg-background-dark text-foreground-dark h-full w-full flex-grow">
      <div className="flex min-h-screen flex-grow flex-col items-center gap-2.5">
        <header className="flex w-[320px] flex-row justify-between py-2.5">
          <nav className="flex gap-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-primary cursor-default font-bold' : ''
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
                isActive ? 'text-primary cursor-default font-bold' : ''
              }
              onClick={(e) => {
                if (window.location.pathname === '/about') {
                  e.preventDefault();
                }
              }}
            >
              About
            </NavLink>
          </nav>
          <label>
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={() => toggleTheme()}
            ></input>{' '}
            Dark mode
          </label>
        </header>
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
