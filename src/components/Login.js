import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

function Login({
    history,
}) {
    const { setUser } = React.useContext(AuthContext);

    const handleOnLoginSubmitHandler = async (e) => {
        e.preventDefault();

        const { email, password } = e.target;

        try {
            const response = await fetch('https://cars-react-app-server.herokuapp.com/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.value, password: password.value })
            });

            if (!response.ok) {
                throw new Error((await response.json()).message);
            }

            const userData = await response.json();
            setUser({
                authToken: userData.accessToken,
                userId: userData._id,
                email: userData.email,
            });

            history.push('/');
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <section id="login">
            <div className="container">
                <form onSubmit={handleOnLoginSubmitHandler} id="login-form">
                    <h1>Login</h1>
                    <p>Please enter your credentials.</p>
                    <hr />
                    <p>Email</p>
                    <input placeholder="Enter Email" name="email" type="text" />

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password" />
                    <input type="submit" className="registerbtn" value="Login" />
                </form>
                <div className="signin">
                    <p>Dont have an account?
                        <Link to="/register">Sign up</Link>.
                    </p>
                </div>
            </div>
        </section >
    );
}

export default Login;