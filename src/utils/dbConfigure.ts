import localforage from "localforage";
import { RegisterFormInputs } from "../interfaces/RegisterFormInputs";
import { setUserDBType } from "../interfaces/setDBType";

export const getItemfromDB = async (value: string): Promise<RegisterFormInputs[] | null> => {
    const userdata: RegisterFormInputs[] | null = await localforage.getItem(value)
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
    const adminDetails: RegisterFormInputs | null = await localforage.getItem(value)
    return adminDetails
}

export const setCurrentUser = async (data: RegisterFormInputs) => {
    await localforage.setItem('current-user', data)
    console.log(`Welcome, ${data.name}`)
}

export const getCurrentUserDB = async () => {
    const currentUser: RegisterFormInputs | null = await localforage.getItem('current-user')
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

export const updateUser = async (userId: number, updatedUserData: RegisterFormInputs) => {
    try {
        const users: RegisterFormInputs[] = await localforage.getItem('user') || [];
        const userIndex = users.findIndex((_user, index) => index === userId);

        if (userIndex === -1) {
            throw new Error(`User with id ${userId} not found.`);
        }

        // Update the user object at the found index
        users[userIndex] = { ...users[userIndex], ...updatedUserData };

        // Save the updated array back to IndexedDB
        await localforage.setItem('user', users);

        console.log(`User with id ${userId} updated successfully.`);
    } catch (error) {
        console.error('Error updating user:', error);
    }
};