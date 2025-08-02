import Button from '@components/Button';
import classes from './Pagination.module.css';

type PaginationProps = {
  currentPage: number;
  hasMorePages: boolean;
  onButtonClick: (newPage: number) => void;
};

function Pagination(props: PaginationProps) {
  return (
    <div className={classes.wrapper}>
      <Button
        disabled={props.currentPage === 1}
        onClick={() => props.onButtonClick(props.currentPage - 1)}
      >
        Prev
      </Button>
      <div className={classes['current-page']}>Page {props.currentPage}</div>
      <Button
        disabled={!props.hasMorePages}
        onClick={() => props.onButtonClick(props.currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
