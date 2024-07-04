import * as yup from 'yup'
import { UserSchema } from "../utils/Schema";

export interface UserData extends yup.InferType<typeof UserSchema> {
    username: string;
    roleType: string;
    name: string;
    address: string;
    phoneNumber: string;
  }