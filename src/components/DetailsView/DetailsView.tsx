import { useOutletContext } from 'react-router';
import { getCharacterById } from '../../api/api';
import { useEffect, useState } from 'react';
import Loader from '@components/Loader';
import type { SearchItemProps } from '@components/SearchItem';
import classes from './DetailsView.module.css';
import Button from '@components/Button';

type ContextType = [
  expandedId: number | null,
  setExpandedId: (id: number | null) => void,
];

function DetailsView() {
  const [expandedId, setExpandedId] = useOutletContext<ContextType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<SearchItemProps | null>(null);
  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      if (expandedId === null) return;
      try {
        const response = await getCharacterById(expandedId);
        const result = await response.json();
        setDetails(result);
      } catch {
        setDetails(null);
      } finally {
        setIsLoading(false);
      }
    };

    getDetails();
  }, [expandedId]);

  if (expandedId === null) {
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
      <Button
        onClick={() => {
          setExpandedId(null);
          setDetails(null);
        }}
      >
        Close
      </Button>
    </div>
  );
}

export default DetailsView;
