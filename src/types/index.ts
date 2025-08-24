export type Gender = 'male' | 'female' | 'other';
export type FormType = 'controlled' | 'uncontrolled';

export type FormData = {
  formType: FormType;
  name: string;
  age: number | undefined;
  email: string;
  gender: Gender;
  terms: boolean;
  createAt: number;
};
