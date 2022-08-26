import { createContext, useState, /*useEffect, useReducer*/ } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState({ username: btoa(Math.round(Math.random() * 10000)) });
    const [id, setId] = useState(null);

    const values = {
        user,
        setUser,
        id,
        setId,
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider