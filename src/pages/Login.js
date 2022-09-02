import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../forms/LoginForm';

const Login = () => {
    const navigate = useNavigate();

    const toRegister = () => {
        navigate("/signup");
    }

    return (
        <main className="container flex-center flex-column">
            <h1 className="mb-4 display-2">Login</h1>
            <LoginForm />
            <button type="button" className="btn mt-3 text-secondary" onClick={toRegister}>Signup instead</button>
        </main>
    )
}

export default Login;