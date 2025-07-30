import { useOutletContext } from 'react-router';
import { getCharacterById } from '../../api/api';
import { useEffect, useState } from 'react';
import Loader from '@components/Loader';
import type { SearchItemProps } from '@components/SearchItem';
import classes from './DetailsView.module.css';

type ContextType = [
  selectedId: number | null,
  setSelectedId: (id: number | null) => void,
];

function DetailsView() {
  const [selectedId, setSelectedId] = useOutletContext<ContextType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<SearchItemProps | null>(null);
  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      if (selectedId === null) return;
      try {
        const response = await getCharacterById(selectedId);
        const result = await response.json();
        setDetails(result);
      } catch {
        setDetails(null);
      } finally {
        setIsLoading(false);
      }
    };

    getDetails();
  }, [selectedId]);

  if (selectedId === null) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }
  if (details === null) {
    return null;
  }

  return (
    <div>
      <img
        src={details.image}
        alt={details.fullName}
        className={classes.img}
      ></img>
      <div className={classes.details}>
        <div className={classes.name}>{details.fullName}</div>
        <div>
          <b>Birthday:</b> {details.birthdate}
        </div>
        <div>
          <b>Hogwarts house:</b> {details.hogwartsHouse}
        </div>
        {
          // TODO: display character's children
        }
      </div>
      <button
        onClick={() => {
          setSelectedId(null);
          setDetails(null);
        }}
      >
        Close
      </button>
    </div>
  );
}

export default DetailsView;
