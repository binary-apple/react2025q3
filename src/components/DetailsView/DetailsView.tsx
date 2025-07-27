type ContextType = [
  selectedId: number | null,
  setSelectedId: (id: number | null) => void,
];

import { useOutletContext } from 'react-router';

function DetailsView() {
  const [selectedId, setSelectedId] = useOutletContext<ContextType>();
  if (selectedId !== null) {
    return (
      <div>
        <div>{selectedId}</div>
        <button onClick={() => setSelectedId(null)}>Close</button>
      </div>
    );
  }
  return null;
}

export default DetailsView;
