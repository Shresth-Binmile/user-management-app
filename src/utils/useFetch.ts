import { useEffect, useState } from "react"
import { RegisterFormInputs } from "../interfaces/RegisterFormInputs"
import { getAdminDetails, getCurrentUserDB, getItemfromDB } from "./dbConfigure"

export function useFetch () {
    const [users, setUsers] = useState<RegisterFormInputs[]>([])
    const [admin, setAdmin] = useState<RegisterFormInputs>()
    const [currentUser, setCurrentUser] = useState<RegisterFormInputs>()

    useEffect(()=>{
      const getUser = async() => {
        const userData = await getItemfromDB('user')
        setUsers(userData)
      }
      const getAdmin = async() => {
        const adminData = await getAdminDetails('admin')
        setAdmin(adminData)
      }
      const getCurrentUser = async() => {
        const currentUserData = await getCurrentUserDB()
        setCurrentUser(currentUserData)
      }
      getUser()
      getAdmin()
      getCurrentUser()
    }, [users, admin, currentUser])

    return {users, setUsers, admin, setAdmin, currentUser, setCurrentUser}
}