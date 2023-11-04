import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import '../util/welcomePage.css';

function WelcomePage() {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        fetch('https://reqres.in/api/users/7')
            .then((response) => response.json())
            .then((data) => setUserData(data.data));
    }, []);

    const handleLogout = () => {
        localStorage.token = undefined
        navigate("/login");
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
                <div className="welcome-content" >
                    <p>Welcome {userData.first_name}</p>

                </div >
            ) : (
                <CircularProgress />
            )
            }
        </div >
    );
}

export default WelcomePage;
