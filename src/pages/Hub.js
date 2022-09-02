import React, { useContext } from 'react';
import Host from './Host';
import Find from './Find';
import userApi from '../api/User';
import { AppContext } from '../contexts/AppContext';
import { CancelToken } from "apisauce";
import { useNavigate } from 'react-router-dom';
import UserInfo from "../components/UserInfo";

const Hub = () => {
    const { setUser, setAlert } = useContext(AppContext);
    const navigate = useNavigate();

    const logout = async () => {
        const source = CancelToken.source();
        const logged_out = await userApi.logout(source.token);
        if (logged_out) {
            setUser(null);
            navigate("/");
        }
        else setAlert({ theme: "danger", text: "Can't logout???" })
    }

    return (<>
        <UserInfo />
        <div className="container flex-center flex-column text-center">
            <h1 className="display-3 mb-5">Find or Host a Whiteboard</h1>
            <Find />
            <hr />
            <Host />
            <button className="btn btn-outline-danger" style={{ position: "absolute", top: "1rem", right: "1rem" }} onClick={logout}>
                Logout
            </button>
        </div>
    </>)
}

export default Hub