'use client';

import Button from '@components/Button';
import Loader from '@components/Loader';
import { REFETCH_INTERVAL_SECONDS } from '@constants/index';
import { useGetCharacterByIdQuery } from '@services/potterApi';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const imageStyle = {
  borderRadius: '10px',
};

function DetailsView() {
  const t = useTranslations('MainPage');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const idParam = searchParams?.get('details');
  const expandedId = idParam ? +idParam : null;

  const onCloseClick = () => {
    const params = new URLSearchParams(String(searchParams));
    params.delete('details');
    router.replace(String(params) ? `${pathname}?${params}` : (pathname ?? ''));
  };

  const { isFetching, isError, data } = useGetCharacterByIdQuery(expandedId, {
    refetchOnMountOrArgChange: REFETCH_INTERVAL_SECONDS,
    skip: expandedId === null,
  });

  if (isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <div>{t('errorMessage')}</div>;
  }

  if (expandedId === null || !data) {
    return null;
  }

  return (
    <div>
      <div className="rounded-lg">
        <Image
          src={data.image}
          width={350}
          height={500}
          alt={data.fullName}
          style={imageStyle}
        />
      </div>
      <div className="flex flex-col items-center text-left">
        <div className="text-primary pr-1 text-lg font-black">
          {data.fullName}
        </div>
        <div>
          <b>{t('birthday')}:</b> {data.birthdate}
        </div>
        <div>
          <b>{t('house')}:</b> {data.hogwartsHouse}
        </div>
        {
          // TODO: display character's children
        }
      </div>
      <Button onClick={() => onCloseClick()}>{t('closeButton')}</Button>
    </div>
  );
}

export default DetailsView;
