import React from 'react';
import LoginForm from '../forms/LoginForm';

const Login = () => {
    return (
        <main className="container flex-center flex-column">
            <h1 className="mb-4 display-2">Login</h1>
            <LoginForm />
        </main>
    )
}

export default Login;