export type Gender = 'male' | 'female' | 'other';

export type FormType = 'controlled' | 'uncontrolled';

export type FormValue = {
  name: string;
  age: number | '';
  email: string;
  gender: Gender | '';
  terms: boolean;
};

export type FormData = FormValue & { formType: FormType };
