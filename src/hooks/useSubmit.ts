import { addFormData } from '@/store/form-slice';
import type { FormType, FormValue } from '@/types';
import { useDispatch } from 'react-redux';

function useSubmit(formValue: FormValue, formType: FormType) {
  const dispatch = useDispatch();
  return () => dispatch(addFormData({ ...formValue, formType }));
}

export default useSubmit;
