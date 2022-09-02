import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext';
import UserApi from "../api/User";

const Find = () => {
    const navigate = useNavigate();
    const { user, setUser, setAlert, setId } = useContext(AppContext);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");

    const find = async () => {
        let _code;
        try {
            _code = `${btoa(code)}:${btoa(user)}`;
        } catch (err) {
            _code = null;
        }

        if (_code == null) {
            setAlert({ theme: "danger", text: "Inputs can't have illegal characters!" });
            return;
        }
        setAlert({ theme: "info", text: "Finding whiteboard..." });
        const wid = `${name}:${code}`;

        const found = await UserApi.hasWhiteboard(wid);
        if (!found) {
            setAlert({ theme: "danger", text: "Can't find whiteboard!" });
            return;
        } else {
            setAlert({ theme: "info", text: "Connecting..." });
        }

        user.host = false;
        setUser(user);
        setId(`${name}:${code}`);
        navigate(`/whiteboard/${name}:${code}`);
    }

    return (
        <>
            <div className="input-group mb-3" style={{ width: "max-content" }}>
                <span className="input-group-text" id="basic-addon1">Whiteboard ID</span>
                <input
                    onChange={(e) => setName(e.target.value.slice(0, 19))}
                    value={name}
                    type="text"
                    className="form-control"
                    placeholder="User"
                    aria-label="User"
                    aria-describedby="basic-addon1"
                    style={{ maxWidth: "21rem" }} />
                <span className="input-group-text" id="basic-addon1">:</span>
                <input
                    onChange={(e) => setCode(e.target.value.slice(0, 19))}
                    value={code}
                    type="text"
                    className="form-control"
                    placeholder="Passcode"
                    aria-label="Passcode"
                    aria-describedby="basic-addon1"
                    style={{ maxWidth: "21rem" }} />
                <span className="input-group-text btn btn-outline-primary" id="basic-addon1" onClick={find}>Find</span>
            </div>
        </>
    )
}

export default Find;