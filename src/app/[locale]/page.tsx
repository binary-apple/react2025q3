'use client';

import MainPage from '@pages/main';
// import { useTranslations } from 'next-intl';

function Page() {
  // const t = useTranslations('MainPage');

  return (
    <div className="flex w-full flex-col gap-5 self-baseline text-lg">
      <MainPage />
    </div>
  );
}

export default Page;
