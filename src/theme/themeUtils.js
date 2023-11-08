
import { createTheme } from "@mui/material/styles";

export const createCustomTheme = (mode) => {
    return createTheme({
        palette: {
            mode,
        },
    });
};

export const toggleDarkMode = (darkMode, setDarkMode) => {

    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode ? 'dark' : 'light');
};
