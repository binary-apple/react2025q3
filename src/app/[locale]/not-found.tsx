import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function NotFound() {
  const t = await getTranslations('NotFoundPage');
  return (
    <div>
      <h1>{t('title')}</h1>
      <h2>{t('subtitle')}</h2>
      <Link href="/" className="underline">
        {t('link')}
      </Link>
    </div>
  );
}
