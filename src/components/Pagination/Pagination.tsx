import classes from './Pagination.module.css';

type PaginationProps = {
  currentPage: number;
};

function Pagination(props: PaginationProps) {
  return (
    <div className={classes.wrapper}>
      <button>Prev</button>
      <div className={classes['current-page']}>Page {props.currentPage}</div>
      <button>Next</button>
    </div>
  );
}

export default Pagination;
