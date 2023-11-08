import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, CircularProgress, Modal, TextField, Switch } from "@mui/material";
import { ExitToApp, Brightness4 } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
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
import Pagination from "@mui/material/Pagination";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import "../util/welcomePage.css";
import MenuItem from '@mui/material/MenuItem';
import Link from "@mui/material/Link";

function WelcomePage() {

    const [userData, setUserData] = useState(null);
    const [userList, setUserList] = useState(null);
    const [editingUserId, setEditingUserId] = useState(null);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [deleteUserName, setDeleteUserName] = useState(null);
    const [editingUserName, setEditingUserName] = useState(null);
    const [createUser, setCreateUser] = useState(null);
    const [createUserName, setCreateUserName] = useState(null);
    const [createUserJob, setCreateUserJob] = useState(null);
    const [clickCreateModal, setClickCreateModal] = useState(false)

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        fetchUserPage(page);
    };

    const fetchUserPage = (page) => {
        fetch("https://reqres.in/api/users?page=" + page)
            .then((response) => response.json())
            .then((data) => {
                setUserList(data.data);
                setTotalPages(data.total_pages);
            });

    }

    // color theme selection
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    const lightTheme = createTheme({
        palette: {
            mode: "light",
        },
    });
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('darkMode', darkMode ? 'light' : 'dark');
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const navigate = useNavigate();

    useEffect(() => {

        const storedTheme = localStorage.getItem('darkMode');
        if (storedTheme) {
            setDarkMode(storedTheme === 'dark');
        }

        fetch("https://reqres.in/api/users/7")
            .then((response) => response.json())
            .then((data) => setUserData(data.data));

        fetchUserPage(1);

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
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: editingUserName, job: "zion resident" }),
        };
        fetch("https://reqres.in/api/users/" + userId, requestOptions).then(() =>
            setEditingUserId(null)
        );
        // Note: If this was a real call I would check for errors, but since this is allways successful I don't need to do it
    };

    const handleDeleteUser = (userId) => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };
        fetch("https://reqres.in/api/users/" + userId, requestOptions).then(() =>
            setDeleteUserId(null)
        );
        //Note: If this was a real call I would check for errors, but since this is allways successful I don't need to do it
    };

    const handleCreateUser = (createUser) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: createUserName, job: createUserJob })
        };
        fetch("https://reqres.in/api/users/", requestOptions).then(() =>
            setCreateUser(createUser)
        );
        fetchUserPage(1);
        setClickCreateModal(false)
        // Note: If this was a real call I would check for errors, but since this is allways successful I don't need to do it
    };

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <div className={`welcome-page-container ${darkMode ? "dark-mode" : "light-mode"}`}>
                <div className="menu-container">
                    <MenuItem >
                        <Link color="inherit" onClick={toggleDarkMode}>
                            <Brightness4 />   {darkMode ? "Light Mode" : "Dark Mode"}
                        </Link>

                    </MenuItem>

                    <MenuItem >
                        <Link color="inherit" onClick={handleLogout}>
                            <ExitToApp /> Logout
                        </Link>
                    </MenuItem>

                </div>

                <Typography variant="h4" align="center">
                    Welcome Page
                </Typography>

                {userData ? (
                    <div className="welcome-content">
                        {/*      <p>Welcome {userData.first_name}</p> */}
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>

                                    <Button variant="outlined" onClick={() => setClickCreateModal(true)} data-test="test_button_create_user">
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
                                    {userList?.map((user, rowID) => (
                                        <TableRow key={rowID}>
                                            <TableCell data-test={"test_table_id_" + rowID}>{user.id}</TableCell>
                                            <TableCell data-test={"test_table_email_" + rowID}>{user.email}</TableCell>
                                            <TableCell data-test={"test_table_first_name_" + rowID}>{user.first_name}</TableCell>
                                            <TableCell data-test={"test_table_last_name_" + rowID}>{user.last_name}</TableCell>
                                            <TableCell>
                                                <EditIcon
                                                    color="primary"
                                                    onClick={() => handleEditUser(user.id)}
                                                    data-test={"test_button_edit_user_" + rowID}
                                                />
                                                <DeleteIcon
                                                    color="secondary"
                                                    onClick={() => handleOpenModelDeleteUser(user.id)}
                                                    data-test={"test_button_delete_user_" + rowID}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            class="pagination-container"
                        />
                    </div>
                ) : (
                    <CircularProgress />
                )}
                <Modal
                    className={`${darkMode ? "dark-mode-modal" : "light-mode-modal"}`}
                    open={editingUserId != null}
                    onClose={() => setEditingUserId(null)}
                >
                    <Box sx={{ ...style, width: 200 }}>
                        <Typography variant="h4" align="center" data-test="test_header_edit_user" >Edit User</Typography>
                        <TextField
                            fullWidth
                            id="name"
                            label="Name"
                            variant="outlined"
                            value={editingUserName}
                            defaultValue={editingUserName}
                            onChange={(e) => setEditingUserName(e.target.value)}
                        />
                        <Button onClick={() => setEditingUserId(null)} data-test="test_modal_cancel_edit_user">Cancel</Button>
                        <Button onClick={() => handleSaveUser(editingUserId)} data-test="test_modal_save_edit_user">Save</Button>
                    </Box>
                </Modal>

                <Modal className={`${darkMode ? "dark-mode-modal" : "light-mode-modal"}`} open={deleteUserId != null} onClose={() => setDeleteUserId(null)}>
                    <Box sx={{ ...style, width: 200 }}>
                        <Typography variant="h3" align="center" class="m-b-10" data-test="test_header_delete_user">Delete User</Typography>
                        <Typography variant="body1" align="left" class="m-b-10">Are you sure you want to delete the following user?</Typography>
                        <Typography variant="body1" align="left">ID: {deleteUserId}</Typography>
                        <Typography variant="body1" align="left">Name: {deleteUserName}</Typography>

                        <Button onClick={() => setDeleteUserId(null)} data-test="test_modal_delete_user_cancel">No</Button>
                        <Button onClick={() => handleDeleteUser(deleteUserId)} data-test="test_modal_delete_user_confirm">Yes</Button>
                    </Box>
                </Modal>

                <Modal className={`${darkMode ? "dark-mode-modal" : "light-mode-modal"}`} open={clickCreateModal} onClose={() => setClickCreateModal(false)}>
                    <Box sx={{ ...style, width: 200 }}>
                        <Typography variant="h4" align="center" data-test="test_header_create_user" class="m-b-10">Create New User</Typography>
                        <TextField
                            fullWidth
                            id="name"
                            label="Name"
                            variant="outlined"
                            value={createUserName}
                            defaultValue={createUserName}
                            onChange={(e) => setCreateUserName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            id="job"
                            label="Job"
                            variant="outlined"
                            value={createUserJob}
                            defaultValue={createUserJob}
                            onChange={(e) => setCreateUserJob(e.target.value)}
                        />

                        <Button onClick={() => setClickCreateModal(false)} data-test="test_modal_create_user_cancel">Cancel</Button>
                        <Button onClick={() => handleCreateUser(createUser)} data-test="test_modal_create_user_save">Save</Button>
                    </Box>
                </Modal>
            </div>
        </ThemeProvider >
    );
}

export default WelcomePage;
