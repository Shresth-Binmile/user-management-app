import * as yup from 'yup'
import { LoginFormSchema } from '../utils/Schema';

export interface LoginFormInputs extends yup.InferType<typeof LoginFormSchema> {
  username: string;
  password: string;
  roleType: string;
}