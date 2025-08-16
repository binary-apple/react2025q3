import { useTheme } from '@contexts/ThemeContext';
import { NavLink } from 'react-router';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
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
  );
}

export default Header;
