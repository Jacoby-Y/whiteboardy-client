import "./App.css";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Whiteboard from "./pages/Whiteboard";
import Host from "./pages/Host";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/host" element={<Host />} />
            <Route path="/whiteboard/:id" element={<Whiteboard />} />

        </Routes>
    );
}

export default App;
