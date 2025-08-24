import { addFormData } from '@/store/form-slice';
import type { FormType, FormValue } from '@/types';
import { useDispatch } from 'react-redux';

function useSubmit(formType: FormType) {
  const dispatch = useDispatch();
  return (formValue: FormValue) =>
    dispatch(addFormData({ ...formValue, formType }));
}

export default useSubmit;
