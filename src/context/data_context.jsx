import {createContext, useEffect, useState} from "react";
import { read, utils, writeFile } from 'xlsx';
import * as XLSX from "xlsx";

export const DataContext = createContext();

export const DataContextProvider = ({children}) => {
    const [data, setData] = useState(null);
    const [isWordSafe, setIsWordSafe] = useState(() => {
        const localData = localStorage.getItem("local");
        return localData ? JSON.parse(localData) : [];
    });
    console.log("render data context")
    const createLocalStorage = () => {
        const existingData = localStorage.getItem("local");
        if (!existingData) {
            const newData = [];
            localStorage.setItem('local', JSON.stringify(newData));
        }
    }

    const checkIsWordSaved = (word) => {
        const existingData = localStorage.getItem("local");
        if (existingData) {
            const currentData = JSON.parse(existingData);
            return currentData.some(item => item.word === word);
        }
        return false;
    }

    const saveLocalStorage = (data) => {
        if (!isWordSafe.includes(data)) {
            const updatedWords = [...isWordSafe, data];
            localStorage.setItem('local', JSON.stringify(updatedWords));
            setIsWordSafe(updatedWords);
        }
        // setIsWordSafe(true);
    };

    const unsaveWord = (data) => {
        const updatedWords = isWordSafe.filter(item => item.word !== data.word);
        localStorage.setItem('local', JSON.stringify(updatedWords));
        setIsWordSafe(updatedWords);
    }

    const deleteWord = (word) => {
        const updatedWords = isWordSafe.filter(item => item.word !== word);
        localStorage.setItem('local', JSON.stringify(updatedWords));
        setIsWordSafe(updatedWords);
    }

    const savedWords = () => {
        let existingData = localStorage.getItem("local");
        if (existingData) {
            existingData = JSON.parse(existingData);
            const words = existingData.map(object => object.word);
            return words
        }
        return null;
    }

    const localStorageToSheet = () => {
        const existingStorage = localStorage.getItem("local");
        if (existingStorage) {
            const currentData = JSON.parse(existingStorage);

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(currentData);
            console.log(wb);
            console.log(ws);

            XLSX.utils.book_append_sheet(wb, ws, "saved_words.xlsx");
        }
    }
    // localStorageToSheet();

    useEffect(() => {
        createLocalStorage();
    }, []);

    return (
        <DataContext.Provider value={{data, setData,deleteWord, saveLocalStorage, checkIsWordSaved, unsaveWord, isWordSafe, setIsWordSafe, savedWords}}>{children}</DataContext.Provider>
    )

}