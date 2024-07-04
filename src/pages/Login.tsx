import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Container, Typography } from '@mui/material';
import { LoginFormInputs } from '../interfaces/LoginFormInputs';
import { useFetch } from '../utils/useFetch';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../utils/dbConfigure';
import { useState } from 'react';

const Login = () => {

  const { users, admin } = useFetch()
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const { handleSubmit, register, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setloading(true)
    setTimeout(async () => {
      if (data.roleType == 'user') {
        console.log('userArr', users)
        let userIndx
        for (let i = 0; i < users.length; i++) {
          if (users[i].username == data.username && users[i].password == data.password) {
            userIndx = i
            break
          }
        }
        // console.log('user', userData)
        console.log('indx', userIndx)
        if (userIndx! >= 0 && userIndx! <= 4) {
          await setCurrentUser(users[userIndx!])
          console.log('Current User', users[userIndx!])
          navigate(`/profile/${userIndx}`)
        }
        else {
          console.log('user not found')
          navigate('/register')
        }

      }
      else {
        if (data.username == admin?.username && data.password == admin.password) {
          console.log('admin hai')
          await setCurrentUser(admin)
          console.log('Current User', admin)
          navigate('/home')
        }
        else {
          console.log('user not found')
          navigate('/register')
        }
      }
      setloading(false)
    }, 2000)
  };

  return loading ? (<h3>Loading...</h3>) : (
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
          {errors.roleType && <Typography variant='h6' component={'h6'} sx={{fontSize: 12, color: 'darkred', pl: 2}}>Role Type is required</Typography>}
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 4 }}>
          Login
        </Button>
      </form>
      <Button type="submit" variant="contained" color="primary" fullWidth
        sx={{ mt: 1 }} onClick={() => navigate('/register')}>
        Register
      </Button>
    </Container>
  )
}

export default Login