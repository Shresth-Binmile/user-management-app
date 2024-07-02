import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../utils/useFetch';
import { Controller, useForm } from 'react-hook-form';
import { FormInput } from '../interfaces/FormInput';
import { signOutFromDB } from '../utils/dbConfigure';


const Profile = () => {

  const { users, currentUser } = useFetch()
  const navigate = useNavigate()
  const params = useParams();
  const userId: number = Number(params.userId!)
  console.log(userId)
  const { control, handleSubmit } = useForm<FormInput>({ defaultValues: users[userId] });

  const onSubmit = (data:any) => {
    console.log(data)
  }


  console.log('user', users)
  if (userId >= users.length) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4">User not found</Typography>
      </Container>
    );
  }

  if (currentUser == null || currentUser?.roleType == 'user' && currentUser.name != users[userId].name && currentUser.password != users[userId].password) {
    return (
      <h1>Access Denied!!</h1>
    )
  }
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" textAlign={'center'} gutterBottom>
        Profile
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="body1">Username</Typography>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={`${users[userId].username}`}
              fullWidth
              variant="outlined"
              margin="normal"
              disabled // username should not be editable
            />
          )}
        />
        <Typography variant="body1">Role Type</Typography>
        <Controller
          name="roleType"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={`${users[userId].roleType}`}
              fullWidth
              variant="outlined"
              margin="normal"
              disabled // roleType should not be editable
            />
          )}
        />
        <Typography variant="body1">Name</Typography>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={`${users[userId].name}`}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          )}
        />
        <Typography variant="body1">Address</Typography>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={`${users[userId].address}`}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          )}
        />
        <Typography variant="body1">Phone Number</Typography>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={`${users[userId].phoneNumber}`}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          )}
        />
        <Box mt={2} textAlign="center">
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
      <Button
        // component={Link}
        // to={`/profile/${index}`}
        variant="contained"
        color="primary"
        onClick={() => {
          signOutFromDB('current-user')
          navigate('/login')
        }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Profile