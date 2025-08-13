import Button from '@components/Button';
import Loader from '@components/Loader';
import { REFETCH_INTERVAL_SECONDS } from '@constants/index';
import { useGetCharacterByIdQuery } from '@services/potterApi';
import { useOutletContext } from 'react-router';

type ContextType = [
  expandedId: number | null,
  setExpandedId: (id: number | null) => void,
];

function DetailsView() {
  const [expandedId, setExpandedId] = useOutletContext<ContextType>();
  const { isFetching, isError, data } = useGetCharacterByIdQuery(expandedId, {
    refetchOnMountOrArgChange: REFETCH_INTERVAL_SECONDS,
    skip: expandedId === null,
  });

  if (isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  if (expandedId === null || !data) {
    return null;
  }

  return (
    <div>
      <img
        src={data.image}
        alt={data.fullName}
        className="block rounded-lg object-none"
      ></img>
      <div className="flex flex-col items-center text-left">
        <div className="text-primary pr-1 text-lg font-black">
          {data.fullName}
        </div>
        <div>
          <b>Birthday:</b> {data.birthdate}
        </div>
        <div>
          <b>Hogwarts house:</b> {data.hogwartsHouse}
        </div>
        {
          // TODO: display character's children
        }
      </div>
      <Button
        onClick={() => {
          setExpandedId(null);
        }}
      >
        Close
      </Button>
    </div>
  );
}

export default DetailsView;
