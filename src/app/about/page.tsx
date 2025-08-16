import '../../index.css';
import { useTranslations } from 'next-intl';

function Page() {
  const t = useTranslations('MainPage');
  return (
    <div className="flex max-w-[320px] flex-col gap-5 text-lg">
      <div>
        {t('about')} <br />
        {t('github')}{' '}
        <a
          href="https://github.com/binary-apple"
          target="blank"
          className="underline"
        >
          {t('link1')}
        </a>
        .
      </div>
      <div>
        {t('schoolData')}{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="blank"
          className="underline"
        >
          {t('link2')}
        </a>
      </div>
    </div>
  );
}

export default Page;
