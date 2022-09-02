import React, { useContext } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CancelToken } from "apisauce";
import userApi from "../api/User";
import { AppContext } from "../contexts/AppContext";

const FormSchema = Yup.object({
    email: Yup.string().email("Must be a valid e-mail format").required(),
    password: Yup.string().required(),
});

const initialValues = {
    email: "",
    password: "",
    confirmPassword: ""
}


export default function LoginForm() {
    const { alert, setAlert, setUser } = useContext(AppContext);
    // const { setUser, setAlerts } = useContext(AppContext);

    const handleSubmit = async ({ email, password, confirmPassword }) => {
        if (password !== confirmPassword) {
            setAlert({ theme: "danger", text: "Passwords don't match!" })
            return;
        }
        const source = CancelToken.source();
        const res = await userApi.register(email, password, source.token);
        console.log(res);
        if (!res.ok) setAlert({ theme: "danger", text: res.data.message });
        else {
            setAlert({ theme: "success", text: res.data.message })
            setUser({ email, host: false })
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: FormSchema,
        onSubmit: (values) => handleSubmit(values)
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex-center flex-column">
            <div className="form-floating mb-3">
                <input
                    className="form-control"
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={`${formik.touched.email}`}
                // helperText={formik.touched.email && formik.errors.email}
                />
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="floatingPassword"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={`${formik.touched.password}`}
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    id="floatingconfirmPassword"
                    placeholder="Confirm password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={`${formik.touched.confirmPassword}`}
                />
                <label htmlFor="floatingconfirmPassword">Confirm password</label>
            </div>
            <button type="submit" className="btn btn-outline-info w-100">Sign up</button>
        </form>
    )
}
