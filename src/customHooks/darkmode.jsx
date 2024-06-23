import {useEffect, useState} from "react";

export default function useDarkMode() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return [darkMode, toggleDarkMode];
}