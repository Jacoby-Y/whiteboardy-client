import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

const Alert = () => {
    const { alert, setAlert } = useContext(AppContext);

    if (!alert) return (<></>);

    const close = () => {
        setAlert(null);
    }

    return (
        <div className={`alert alert-${alert.theme}`} role="alert">
            {alert.text}
            <span className="alert-x" onClick={close}>X</span>
        </div>
    )
}

export default Alert