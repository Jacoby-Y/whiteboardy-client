import React, { useContext } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CancelToken } from "apisauce";
import userApi from "../api/User";

const FormSchema = Yup.object({
    email: Yup.string().email("Must be a valid e-mail format").required(),
    password: Yup.string().required(),
});

const initialValues = {
    email: "",
    password: ""
}


export default function LoginForm() {
    // const { setUser, setAlerts } = useContext(AppContext);

    const handleSubmit = async ({ email, password }) => {
        const source = CancelToken.source();
        userApi.login(email, password, source.token);
        // const res = await userApi.login(email, password, source.token);
        // if (res.error) return setAlerts({ theme: "error", text: "Can't login!" });
        // setUser(res.user);
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: FormSchema,
        onSubmit: (values) => handleSubmit(values)
    });

    const logStuff = () => {

    }



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
                // helperText={formik.touched.password && formik.errors.password}
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <button type="submit" className="btn btn-outline-info w-100" onClick={logStuff}>Login</button>
            {/* <TextField
                id="email"
                name="email"
                fullWidth
                sx={{ mb: 2, mt: 2 }}
                label="Email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                id="password"
                name="password"
                type="password"
                fullWidth
                sx={{ mb: 2, mt: 2 }}
                label="Password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <Button type="submit" sx={{ width: "100%" }}>Login</Button> */}
        </form>
    )
}
