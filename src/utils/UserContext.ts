import { createContext } from "react";
import { RegisterFormInputs } from "../interfaces/RegisterFormInputs";

export const userContext = createContext<RegisterFormInputs[]>([])