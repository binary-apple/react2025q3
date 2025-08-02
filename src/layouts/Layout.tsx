import { NavLink, Outlet } from 'react-router';
import classes from './Layout.module.css';
import Flayout from '@components/Flayout';

function Layout() {
  return (
    <div className={classes.wrapper}>
      <header className={classes['header-wrapper']}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : '')}
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
          className={({ isActive }) => (isActive ? classes.active : '')}
          onClick={(e) => {
            if (window.location.pathname === '/about') {
              e.preventDefault();
            }
          }}
        >
          About
        </NavLink>
      </header>
      <main className={classes.main}>
        <Outlet />
      </main>
      <section className={classes.flayout}>
        <Flayout />
      </section>
    </div>
  );
}

export default Layout;
