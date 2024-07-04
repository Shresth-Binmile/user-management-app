import * as yup from 'yup'
import { RegisterFormSchema } from "../utils/Schema";

export interface RegisterFormInputs extends yup.InferType<typeof RegisterFormSchema> {
    username: string;
    password: string;
    roleType: string;
    name: string;
    address: string;
    phoneNumber: string;
  }