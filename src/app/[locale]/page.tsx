import { useTranslations } from 'next-intl';

function Page() {
  const t = useTranslations('MainPage');

  return (
    <div className="flex max-w-[320px] flex-col gap-5 text-lg">
      {t('title')}
    </div>
  );
}

export default Page;
