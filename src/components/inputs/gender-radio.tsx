import { twMerge } from 'tailwind-merge';

type Gender = 'male' | 'female' | 'other';

const GENDER_LABELS: Record<Gender, string> = {
  male: 'Male',
  female: 'Female',
  other: 'Other',
};

function GenderPicker() {
  return (
    <fieldset className="px-3">
      <legend className="text-grey">Gender</legend>

      <div className="flex flex-wrap gap-3">
        {Object.entries(GENDER_LABELS).map(([value, label]) => (
          <label
            key={value}
            className="group flex items-center gap-2 cursor-pointer select-none"
          >
            <input
              type="radio"
              className="peer absolute h-0 w-0"
              value={value}
              name="gender"
            />
            <span
              className={twMerge(
                'relative h-4 w-4 rounded-full border-2 border-foreground bg-white',
                'peer-checked:bg-primary group-hover:bg-grey'
              )}
            />

            <span className="font-semibold group-hover:text-grey">{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default GenderPicker;
