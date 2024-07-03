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

  const { control, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      username: currentUser?.username,
      name: currentUser?.name,
      roleType: currentUser?.roleType,
      address: currentUser?.address,
      phoneNumber: currentUser?.phoneNumber,
    },
  });

  const onSubmit = (data: FormInput) => {
    console.log('formdata: ', data);
    // setIsEditing(false);
  };


  // console.log('user', users)
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
    <Box sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="body1">Username</Typography>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              margin="normal"
              value={currentUser.username}
              // value={field.value}
              onChange={field.onChange}
            // InputProps={{
            //   readOnly: !isEditing,
            // }}
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
              fullWidth
              margin="normal"
              value={currentUser.name}
              // value={field.value}
              onChange={field.onChange}
            // InputProps={{
            //   readOnly: !isEditing,
            // }}
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
              fullWidth
              margin="normal"
              value={currentUser.roleType}
              // value={field.value}
              onChange={field.onChange}
              InputProps={{
                readOnly: true,
              }}
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
              fullWidth
              margin="normal"
              value={currentUser.address}
              // value={field.value}
              onChange={field.onChange}
            // InputProps={{
            //   readOnly: !isEditing,
            // }}
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
              fullWidth
              margin="normal"
              value={currentUser.phoneNumber}
              // value={field.value}
              onChange={field.onChange}
            // InputProps={{
            //   readOnly: !isEditing,
            // }}
            />
          )}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          signOutFromDB('current-user')
          navigate('/login')
        }}
        sx={{ position: 'absolute', top: 5, right: 5 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Profile