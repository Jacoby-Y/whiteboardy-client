import React from "react"
import { useNavigate } from "react-router-dom";
import SignupForm from "../forms/SignupForm";

const Signup = () => {
    const navigate = useNavigate();

    const toLogin = () => {
        navigate("/login");
    }

    return (
        <div className="container flex-center flex-column">
            <h1 className="mb-4 display-2">Sign Up</h1>
            <SignupForm />
            <button type="button" className="btn mt-3 text-secondary" onClick={toLogin}>Login instead</button>
        </div >
    )
}

export default Signup;