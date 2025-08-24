import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

function FormDataList() {
  const items = useSelector((state: RootState) => state.form);
  console.log(items);

  if (!items.length) {
    return (
      <div className="text-grey text-lg font-semibold">
        No forms have been submitted yet...
      </div>
    );
  }

  return (
    <ul className="flex gap-2 flex-col-reverse">
      {items.map((v, i) => (
        <li
          key={i}
          className={`rounded p-3 ${i === items.length - 1 ? 'border-2 border-primary shadow-md shadow-primary/70' : 'border'}`}
        >
          <div className="text-xs text-grey">
            Results from {v.formType} form
          </div>
          <div className="text-sm text-foreground">
            <div>
              <span className="font-medium">Name:</span> {v.name}
            </div>
            <div>
              <span className="font-medium">Email:</span> {v.email}
            </div>
            <div>
              <span className="font-medium">Age:</span> {v.age}
            </div>
            <div>
              <span className="font-medium">Gender:</span> {v.gender}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FormDataList;
