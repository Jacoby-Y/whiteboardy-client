import "./App.css";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Whiteboard from "./pages/Whiteboard";
import Hub from "./pages/Hub";
import { Routes, Route, Navigate } from "react-router-dom";
import Alert from "./components/Alert";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./contexts/AppContext";
import userApi from "./api/User";

function App() {
    const { user, setUser } = useContext(AppContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setUser(await userApi.getSelf());
            setLoading(false);
        })();
    }, []);

    return (<main style={{ opacity: (loading ? "0" : "1") }}>
        <Alert />
        <Routes>
            <Route path="/" element={user ? <Navigate to="/hub" /> : <Index />} />
            <Route path="/login" element={user ? <Navigate to="/hub" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/hub" /> : <Signup />} />

            <Route path="/hub" element={!user ? <Navigate to="/" /> : <Hub />} />
            <Route path="/whiteboard/:id" element={!user ? <Navigate to="/" /> : <Whiteboard />} />
        </Routes>
    </main>);
}

export default App;
