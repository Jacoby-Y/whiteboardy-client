import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext';

const Host = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AppContext);
    const [code, setCode] = useState("");

    const host = () => {
        user.host = true;
        setUser(user);
        navigate(`/whiteboard/${user.username}:${code}`);
    }

    return (
        <div className="container flex-center flex-column">
            <div className="input-group mb-3" style={{ width: "max-content" }}>
                <span className="input-group-text" id="basic-addon1">Passcode</span>
                <input
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                    type="text"
                    className="form-control"
                    placeholder="Passcode"
                    aria-label="Passcode"
                    aria-describedby="basic-addon1"
                    style={{ maxWidth: "20rem" }} />
            </div>
            <button className="btn btn-outline-info" onClick={host}>Host</button>
        </div>
    )
}

export default Host;