import React, { useState, useEffect } from 'react';

function WelcomePage() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {

        fetch('https://reqres.in/api/users/7')
            .then((response) => response.json())
            .then((data) => setUserData(data.data));
    }, []);

    return (
        <div>
            <h1>Welcome Page</h1>
            {userData ? (
                <div>
                    <p>User ID: {userData.id}</p>
                    <p>Welcome {userData.first_name} </p>

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default WelcomePage;
