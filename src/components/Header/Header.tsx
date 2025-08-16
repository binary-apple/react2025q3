'use client';

import { useTheme } from '@contexts/ThemeContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="flex w-[320px] flex-row justify-between py-2.5">
      <nav className="flex gap-5">
        <Link
          href="/"
          className={
            pathname === '/' ? 'text-primary cursor-default font-bold' : ''
          }
        >
          Main
        </Link>
        <Link
          href="/about"
          className={
            pathname === '/about' ? 'text-primary cursor-default font-bold' : ''
          }
        >
          About
        </Link>
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
