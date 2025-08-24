import * as yup from 'yup';

export const formSchema = yup.object({
  name: yup
    .string()
    .required('Required')
    .matches(/^[A-Z]/, 'First letter must be uppercase'),
  age: yup
    .number()
    .integer('Must be an integer')
    .required('Required')
    .positive('Must be greater than 0'),
  email: yup.string().email('Invalid email').required('Required'),
  gender: yup
    .mixed<'male' | 'female' | 'other'>()
    .oneOf(['male', 'female', 'other'], 'Required')
    .required('Required'),
  terms: yup.boolean().oneOf([true], 'Please accept T&C'),
});
