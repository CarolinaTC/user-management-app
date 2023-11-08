/* 
import React, { createContext, useContext, useState } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";


const ThemeContext = createContext();

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

const ThemeContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('darkMode', darkMode ? 'light' : 'dark');
    };


    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme) {

        setDarkMode(storedTheme === 'dark');
    }

    return (
        <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
                {children}
            </ThemeContext.Provider>
        </MuiThemeProvider>
    );
};

export { ThemeContextProvider, ThemeContext };
 */