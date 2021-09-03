import { Link } from "react-router-dom";
import React from "react";
import { AuthContext } from "../Contexts/AuthContext"

import { useFormik } from 'formik';
import * as Yup from 'yup';

function Register({
    history,
}) {
    const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPass: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email! Example: email@gmail.com'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 charcakters!')
                .matches(/\w+/, 'Password must match any letter, digit or underscore'),
            repeatPass: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match!')
        }),
        onSubmit: async ({ email, password }) => {
            try {
                const response = await fetch('https://cars-react-app-server.herokuapp.com/users/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                })

                if (!response.ok) {
                    throw new Error((await response.json()).message);
                }

                const userData = await response.json();
                setUser({
                    authToken: userData.accessToken,
                    userId: userData._id,
                    email: userData.email,
                })

                history.push('/all-listings');
            } catch (error) {
                return alert(error.message);
            }
        }
    });
    const { setUser } = React.useContext(AuthContext);

    return (
        <section id="register">
            <div className="container">
                <form onSubmit={handleSubmit} id="register-form">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />

                    <p>Email</p>
                    <input
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        placeholder="Enter Email"
                        name="email"
                        required />
                    {touched.email && errors.email ? (
                        <div>{errors.email}</div>
                    ) : null}
                    <p>Password</p>
                    <input
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        required />
                    {touched.password && errors.password ? (
                        <div>{errors.password}</div>
                    ) : null}
                    <p>Repeat Password</p>
                    <input
                        value={values.repeatPass}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        placeholder="Repeat Password"
                        name="repeatPass"
                        required />
                    {touched.repeatPass && errors.repeatPass ? (
                        <div>{errors.repeatPass}</div>
                    ) : null}
                    <hr />

                    <input type="submit" className="registerbtn" value="Register" />
                </form>
                <div className="signin">
                    <p>Already have an account?
                        <Link to="/login">Sign in</Link>.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Register;