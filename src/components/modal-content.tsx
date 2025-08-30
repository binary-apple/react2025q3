import type { OptionalColumns } from '@/types';
import Button from '@components/button';
import { useState } from 'react';

const OPTIONAL_COLUNMS: Record<OptionalColumns, string> = {
  methane: 'Methane',
  oil_co2: 'Oil CO2',
  temperature_change_from_co2: 'T. change from CO2',
};

function ModalContent({ onClose }: { onClose: VoidFunction }) {
  const [selectedColumns, setSelectedColumns] = useState<Set<OptionalColumns>>(
    new Set()
  );

  const onCheck = (value: OptionalColumns) => {
    setSelectedColumns((prev) => {
      const s = new Set(prev);
      if (s.has(value)) {
        s.delete(value);
      } else {
        s.add(value);
      }
      return s;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center select-none">
      <div className="relative bg-background z-10 border-2 border-primary rounded-xl shadow-lg shadow-primary/70">
        <Button
          onClick={onClose}
          variant="text"
          size="small"
          className="absolute top-0 right-1"
        >
          <span aria-hidden className="text-2xl leading-none">
            &times;
          </span>
        </Button>
        <div className="flex flex-col gap-2 justify-evenly items-center w-full h-full p-5">
          <h3>Select additional columns</h3>
          <ul className="flex flex-col gap-2">
            {(
              Object.entries(OPTIONAL_COLUNMS) as [OptionalColumns, string][]
            ).map(([key, label]) => {
              const checked = selectedColumns.has(key);
              return (
                <li key={key} className="flex gap-2">
                  <input
                    id={key}
                    type="checkbox"
                    checked={checked}
                    onChange={() => onCheck(key)}
                    className="h-4 w-4"
                  />
                  <label htmlFor={key} className="text-sm">
                    {label}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ModalContent;
