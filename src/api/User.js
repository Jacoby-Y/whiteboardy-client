import { create } from 'apisauce';

const serverURL = window.location.hostname == "localhost" ? "http://localhost:866" : "https://whiteboardy-server.herokuapp.com/"

const api = create({
    baseURL: "",
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": true,
    },
});

const login = async (email, password, cancelToken) => {
    const res = await api.post("/login", {
        email, password
    }, { cancelToken, withCredentials: true });
    return res;
}

const register = async (email, password, cancelToken) => {
    return await api.post("/register", { email, password }, { cancelToken })
}

const getSelf = async (cancelToken) => {
    const res = await api.get("/user", {}, { cancelToken, withCredentials: true });
    if (!res.ok) return null;
    return { ...res.data, host: false };
}

const logout = async (cancelToken) => {
    const res = await api.get("/logout", {}, { cancelToken, withCredentials: true });
    console.log(res);
    return res.ok;
}

const del = async (cancelToken) => {
    const res = await api.get("/del", {}, { cancelToken, withCredentials: true });
    console.log(res);
    return res.ok;
}

const hasWhiteboard = async (id, cancelToken) => {
    const res = await api.get(`/has_wb/${id}`, {}, { cancelToken });
    if (!res.ok) return false;
    return res.data.has_id;
}

export default {
    login,
    register,
    getSelf,
    logout,
    hasWhiteboard,
    del
}