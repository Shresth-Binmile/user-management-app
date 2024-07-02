import { List, ListItem, ListItemText, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { userContext } from '../utils/UserContext';
import { useContext } from 'react';
// import { RegisterFormInputs } from '../interfaces/RegisterFormInputs';
// import { useEffect, useState } from 'react';
// import { getItemfromDB } from '../utils/dbConfigure';

const Home = () => {

  const users = useContext(userContext)

  // const [users, setUsers] = useState<RegisterFormInputs[]>([])

  // useEffect(()=>{
  //   const getUser = async() => {
  //     const userData = await getItemfromDB('user')
  //     setUsers(userData)
  //   }
  //   getUser()
  // }, [])

  console.log('user',users)
  if (users.length < 1) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4">User not found</Typography>
      </Container>
    );
  }

  return (
    // <userContext.Provider value={users}>
      <List>
        {users.map((user, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={user.username}
              secondary={`Role: ${user.roleType}, Name: ${user.name}, Address: ${user.address}, Phone: ${user.phoneNumber}`}
            />
            <Button
              component={Link}
              to={`/profile/${index}`}
              variant="contained"
              color="primary"
            >
              Edit Profile
            </Button>
          </ListItem>
        ))}
      </List>
    // </userContext.Provider>
  );
};

export default Home