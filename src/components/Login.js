import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";




function Login() {

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

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: pass })
        };
        console.log(requestOptions);
        console.log(localStorage.token);
        fetch('https://reqres.in/api/login', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('token', data.token);
                if (localStorage.token != undefined && email != "" && pass != "") {
                    navigate("/welcome");
                }
                // console.log(data.token);
            });
        e.preventDefault();

    }

    return (
        <ThemeProvider theme={localStorage.getItem('darkMode') == "dark" ? darkTheme : lightTheme}>
            <Container maxWidth="sm">
                <div className={`${localStorage.getItem('darkMode') == "dark" ? "dark-mode" : "light-mode"}`}>
                    <Typography variant="h4" align="center">
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    data-test="test_login_email"
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    data-test="test_login_password"
                                    fullWidth
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
                            data-test="test_login_button_submit"
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: "20px" }}
                        >
                            Login
                        </Button>
                    </form>
                    <Typography variant="body2" align="center" style={{ marginTop: "20px" }}>
                        Don't have an account?{" "}
                        <a href="#" onClick={() => navigate("/signup")}>
                            Sign Up
                        </a>
                    </Typography>
                </div>
            </Container>
        </ThemeProvider>
    );
}

export default Login;

