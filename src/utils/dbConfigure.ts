import localforage from "localforage";
import { RegisterFormInputs } from "../interfaces/RegisterFormInputs";
import { useContext } from "react";
import { userContext } from "./UserContext";

export const getItemfromDB = async(value:string):Promise<RegisterFormInputs[]> => {
    const userdata:RegisterFormInputs[] = await localforage.getItem(value)
    // console.log(userdata)
    return userdata
}

export const setItemInDB = async({userKey, userValue}:{userKey: string, userValue: RegisterFormInputs}) => {
    const userArr = useContext(userContext)
    userArr.push(userValue)
    await localforage.setItem(userKey, userArr)
    console.log('New user successfully created')
}

export const setAdminInDB = async({userKey, userValue}:{userKey: string, userValue: RegisterFormInputs}) => {
    // const userArr = useContext(userContext)
    // userArr.push(userValue)
    await localforage.setItem(userKey, userValue)
    console.log('New user successfully created')
}