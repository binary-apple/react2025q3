'use client';

import LocaleSwitcher from '@components/LocaleSwitcher/LocaleSwitcher';
import { useTheme } from '@contexts/ThemeContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type HeaderProps = {
  mainLink: string;
  aboutLink: string;
  themeLabel: string;
};

function Header({ mainLink, aboutLink, themeLabel }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="flex w-lg flex-row justify-between py-2.5">
      <nav className="flex gap-5">
        <Link
          href="/"
          className={
            pathname === '/' ? 'text-primary cursor-default font-bold' : ''
          }
        >
          {mainLink}
        </Link>
        <Link
          href="/about"
          className={
            pathname === '/about' ? 'text-primary cursor-default font-bold' : ''
          }
        >
          {aboutLink}
        </Link>
      </nav>
      <div className="flex gap-2.5">
        <label>
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={() => toggleTheme()}
          ></input>{' '}
          {themeLabel}
        </label>
        <LocaleSwitcher />
      </div>
    </header>
  );
}

export default Header;
