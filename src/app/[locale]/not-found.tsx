import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('NotFoundPage');
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
