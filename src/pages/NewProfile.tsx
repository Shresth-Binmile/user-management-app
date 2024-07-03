import React, { useEffect, useState } from 'react';
import { DialogContent, DialogActions, Dialog, DialogTitle, TextField, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import { useFetch } from '../utils/useFetch';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { setCurrentUser, signOutFromDB, updateUser } from '../utils/dbConfigure';
import { RegisterFormInputs } from '../interfaces/RegisterFormInputs';
// import { setCurrentUser } from '../utils/dbConfigure';


const NewProfile = () => {

    const { users, currentUser } = useFetch()
    const [currentPageUser, setCurrentPageUser] = useState<RegisterFormInputs>();
    const [open, setOpen] = useState(false);
    const [editedUser, setEditedUser] = useState<RegisterFormInputs>();
    const navigate = useNavigate()
    const params = useParams();
    const userId: number = Number(params.userId!)

    useEffect(() => {
        const setPageUser = () => {
            // console.log(users)
            // console.log(userId)
            setCurrentPageUser(users[userId])
        }
        setPageUser()
    }, [users, currentPageUser])

    const handleEdit = () => {
        setEditedUser(currentPageUser);
        setOpen(true);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value } as RegisterFormInputs);
    };
    const handleSave = async () => {currentUser
        if (editedUser) {
            // await updateUser(currentuser.id, editedUser);
            if(currentUser?.roleType == 'user') await setCurrentUser(editedUser);
            await updateUser(userId, editedUser)
            console.log('User Edited', editedUser)
            setOpen(false);
        }
    };
    const userDetails = [
        { label: 'Username', value: currentPageUser?.username },
        // { label: 'Password', value: currentPageUser?.password },
        { label: 'Role Type', value: currentPageUser?.roleType },
        { label: 'Name', value: currentPageUser?.name },
        { label: 'Address', value: currentPageUser?.address },
        { label: 'Phone Number', value: currentPageUser?.phoneNumber },
    ];

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
        <Container>
            <h2>User Profile</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Detail</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userDetails.map(detail => (
                            <TableRow key={detail.label}>
                                <TableCell>{detail.label}</TableCell>
                                <TableCell>{detail.value}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={handleEdit}>
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Username"
                        name="username"
                        value={editedUser?.username}
                        onChange={handleChange}
                        fullWidth
                    />
                    {/* <TextField
                        margin="dense"
                        label="Password"
                        name="password"
                        type="password"
                        value={editedUser?.password}
                        onChange={handleChange}
                        fullWidth
                    /> */}
                    <TextField
                        margin="dense"
                        label="Role Type"
                        name="roleType"
                        value={editedUser?.roleType}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        value={editedUser?.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        name="address"
                        value={editedUser?.address}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Phone Number"
                        name="phoneNumber"
                        value={editedUser?.phoneNumber}
                        onChange={handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
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
        </Container>
    );
};
export default NewProfile;