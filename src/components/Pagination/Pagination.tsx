import Button from '@components/Button';

type PaginationProps = {
  currentPage: number;
  hasMorePages: boolean;
  onButtonClick: (newPage: number) => void;
};

function Pagination(props: PaginationProps) {
  return (
    <div className="flex gap-2.5">
      <Button
        disabled={props.currentPage === 1}
        onClick={() => props.onButtonClick(props.currentPage - 1)}
      >
        Prev
      </Button>
      <div className="min-w-14">Page {props.currentPage}</div>
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
