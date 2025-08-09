import { useOutletContext } from 'react-router';
import Loader from '@components/Loader';
import Button from '@components/Button';
import { useGetCharacterByIdQuery } from '@services/potterApi';

type ContextType = [
  expandedId: number | null,
  setExpandedId: (id: number | null) => void,
];

function DetailsView() {
  const [expandedId, setExpandedId] = useOutletContext<ContextType>();
  const { isFetching, isError, data } = useGetCharacterByIdQuery(expandedId, {
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
        className="block h-[500px] w-[350px] rounded-[10px]"
      ></img>
      <div className="text-left flex flex-col items-center">
        <div className="pr-1 font-black text-lg text-primary">
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
