import { create } from 'apisauce';

const api = create({
    baseURL: "http://localhost:8866",
});

const login = async (email, password, cancelToken) => {
    const res = await api.post("/login", {
        body: { email, password },
    }, { cancelToken });
    console.log(res);
}

export default {
    login
}