import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: pass })
        };
        console.log(requestOptions);
        fetch('https://reqres.in/api/login', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                // TODO: Save token in the browser
                // navigate("/welcome");
                console.log(data.token);
            });
        e.preventDefault();
        console.log(email);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <TextField id="email" label="email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" />

                <TextField id="password" label="password" variant="standard" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" />

                <Button variant="contained" type="submit">Login</Button>

            </form>
            <Button> If you don't have an account,register here</Button>
        </div>
    );
}

export default Login;

