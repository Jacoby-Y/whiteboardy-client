import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext';

const Host = () => {
    const navigate = useNavigate();
    const { user, setUser, setAlert } = useContext(AppContext);
    const [code, setCode] = useState("");

    const host = () => {
        let _code;
        try {
            _code = btoa(code);
        } catch (err) {
            _code = null;
        }

        if (_code == null) {
            setAlert({ theme: "danger", text: "Passcode can't have illegal characters!" });
            return;
        }
        setAlert({ theme: "info", text: "Hosting whiteboard..." });

        user.host = true;
        setUser(user);
        const name = user.email.slice(0, Math.min(20, user.email.indexOf("@")));
        navigate(`/whiteboard/${name}:${code}`);
    }

    return (
        <>
            <div className="input-group mb-3" style={{ width: "max-content" }}>
                <span className="input-group-text" id="basic-addon1">Passcode</span>
                <input
                    onChange={(e) => setCode(e.target.value.slice(0, 19))}
                    value={code}
                    type="text"
                    className="form-control"
                    placeholder="Passcode"
                    aria-label="Passcode"
                    aria-describedby="basic-addon1"
                    style={{ maxWidth: "21rem" }} />
                <span className="input-group-text btn btn-outline-info" id="basic-addon1" onClick={host}>Host</span>
            </div>
        </>
    )
}

export default Host;