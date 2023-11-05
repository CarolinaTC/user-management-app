import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, CircularProgress, Modal, TextField } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../util/welcomePage.css";

function WelcomePage() {
    const [userData, setUserData] = useState(null);
    const [userList, setUserList] = useState(null);
    const [editingUserId, setEditingUserId] = useState(null);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [deleteUserName, setDeleteUserName] = useState(null);

    const [editingUserName, setEditingUserName] = useState(null);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://reqres.in/api/users/7")
            .then((response) => response.json())
            .then((data) => setUserData(data.data));

        fetch('https://reqres.in/api/users?page=1')
            .then((response) => response.json())
            .then((data) => setUserList(data.data));

        console.log("userList" + userList)
    }, []);

    const handleLogout = () => {
        localStorage.token = undefined;
        navigate("/login");
    };

    const handleEditUser = (userId) => {
        setEditingUserId(userId);
        fetch("https://reqres.in/api/users/" + userId)
            .then((response) => response.json())
            .then((data) => setEditingUserName(data.data.first_name));
    };

    const handleOpenModelDeleteUser = (userId) => {
        setDeleteUserId(userId);
        fetch("https://reqres.in/api/users/" + userId)
            .then((response) => response.json())
            .then((data) => setDeleteUserName(data.data.first_name));
    };

    const handleSaveUser = (userId) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: editingUserName, job: "zion resident" })
        };
        fetch('https://reqres.in/api/users/' + userId, requestOptions).then(() => setEditingUserId(null));
        // TODO: If this was a real call I would check for errors, but since this is allways successful I don't need to do it
    };

    const handleDeleteUser = (userId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('https://reqres.in/api/users/' + userId, requestOptions).then(() => setDeleteUserId(null));
        // TODO: If this was a real call I would check for errors, but since this is allways successful I don't need to do it
    };

    return (
        <div className="welcome-page-container">
            <Button
                variant="contained"
                color="secondary"
                startIcon={<ExitToApp />}
                onClick={handleLogout}
                className="logout-button"
            >
                Logout
            </Button>
            <h1>Welcome Page</h1>

            {userData ? (
                <div className="welcome-content">
                    <p>Welcome {userData.first_name}</p>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <Button variant="outlined">
                                    <AddIcon color="primary" />
                                    Create New user
                                </Button>

                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userList.map((user, rowID) =>
                                    <TableRow key={rowID}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.first_name}</TableCell>
                                        <TableCell>{user.last_name}</TableCell>
                                        <TableCell>
                                            <EditIcon color="primary" onClick={() => handleEditUser(user.id)} />
                                            <DeleteIcon color="secondary" onClick={() => handleOpenModelDeleteUser(user.id)} />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ) : (
                <CircularProgress />
            )}
            <Modal
                open={editingUserId != null}
                onClose={() => setEditingUserId(null)}
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2>Edit User</h2>
                    <TextField
                        fullWidth
                        id="name"
                        label="Name"
                        variant="outlined"
                        value={editingUserName}
                        defaultValue={editingUserName}
                        onChange={(e) => setEditingUserName(e.target.value)}
                    />
                    <Button onClick={() => setEditingUserId(null)}>Cancel</Button>
                    <Button onClick={() => handleSaveUser(editingUserId)}>Save</Button>
                </Box>
            </Modal>

            <Modal
                open={deleteUserId != null}
                onClose={() => setDeleteUserId(null)}
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2>Delete User</h2>
                    <p>Are you sure you want to delete the following user?</p>
                    <p>ID: {deleteUserId}</p>
                    <p>Name: {deleteUserName}</p>
                    <Button onClick={() => setDeleteUserId(null)}>No</Button>
                    <Button onClick={() => handleDeleteUser(deleteUserId)}>Yes</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default WelcomePage;
