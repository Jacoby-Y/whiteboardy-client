import React from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate();


    const clickLogin = () => {
        navigate("/login");
    }
    const clickSignup = () => {
        navigate("/signup");
    }

    return (
        <main className="container flex-center flex-column">
            <div className="flex-center flex-column text-center position-absolute" id="wrapper-border">
                <h1 className="display-1">Whiteboardy</h1>
                <h2 className="display-6">An interactive whiteboard</h2>
                <div>
                    <button className="m-3 btn btn-outline-info" onClick={clickLogin}>Login</button>
                    <button className="m-3 btn btn-outline-success" onClick={clickSignup}>Signup</button>
                </div>
                <div id="whiteboard-ledge"> </div>
            </div>
        </main>
    )
}

export default Index;