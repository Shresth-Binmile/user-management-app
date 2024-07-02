import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Container, Typography } from '@mui/material';
import { LoginFormInputs } from '../interfaces/LoginFormInputs';
// import { getItemfromDB } from '../utils/dbConfigure';
// import { RegisterFormInputs } from '../interfaces/RegisterFormInputs';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../utils/UserContext';

const Login = () => {

  const userArr = useContext(userContext)
  const navigate = useNavigate()
  const { handleSubmit, register, formState: { errors } } = useForm<LoginFormInputs>();
  // let value: RegisterFormInputs[]

  const onSubmit: SubmitHandler<LoginFormInputs> = async(data) => {
    try {
      // const userArr: RegisterFormInputs[] = await getItemfromDB(data.roleType)
      // value = userArr
      let userIndx;
      const user = userArr.filter((users, index)=>{
        userIndx = index
        return users.username == data.username && users.password == data.password
      })

      // console.log('success',user)

      if(user) navigate(`/profile/${userIndx}`)
      
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Container maxWidth={'sm'}>
      <Typography variant="h4" align="center" gutterBottom mt={3}>
        Login Page
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
        <FormControl fullWidth error={!!errors.roleType} sx={{ mt: 1.5 }}>
          <InputLabel>Role Type</InputLabel>
          <Select
            {...register('roleType', { required: 'Role Type is required' })}
            label="Role Type"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 4 }}>
          Login
        </Button>
      </form>
    </Container>
  )
}

export default Login