import Button from '@components/Button';
import { useTranslations } from 'next-intl';

type PaginationProps = {
  currentPage: number;
  hasMorePages: boolean;
  onButtonClick: (newPage: number) => void;
};

function Pagination(props: PaginationProps) {
  const t = useTranslations('MainPage');
  return (
    <div className="flex gap-2.5">
      <Button
        disabled={props.currentPage === 1}
        onClick={() => props.onButtonClick(props.currentPage - 1)}
      >
        {t('prevButton')}
      </Button>
      <div className="min-w-14">
        {t('pageLabel')} {props.currentPage}
      </div>
      <Button
        disabled={!props.hasMorePages}
        onClick={() => props.onButtonClick(props.currentPage + 1)}
      >
        {t('nextButton')}
      </Button>
    </div>
  );
}

export default Pagination;
