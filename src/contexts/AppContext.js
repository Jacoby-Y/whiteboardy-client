import { createContext, useState, /*useEffect, useReducer*/ } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    // const [user, setUser] = useState({ email: "bruh", host: false });
    const [user, setUser] = useState(null);
    const [id, setId] = useState(null);
    const [alert, setAlert] = useState(null);

    const values = {
        user,
        setUser,
        id,
        setId,
        alert,
        setAlert,
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider