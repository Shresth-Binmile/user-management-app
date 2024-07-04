import * as yup from 'yup'

export let LoginFormSchema = yup.object({
    username: yup.string().required('*Required Field'),
    password: yup.string().required('*Required Field'),
    roleType: yup.string().required('*Required Field')
})

export let RegisterFormSchema = yup.object({
    username: yup.string().required('*Required Field'),
    password: yup.string().required('*Required Field'),
    roleType: yup.string().required('*Required Field'),
    name: yup.string().required('Required Field'),
    address: yup.string().required('Required Field'),
    phoneNumber: yup.string().max(10).min(10).required('Required Field')
})

export let UserSchema = yup.object({
    username: yup.string().required('*Required Field'),
    roleType: yup.string().required('*Required Field'),
    name: yup.string().required('Required Field'),
    address: yup.string().required('Required Field'),
    phoneNumber: yup.string().max(10).min(10).required('Required Field')
})
