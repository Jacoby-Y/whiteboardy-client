import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import userApi from "../api/User"
import { CancelToken } from 'apisauce'

const UserInfo = () => {
    const { user, setUser, setAlert } = useContext(AppContext)

    const logout = async ()=>{
        const source = CancelToken.source()
        const res = await userApi.logout(source.token)
        if (res) setUser(null)
        else setAlert({ theme: "danger", text: "Couldn't logout!\nTry again later" })
    }
    const del = async () => {
        const source = CancelToken.source()
        const res = await userApi.del(source.token)
        if (res) setUser(null)
        else setAlert({ theme: "danger", text: "Couldn't delete account!\nTry again later" })
    }

    return (<>
        <div id="UserInfo">
            <h2>{user.email}</h2>
            <div id="menu">
                <h2 className="btn btn-outline-warning" onClick={logout}>Log out <i className="bi bi-box-arrow-left"></i></h2>
                <h2 className="btn btn-outline-danger mx-2" onClick={del}>Delete Account <i className="bi bi-trash"></i></h2>
            </div>
        </div>
    </>)
}

export default UserInfo