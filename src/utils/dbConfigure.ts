import localforage from "localforage";
import { RegisterFormInputs } from "../interfaces/RegisterFormInputs";
import { setUserDBType } from "../interfaces/setDBType";

export const getItemfromDB = async (value: string): Promise<RegisterFormInputs[]> => {
    const userdata: RegisterFormInputs[] = await localforage.getItem(value)
    // console.log(userdata)
    return userdata
}

export const setItemInDB = async ({ userKey, userValue, userArr }: setUserDBType) => {
    console.log(userKey, userValue)
    console.log(userArr)
    if (userArr) {
        userArr.push(userValue)
        await localforage.setItem(userKey, userArr)
    }
    else {
        await localforage.setItem(userKey, [userValue])
    }
    console.log('New user successfully created')
}

export const setAdminInDB = async ({ userKey, userValue }: { userKey: string, userValue: RegisterFormInputs }) => {
    // const userArr = useContext(userContext)
    // userArr.push(userValue)
    await localforage.setItem(userKey, userValue)
    console.log('New user successfully created')
}

export const getAdminDetails = async (value: string) => {
    const adminDetails: RegisterFormInputs = await localforage.getItem(value)
    return adminDetails
}

export const setCurrentUser = async (data: RegisterFormInputs) => {
    await localforage.setItem('current-user', data)
    console.log(`Welcome, ${data.name}`)
}

export const getCurrentUserDB = async () => {
    const currentUser: RegisterFormInputs = await localforage.getItem('current-user')
    return currentUser
}

export const signOutFromDB = async (key: string) => {
    try {
        await localforage.removeItem(key);
        console.log(`Deleted item with key: ${key}`);
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}

// export const editUserDetails = async({users, userId, data}) => {
//     await getCurrentUserDB()

// }