import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import { Brightness4 } from "@mui/icons-material";
import "../util/general.css";
import { createCustomTheme, toggleDarkMode } from "../theme/themeUtils";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // color theme selection
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    toggleDarkMode(darkMode, setDarkMode);
  };

  const darkTheme = createCustomTheme("dark");
  const lightTheme = createCustomTheme("light");

  const handleSubmit = (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: pass }),
    };
    console.log(requestOptions);
    console.log(localStorage.token);
    fetch("https://reqres.in/api/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        if (localStorage.token != undefined && email != "" && pass != "") {
          navigate("/welcome");
        }
        // console.log(data.token);
      });
    e.preventDefault();
  };

  return (
    <ThemeProvider
      theme={
        localStorage.getItem("darkMode") == "dark" ? darkTheme : lightTheme
      }
    >
      <div
        className={`container ${
          localStorage.getItem("darkMode") == "dark"
            ? "dark-mode"
            : "light-mode"
        }`}
      >
        <Container maxWidth="sm">
          <div className="menu-container">
            <MenuItem>
              <Link color="inherit" onClick={toggleTheme}>
                <Brightness4 /> {darkMode ? "Light Mode" : "Dark Mode"}
              </Link>
            </MenuItem>
          </div>

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
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "20px" }}
          >
            Don't have an account?{" "}
            <a href="#" onClick={() => navigate("/signup")}>
              Sign Up
            </a>
          </Typography>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default Login;
