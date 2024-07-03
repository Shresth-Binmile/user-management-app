import { List, ListItem, ListItemText, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../utils/useFetch';
import { useState } from 'react';
import { signOutFromDB } from '../utils/dbConfigure';

const Home = () => {

  const { users, currentUser } = useFetch()
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()

  console.log(currentUser)

  if (currentUser?.roleType == 'user' || currentUser == null) {
    return (
      <h1>Access Denied, Try signing in first.</h1>
    )
  }

  console.log('user', users)
  if (users.length < 1) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4">User not found</Typography>
      </Container>
    );
  }

  const handleSubmit = (index: number) => {
    setloading(true)
    setTimeout(() => {
      setloading(false)
      navigate(`/profile/${index}`)
    }, 2000)
  }

  return loading ? (<h3>Loading...</h3>) : (
    // <userContext.Provider value={users}>
    <Container>
      <Typography textAlign={'center'} variant='h3'>User Lists</Typography>
      <List>
        {users.map((user, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={user.username}
              secondary={`Role: ${user.roleType}, Name: ${user.name}, Address: ${user.address}, Phone: ${user.phoneNumber}`}
            />
            <Button
              // component={Link}
              // to={`/profile/${index}`}
              variant="contained"
              color="primary"
              onClick={() => handleSubmit(index)}
            >
              Edit Profile
            </Button>
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          signOutFromDB('current-user')
          navigate('/login')
        }}
        sx={{position: 'absolute', top: 5, right: 5}}
      >
        Logout
      </Button>
    </Container>
    // </userContext.Provider>
  );
};

export default Home