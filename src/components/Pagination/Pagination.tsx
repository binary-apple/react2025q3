import classes from './Pagination.module.css';

type PaginationProps = {
  currentPage: number;
  hasMorePages: boolean;
};

function Pagination(props: PaginationProps) {
  return (
    <div className={classes.wrapper}>
      <button disabled={props.currentPage === 1}>Prev</button>
      <div className={classes['current-page']}>Page {props.currentPage}</div>
      <button disabled={!props.hasMorePages}>Next</button>
    </div>
  );
}

export default Pagination;
