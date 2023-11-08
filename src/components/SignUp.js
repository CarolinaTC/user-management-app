import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from '@mui/material/MenuItem';
import Link from "@mui/material/Link";
import { Brightness4 } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../util/general.css";

function SignUp() {

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



    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: pass })
        };
        console.log(requestOptions);
        fetch('https://reqres.in/api/register', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('token', data.token);
                console.log(localStorage)
                navigate("/welcome");
                console.log(data.token);
            });
        e.preventDefault();
        console.log(email);
    }

    return (
        <ThemeProvider theme={localStorage.getItem('darkMode') == "dark" ? darkTheme : lightTheme}>
            <div className={`container ${localStorage.getItem('darkMode') == "dark" ? "dark-mode" : "light-mode"}`}>
                <Container maxWidth="sm">

                    <div className="menu-container">
                        <MenuItem>
                            <Link color="inherit" onClick={toggleDarkMode}>
                                <Brightness4 />   {darkMode ? "Light Mode" : "Dark Mode"}
                            </Link>

                        </MenuItem>
                    </div>

                    <Typography variant="h4" align="center">
                        Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    data-test="test_signup_name"
                                    id="name"
                                    label="Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    data-test="test_signup_email"
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    data-test="test_signup_password"
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            data-test="test_signup_button_submit"
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: "20px" }}
                        >
                            Sign Up
                        </Button>
                    </form>
                    <Typography variant="body2" align="center" style={{ marginTop: "20px" }}>
                        If you already have an account, <a href="#" onClick={() => navigate("/login")}>Login</a>
                    </Typography>

                </Container>
            </div>
        </ThemeProvider>
    );
}

export default SignUp;

