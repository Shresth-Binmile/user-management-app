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
// import { getItemfromDB, setItemInDB } from '../utils/dbConfigure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { userContext } from '../utils/UserContext';
import { setAdminInDB, setItemInDB } from '../utils/dbConfigure';

const Register = () => {

    // const userArr = useContext(userContext)
    const navigate = useNavigate()
    const { handleSubmit, register, formState: { errors } } = useForm<RegisterFormInputs>();

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        try {
            // console.log(getItemfromDB('Some one from register',data.roleType))

            if(data.roleType == 'user'){
                setItemInDB({ userKey: data.roleType, userValue: data })  // for user
                // const userArr: RegisterFormInputs[] = await getItemfromDB(data.roleType)
                // console.log(userArr)
                navigate('/login')
            }
            else { // for admin
                setAdminInDB({ userKey: data.roleType, userValue: data })
                navigate('/home')
            }  
        } catch (error: any) {
            toast.error(error)
        }
    }

    return (
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