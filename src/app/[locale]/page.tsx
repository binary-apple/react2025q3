'use client';

import MainPage from '@pages/main';
// import { useTranslations } from 'next-intl';

function Page() {
  // const t = useTranslations('MainPage');

  return (
    <div className="flex max-w-[320px] flex-col gap-5 text-lg">
      <MainPage />
    </div>
  );
}

export default Page;
