import { Container, Typography } from '@mui/material';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { userContext } from '../utils/UserContext';
// import { getItemfromDB } from '../utils/dbConfigure';
// import { useEffect, useState } from 'react';
// import { RegisterFormInputs } from '../interfaces/RegisterFormInputs';
// import { RegisterFormInputs } from '../interfaces/RegisterFormInputs';


const Profile  = () => {
  // const [user, setUser] = useState<RegisterFormInputs[]>([]) //chahiye hai
  const user = useContext(userContext)
  const params = useParams();
  const userId:number = Number(params.userId!)
  console.log(userId)

  // useEffect(()=>{//chahiye hai
  //   const getUser = async() => {
  //     const userData = await getItemfromDB('user')
  //     const users = userData.filter((item, index)=>{
  //       if(index == Number(userId)) return item
  //     })
  
  //     console.log('users', users)
  //     setUser(users)
  //     // return users[Number(userId)]
  //   }
  //   getUser()
  // }, [])

  console.log('user',user)
  if (user.length < 1) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4">User not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom mt={3}>
        User Profile: {user[userId].username}
      </Typography>
      <Typography variant="body1" textAlign={'center'}>Name: {user[userId].name}</Typography>
      <Typography variant="body1">Role Type: {user[userId].roleType}</Typography>
      <Typography variant="body1">Address: {user[userId].address}</Typography>
      <Typography variant="body1">Phone Number: {user[userId].phoneNumber}</Typography>
    </Container>
  );
};

export default Profile