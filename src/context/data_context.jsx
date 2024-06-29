import {createContext, useState} from "react";


export const DataContext = createContext();

export const DataContextProvider = ({children}) => {
    const [data, setData] = useState(null);

    const saveLocalStorage = (data) => {
        const existingData = localStorage.getItem("local");

        const currentData = existingData ? JSON.parse(existingData): [];
        currentData.push(data);
        localStorage.setItem('local', JSON.stringify(currentData));
    };

    return (
        <DataContext.Provider value={{data, setData, saveLocalStorage}}>{children}</DataContext.Provider>
    )

}