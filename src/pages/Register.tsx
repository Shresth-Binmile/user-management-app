import { useForm, SubmitHandler } from 'react-hook-form';
import { RegisterFormInputs } from '../interfaces/RegisterFormInputs';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Container,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setAdminInDB, setItemInDB } from '../utils/dbConfigure';
import { useFetch } from '../utils/useFetch';
import { useState } from 'react';

const Register = () => {

    // const users = useContext(userContext)
    const { users } = useFetch()
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
    const { handleSubmit, register, formState: { errors } } = useForm<RegisterFormInputs>();

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        setloading(true)
        setTimeout(() => {
            setloading(false)
            console.log(users)
            if (data.roleType == 'user') {  // for user
                if (users && users.length < 5) {
                    console.log(data)
                    setItemInDB({ userKey: data.roleType, userValue: data, userArr: users })
                    console.log(users)
                    navigate('/login')
                }
                else {
                    setItemInDB({ userKey: data.roleType, userValue: data, userArr: users })
                    navigate('/login')
                }
            }
            else { // for admin
                setAdminInDB({ userKey: data.roleType, userValue: data })
                navigate('/login')
            }
        }, 2000)
    }

    return loading ? (<h3>Loading...</h3>) : (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom mt={3}>
                Register Page
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('username', { required: 'Username is required' })}
                    label="Username"
                    fullWidth
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    sx={{ mt: 1.5 }}
                />
                <TextField
                    {...register('password', { required: 'Password is required' })}
                    label="Password"
                    type="password"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{ mt: 1.5 }}
                />
                <FormControl fullWidth error={!!errors.roleType}
                    sx={{ mt: 1.5 }}>
                    <InputLabel>Role Type</InputLabel>
                    <Select
                        {...register('roleType', { required: 'Role Type is required' })}
                        label="Role Type"
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    {...register('name', { required: 'Name is required' })}
                    label="Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    sx={{ mt: 1.5 }}
                />
                <TextField
                    {...register('address', { required: 'Address is required' })}
                    label="Address"
                    fullWidth
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    sx={{ mt: 1.5 }}
                />
                <TextField
                    {...register('phoneNumber', { required: 'Phone Number is required' })}
                    label="Phone Number"
                    fullWidth
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                    sx={{ mt: 1.5 }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth
                    sx={{ mt: 4 }}>
                    Register
                </Button>
            </form>
        </Container>
    );
}

export default Register