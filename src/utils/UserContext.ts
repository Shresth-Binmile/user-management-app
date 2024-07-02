import { createContext } from "react";
import { RegisterFormInputs } from "../interfaces/RegisterFormInputs";

export const userContext = createContext<RegisterFormInputs[]>([])


export const currentUserContext = createContext<RegisterFormInputs>({username:'', password: '', roleType: '', name: '', address: '', phoneNumber: ''})