import "./header.css";
import "../css/main.css";
import {memo, useCallback, useContext, useEffect, useRef, useState} from "react";
import useDarkMode from "../customHooks/darkmode.jsx";
import {DataContext} from "../context/data_context.jsx";
// eslint-disable-next-line react/prop-types
export default memo(function Header({onSearch, onToggle}) {

    const {data, saveLocalStorage, checkIsWordSaved, isWordSafe, unsaveWord, localStorageToSheet} = useContext(DataContext);
    // console.log("render header");
    const handleClick = () => {
        if (data) {
            if (isWordSafe.some(item => item.word === data.word)) {
                unsaveWord(data);
            } else {
                saveLocalStorage(data);
            }
        }
    }
    // use state for app functioning
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentFont, setCurrentFont] = useState(() => {
        const savedFont = localStorage.getItem('currentFont');
        return savedFont || "Serif";
    });
    const [darkMode, toggleDarkMode] = useDarkMode();
    const menuRef = useRef(null);
    const inputRef = useRef(null);
    function toggleMenu(event) {
        event.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    }
    const fontChange = useCallback((font) => {
        const root = document.documentElement;
        setCurrentFont(font);
        localStorage.setItem("currentFont", font);

        let fontValue;
        switch (font) {
            case "Serif":
                fontValue = 'Lora, serif';
                break;
            case "Sans Serif":
                fontValue = 'Inter, sans-serif';
                break;
            case "Mono":
                fontValue = 'Inconsolata, monospace';
                break;
            default:
                fontValue = 'Lora, serif';
        }
        root.style.setProperty("--font-family", fontValue);
        setIsMenuOpen(false);
    }, []);

    useEffect(() => {
        const savedFont = localStorage.getItem("currentFont");
        if (savedFont) {
            fontChange(savedFont);
        }
    }, [fontChange]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                const value = inputRef.current.value;
                if (value.trim()) {
                    onSearch(value.trim());
                    inputRef.current.value = "";
                }
                // You can call any function here
               document.querySelector(".header__search__input").focus();
            }
        };

        // Attach the event listener to the window object
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onSearch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
               setIsMenuOpen(false);
            }

        }
        if (isMenuOpen) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [isMenuOpen]);

    return (
        <header className="header">
            <div className="header__settings">
                <svg onClick={onToggle} className="header__icon" xmlns="http://www.w3.org/2000/svg" width="34" height="38" viewBox="0 0 34 38">
                    <g fill="none" fillRule="evenodd" stroke="#838383" strokeLinecap="round" strokeWidth="1.5">
                            <path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28"/>
                            <path strokeLinejoin="round" d="M5 37a4 4 0 1 1 0-8"/>
                            <path d="M11 9h12"/>
                        </g>
                    </svg>
                <div className="header__mode-setter">
                    {isWordSafe.length > 0 && (
                        <svg onClick={localStorageToSheet} xmlns="http://www.w3.org/2000/svg" className="load-file" viewBox="0 0 512 512">
                            <path
                                d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56M192 400.1l64 63.9 64-63.9M256 224v224.03"
                                fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="32"/>
                        </svg>
                    )}
                    {data !==null && (
                        <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" className="add-word" viewBox="0 0 512 512">
                            <path d="M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z" fill={data ? (checkIsWordSaved(data.word || isWordSafe) ? "var(--save-button)" : "none") : "none"}
                                  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
                        </svg>

                    )}
                    <div>
                        <button type="button" className="header__mode-setter__font-style" onClick={toggleMenu}>
                            <p>{currentFont}</p>
                            <svg className={`header__style-settings__icon ${isMenuOpen ? "rotate" : ""}`}
                                 xmlns="http://www.w3.org/2000/svg" width="14"
                                 height="8" viewBox="0 0 14 8">
                                <path fill="none" stroke="#A445ED" strokeWidth="1.5" d="m1 1 6 6 6-6"/>
                            </svg>
                        </button>
                        <div ref={menuRef} className={`font-subMenu ${isMenuOpen ? "visible" : ""}`}>
                            <button type="button" className={currentFont === "Serif" ? "focused" : ""}
                                    onClick={() => fontChange("Serif")}>Serif
                            </button>
                            <button type="button" className={currentFont === "Sans Serif" ? "focused" : ""}
                                    onClick={() => fontChange("Sans Serif")}>Sans Serif
                            </button>
                            <button type="button" className={currentFont === "Mono" ? "focused" : ""}
                                    onClick={() => fontChange("Mono")}>Mono
                            </button>
                        </div>
                    </div>
                    <div className="header__mode-setter__line"></div>
                    <div className="header__night-mode">
                        <label className="switch round" htmlFor="switch-mode">
                            <input id="switch-mode" placeholder="" type="checkbox" onChange={toggleDarkMode}
                                   checked={darkMode}/>
                            <span className="slider round"></span>
                        </label>
                        <svg className="header__icon" xmlns="http://www.w3.org/2000/svg" width="22"
                             height="22" viewBox="0 0 22 22">
                            <path fill="none" stroke="#838383" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="header__search">
                <input ref={inputRef} type="text" className="header__search__input" autoFocus
                       placeholder="Search word and its explanation"/>
            </div>
        </header>
    )
})
