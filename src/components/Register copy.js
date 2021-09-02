import { Link } from "react-router-dom";
import React from "react";
import { AuthContext } from "../Contexts/AuthContext"

function Register({
    history,
}) {
    const [input, setInput] = React.useState({
        username: '',
        password: '',
        repeatPass: '',
    })
    const { setUser } = React.useContext(AuthContext);

    const hangleOnRegisterSubmitHandler = async (e) => {
        e.preventDefault();

        const { email, password, repeatPass } = input;

        try {
            if (password !== repeatPass) {
                throw new Error('Passwords don\'t match!');
            }

            const response = await fetch('https://cars-react-app-server.herokuapp.com/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, })
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

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <section id="register">
            <div className="container">
                <form onSubmit={hangleOnRegisterSubmitHandler} id="register-form">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />

                    <p>Email</p>
                    <input type="text" placeholder="Enter Email" name="email" value={input.email} onChange={handleChange} required />

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password" value={input.password} onChange={handleChange} required />

                    <p>Repeat Password</p>
                    <input type="password" placeholder="Repeat Password" name="repeatPass" value={input.repeatPass} onChange={handleChange} required />
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